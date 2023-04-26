const db = require("../DB/connection");
const bcrypt = require("bcryptjs");
const { ACCOUNT_TYPES } = require("../utils/constant");
const { getUserDetails } = require("./userService");

const viewallEmployee = async (params) => {
  const limit = parseInt(params.limit) || 10; // default limit is 10
  const offset = parseInt(params.offset) || 0; // default offset is 0
  try {
    const { rows } = await db.query(
      "SELECT * FROM users where acc_type=$3 ORDER BY updated_at DESC LIMIT $1 OFFSET $2",
      [limit, offset, ACCOUNT_TYPES.EMPLOYEE]
    );
    let response = {};
    const data = rows;
    if (data.length > 0) {
      response = {
        success: true,
        data: data,
        message: "Data found",
      };
      return response;
    } else {
      response = {
        success: false,
        message: "Data not found",
      };
      return response;
    }
  } catch (err) {
    return (response = {
      message: err.message,
    });
  }
};

const getEmployeeDetails = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM users where acc_type=$1 AND id=$2",
      [ACCOUNT_TYPES.EMPLOYEE, id]
    );
    let response = {};
    const data = rows;
    if (data.length > 0) {
      response = {
        success: true,
        data: data,
        message: "Data found",
      };
      return response;
    } else {
      response = {
        success: false,
        message: "Data not found",
      };
      return response;
    }
  } catch (err) {
    return (response = {
      message: err.message,
    });
  }
};

const addEmployee = async (userData) => {
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
  } = userData;

  let res = {};
  const hashedPassword = await bcrypt.hash(password, 8);

  const { rowCount } = await db.query(
    "INSERT INTO users(username,password,phone,email,city,state,blood_group,is_volunteer,address,acc_type,is_active,created_at,updated_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true,now(),DEFAULT)",
    [
      username,
      hashedPassword,
      phone,
      email,
      city,
      state,
      blood_group,
      is_volunteer,
      address,
      ACCOUNT_TYPES.EMPLOYEE,
    ]
  );
  console.log("result=", rowCount);
  if (rowCount > 0) {
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

const deleteEmployee = async (params) => {
  const { id } = params;
  const { rowCount } = await db.query("DELETE FROM users where id=$1", [id]);
  let response = {};
  if (rowCount > 0) {
    response = {
      msg: "Employee deleted successfully",
      success: "true",
    };
  } else {
    response = {
      msg: "something went wrong",
      success: false,
    };
  }
  return response;
};

const editEmployee = async (data) => {
  const {
    username,
    email,
    city,
    state,
    blood_group,
    is_volunteer,
    address,
    userId,
    is_active,
    phone,
  } = data;

  let response = {};
  const { rowCount } = await db.query(
    `UPDATE users SET username=$1,is_active=$2,email=$3,city=$4,state=$5,blood_group=$6,is_volunteer=$7,address=$8,acc_type=$9,phone=$11,updated_at=now()
      where id=$10`,
    [
      username,
      is_active,
      email,
      city,
      state,
      blood_group,
      is_volunteer,
      address,
      ACCOUNT_TYPES.EMPLOYEE,
      userId,
      phone,
    ]
  );
  if (rowCount > 0) {
    const updatedData = await getUserDetails(userId, undefined);
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

module.exports = {
  viewallEmployee,
  deleteEmployee,
  addEmployee,
  getEmployeeDetails,
  editEmployee,
};
