const db = require("../DB/connection");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { config } = require("dotenv");
const { TWILIO_CHANNEL } = require("../utils/constant");
const { createToken } = require("../middlewares/generate");
const { getUserDetails } = require("./userService");

const checkPhoneExist = async (phone) => {
  let response = {};

  const { rows } = await db.query(`SELECT * FROM USERS WHERE phone=$1`, [
    phone,
  ]);
  console.log(rows[0]);
  if (rows[0] != undefined) {
    response = {
      success: true,
      data: rows[0],
    };
  } else {
    response = {
      success: false,
    };
  }
  return response;
};

const login = async (data) => {
  const { phone, password, acc_type } = data;
  // const phone=req.query.phone;
  // const password=req.query.password;
  console.log(phone, password);
  console.log(acc_type);
  const { rows } = await db.query(
    `SELECT * FROM USERS WHERE phone=$1 AND acc_type=$2`,
    [phone.trim(), acc_type.trim()]
  );
  // console.log("rows=",rows[0].id);
  const usersData = rows[0];
  console.log("usersdata=", usersData);
  let res = {};

  if (usersData) {
    // match password
    const isPasswordMatch = await bcrypt.compare(
      password.trim(),
      usersData.password ? usersData.password : ""
    );
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>isPasswordMatch", isPasswordMatch);

    if (isPasswordMatch) {
      const token = await createToken(usersData);

      res = {
        success: true,
        message: "User Log in successfully.",
        data: { ...usersData, token },
      };
    } else {
      res = {
        success: false,
        message: "Incorrect password.",
      };
    }
  } else {
    res = {
      success: false,
      message: `No User found with phone number ${phone}.`,
      status: 404,
    };
  }
  return res;
};

const sendOTP = async (phone) => {
  let res = {};
  const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
  const client = require("twilio")(accountSid, authToken);
  await client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: "+91" + phone,
      channel: TWILIO_CHANNEL,
    })
    .then((verification) => {
      console.log(verification);
      res["verification"] = verification;
    });
  res = { ...res, message: "OTP sent Successdfully", success: true };
  return res;
};

const OTPVerify = async (data) => {
  const { phone, code } = data;
  const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
  const client = require("twilio")(accountSid, authToken);
  let response = {};
  let verification_status = false;
  await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: "+91" + phone, code: code })
    .then((verification_check) => {
      verification_status = verification_check.valid;
    });
  console.log(verification_status);
  if (verification_status) {
    response = { verification_status, message: "User verified" };
  } else {
    response = {
      msg: "incorrect otp try again",
      verification_status,
    };
  }
  return response;
};

const signup = async (data) => {
  console.log("data=", data);
  const { phone } = data;
  const exist = await checkPhoneExist(phone);
  console.log(exist);
  if (exist.success && exist.data.password !== null) {
    const response = {
      success: false,
      message: "User already Exists try with different account",
    };
    return response;
  } else {
    const response = await sendOTP(phone);
    return response;
  }
};

const signupVerification = async (data) => {
  const { phone } = data;
  let response = {};
  const result = await OTPVerify(data);
  if (result.verification_status) {
    // grt uder by phone no
    const user = await getUserDetails(undefined, phone);
    // iof useer does not exist then creat otherwise skip create
    let isUserCreated = false;
    if (!user.success) {
      const { rowCount, rows } = await db.query(
        `INSERT INTO users(username,password,phone,email,city,state,blood_group,address,is_volunteer,acc_type,is_active,created_at,updated_at) VALUES (DEFAULT,DEFAULT,${phone},DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,'user',true,now(),DEFAULT)`
      );
      isUserCreated = !!rowCount;
    } else {
      isUserCreated = true;
    }

    if (isUserCreated) {
      const userData = await getUserDetails(undefined, phone);
      if (userData.success) {
        const token = await createToken(userData.data);
        response = {
          data: { token, ...userData.data },
          msg: "ACccount created Successfully",
          success: true,
        };
      }
    } else {
      response = {
        msg: "error while creating account try again later!",
        success: false,
      };
    }
    return response;
  } else {
    return result;
  }
};

const ForgotPassOTP = async (phone) => {
  const exist = await checkPhoneExist(phone);
  let response = {};
  if (exist) {
    response = await sendOTP(phone);
  } else {
    response = {
      success: false,
      message: "account not found",
    };
  }
  return response;
};
const resendOTP = async (data) => {
  const { phone } = data;
  let response = {};
  const result = await sendOTP(phone);
  if (result.success) {
    response = {
      msg: "OTP sent successfully",
      data: result,
    };
  } else {
    response = {
      msg: "OTP cant sent due to some problem,try again!",
      success: false,
    };
  }
  return response;
};

const resetPassword = async (data) => {
  const { phone, code, password } = data;
  const hashedPassword = await bcrypt.hash(password, 8);
  const result = await OTPVerify(data);
  let response = {};
  if (result.verification_status) {
    const { rowCount } = await db.query(
      `UPDATE users SET password=$1,updated_at=now() where phone=$2`,
      [hashedPassword, phone]
    );
    if (rowCount > 0) {
      response = {
        message: "password reset successfully",
        success: true,
      };
    } else {
      response = {
        message: "some problem occured while resetting password!",
        success: false,
      };
    }
    return response;
  } else {
    return result;
  }
};

module.exports = {
  login,
  checkPhoneExist,
  sendOTP,
  signup,
  OTPVerify,
  ForgotPassOTP,
  signupVerification,
  resendOTP,
  resetPassword,
};
