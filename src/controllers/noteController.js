import { validateInput } from "../helper/utils/validateInput.js";
import { Note, noteFormSchema } from "../models/noteModel.js";
import { User } from "../models/userModel.js";

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
  const { role } = await req;
  // console.log(role);

//  const user =  await User.findOne({email:email})

  try {
    if (role === "admin" ) {
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

export const deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany();
    res.status(200).json({ message: "all notes deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
