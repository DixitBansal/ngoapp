const NGO_ACTIVITY_SERVICE = require("../Services/ngoActivityService");
const ngoPosts = async (req, res) => {
  const data = { ...req.query, acc_type: req.acc_type };
  console.log(data);
  const response = await NGO_ACTIVITY_SERVICE.ngoPosts(data);
  res.status(200).send(response);
};
module.exports = { ngoPosts };
