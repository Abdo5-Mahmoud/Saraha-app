import { customAlphabet } from "nanoid";
import { EventEmitter } from "node:events";
import userModel from "../../DB/models/User.model.js";
import { verifyAccountTempl } from "../email/template/verifyAccount.temp.js";
import { sendEmail } from "../email/send.email.js";
import { generateHash } from "../security/hash.security.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendConfirmEmail", async (emailData) => {
  const { email } = emailData;
  const otp = customAlphabet("1234567890", 6)();
  // console.log(otp);
  // console.log(555555);

  const hashOtp = generateHash({ plainText: otp });
  const user = await userModel.findOneAndUpdate(
    { email },
    {
      $set: { confirmEmailOtp: hashOtp },
    }
  );
  // console.log(hashOtp);

  const html = verifyAccountTempl(otp);
  await sendEmail({
    to: email,
    subject: "Confirm Email",
    html,
  });
});
