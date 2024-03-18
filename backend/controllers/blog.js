const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Blog = require("../models/Blog");
const User = require("../models/User");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_1m8F0JkeraCuQxAPWfH6pqRyXHo=",
  privateKey: "private_kvRV4GSIMCZFIcaVQhxZPHD/loA=",
  urlEndpoint: "https://ik.imagekit.io/j4pvd3slcf",
});

// description    Get all blogs
// route          GET /api/v1/blogs
// access         Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  let query;

  if (Object.keys(req.query).length === 0) {
    query = Blog.find();
  } else {
    const reqQuery = { ...req.query };
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    query = Blog.find(JSON.parse(queryStr));

    if (req.query.category) {
      query = query.where("category").equals(req.query.category);
    }
  }

  const blogs = await query;

  res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

// description   Get single blog
// route         GET /api/v1/blogs/:id
// access        Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: blog });
});

// description   Create new blog
// route         POST /api/v1/blogs
// access        Private

exports.createBlog = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  if (req.body.image) {
    const imageUploadResponse = await imagekit.upload({
      file: req.body.image,
      fileName: `${
        new Date().getSeconds() + new Date().getMilliseconds()
      }-profile-picture`,
    });

    req.body.image = imageUploadResponse.url;
  }

  const { description, title, category, image } = req.body;

  try {
    const newBlog = new Blog({
      description,
      title,
      category,
      image,
      user: req.user._id,
    });

    const blog = await newBlog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to create blog", 500));
  }
});

const deleteImageFromImageKit = async (imageUrl) => {
  try {
    await imagekit.deleteFile(imageUrl, function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    });
  } catch (error) {
    console.error("Error deleting image from ImageKit:", error);
    throw new Error("Failed to delete image from ImageKit");
  }
};

// description   Update blog
// route         PUT /api/v1/blogs/:id
// access        Private
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  if (req.user.role === "user" && req.user._id !== blog.user._id) {
    return next(
      new ErrorResponse("You are not authorized to update this user", 403)
    );
  }

  if (req.user.role === "admin" && blog.user.role === "super_admin") {
    return next(
      new ErrorResponse(
        "You are not authorized to update super_admin users",
        403
      )
    );
  }

  if (
    req.user.role === "super_admin" ||
    (req.user.role === "admin" && blog.user.role === "user") ||
    (req.user.role === "user" && req.user._id === blog.user._id)
  ) {
    if (req.body.image) {
      if (blog.image) {
        await deleteImageFromImageKit(blog.image);
      }

      const imageUploadResponse = await imagekit.upload({
        file: req.body.image,
        fileName: `${user._id}-profile-picture`,
      });

      req.body.image = imageUploadResponse.url;
    }

    blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: blog });
  } else {
    return next(
      new ErrorResponse("You are not authorized to update this blog", 403)
    );
  }
});
// description    Delete Blog
// route          DELETE /api/v1/blogs/:id
// access         Private
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the user is the creator of the blog or a super admin
  if (blog.user.toString() !== req.user._id && req.user.role !== "super_admin") {
    return next(
      new ErrorResponse(`You are not authorized to delete this blog`, 401)
    );
  }

  if (
    req.user.role === "super_admin" ||
    (req.user.role === "admin" && blog.user.toString() === req.user._id)
  ) {
    await blog.remove();

    return res.status(200).json({ success: true, data: {} });
  } else {
    return next(
      new ErrorResponse(`You are not authorized to delete this blog`, 401)
    );
  }
});

// description   Get all tags
// route         GET /api/v1/blogs/tags
// access        Public
exports.getTags = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find();
  let tags = [];
  if (blogs.length) {
    blogs.map((blog) => {
      blog.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  }

  res.status(200).json({ success: true, tags });
});

// description   like functionality for each blog
// route         GET /api/v1/blogs/like/:id
// access        Private
exports.likeBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new ErrorResponse(`Blog not found`, 404));
  }

  const index = blog.likes.findIndex((id) => id === req.user._id);

  if (index === -1) {
    blog.likes.push(req.user._id);
    blog.likeCount = blog.likeCount + 1;
  } else {
    blog.likes = blog.likes.filter((id) => id !== req.user._id);
    blog.likeCount = blog.likeCount - 1;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  });
  res.status(201).json({ success: true, data: updatedBlog });
});

// description   Get all trend blogs
// route         GET /api/v1/blogs/trend/
// access        Public
exports.getTrendBlogs = asyncHandler(async (req, res, next) => {
  let query;

  if (Object.keys(req.query).length === 0) {
    query = Blog.find();
  } else {
    const reqQuery = { ...req.query };
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    query = Blog.find(JSON.parse(queryStr))
      .populate("user")
      .sort({ likeCount: -1, createdAt: -1 })
      .limit(4);

    if (req.query.category) {
      query = query.where("category").equals(req.query.category);
    }
  }

  const blogs = await query;

  res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

// description   Get most relevant category  blogs
// route         GET /api/v1/blogs/:blogId/suggested/category=..?
// access        Public
exports.getSuggestedBlogs = asyncHandler(async (req, res, next) => {
  let blogs = await Blog.find({
    category: mongoose.Types.ObjectId(req.query.category),
  })
    .populate("user")
    .sort({ likeCount: -1, createdAt: -1 })
    .limit(4);

  if (!blogs) {
    return next(new ErrorResponse(`blogs not found`, 404));
  }

  blogs = blogs.filter((blog) => blog.id.toString() !== req.params.blogId);

  res.status(200).json({ success: true, data: blogs });
});
