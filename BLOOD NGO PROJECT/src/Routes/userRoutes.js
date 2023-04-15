const express = require("express");

const userController = require("../Controllers/userController");
const { HandleErrors } = require("../middlewares/handleError");
const userRoutes = express.Router();
userRoutes.post("/add-user-profile", HandleErrors(userController.userSignup));
userRoutes.put("/updatepass", HandleErrors(userController.updatePass));
userRoutes.get("/getuserdata", HandleErrors(userController.getUserData));

module.exports = { userRoutes };
