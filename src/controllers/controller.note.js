import { validateInput } from "../helper/utils/validateInput.js";
import { Note, noteFormSchema } from "../models/model.note.js";

export const createNote = async (req, res, next) => {


  validateInput(noteFormSchema,req.body)
  try {
    const {noteContent} = req.body;

    const note = await Note.create({
        note: noteContent,
        user: "64ff5d978b1234ad27889652"
    })

    res.status(201).json({message: `success to create ${note}`})


  } catch (err) {
    console.log(err)
    res.status(500).json({message:err.message})
  }
};


export const getNotes = async (req, res, next) => {
   try {
    const notes = await Note.find();

    if(!notes) return res.json({message: "no notes or not found"})

    res.status(200).json({message: notes})
   } catch (error) {
    console.log(error)
    next(error)
   }
}