import express from "express";
import { verifyJWT } from "../helper/verifyJWT.js";
import * as UserController from "../controllers/controller.user.js"



const router = express.Router();

router.post("/createUser",UserController.createUser)
    .get("/", UserController.findAllUsers)
    .get("/:id",UserController.findOneUser)
    .patch("/updateUserById/:id",UserController.updateUserById)
    .delete("/deleteOneUser/:id",UserController.deleteOneUser)
    .delete("/deleteAllUsers",UserController.deleteAllUsers)


export default router