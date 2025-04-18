import { Types } from "mongoose";
import { messageModel } from "../../../DB/models/Message.model.js";
import userModel from "../../../DB/models/User.model.js";
import { sendEmail } from "../../../utils/email/send.email.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateDecryption } from "../../../utils/security/encrypt.security.js";
import {
  compareHash,
  generateHash,
} from "../../../utils/security/hash.security.js";
import { generateToken } from "../../../utils/security/token.securtiy.js";
export const profile = asyncHandler(async (req, res) => {
  const user = req.user;
  user.phone = generateDecryption({ cipherText: user.phone });
  // return res.json({ message: "Hello from user profile", user: req.user });
  const messages = await messageModel.find({ accountId: user._id }).populate({
    path: "accountId",
    select: "userName phone address",
  });
  // console.log(messages);
  const { _id, userName, email, gender, phone, address, role, DOB } = user;
  return successResponse({
    message: "Hello from user profile",
    res,
    data: { user: user, messages },
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  user.isDeleted = true;
  await user.save();
  return successResponse({
    message: "Done",
    res,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true,
      revalidate: true,
    }
  );
  // user.userName = data.userName;
  // user.phone = phone;
  // user.address = address;
  // await user.save();
  console.log(user);

  return successResponse({
    message: "Done",
    res,
    data: user,
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, password } = req.body;

  const user = req.user;
  const compareOldPassword = compareHash({
    plainText: oldPassword,
    hashText: user.password,
  });

  if (!compareOldPassword) {
    next(new Error("Old password is incorrect"));
  }
  user.password = (await generateHash({ plainText: password })).toString();
  user.passwordChangedAt = Date.now();

  await user.save();
  return successResponse({
    message: "Hello from change password",
    res,
    data: user,
  });
});

export const changeEmail = asyncHandler(async (req, res, next) => {
  const { oldEmail, newEmail } = req.body;

  const user = req.user;
  const oldEmailIsCorrect = user.email === oldEmail;

  if (!oldEmailIsCorrect) {
    return next(new Error("Old email is incorrect"));
  }
  user.email = newEmail;
  user.confirmEmail = false;

  const emailToken = generateToken({
    payload: { id: user._id },
    signature: process.env.Tokin_Email,
    options: { expiresIn: "30m" },
  });
  await user.save();
  successResponse({
    message: "email updated",
    res,
    data: user,
  });

  const confirmEmailToken = `${process.env.FrontEndLink}/auth/confirmEmail/${emailToken}`;

  const html = `<table style="width: 500px; margin:auto; border:solid #eee 1px;  padding:10px; border-radius:20px  20px 0  0"></th>
  <th style="text-align:center; background-color: #007bff;color:white; padding:10px; border-radius:20px  20px 0  0">Sraha Project</th>
  <tbody>
      <tr >
          <td style="padding: 10px;">Hello, here is Sraha app please confirm your email by clicking on the link</td>
      </tr>
      <tr>
          <td style="text-align: center; "><a style="text-decoration: none; background-color:#007bff; color:white; padding :10px;border-radius:5px;" href="${confirmEmailToken}">Click</a></td>
      </tr>
  </tbody>
</table>
`;

  sendEmail({
    to: user.email,
    html,
    subject: "Confirm your email",
  });
  return;
});
