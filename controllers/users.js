const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return res.status(201).send(userWithoutPassword);
    })
    // .catch((err) => {
    // console.error("createUser error:", err);
    .catch((err) => {
      console.error("createUser error:", err);
      console.log("Error name:", err.name);
      console.log("Error code:", err.code);
      console.log("Full error object:", err);

      if (err.code === 11000) {
        const conflictError = new Error("Email already exists.");
        conflictError.statusCode = CONFLICT_ERROR;
        return next(conflictError);
      }

      if (err.name === "ValidationError") {
        const badRequestError = new Error(err.message);
        badRequestError.statusCode = BAD_REQUEST;
        return next(badRequestError);
      }

      const internalError = new Error("An error occurred on the server.");
      internalError.statusCode = INTERNAL_SERVER_ERROR;
      return next(internalError);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      console.error("Full error object:", err);

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }

      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err);
      return res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error("getCurrentUser error:", err);

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }

      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error("updateCurrentUser error:", err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data format" });
      }

      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};
module.exports = {
  createUser,
  getUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
