const db = require("../DB/connection");
const { response } = require("./userService");

const createPost = async (data) => {
  const { userId, content, image_url } = data;
  let response = {};

  const { rowCount } = await db.query(
    "INSERT INTO ngo_activity_posts(content,image_url,created_at,updated_at,created_by,is_verified) values($1,$2,now(),now(),$3,DEFAULT)",
    [content, image_url, userId]
  );
  if (rowCount > 0) {
    response = {
      msg: "Post Uploaded Successfully",
      success: true,
    };
  } else {
    response = {
      msg: "some error occured while uploading!",
      success: false,
    };
  }
  return response;
};

const editPost = async (data) => {
  const { postId, userId, content, image_url } = data;
  let response = {};
  const { rowCount } = await db.query(
    "UPDATE ngo_activity_posts SET content=$1,image_url=$2, updated_at=now() where post_id=$3 AND created_by=$4",
    [content, image_url, postId, userId]
  );
  if (rowCount > 0) {
    response = {
      msg: "post edited successfully",
      success: true,
    };
  } else {
    response = {
      msg: "some error occured while editing!",
      success: false,
    };
  }
  return response;
};

const employeePosts = async (data) => {
  console.log("limit=", data.limit);
  console.log("offset=", data.offset);
  const limit = parseInt(data.limit) || 10; // default limit is 10
  const offset = parseInt(data.offset) || 0; // default offset is 0
  const { eid } = data;
  console.log(eid);
  let response = {};
  try {
    const { rows } = await db.query(
      "SELECT * FROM ngo_activity_posts Where created_by=$3 ORDER BY updated_at DESC LIMIT $1 OFFSET $2",
      [limit, offset, eid]
    );

    if (rows.length > 0) {
      response = {
        success: true,
        data: { employee_posts: rows },
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

module.exports = { createPost, employeePosts, editPost };
