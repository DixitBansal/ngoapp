const AuthService = require("../Services/authService");

const userLogin = async (req, res) => {
  const response = await AuthService.login(req.body);
  res.status(200).send(response);
};

const signup = async (req, res) => {
  const response = await AuthService.signup(req.body);
  res.status(200).send(response);
};

const signupVerification = async (req, res) => {
  const response = await AuthService.signupVerification(req.body);
  res.status(200).send(response);
};

const OTPVerify = async (req, res) => {
  const response = await AuthService.OTPVerify(req.body);
  res.status(200).send(response);
};

const checkPhone = async (req, res) => {
  const checkphone = await AuthService.checkPhoneExist(req.query.phone);
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
  const response = await AuthService.ForgotPassOTP(req.body.phone);
  res.status(200).send(response);
};

const resetPassword = async (req, res) => {
  const response = await AuthService.resetPassword(req.body);
  res.status(200).send(response);
};

const resendOTP = async (req, res) => {
  const response = await AuthService.resendOTP(req.body);
  res.status(200).send(response);
};

module.exports = {
  OTPforgotPass,
  checkPhone,
  OTPVerify,
  signup,
  userLogin,
  signupVerification,
  resendOTP,
  resetPassword,
};
