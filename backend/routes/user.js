const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/user");

const {
  isAuthorized,
  authorize,
  isActiveUser,
} = require("../middlewares/routeProtect");

router.get("/me", isAuthorized, isActiveUser, getMe);

module.exports = router;
