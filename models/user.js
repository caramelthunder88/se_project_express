const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator: (v) =>
        validator.isURL(v, {
          protocols: ["http", "https"],
          require_protocol: true,
        }),
      message: "You must enter a valid URL",
    },
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email format",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  const normalized = email.trim().toLowerCase();
  const user = await this.findOne({ email: normalized }).select("+password");
  if (!user) throw new Error("Incorrect email or password");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new Error("Incorrect email or password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
