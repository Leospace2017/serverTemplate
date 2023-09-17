import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface UserInfo {
  email: string;
  role?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      email: string;
      role: string | null;
    }
  }
}

// Verwendung:
const email = req.email;
const role = req.role;


