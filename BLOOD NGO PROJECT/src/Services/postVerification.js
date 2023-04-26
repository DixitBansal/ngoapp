const db = require("../DB/connection");

const verifyPost = async (data) => {
  const { postId, is_verified } = data;
  const { rowCount } = await db.query(
    "UPDATE ngo_activity_posts SET is_verified=$1 where post_id = $2",
    [is_verified, postId]
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

module.exports = { verifyPost };
