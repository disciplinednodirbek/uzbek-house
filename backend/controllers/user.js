const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

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

  const { name, email, password, role } = req.body;
  const newAdmin = new User({
    name,
    email,
    password,
    role,
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
