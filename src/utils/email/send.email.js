import nodemailer from "nodemailer";
// const email = "areas4860@gmail.com";
// const password = "eyqbvgamiikihvfd";
export async function sendEmail({
  to = "",
  cc = "",
  bcc = "",
  subject = "Saraha App",
  text = "",
  html = "",
  amp = "",
  attachments = [],
} = {}) {
  // async..await is not allowed in global scope, must use a wrapper
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
    tls: {
      rejectUnauthorized: false, // Disables certificate validation
    },
  });

  // send mail with defined transport object
  // console.log(html);
  // console.log("hear");

  const info = await transporter.sendMail({
    from: `"Sraha App " <${process.env.EMAIL_GMAIL}>`, // sender address
    to,
    subject,
    html,
  });
  // console.log("Message sent: %s", info.messageId);
  return info;
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
