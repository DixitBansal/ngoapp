const db = require("../DB/connection");
const dotenv = require("dotenv");
dotenv.config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { response } = require("express");
const moment = require("moment/moment");
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  bucket_name: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
};
const s3 = new AWS.S3(awsConfig);

const bloodAvailData = async (data) => {
  const limit = parseInt(data.limit) || 20; // default limit is 10
  const offset = parseInt(data.offset) || 0; // default offset is 0
  console.log("limit=", limit);
  const { state, district, pincode = undefined, blood_group } = data;
  let result = {};
  if (pincode) {
    result = await db.query(
      `SELECT * FROM blood_source WHERE $1 ILIKE ANY (avail_bloods) AND state ILIKE $2 AND district ILIKE $3 AND pincode=$4 LIMIT $5 OFFSET $6`,
      [blood_group, state, district, pincode, limit, offset]
    );
  } else {
    result = await db.query(
      `SELECT * FROM blood_source WHERE $1 ILIKE ANY (avail_bloods) AND state ILIKE $2 AND district ILIKE $3 LIMIT $4 OFFSET $5`,
      [blood_group, state, district, limit, offset]
    );
  }
  const { rows } = result;
  let response = {};
  if (rows.length > 0) {
    response = {
      success: true,
      data: { blood_avail_data: rows },
      message: "Data found",
    };
  } else {
    response = {
      success: false,
      message: "Not Available",
    };
  }
  return response;
};

const bloodCampData = async (data) => {
  const limit = parseInt(data.limit) || 20; // default limit is 10
  const offset = parseInt(data.offset) || 0; // default offset is 0
  console.log("limit=", limit);
  const { state, district, start_date, end_date } = data;
  const from_date = moment(start_date).format("YYYY-MM-DD").toString();
  const to_date = moment(end_date).format("YYYY-MM-DD").toString();
  console.log("s ", from_date);
  const { rows } = await db.query(
    `select * from donation_camp where camp_state ILIKE $1 AND camp_district ILIKE $2 AND date >= $3 AND date <= $4 LIMIT $5 OFFSET $6`,
    [state, district, from_date, to_date, limit, offset]
  );
  let response = {};
  if (rows.length > 0) {
    response = {
      success: true,
      data: { campData: rows },
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

const volunteer_req_data = async (req) => {
  const user_id = req.query.uid;

  const uploadToS3 = (filedata) => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now().toString()}-${filedata.originalname}`,
        Body: filedata.buffer,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(data);
        resolve(data);
      });
    });
  };
  let response = {};
  let image_array = [];

  if (req.files && req.files.length > 0) {
    console.log(req.files);
    for (let i = 0; i < req.files.length; i++) {
      await uploadToS3(req.files[i])
        .then((result) => {
          image_array.push(result.Location);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const { rows } = await db.query(
      "INSERT INTO volunteer_requests(ngo_certificate,aadhar,pan,user_id) VALUES ($1, $2, $3,$4)",
      [image_array[0], image_array[1], image_array[2], user_id]
    );
    if (rows >= 0) {
      response = {
        msg: "images uploaded successfully",
      };
    } else {
      response = {
        msg: "something went wrong",
        success: false,
      };
    }
  }

  return response;
};

module.exports = { bloodAvailData, bloodCampData, volunteer_req_data };
