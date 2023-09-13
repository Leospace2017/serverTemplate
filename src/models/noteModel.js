import mongoose from "mongoose";
import z from "zod";

const noteFormSchema = z.object({
    noteContent: z.string().max(500,{message:"maximum 5 characters"}).min(5,{message:"minimum 5 characters"})
})


const noteSchema = new mongoose.Schema({
    note: { type: String, maxLength: 500, minLength: 5},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes",
        require: true
    }
},{timestamps:true})


const Note = mongoose.model("Note", noteSchema, "NoteModel")

export {Note, noteFormSchema}