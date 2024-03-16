const { default: mongoose } = require("mongoose");
const axios = require("axios");

const ImageKit = require("imagekit");
const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

const imagekit = new ImageKit({
  publicKey: "public_1m8F0JkeraCuQxAPWfH6pqRyXHo=",
  privateKey: "private_kvRV4GSIMCZFIcaVQhxZPHD/loA=",
  urlEndpoint: "https://ik.imagekit.io/j4pvd3slcf",
});

// description    Get me (authenticated user)
// route         GET /api/v1/users
// access        Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

// description    Create user (authenticated super admin)
// route         POST /api/v1/users
// access        Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return next(
      new ErrorResponse(`User exists with email of ${req.body.email}`, 400)
    );
  }

  if (req.body.image) {
    const imageUploadResponse = await imagekit.upload({
      file: req.body.image,
      fileName: `${user._id}-profile-picture`,
    });

    req.body.image = imageUploadResponse.url;
  }

  const {
    name,
    email,
    password,
    role,
    address,
    phone_number,
    image = null,
  } = req.body;
  const newAdmin = new User({
    name,
    email,
    password,
    role,
    address,
    phone_number,
    image,
  });

  const admin = await newAdmin.save();

  res.status(200).json({
    success: true,
    data: admin,
  });
});

// description    Get all users
// route         GET /api/v1/users
// access        Private only Admins  can have access it
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await User.countDocuments();
  const users = await User.find().skip(startIndex).limit(limit);

  const pagination = { next: null, prev: null };

  if (endIndex < total) {
    pagination.next = page + 1;
  }

  if (startIndex > 0) {
    pagination.prev = page - 1;
  }

  res.status(200).json({
    success: true,
    total,
    limit,
    pagination,
    data: users,
  });
});

// description      Delete user
// route            DELETE /api/v1/user/:id
// access           Private (only Super Admin can delete users)
exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting user:", error);
    return next(
      new ErrorResponse(`Error deleting user: ${error.message}`, 500)
    );
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
// description      Update user
// route            PUT /api/v1/user/:id
// access           Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (req.user.role === "user" && req.user.id !== user.id) {
    return next(
      new ErrorResponse("You are not authorized to update this user", 403)
    );
  }

  if (req.user.role === "admin" && user.role === "super_admin") {
    return next(
      new ErrorResponse(
        "You are not authorized to update super_admin users",
        403
      )
    );
  }

  if (
    req.user.role === "super_admin" ||
    (req.user.role === "admin" && user.role === "user") ||
    (req.user.role === "user" && req.user.id === user.id)
  ) {
    if (!req.user.role !== "super_admin") {
      delete req.body.status;
    }

    if (req.body.image) {
      if (user.image) {
        await deleteImageFromImageKit(user.image);
      }

      const imageUploadResponse = await imagekit.upload({
        file: req.body.image,
        fileName: `${user._id}-profile-picture`,
      });

      req.body.image = imageUploadResponse.url;
    }

    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user });
  } else {
    return next(
      new ErrorResponse("You are not authorized to update this user", 403)
    );
  }
});
