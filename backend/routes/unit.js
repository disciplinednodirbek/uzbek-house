const express = require("express");
const router = express.Router();
const {
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unit");

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getUnits)
  .post(isAuthorized, authorize("super_admin"), createUnit);

router
  .route("/:id")
  .put(isAuthorized, authorize("super_admin"), updateUnit)
  .delete(isAuthorized, authorize("super_admin"), deleteUnit);

module.exports = router;
