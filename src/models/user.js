const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength:3,
      maxLength:20
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
     password: {
      type: String,
      required: true,
      minlength: 6,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    problemSolved: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
