const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

// Protect routes
exports.isAuthorized = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  next(new ErrorResponse(`You are not authorized to access this route`, 401));
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

exports.isActiveUser = asyncHandler((req, res, next) => {
  if (req.user?.status) {
    return next();
  }
  return res.status(403).json({
    success: false,
    error: "Your account has been  blocked",
    blocked: true,
  });
});
