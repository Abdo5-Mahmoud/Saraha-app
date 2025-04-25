import userModel from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { emailEvent } from "../../../utils/events/email.events.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateIncryption } from "../../../utils/security/encrypt.security.js";
import {
  compareHash,
  generateHash,
} from "../../../utils/security/hash.security.js";
import { generateToken } from "../../../utils/security/token.securtiy.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { email, phone, password } = req.body;

  /// Check if the email exist or not
  if (await userModel.findOne({ email })) {
    return next(new Error("Email already exist", { cause: 409 }));
  }

  // hashing the password and the encrypt the phone number
  const hashPassword = generateHash({ plainText: password, salt: 10 });

  // encrypt the phone number
  const encryptPhone = generateIncryption({ plainText: phone });
  const newUser = await userModel.create({
    ...req.body,
    password: hashPassword,
    phone: encryptPhone,
  });

  // generate email token and assign the user id to it
  const emailToken = generateToken({
    payload: { id: newUser._id },
    signature: process.env.Tokin_Email,
    options: {
      expiresIn: "30m",
    },
  });

  successResponse({
    res,
    message: "Done",
    data: {
      note: "Please confirm your email",
    },
  });
  emailEvent.emit("sendConfirmEmail", {
    email: newUser.email,
  });
  return;
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { otp, email } = req.body;
  const user = await userModel.findOne({ email });
  // verify the confirm email token
  // console.log(emailToken);
  // console.log(otp);

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  console.log(user);

  const otpIsTrue = compareHash({
    plainText: otp,
    hashValue: user.confirmEmailOtp,
  });
  // const otpIsTrue = bcrypt.compareSync(otp, user.confirmEmailOtp);
  // console.log(otpIsTrue);

  // check if the user is already confirmed or not
  if (user.confirmEmail) {
    return next(new Error("Email already confirmed", { cause: 400 }));
  }
  if (!otpIsTrue) {
    return next(new Error("Invalid OTP", { cause: 400 }));
  }
  user.confirmEmail = true;
  await user.save();
  const { _id, userName, gender, address } = user;
  return successResponse({
    res,
    message: "Email confirmed",
    data: {
      _id,
      userName,
      email,
      gender,
      address,
    },
  });
});
