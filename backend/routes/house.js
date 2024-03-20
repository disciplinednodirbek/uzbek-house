const express = require("express");
const {
  getHouse,
  getAllHouses,
  createHouse,
  deleteHouse,
  updateHouse,
  likeHouse,
  getSuggestedHouses,
} = require("../controllers/house");

const router = express.Router();

const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getAllHouses)
  .post(isAuthorized, isActiveUser, createHouse);

router.patch("/like/:id", isAuthorized, isActiveUser, likeHouse);
router.get("/:houseId/suggested", getSuggestedHouses);

router
  .route("/:id")
  .get(getHouse)
  .put(isAuthorized, isActiveUser, updateHouse)
  .delete(isAuthorized, isActiveUser, deleteHouse);

module.exports = router;
