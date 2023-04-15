const HandleErrors = (func) => async (req, res, next) => {
  console.log("Triggered Endpoint: ", req.originalUrl);
  try {
    await func(req, res, next);
  } catch (error) {
    console.error("Error Handler", error);
    res.status(400).send(error);
    next();
  }
};

module.exports = { HandleErrors };
