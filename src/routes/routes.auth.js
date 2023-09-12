import express from "express";
import * as authController from "../controllers/controller.auth.js";
import { loginLimiter } from "../config/loginLimiter.js";

const router = express.Router();

router
  .post("/login", authController.login) //or replace with loginLimiter
  .post("register", authController.register)
  .get("/tokenRefresh", authController.refresh)
  .post("/logout", authController.logout);


export default router;