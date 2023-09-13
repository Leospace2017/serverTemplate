import mongoose from "mongoose";
import z from "zod";

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


const userZodSchema = z.object({
  userName: z.string().optional(),
  email: z.string().email(),
  role: z.enum(["guest", "admin"]).default("guest"),
  password: z.string(),
}).nullish();

// userZodSchema.extend({
//   notes: z.unknown(), // Zod hat keine built-in Methode zur Darstellung von virtual properties, daher verwenden wir 'z.unknown()'.
// });

export type User = z.infer<typeof userZodSchema>;

export { User, registerFormSchema, loginFormSchema};
