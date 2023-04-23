const express = require("express");
const NGO_POSTS_CONTROLLER = require("../Controllers/ngoPostsController");
const { HandleErrors } = require("../middlewares/handleError");
const ngoPostsRoutes = express.Router();

ngoPostsRoutes.get(
  "/getPosts",
  HandleErrors(NGO_POSTS_CONTROLLER.viewallPosts)
);

module.exports = { ngoPostsRoutes };
