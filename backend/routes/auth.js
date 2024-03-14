const express = require("express");
const router = express.Router();
const {
  email_login,
  email_register,
  authGoogle,
  authGoogleRedirect,
  logout,
  passportLogin,
  passportRegister,
} = require("../controllers/auth");
const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router.post(
  "/email_login",
  passportLogin,
  isActiveUser,
  email_login
);
router.post("/email_register", passportRegister, email_register);
router.get("/google", authGoogle);
router.get("/google/callback", authGoogleRedirect);
router.post("/logout", isAuthorized, logout);

module.exports = router;
