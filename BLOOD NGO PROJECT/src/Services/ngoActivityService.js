const db = require("../DB/connection");
const { ACCOUNT_TYPES } = require("../utils/constant");

const ngoPosts = async (data) => {
  console.log("limit=", data.limit);
  console.log("offset=", data.offset);
  const limit = parseInt(data.limit) || 10; // default limit is 10
  const offset = parseInt(data.offset) || 0; // default offset is 0
  const { acc_type } = data;
  let response = {};
  try {
    let postsData = {};
    if (acc_type == ACCOUNT_TYPES.USER) {
      postsData = await db.query(
        "SELECT * FROM ngo_activity_posts Where is_verified=true ORDER BY updated_at DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );
    } else if (acc_type == ACCOUNT_TYPES.ADMIN) {
      postsData = await db.query(
        `SELECT *
            FROM ngo_activity_posts p
            INNER JOIN users u
            ON u.id = p.created_by
            ORDER BY is_verified DESC
            LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    } else {
      response = {
        message: "Sorry you are not authorized!",
        success: false,
      };
      return false;
    }
    const posts = postsData.rows;
    console.log("posts=", posts);
    if (posts.length > 0) {
      response = {
        success: true,
        data: { ngoPosts: posts },
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

const postDetails = async (postId) => {
  let response = {};
  const { rows } = await db.query(
    "select * from ngo_activity_posts where post_id=$1",
    [postId]
  );
  if (rows.length > 0) {
    response = {
      msg: "Data Found",
      data: { post_details: rows },
      success: true,
    };
  } else {
    response = {
      msg: "some error occured in finding data!",
      success: false,
    };
  }
  return response;
};

module.exports = { ngoPosts, postDetails };
