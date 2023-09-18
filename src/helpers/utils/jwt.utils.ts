import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { verifyJwtResult } from "../../models/schema/session.schema";

export function generateRandom64BitString(input: string) {
  // Definieren Sie alle möglichen Zeichen im Hexadezimalformat (0-9, a-f)
  const characters = input;

  let result = "";

  // Generieren Sie 16 Zeichen (64 Bits)
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function signJwt(
  object: Object,
  keyName: string | Buffer,
  options: jwt.SignOptions | undefined
) {
  return jwt.sign(object, keyName, options);
}

export function verifyJwt(token: string, keyName: string): verifyJwtResult {
  try {
    const decoded = jwt.verify(token, keyName) as JwtPayload;

    if (decoded)
      return {
        valid: true,
        expired: false,
        decoded,
      };
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
