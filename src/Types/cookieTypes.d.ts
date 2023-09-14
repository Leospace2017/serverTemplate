import { Request } from 'express';

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
