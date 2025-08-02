const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .type("application/json")
    .send({
      message:
        statusCode === INTERNAL_SERVER_ERROR
          ? "An internal server error occurred"
          : message,
    });

  next();
};
