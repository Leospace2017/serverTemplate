import express from "express";
import * as authController from "../controllers/auth.controller";
import { loginLimiter } from "../config/loginLimiter.js";
import { verifyJWT } from "../helpers/middleware/verifyJWT";

const router = express.Router();

router
  .post("/login", authController.login) //or add with loginLimiter as middleware
  .get("/tokenRefresh", authController.refresh)
  .post("/logout", verifyJWT, authController.logout);


export default router;