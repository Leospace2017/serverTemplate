import mongoose from "mongoose";
import {customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

const noteSchema = new mongoose.Schema({
    noteId: {type: String, unique: true, default: ()=> `note_${nanoid()}`},
    title: {type: String, required: true},
    note: { type: String, required: true},
    image: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes",
        require: true
    }
},{timestamps:true})


const Note = mongoose.model("Note", noteSchema, "NoteModel")

export {Note}