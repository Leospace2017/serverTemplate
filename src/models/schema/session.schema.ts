import { JwtPayload } from "jsonwebtoken";
import z from "zod";
import mongoose, {Document, Model, Types} from "mongoose";


export const SessionSchema = z.object({
  UserInfo: z.object({
    id: z.string(),
    email: z.string({
      required_error: "Email is required",
    }).email(),
    role: z.enum(["member", "admin"]).optional(),
    session: z.string()
  })
});



export type cookieSchemaType = z.infer<typeof SessionSchema> | null;



export type verifyJwtResult = {
  valid: boolean;
  expired: boolean;
  decoded:  cookieSchemaType | JwtPayload | null | undefined ;
} 


export type Session = {
  _id: Types.ObjectId,
  user: mongoose.Types.ObjectId | string;
  valid: boolean;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// export interface SessionDocument extends Session, Document {}

// export interface SessionModel extends Model<SessionDocument> {}