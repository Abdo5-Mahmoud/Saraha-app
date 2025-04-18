import mongoose, { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    accountId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

export const messageModel =
  mongoose.model.Message || model("Message", messageSchema);
