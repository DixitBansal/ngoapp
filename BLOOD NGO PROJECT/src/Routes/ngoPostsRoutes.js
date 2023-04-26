const express = require("express");
const NGO_POSTS_CONTROLLER = require("../Controllers/ngoPostsController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const ngoPostsRoutes = express.Router();

ngoPostsRoutes.post(
  "/create",
  Auth,
  HandleErrors(NGO_POSTS_CONTROLLER.createPost)
);

ngoPostsRoutes.get(
  "/posts",
  Auth,
  HandleErrors(NGO_POSTS_CONTROLLER.employeePosts)
);

ngoPostsRoutes.put("/edit", Auth, HandleErrors(NGO_POSTS_CONTROLLER.editPost));
module.exports = { ngoPostsRoutes };
