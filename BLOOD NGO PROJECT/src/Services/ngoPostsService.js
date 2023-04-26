const db = require("../DB/connection");
const { getPresignedURL } = require("./userService");
const createPost = async (data) => {
  const { userId, content } = data;
  let response = {};
  const result = await getPresignedURL(data);
  if (result.success) {
    const { rowCount } = await db.query(
      "INSERT INTO ngo_activity_posts(content,image_url,created_at,updated_at,created_by,is_verified) values($1,$2,now(),now(),$3,DEFAULT)",
      [content, result.data, userId]
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
  }
  return result;
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
        data: rows,
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

module.exports = { createPost, employeePosts };
