import express, { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { verifyJwt } from "../helpers/utils/jwt.utils";

const router = express.Router();

router
  .post("/createUser", UserController.createUser)
  .get("/", UserController.findAllUsers)
  .get("/:id", UserController.findOneUser)
  .patch("/updateUserById/:id", UserController.updateUserById)
  .delete("/deleteOneUser/:id", UserController.deleteOneUser)
  .delete("/deleteAllUsers", UserController.deleteAllUsers);

export default router;
