import { NextResponse } from "next/server.js";
const nodemailer = require("nodemailer");
// const { NextResponse } = require("next/server.js");
// const sgMail = require("@sendgrid/mail");

export async function POST(request) {
  console.log("contact test point");

  let userName = "";
  let userEmailAddress = "";
  let userMessage = "";
  try {
    console.log("before");
    const data = await request.json();
    userName = data.name;
    userEmailAddress = data.email;
    userMessage = data.message;
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

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER_NAME, // sender address
      to: "2909852565C@gmail.com", // list of receivers
      subject: "Random Books User Feedback", // Subject line
      text: `${userName}\n ${userEmailAddress}\n ${userMessage}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log("error test point2");
    return NextResponse.json({ status: "error", errorobj: error });
  }
}
