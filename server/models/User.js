const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 255,
    validate: [validator.isEmail, "invalid email"],
  },
  hash: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
  },
  salt: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
