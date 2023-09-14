import express from "express"
import * as noteController from "../controllers/note.controller"
import { verifyJWT } from "../helpers/middleware/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.post("/createNote", noteController.createNote)
    .delete("/deleteNotes", noteController.deleteAllNotes)
    .get("/", noteController.getNotes)


export default router;