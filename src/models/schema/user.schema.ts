import z from "zod";

export const registerFormSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2,{message: "minimum 2 Characters"})
        .max(15,{message:"maximun 15 Characters"})
        .trim()
        .toLowerCase()
        .refine((value) => {
          if (!value) throw { message: "name required" };
          return true;
        }),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .email()
        .refine((value) => {
          if (!value) throw { message: "email required" };
          return true;
        }),
      password: z
        .string()
        .min(8, {message: "minimun 8 Characters"})
        .trim()
        .refine((value) => {
          if (!value) throw { message: "password required" };
          return true;
        }),
      passwordConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
  });



  export const updateFormSchema = z.object({
    name: z
    .string()
    .min(2,{message: "minimum 2 Characters"})
    .max(15,{message:"maximun 15 Characters"})
    .trim()
    .toLowerCase()
    .refine((value) => {
      if (!value) throw { message: "name required" };
      return true;
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .refine((value) => {
      if (!value) throw { message: "email required" };
      return true;
    }),
  password: z
    .string()
    .min(8, {message: "minimun 8 Characters"})
    .trim()
    .refine((value) => {
      if (!value) throw { message: "password required" };
      return true;
    }),
  }) 

export const loginFormSchema = updateFormSchema.omit({name:true})


type User = z.infer<typeof updateFormSchema> 

export type UserSchema = {
    _id?: string,
    role?: "member" | "admin" | undefined ;
} & User 

