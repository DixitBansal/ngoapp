const db = require("../DB/connection");

const viewallBoodBank = async (params) => {
  let { limit = 10, offset = 0 } = params;
  limit = +limit;
  offset = +offset;

  const { rows } = await db.query(
    "SELECT * FROM blood_bank ORDER BY blood_bank_id DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  let response = {};
  if (rows && rows.length > 0) {
    response = {
      success: true,
      data: rows,
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

const addBloodBank = async (params) => {
  const {
    blood_bank_name,
    b_category,
    b_contact,
    b_email,
    b_license_no,
    district,
    state,
    pincode,
  } = params;

  const { rowCount } = await db.query(
    "INSERT INTO blood_bank (blood_bank_name,b_category,b_contact,b_email,b_license_no,district,state,pincode) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)",
    [
      blood_bank_name.toLowerCase(),
      b_category.toLowerCase(),
      b_contact,
      b_email,
      b_license_no,
      district.toLowerCase(),
      state.toLowerCase(),
      pincode,
    ]
  );

  const rows = rowCount;
  // console.log(rows);
  let response = {
    msg: "data not added",
    success: false,
  };

  if (rows > 0) {
    response = {
      msg: "blood-bank added successfully",
      success: "true",
    };
  }
  return response;
};

const editBBDEtails = async (params) => {
  const {
    blood_bank_id,
    blood_bank_name,
    b_category,
    b_contact,
    b_email,
    b_license_no,
    district,
    state,
    pincode,
  } = params;
  const { rowCount } = await db.query(
    "UPDATE blood_bank SET blood_bank_name=$1,b_category=$2,b_contact=$3,b_email=$4,b_license_no=$5,district=$6,state=$7,pincode=$8 WHERE blood_bank_id=$9",
    [
      blood_bank_name,
      b_category,
      b_contact,
      b_email,
      b_license_no,
      district,
      state,
      pincode,
      blood_bank_id,
    ]
  );
  let response = {};
  if (rowCount > 0) {
    response = {
      msg: "blood-bank updated successfully",
      success: "true",
    };
    return response;
  } else {
    response = {
      msg: "something went wrong",
      success: false,
    };
    return response;
  }
};

const deleteBBdetails = async (params) => {
  const { blood_bank_id } = params;

  // do not delete from db ever, use soft delete
  const { rowCount } = await db.query(
    "DELETE FROM blood_bank where blood_bank_id=$1",
    [blood_bank_id]
  );
  let response = {};
  if (rowCount > 0) {
    response = {
      msg: "blood-bank deleted successfully",
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

const updateBloodDetails = async (data, bbid) => {
  const { rowCount } = await db.query(`UPDATE blood_stock bs
    SET b_avail = CASE
         WHEN b.blood_group = 'AB+' THEN ${data.ABp}
         WHEN b.blood_group = 'AB-' THEN ${data.ABn}
         WHEN b.blood_group = 'O+' THEN ${data.Op}
         WHEN b.blood_group = 'O-' THEN ${data.On}
         WHEN b.blood_group = 'A+' THEN ${data.Ap}
         WHEN b.blood_group = 'A-' THEN ${data.An}
         WHEN b.blood_group = 'B+' THEN ${data.Bp}
         WHEN b.blood_group = 'B-' THEN ${data.Bn}
        ELSE false
    END
    FROM blood b
    WHERE b.blood_id = bs.blood_id
    AND b.blood_bank_id = ${bbid}
    AND b.blood_group IN ('O+', 'O-','AB+','AB-','B+','B-','A+','A-')`);
  let response = {};
  if (rowCount > 0) {
    response = {
      msg: "blood-details updated successfully",
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

module.exports = {
  viewallBoodBank,
  addBloodBank,
  editBBDEtails,
  deleteBBdetails,
  updateBloodDetails,
};
