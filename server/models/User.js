import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
  password: {
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

const User = mongoose.model("User", userSchema);

export default User;
