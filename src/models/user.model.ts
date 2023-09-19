import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role:{
      type: String,
      enum: {
        values: ["member", "admin"]
      },
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  },

);

userSchema.virtual("notes", {
  ref: "Note", //related model
  localField: "_id", // local _id key
  foreignField: "user", // related opposite key
});


const User = mongoose.model("User", userSchema, "UserModel");




export { User };


// Beispiele
// // Laden der Notizen eines bestimmten Benutzers
// const userWithNotes = await User.findById(someUserId).populate('notes');

// // Laden der Bilder einer bestimmten Notiz
// const noteWithImages = await Note.findById(someNoteId).populate('images');

// const userWithNotes = await User.findById(someUserId).populate({
//   path: 'notes',
//   populate: {
//     path: 'images' // Hier verschachteln Sie die Population für das virtuelle Feld "images" in Notizen
//   }
// });

