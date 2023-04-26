const POST_VERIFICATION_SERVICE = require("../Services/postVerification");

const verify = async (req, res) => {
  console.log(req.params);
  const response = await POST_VERIFICATION_SERVICE.verifyPost(req.params);
  res.status(200).send(response);
};

module.exports = { verify };
