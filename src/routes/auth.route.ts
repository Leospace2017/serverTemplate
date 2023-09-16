import express from "express";
import * as authController from "../controllers/auth.controller";
import { loginLimiter } from "../config/loginLimiter.js";
import { verify } from "../helpers/middleware/verify";

const router = express.Router();

router  //register is at user.controller with createUser function
  .post("/login", authController.login) //or add with loginLimiter as middleware 
  .get("/tokenRefresh", authController.refresh)
  .post("/logout", verify, authController.logout);

export default router;
