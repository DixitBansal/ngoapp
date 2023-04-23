const express = require("express");
const userController = require("../Controllers/userController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const userRoutes = express.Router();

userRoutes.put(
  "/update-user-profile",
  Auth,
  HandleErrors(userController.updateProfile)
);

userRoutes.put("/update-pass", Auth, HandleErrors(userController.updatePass));

userRoutes.get(
  "/get-user-data",
  Auth,
  HandleErrors(userController.getUserData)
);

userRoutes.post(
  "/pre-signed-url",
  Auth,
  HandleErrors(userController.getPresignedURL)
);

module.exports = { userRoutes };
