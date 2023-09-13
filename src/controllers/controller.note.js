import { validateInput } from "../helper/utils/validateInput.js";
import { Note, noteFormSchema } from "../models/model.note.js";

export const createNote = async (req, res, next) => {
  validateInput(noteFormSchema, req.body);
  try {
    const { noteContent } = req.body;

    const note = await Note.create({
      note: noteContent,
      user: "6500519bd59f33ef794e3e1a",
    });

    res.status(201).json({ message: `success to create ${note}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (req, res, next) => {
  const { role } = req;

  console.log(role);

  if (role === "admin") {
    try {
      const notes = await Note.find();

      if (!notes) return res.json({ message: "notes not found" });

      res.status(200).json({ message: notes });
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"server Error"})
    }
  }
  else{
    res.status(500).json({message:"not admin"})
  }
};

export const deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany();
    res.status(200).json({ message: "all notes deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
