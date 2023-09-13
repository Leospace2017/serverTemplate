import { Request } from 'express';

interface UserInfo {
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      email: string;
      role: string;
    }
  }
}

// Verwendung:
const email = req.email;
const role = req.role;
