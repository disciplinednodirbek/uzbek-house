const express = require("express");
const router = express.Router();
const {
  getRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/region");

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getRegions)
  .post(isAuthorized, authorize("super_admin"), createRegion);

router
  .route("/:id")
  .put(isAuthorized, authorize("super_admin"), updateRegion)
  .delete(isAuthorized, authorize("super_admin"), deleteRegion);

module.exports = router;
