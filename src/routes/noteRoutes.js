import express from "express"
import * as noteController from "../controllers/noteController.js"
import { verifyJWT } from "../helper/middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/createNote", noteController.createNote)
    .delete("/deleteNotes", noteController.deleteAllNotes)
    .get("/", noteController.getNotes)




export default router;


