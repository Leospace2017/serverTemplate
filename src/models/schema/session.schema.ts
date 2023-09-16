import { JwtPayload } from "jsonwebtoken";
import z from "zod";

export const createSessionSchema = z.object({
    body: z.object({
      email: z.string({
        required_error: "Email is required",
      }),
      password: z.string({
        required_error: "Password is required",
      }),
    }),
  });
  

export const cookieSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    role: z.enum([ "member" ,"admin"]).optional(),
    password: z.string(),
  });
  
export type cookieSchemaType = z.infer<typeof cookieSchema> | null;


export type VerifyJwtResult = {
  valid: boolean;
  expired: boolean;
  decoded: JwtPayload | null;
}