const express = require("express");
const router = express.Router();
const {
  getMe,
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user");

const {
  isAuthorized,
  authorize,
  isActiveUser,
} = require("../middlewares/routeProtect");

router
  .route("/")
  .get(
    isAuthorized,
    isActiveUser,
    authorize("super_admin", "admin"),
    getAllUsers
  )
  .post(isAuthorized, isActiveUser, authorize("super_admin"), createUser);

router
  .route("/:id")
  .delete(isAuthorized, isActiveUser, authorize("super_admin"), deleteUser);

router.get("/me", isAuthorized, isActiveUser, getMe);

module.exports = router;
