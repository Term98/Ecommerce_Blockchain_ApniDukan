const nodemailer = require("nodemailer");
var dotenv = require("dotenv");
dotenv.config({ path: "backend/.env" });

// const send_mail = async (options) => {
//   // sending mail from mailtrap.io
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "687153a88a9b2a",
//       pass: "882d8238ff66b6",
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   console.log(mailOptions);
//   await transporter.sendMail(mailOptions);
// };

// ===========================================================================
const { google } = require("googleapis");
const config = require("../config");
// // google oauth2 authentication
// // firs setup your app with client id and client secret on google cloud console: credentials
// // publish your app
// // follow this video for reference:https://www.youtube.com/watch?v=18qA61bpfUs
// // https://support.google.com/cloud/answer/6158849#authorized-domains&zippy=%2Cauthorized-domains
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });
function send_mail(options) {
  const accessToken = OAuth2_client.getAccessToken();
  accessToken
    .then(function (result) {
      console.log(result); // "Some User token"
    })
    .catch((e) => console.log(e));

  // console.log("accessToken", accessToken);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: `THE G.O.A.T < ${config.user}>`,
    to: options.email,
    subject: options.subject,
    html: `<h3>${options.message}</h3>`,
  };
  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Success:", result);
    }
    transport.close();
  });
}
// module.exports = send_mail;
// ==============================================

// const send_mail = async (options) => {
//   console.log("inside send_mail");
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: 465,
//     service: process.env.SMTP_SERVICE,
//     secure: true,
//     pool: true,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // let info = await transporter.sendMail(mailOptions);
//   let info = new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
//   console.log(info);
// };

// ====================================
// sending email using sendgrid::>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const sgMail = require("@sendgrid/mail");
// // setting api key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const send_mail = async (options) => {
//   const mailOptions = {
//     from: process.env.SMPT_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     html: `<h5>${options.message}</h5>`,
//   };
//   try {
//     await sgMail.send(mailOptions);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = send_mail;
