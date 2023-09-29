import express from "express";
import * as mailController from "../controllers/mail.controller";

const router = express.Router();



router
    .get("/send-email", mailController.sendMail)


export default router;