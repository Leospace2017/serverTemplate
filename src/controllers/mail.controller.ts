import { Request, Response } from "express";
import { mailOptions, mailTokenRefresh } from "../config/emailConfig";

export const sendMail = async (req: Request, res: Response) => {
  const transporter = await mailTokenRefresh();

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        res.status(500).json({ message: "Fehler beim Senden der E-Mail" });
      } else {
        console.log("E-Mail gesendet:", info.response);
        res.json({ message: `E-Mail erfolgreich gesendet ${info.accepted}` });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
