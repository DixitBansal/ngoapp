const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  // Fetching the secret keys from AWS secret manager
  const jwtSecret = "&5vigkgkjDKhkhdkjfhds@6&*&97";

  const expiresIn = 60 * 60 * 24; // 1 day
  return jwt.sign({ ...user }, jwtSecret, { expiresIn });
};

module.exports = { createToken };
