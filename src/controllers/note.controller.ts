import { NextFunction, Request, Response } from "express";
import { validateInput } from "../helpers/utils/validateInput";
import { Note} from "../models/note.model";
import noteFormSchema from "../models/schema/note.schema";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateInput(noteFormSchema, req, res);
  try {
    const { noteContent } = req.body;

    const note = await Note.create({
      note: noteContent,
      user: "6500519bd59f33ef794e3e1a",
    });

    res.status(201).json({ message: `success to create ${note}` });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role }: any = req;
  console.log(role);

  try {
    if (role === "admin" && role) {
      const notes = await Note.find();

      if (!notes) return res.json({ message: "notes not found" });

      res.status(200).json({ message: notes });
    } else {
      res.status(500).json({ message: "not admin" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};

export const deleteAllNotes = async (req: Request, res: Response) => {
  try {
    await Note.deleteMany();
    res.status(200).json({ message: "all notes deleted" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
