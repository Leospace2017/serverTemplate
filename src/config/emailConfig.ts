import nodemailer from "nodemailer";
import "dotenv/config";
import { google } from "googleapis";



// Authenfizierung durch google email

const CLIENT_ID = "YOUR CLIENT ID";
const CLEINT_SECRET = "YOUR CLIENT SECRET";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "YOUR REFRESH TOKEN";

export const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const mailOptions = {
  from: "", // database or envfile
  to: "speicher5555@gmail.com",
  suject: "nodemailer test",
  text: "Hello Nodemailer", // or html
  attachments: [
    {
      filename: "", //image etc.
      path: "", // database oder lokal mit path benutzen
      contentType: "image/jpg",
    },
  ],
};

const mailConfig =  nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "yours authorised email address",
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,  // true for 465 port  else other ports
    // auth: {
    //   user: "",  //
    //   pass: "",  //
    // },
  })

export const mailTokenRefresh = async () => {
  const accessToken = await oAuth2Client.getAccessToken();

  mailConfig.set(
    "oauth2_provision_cb",
    (user: any, renewAccessToken: any) => {
      renewAccessToken(null, accessToken);
    }
  );

  return mailConfig;
};
