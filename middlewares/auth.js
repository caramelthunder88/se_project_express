const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("./errors");

module.exports = (req, _res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace(/^Bearer\s+/i, "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // <-- set once, from verified payload
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};
