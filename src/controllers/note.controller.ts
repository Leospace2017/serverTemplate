import { NextFunction, Request, Response } from "express";
import { validateInput } from "../helpers/utils/validateInput";
import { Note} from "../models/note.model";
import noteFormSchema from "../models/schema/note.schema";
import { verifyJwt } from "../helpers/utils/jwt.utils";
import "dotenv/config"


export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateInput(noteFormSchema, req, res);
  try {
    const { title, noteContent, image } = req.body;
    const {decoded} = verifyJwt(req.cookies.accessJwt, process.env.ACCESS_TOKEN_SECRET || "")

    const note = await Note.create({
      title: title ,
      note: noteContent,
      image: image || "",
      user: decoded?.UserInfo.id,
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

  const  {role} = res.locals;
  console.log(role);

  try {
    if (role === "admin") {
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
