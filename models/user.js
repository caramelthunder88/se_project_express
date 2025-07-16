const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
    minlenth: 2,
    maxlenth: 30,
  },

  avatar: {
    type: String,
    reqired: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a Valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
