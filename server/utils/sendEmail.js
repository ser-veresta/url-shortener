import nodemailer from "nodemailer";

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;
