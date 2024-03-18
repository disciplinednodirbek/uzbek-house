const express = require("express");
const {
  getBlog,
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getTags,
  likeBlog,
  getTrendBlogs,
  getSuggestedBlogs,
} = require("../controllers/blog");

const router = express.Router();

const {
  isAuthorized,
  isActiveUser,
  authorize
} = require("../middlewares/routeProtect");

router.route("/").get(getBlogs).post(isAuthorized,authorize('admin','super_admin'), isActiveUser, createBlog);

router.patch("/like/:id", isAuthorized, isActiveUser, likeBlog);
router.get("/tags", getTags);
router.get("/trend", getTrendBlogs);
router.get("/:blogId/suggested", getSuggestedBlogs);

router
  .route("/:id")
  .get(getBlog)
  .put(isAuthorized, isActiveUser, updateBlog)
  .delete(isAuthorized, isActiveUser, deleteBlog);

module.exports = router;
