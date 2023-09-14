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

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: number;
      DB_URI: string;
      DB_NAME: string;
    }
  }
}

// Verwendung in Ihrem Code
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;


// Verwendung:
const email = req.email;
const role = req.role;
