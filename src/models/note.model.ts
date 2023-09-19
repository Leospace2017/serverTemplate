import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const noteSchema = new mongoose.Schema(
  {
    noteId: { type: String, unique: true, default: () => `note_${nanoid()}` },
    title: { type: String, required: true },
    note: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

noteSchema.virtual("images", {
  ref: "ImageModel", //related model
  localField: "_id", // local _id key
  foreignField: "note", // related opposite key
});

const Note = mongoose.model("Note", noteSchema, "NoteModel");

export { Note };
