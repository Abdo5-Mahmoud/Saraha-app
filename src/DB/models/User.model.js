import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      default: "male",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "user"],
      default: "user",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    image: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model.User || mongoose.model("User", userSchema);
export default userModel;
