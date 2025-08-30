const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta?.error?.stack || message}`
  )
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({ format: messageFormat }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
  format: winston.format.json(),

  requestFilter: (req, propName) => {
    if (propName === "headers") {
      const { authorization, ...rest } = req.headers || {};
      return rest;
    }
    if (propName === "body" && req.body && typeof req.body === "object") {
      const { password, ...safe } = req.body;
      return safe;
    }
    return req[propName];
  },
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
