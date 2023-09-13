import mongoose from "mongoose";
import z from "zod";

const registerFormSchema = z.object({
  fullName: z.string().min(2).max(15, { message: "fullname required" }),
  email: z.string().email({ message: "email required" }),
  password: z
    .string({ message: "message required" })
    .min(8, { message: "password has a minlength of 8" }),
});

const loginFormSchema = z.object({
  email: z.string().email({message: "email required"}),
  password: z.string().min(8, {message: "password has a minlength of 8"})
})


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
        values: ["guest", "admin"],
        default: "guest"
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

export { User, registerFormSchema, loginFormSchema };
