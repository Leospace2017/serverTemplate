import mongoose from "mongoose";
import z, { nullable } from "zod";

const registerFormSchema = z.object({
    fullName: z.string().min(2).max(15).refine(value => {
      if (!value) throw { message: "fullname required" };
      return true;
    }),
    email: z.string().email().refine(value => {
      if (!value) throw { message: "email required" };
      return true;
    }),
    password: z.string().min(8).refine(value => {
      if (!value) throw { message: "password required" };
      return true;
    }),
  });
  

const loginFormSchema = z.object({
  email: z.string().min(6,{message: "need than 6 characters"}).email({message: "email required"}),
  password: z.string().min(8, {message: "password has a minlength of 8"})
})

const cookieSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  role: z.enum([ "member" ,"admin"]).optional(),
  password: z.string(),
});

type cookieSchemaType = z.infer<typeof cookieSchema> | null;

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




export { User, registerFormSchema, loginFormSchema, cookieSchemaType };