const express = require("express");
const {
  getHouse,
  getAllHouses,
  createHouse,
  deleteHouse,
  updateHouse,
  likeHouse,
  hideHouse,
  getOwnHouses,
  getSuggestedHouses,
  getTrendHouses,
  blockHouse,
  getAllConfirmedHouses,
} = require("../controllers/house");

const router = express.Router();

const {
  isAuthorized,
  isActiveUser,
  authorize,
} = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getAllConfirmedHouses)
  .post(isAuthorized, isActiveUser, createHouse);

router
  .route("/all")
  .get(
    isAuthorized,
    isActiveUser,
    authorize("super_admin", "admin"),
    getAllHouses
  );

router.route("/me").get(isAuthorized, isActiveUser, getOwnHouses);

router.patch("/like/:id", isAuthorized, isActiveUser, likeHouse);
router.patch("/hide/:id", isAuthorized, isActiveUser, hideHouse);
router.get("/suggested/by_region", getSuggestedHouses);
router.get("/trend", getTrendHouses);

router
  .route("/:id")
  .get(getHouse)
  .patch(isAuthorized, isActiveUser, blockHouse)
  .put(isAuthorized, isActiveUser, updateHouse)
  .delete(isAuthorized, isActiveUser, deleteHouse);

module.exports = router;
