import userModel from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { userRoles } from "../../../middleware/authentication.middleware.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { generateDecryption } from "../../../utils/security/encrypt.security.js";
import { generateToken } from "../../../utils/security/token.securtiy.js";

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  /// Check if the email exist or not
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("Invalid email or password", { cause: 400 }));
  }

  // check if the email is confirmed or not
  if (!user.confirmEmail) {
    return next(new Error("Please confirm your email", { cause: 400 }));
  }

  //compare the hashing password with the plain text
  if (
    !compareHash({
      plainText: password,
      hashValue: user.password,
    })
  ) {
    return next(new Error("Invalid email or password", { cause: 400 }));
  }
  // transfform the phone number from cipher to plain text
  user.phone = generateDecryption({ cipherText: user.phone });

  //create a token
  const token = generateToken({
    payload: { userId: user._id },
    signature:
      user.role == userRoles.Admin
        ? process.env.TOKEN_SIGNATURE_ADMIN
        : process.env.TOKEN_SIGNATURE_USER,
    options: { expiresIn: "1d" },
  });

  // adding the barrer to the token
  const finalToken = `${user.role} ${token}`;

  successResponse({ res, message: "Welcome to our site", data: finalToken });
});
