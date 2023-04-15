const jwt = require("jsonwebtoken");

/**
 * @description - This function is used to authenticate a http request by JWT token.
 * @param request Standard http request object
 * @param response Standard http response object
 * @param next Standard next function
 */
const Auth = async (request, response, next) => {
  let token = request.headers["auth"];

  token = token?.split(" ")[1];
  console.log(">>>>>>>>>>>token", token);

  try {
    // Fetching the secret keys from AWS secret manager
    const jwtSecret = "&5vigkgkjDKhkhdkjfhds@6&*&97";

    if (token) {
      const verify = jwt.verify(token, jwtSecret);

      console.log(">>>>>>>>>>>verify", verify);

      if (verify) {
        request["id"] = verify._id;
        request["token"] = token;
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

module.exports = Auth;
