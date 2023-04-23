const User = require("../models/user");
const UserService = require("../Services/userService");

const updatePass = async (req, res) => {
  const response = await UserService.UpdatePass(req.query);
  res.status(200).send(response);
};

const getUserData = async (req, res) => {
  // console.log(req.userId);
  let user_id = "";
  req.acc_type == "user"
    ? (user_id = req.userId)
    : (user_id = req.query.user_id);
  const response = await UserService.getUserDetails(user_id, undefined);
  res.status(200).send(response);
};

const updateProfile = async (req, res, next) => {
  const response = await UserService.updateProfile({
    ...req.body,
    userId: req.userId,
    acc_type: req.acc_type,
  });
  console.log("response=", response);
  res.send(response);
};
module.exports = { updateProfile, updatePass, getUserData };
