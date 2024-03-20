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
// description    Get all blogs
// route          GET /api/v1/blogs
// access         Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  let query;

  if (Object.keys(req.query).length === 0) {
    query = Blog.find().populate("user", "name email");
  } else {
    const reqQuery = { ...req.query };
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = Blog.find(JSON.parse(queryStr)).populate("user", "name email");

    if (req.query.tag) {
      query = await Blog.find({ tags: { $in: [req.query.tag] } });
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

  const { description, title, category, image, tags } = req.body;

  try {
    const newBlog = new Blog({
      description,
      title,
      category,
      tags,
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

  if (
    req.user._id.toString() !== blog.user.toString() &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse("You are not authorized to update this blog", 403)
    );
  }

  if (req.user.role === "admin" && blog.user.role === "super_admin") {
    return next(
      new ErrorResponse(
        "You are not authorized to update super_admin users' blogs",
        403
      )
    );
  }

  if (
    req.user.role === "super_admin" ||
    (req.user.role === "admin" && blog.user.role === "user") ||
    req.user._id.toString() === blog.user.toString()
  ) {
    if (req.body.image) {
      if (blog.image) {
        await deleteImageFromImageKit(blog.image);
      }

      const imageUploadResponse = await imagekit.upload({
        file: req.body.image,
        fileName: `${blog.user._id}-profile-picture`,
      });

      req.body.image = imageUploadResponse.url;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(
        new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
      );
    }

    if (
      blog.user.toString() !== req.user._id.toString() &&
      req.user.role !== "super_admin"
    ) {
      return next(
        new ErrorResponse(`You are not authorized to delete this blog`, 401)
      );
    }

    await Blog.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error("Error deleting blog:", err);
    return next(new ErrorResponse(`Error deleting blog: ${err.message}`, 500));
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

  const index = blog.likes.findIndex((id) => id === req.user._id.toString());

  if (index === -1) {
    blog.likes.push(req.user._id);
    blog.likeCount = blog.likeCount + 1;
  } else {
    blog.likes = blog.likes.filter((id) => id !== req.user._id.toString());
    blog.likeCount = blog.likes.length;
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
    category: req.query.category,
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
