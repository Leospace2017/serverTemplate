import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    userName: {
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