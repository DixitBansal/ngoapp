const express = require("express");
const POST_VERIFICATION_CONTROLLER = require("../Controllers/postVerficationController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
const postVerificationRoutes = express.Router();

postVerificationRoutes.put(
  "/verify/:postId/:is_verified",
  Auth,
  HandleErrors(POST_VERIFICATION_CONTROLLER.verify)
);

module.exports = { postVerificationRoutes };
