import express from "express";
import * as noteController from "../controllers/note.controller";
import { verify } from "../helpers/middleware/verify";

const router = express.Router();

router.use(verify);

router
  .post("/createNote", noteController.createNote)
  .delete("/deleteNotes", noteController.deleteAllNotes)
  .get("/", noteController.getNotes);

export default router;
