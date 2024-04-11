const passport = require("passport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

const successLoginUrl = "http://localhost:3000";
const errorLoginUrl = "http://localhost:3000";

// description    Register user
// route         POST /api/v1/auth/email_register
// access        Public
exports.email_register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

// description  Login User
// route        POST /api/v1/auth/email_login
// access       Public
exports.email_login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

exports.email_login_admin = asyncHandler(async (req, res, next) => {
  if (req.user.role == "admin" || req.user.role == "super_admin") {
    res.status(200).json({ success: true, user: req.user });
  } else {
    next(new ErrorResponse("you dont have permission", 400));
  }
});

exports.passportLogin = passport.authenticate("email_login", { session: true });

exports.passportRegister = passport.authenticate("email_register", {
  session: true,
});

// description    Register  or Login user with facebook
// route         GET /api/v1/auth/google
// access        Public
exports.authGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: true,
});

// description    After google successfully integrate it redirects to this api
// route         GET /api/v1/auth/google/callback
// access        Public
exports.authGoogleRedirect = passport.authenticate("google", {
  failureMessage: "Cannot login to Google!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
});

// description    user log out
// route         GET /api/v1/auth/logout
// access        Private
exports.logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});
