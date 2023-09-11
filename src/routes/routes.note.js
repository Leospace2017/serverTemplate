import express from "express"
import * as noteController from "../controllers/controller.note.js"

const router = express.Router();


router.post("/createNote", noteController.createNote)




export default router;


