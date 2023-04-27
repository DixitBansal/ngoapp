const express = require("express");
const NGO_ACTIVITY_CONTROLLER = require("../Controllers/ngoActivityController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const ngoActivityRoutes = express.Router();

ngoActivityRoutes.get(
  "/all-posts",
  Auth,
  HandleErrors(NGO_ACTIVITY_CONTROLLER.ngoPosts)
);

ngoActivityRoutes.get(
  "/post/:postId",
  Auth,
  HandleErrors(NGO_ACTIVITY_CONTROLLER.postDetails)
);

module.exports = { ngoActivityRoutes };
