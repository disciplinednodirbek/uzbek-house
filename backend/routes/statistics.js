const express = require("express");
const router = express.Router();
const {
  getHousesByMonth,
  getHousesTotalCount,
  getHousesByRegion,
} = require("../controllers/statistics");

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/houses/by-month")
  .get(isAuthorized, authorize("super_admin", "admin"), getHousesByMonth);

router
  .route("/houses/total-counts")
  .get(isAuthorized, authorize("super_admin", "admin"), getHousesTotalCount);

router
  .route("/houses/by-region")
  .get(isAuthorized, authorize("super_admin", "admin"), getHousesByRegion);

module.exports = router;
