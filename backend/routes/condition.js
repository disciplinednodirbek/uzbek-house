const express = require("express");
const router = express.Router();
const {
  getConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} = require("../controllers/condition");

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getConditions)
  .post(isAuthorized, authorize("super_admin"), createCondition);

router
  .route("/:id")
  .put(isAuthorized, authorize("super_admin"), updateCondition)
  .delete(isAuthorized, authorize("super_admin"), deleteCondition);

module.exports = router;
