import nodemailer from "nodemailer";

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: "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",
    },
  });

  const mailOptions = {
    from: "subramaniang573@gmail.com",
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
