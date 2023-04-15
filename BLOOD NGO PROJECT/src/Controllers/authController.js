const AuthService = require("../Services/authService");

const userLogin = async (req, res) => {
  const response = await AuthService.login(req);
  res.status(200).send(response);
};

const signup = async (req, res) => {
  const response = await AuthService.signup(req);
  res.status(200).send(response);
};

const OTPVerify = async (req, res) => {
  const response = await AuthService.OTPVerify(req.query);
  res.status(200).send(response);
};
const checkPhone = async (req, res) => {
  const checkphone = await AuthService.checkPhoneExist(req);
  if (checkphone) {
    const response = {
      message: "exists",
      success: true,
    };
    res.status(200).send(response);
  } else {
    const response = {
      message: "not found",
      success: false,
    };
    res.status(404).send(response);
  }
};

const OTPforgotPass = async (req, res) => {
  const response = await AuthService.ForgotPassOTP(req);
  res.status(200).send(response);
};

module.exports = { OTPforgotPass, checkPhone, OTPVerify, signup, userLogin };
