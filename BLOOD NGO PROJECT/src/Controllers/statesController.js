const { getstates, getdistrict } = require("../Services/states");

const getStates = async (req, res) => {
  const response = await getstates();
  res.status(200).send(response);
};
const getdistricts = async (req, res) => {
  const response = await getdistrict(req.query.state);
  res.status(200).send(response);
};
module.exports = { getStates, getdistricts };
