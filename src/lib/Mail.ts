import nodemailer from "nodemailer";
import emailConfig from "../config/email.config";

export default nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dcdaf2f0c3665f",
    pass: "39378439f30e5c",
  },
});
