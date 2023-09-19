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

// helmet.d.ts
declare module 'helmet' {
  import { RequestHandler } from 'express';

  function expectCt(options?: { maxAge?: number }): RequestHandler;

  export = expectCt;
}

