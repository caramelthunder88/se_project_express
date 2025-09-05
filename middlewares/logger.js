const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta?.error?.stack || message}`
  )
);

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: messageFormat }),
    new winston.transports.File({
      filename: "app.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({ format: messageFormat }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  format: winston.format.json(),

  requestFilter: (req, propName) => {
    if (propName === "headers") {
      const headers = { ...(req.headers || {}) };
      if (Object.prototype.hasOwnProperty.call(headers, "authorization")) {
        headers.authorization = "[redacted]";
      }
      return headers;
    }
    if (propName === "body" && req.body && typeof req.body === "object") {
      const body = { ...req.body };
      if (Object.prototype.hasOwnProperty.call(body, "password")) {
        body.password = "[redacted]";
      }
      return body;
    }
    return req[propName];
  },
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.Console({ format: messageFormat }),
  ],
  format: winston.format.json(),
});

module.exports = { logger, requestLogger, errorLogger };
