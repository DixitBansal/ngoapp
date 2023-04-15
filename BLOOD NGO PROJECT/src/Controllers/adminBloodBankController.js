const ADMIN_BLOOD_BANK_SERVICE = require("../Services/adminBloodBankService");

const viewallBoodBank = async (req, res) => {
  const response = await ADMIN_BLOOD_BANK_SERVICE.viewallBoodBank(req.query);
  res.status(200).send(response);
};
const addBloodBank = async (req, res) => {
  const resposne = await ADMIN_BLOOD_BANK_SERVICE.addBloodBank(req.body);
  res.status(200).send(resposne);
};
const updatedetails = async (req, res) => {
  const response = await ADMIN_BLOOD_BANK_SERVICE.editBBDEtails(req.body);
  res.status(200).send(response);
};
const deleteDetails = async (req, res) => {
  const response = await ADMIN_BLOOD_BANK_SERVICE.deleteBBdetails(req.query);
  res.status(200).send(response);
};
const update_BloodDetails = async (req, res) => {
  const response = await ADMIN_BLOOD_BANK_SERVICE.updateBloodDetails(
    req.body,
    req.params.bbid
  );
  res.status(200).send(response);
};

module.exports = {
  viewallBoodBank,
  addBloodBank,
  updatedetails,
  deleteDetails,
  update_BloodDetails,
};
