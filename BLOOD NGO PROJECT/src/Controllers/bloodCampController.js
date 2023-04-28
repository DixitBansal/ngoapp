const BLOOD_CAMP_SERVICE = require("../Services/bloodCampService");

const viewCamps = async (req, res) => {
  const response = await BLOOD_CAMP_SERVICE.viewallBoodCamp(req.query);
  res.status(200).send(response);
};
const addBloodCamp = async (req, res) => {
  const response = await BLOOD_CAMP_SERVICE.addBloodCamp(req.body);
  res.status(200).send(response);
};
const editCampDetails = async (req, res) => {
  const response = await BLOOD_CAMP_SERVICE.editBCampDEtails(req.body);
  res.status(200).send(response);
};
const deleteBCamp = async (req, res) => {
  const response = await BLOOD_CAMP_SERVICE.deleteBCamp(req.query);
  res.status(200).send(response);
};
module.exports = { viewCamps, addBloodCamp, editCampDetails, deleteBCamp };
