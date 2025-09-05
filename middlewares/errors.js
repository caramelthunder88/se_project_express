/* eslint-disable max-classes-per-file */

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequestError extends ApiError {
  constructor(m = "Bad Request") {
    super(400, m);
  }
}
class UnauthorizedError extends ApiError {
  constructor(m = "Unauthorized") {
    super(401, m);
  }
}
class ForbiddenError extends ApiError {
  constructor(m = "Forbidden") {
    super(403, m);
  }
}
class NotFoundError extends ApiError {
  constructor(m = "Not Found") {
    super(404, m);
  }
}
class ConflictError extends ApiError {
  constructor(m = "Conflict") {
    super(409, m);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
