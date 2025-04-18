import { messageModel } from "../../../DB/models/Message.model.js";
import userModel from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { accountId, message } = req.body;
  const user = await userModel.findOne({ _id: accountId, isDeleted: false });

  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }
  const newMessage = await messageModel.create({
    accountId,
    message,
  });
  return successResponse({
    message: "Done",
    res,
  });
});
