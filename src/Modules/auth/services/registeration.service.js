import userModel from "../../../DB/models/User.model.js";
import { sendEmail } from "../../../utils/email/send.email.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateHash } from "../../../utils/security/hash.security.js";
import { generateIncryption } from "../../../utils/security/encrypt.security.js";
import {
  generateToken,
  verifyToken,
} from "../../../utils/security/token.securtiy.js";

export const signup = asyncHandler(async (req, res, next) => {
  const {
    userName,
    email,
    DOB,
    gender,
    phone,
    address,
    password,
    confirmPassword,
  } = req.body;

  /// Check if the email exist or not
  if (await userModel.findOne({ email })) {
    return next(new Error("Email already exist", { cause: 409 }));
  }

  // hashing the password and the encrypt the phone number
  const hashPassword = await generateHash({ plainText: password, salt: 10 });

  // encrypt the phone number
  const encryptPhone = generateIncryption({ plainText: phone });
  const newUser = await userModel.create({
    ...req.body,
    password: hashPassword,
    phone: encryptPhone,
  });

  // generate email token and assign the user id to it
  const emailToken = await generateToken({
    payload: { id: newUser._id },
    signature: process.env.Tokin_Email,
    options: {
      expiresIn: "30m",
    },
  });

  const emailLink = `${process.env.FrontEndLink}/auth/confirmEmail/${emailToken}`;
  // console.log(emailLink);
  const html = `<table style="width: 500px; margin:auto; border:solid #eee 1px;  padding:10px; border-radius:20px  20px 0  0"></th>
          <th style="text-align:center; background-color: #007bff;color:white; padding:10px; border-radius:20px  20px 0  0">Sraha Project</th>
          <tbody>
              <tr >
                  <td style="padding: 10px;">Hello, here is Sraha app please confirm your email by clicking on the link</td>
              </tr>
              <tr>
                  <td style="text-align: center; "><a style="text-decoration: none; background-color:#007bff; color:white; padding :10px;border-radius:5px;" href="${emailLink}">Click</a></td>
              </tr>
          </tbody>
      </table>
  `;

  successResponse({
    res,
    message: "Done",
    data: {
      note: "Please confirm your email",
    },
  });
  await sendEmail({
    to: email,
    html,
    subject: "Confirm your email",
  });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { emailToken } = req.params;

  // verify the confirm email token
  console.log(emailToken);

  const decoded = verifyToken({
    token: emailToken,
    signature: process.env.Tokin_Email,
  });

  // check if the user is already confirmed or not
  const user = await userModel.findById(decoded.id);
  if (user.confirmEmail) {
    return next(new Error("Email already confirmed", { cause: 400 }));
  }
  user.confirmEmail = true;
  await user.save();

  successResponse({ res, message: "Email confirmed", data: user });
});
