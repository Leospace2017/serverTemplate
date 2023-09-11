import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    note: { type: String, max: 500, min: [3, "Write little more."]}
})


const Note = mongoose.model("Note", noteSchema, "NoteModel")

export {Note}