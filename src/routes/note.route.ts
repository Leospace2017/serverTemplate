import express from "express";
import * as noteController from "../controllers/note.controller";
import verifyAdmin from "../helpers/middleware/verifyAdmin";

const router = express.Router();

router.use(verifyAdmin);

router
  .post("/createNote", noteController.createNote)
  .delete("/deleteNotes", noteController.deleteAllNotes)
  .get("/", noteController.getNotes);

export default router;
