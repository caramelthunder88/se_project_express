module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error occurred on the server" : err.message;

  return res.status(statusCode).send({ message });
};
