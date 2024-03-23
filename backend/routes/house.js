const express = require("express");
const {
  getHouse,
  getAllHouses,
  createHouse,
  deleteHouse,
  updateHouse,
  likeHouse,
  hideHouse,
  getSuggestedHouses,
  getTrendHouses
} = require("../controllers/house");

const router = express.Router();

const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getAllHouses)
  .post(isAuthorized, isActiveUser, createHouse);

router.patch("/like/:id", isAuthorized, isActiveUser, likeHouse);
router.patch("/hide/:id", isAuthorized, isActiveUser, hideHouse);
router.get("/:houseId/suggested", getSuggestedHouses);
router.get("/trend", getTrendHouses);


router
  .route("/:id")
  .get(getHouse)
  .put(isAuthorized, isActiveUser, updateHouse)
  .delete(isAuthorized, isActiveUser, deleteHouse);

module.exports = router;
