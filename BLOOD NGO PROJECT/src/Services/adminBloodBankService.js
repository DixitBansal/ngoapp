const db = require("../DB/connection");

const viewallBoodBank = async (data) => {
  let { limit = 10, offset = 0 } = data;
  limit = +limit;
  offset = +offset;

  const { rows } = await db.query(
    "SELECT * FROM blood_source ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  let response = {};
  if (rows && rows.length > 0) {
    response = {
      success: true,
      data: { bloodSource: rows },
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

const addBloodBank = async (data) => {
  const {
    src_type,
    src_name,
    category,
    src_contact,
    src_email,
    src_license,
    district,
    state,
    pincode,
    avail_bloods,
    address,
    is_active,
  } = data;

  const { rowCount } = await db.query(
    "INSERT INTO blood_source (src_type,src_name,category,src_contact,src_email,src_license,district,state,pincode,avail_bloods,created_at,updated_at,address,is_active) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,now(),DEFAULT,$11,$12)",
    [
      src_type,
      src_name,
      category,
      src_contact,
      src_email,
      src_license,
      district,
      state,
      pincode,
      avail_bloods,
      address,
      is_active,
    ]
  );

  // console.log(rows);
  let response = {
    msg: "data not added",
    success: false,
  };

  if (rowCount > 0) {
    response = {
      msg: "blood-bank added successfully",
      success: "true",
    };
  }
  return response;
};

const editBBDEtails = async (data) => {
  const {
    src_id,
    src_type,
    src_name,
    category,
    src_contact,
    src_email,
    src_license,
    district,
    state,
    pincode,
    avail_bloods,
    address,
    is_active,
  } = data;
  const { rowCount } = await db.query(
    "UPDATE blood_source SET src_name=$1,category=$2,src_contact=$3,src_email=$4,src_license=$5,district=$6,state=$7,pincode=$8,avail_bloods=$9,address=$10,is_active=$11, src_type=$12,updated_at=now() WHERE src_id=$13",
    [
      src_name,
      category,
      src_contact,
      src_email,
      src_license,
      district,
      state,
      pincode,
      avail_bloods,
      address,
      is_active,
      src_type,
      src_id,
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
