const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

const getstates = async () => {
  let response = {};
  try {
    const data = await readFileAsync("src/utils/states.json", "utf8");
    const jsonData = JSON.parse(data);
    response = {
      data: { states: jsonData },
      success: true,
    };
  } catch (err) {
    console.error(err);
    response = {
      message: err,
      success: false,
    };
  }
  return response;
};
const getdistrict = async (state) => {
  let response = {};

  try {
    const data = await readFileAsync("src/utils/districts.json", "utf8");
    const jsonData = JSON.parse(data);
    response = {
      data: { districts: jsonData[state] },
      success: true,
    };
  } catch (err) {
    console.error(err);
    response = {
      message: err,
      success: false,
    };
  }
  return response;
};
module.exports = { getstates, getdistrict };
