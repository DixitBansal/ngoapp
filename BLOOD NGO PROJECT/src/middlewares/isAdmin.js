const { ACCOUNT_TYPES } = require("../utils/constant");

const isAdmin = (req, res, next) => {
  if (req.userId && req.acc_type === ACCOUNT_TYPES.ADMIN) {
    next();
  } else {
    // User is not an admin, return an error response
    res
      .status(401)
      .json({ message: "You are not authorized to perform this action." });
  }
};
module.exports = { isAdmin };
