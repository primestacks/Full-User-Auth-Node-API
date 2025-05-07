const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist in our database"],
      trim: true,
      lowercase: true,
      minLength: [5, "email length must be up to five characters"],
    },
    role: {
      type: String,
      emum: ["user", "manager", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password must be provied"],
      select: false,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
      select: false,
    },
    verificationCodeValidation: {
      type: String,
      select: false,
    },
    forgotPasswordCode: {
      type: Number,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
