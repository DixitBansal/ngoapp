const db = require("../DB/connection");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { config } = require("dotenv");

const signUp = async (userData) => {
  console.log("signup");
  console.log("data=", userData);
  const {
    username,
    password,
    phone,
    email,
    city,
    state,
    blood_group,
    is_volunteer,
    address,
    acc_type,
  } = userData;

  let res = {};
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = new User({
    username,
    password: hashedPassword,
    phone,
    email,
    city,
    state,
    blood_group,
    address,
    acc_type,
    is_volunteer,
  });
  const result = await user.createUser();
  console.log("result=", result);
  if (result > 0) {
    res = {
      success: true,
      message: "user Added successfully.",
    };
  } else {
    res = {
      success: false,
      message: "Something went wrong.",
    };
  }
  return res;
};

const updateProfile = async (userData) => {
  const {
    username,
    password,
    email,
    city,
    state,
    blood_group,
    is_volunteer,
    address,
    acc_type,
    userId,
  } = userData;

  let response = {};
  const hashedPassword = await bcrypt.hash(password, 8);
  const { rowCount } = await db.query(
    `UPDATE users SET username=$1,password=$2,email=$3,city=$4,state=$5,blood_group=$6,is_volunteer=$7,address=$8,acc_type=$9,updated_at=now()
  where id=$10`,
    [
      username,
      hashedPassword,
      email,
      city,
      state,
      blood_group,
      is_volunteer,
      address,
      acc_type,
      userId,
    ]
  );
  if (rowCount > 0) {
    const updatedData = await getUserDetails(id, undefined);
    if (updatedData.success) {
      response = {
        success: true,
        message: "user updated successfully.",
        data: updatedData.data,
      };
    }
  } else {
    response = {
      success: false,
      message: "Something went wrong.",
    };
  }
  return response;
};

const UpdatePass = async (data) => {
  const phone = data.phone;
  const newpass = data.pass;
  const hashedPassword = await bcrypt.hash(newpass, 8);
  let res = {};
  const { rowCount } = await db.query(
    `UPDATE users SET password = $1 WHERE phone=$2`,
    [hashedPassword, phone]
  );
  console.log(rowCount);
  if (rowCount >= 1) {
    res = {
      success: true,
      message: "password updated successfully",
    };
  } else {
    res = {
      success: false,
      message: "Something went wrong.",
    };
  }
  return res;
};

const getUserDetails = async (id, phone) => {
  let userdata = {};
  if (phone) {
    userdata = await db.query(`SELECT * FROM users WHERE phone=$1`, [phone]);
  } else {
    userdata = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
  }
  let response = {};

  if (userdata.rows.length > 0) {
    response = {
      success: true,
      data: userdata.rows[0],
      message: "Data found",
    };
  } else {
    response = {
      success: false,
      message: "Data not found",
    };
  }
  return response;
};

module.exports = { signUp, UpdatePass, getUserDetails, updateProfile };