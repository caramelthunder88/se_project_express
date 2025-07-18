const User = require("../models/user");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occured on the server." });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("User not found");
      err.name = "NotFoundError";
      throw err;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err.name, err.message);

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }

      if (err.name === "NotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }

      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message || "Internal Server Error" });
    });
};
module.exports = { getUsers, createUser, getUser };
