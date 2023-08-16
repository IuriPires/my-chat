import nodemailer from "nodemailer";

const sendEmail = async (email: string, subject: string, text: string) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: true,
    auth: {
      user: "ca6589c9155a7a",
      pass: "50a4e083b023c3",
    },
  });
};

export default sendEmail;
