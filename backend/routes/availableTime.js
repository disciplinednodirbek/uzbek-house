const express = require("express");
const router = express.Router();
const {
  getAvailableTimes,
  createAvailableTime,
  updateAvailableTime,
  deleteAvailableTime,
} = require("../controllers/availableTime");

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getAvailableTimes)
  .post(isAuthorized, authorize("super_admin"), createAvailableTime);

router
  .route("/:id")
  .put(isAuthorized, authorize("super_admin"), updateAvailableTime)
  .delete(isAuthorized, authorize("super_admin"), deleteAvailableTime);

module.exports = router;
