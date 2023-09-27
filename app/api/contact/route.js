// import { NextResponse } from "next/server.js";
const nodemailer = require("nodemailer");
const { NextResponse } = require("next/server.js");
export async function POST(request) {
  console.log("contact test point");

  const data = await request.json();

  const userName = data.name;
  const userEmailAddress = data.email;
  const userMessage = data.message;
  console.log(data);

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,

    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // eslint-disable-next-line require-jsdoc
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER_NAME, // sender address
      to: "2909852565C@gmail.com", // list of receivers
      subject: "Random Books User Feedback", // Subject line
      // eslint-disable-next-line max-len
      text: `${userName}\n ${userEmailAddress}\n ${userMessage}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    // eslint-disable-next-line max-len
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
    console.log(info);
    return NextResponse.json({ status: "success" });
  }

  main().catch((error) => {
    console.log(error);
    return NextResponse.json({ status: "error", errorobj: error });
  });
  //   try {
  //     await main();
  //   } catch (err) {
  //     return NextResponse.json({ status: "error", errorobj: err });
  //   }
}
