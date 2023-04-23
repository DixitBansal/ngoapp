const jwt = require("jsonwebtoken");
const { ACCOUNT_TYPES } = require("../utils/constant");

/**
 * @description - This function is used to authenticate a http request by JWT token.
 * @param request Standard http request object
 * @param response Standard http response object
 * @param next Standard next function
 */
const Auth = async (request, response, next) => {
  let token = request.get("authorization");

  token = token?.split(" ")[1];
  console.log(">>>>>>>>>>>token", token);

  try {
    // Fetching the secret keys from AWS secret manager
    const jwtSecret = "&5vigkgkjDKhkhdkjfhds@6&*&97";

    if (token) {
      const verify = jwt.verify(token, jwtSecret);

      console.log(">>>>>>>>>>>verify", verify);

      if (verify) {
        request["userId"] = verify.id;
        request["acc_type"] = verify.acc_type;
        next();
      }
    } else {
      response.status(401).send({
        message: "session_expired",
        success: false,
        error: "token-expired",
      });
    }
  } catch (error) {
    console.log("Error in verifying auth token", error);
    response.status(401).send({
      message: "session_expired",
      success: false,
      error: "token-expired",
    });
  }
};

const isAdmin = async (request, response, next) => {
  try {
    if (request.acc_type === ACCOUNT_TYPES.ADMIN) {
      next();
    } else {
      response.status(401).send({
        message: "Unauthorized",
        success: false,
        error: "unauthorized_user",
      });
    }
  } catch (error) {
    console.error("role-----", error);
    response.status(401).send({
      message: "something_went_wrong",
      success: false,
    });
  }
};

module.exports = Auth;
