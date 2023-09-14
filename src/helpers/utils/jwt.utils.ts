import jwt from "jsonwebtoken";
import "dotenv/config";

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
  {...options}: jwt.SignOptions | undefined
) {
  const signingKey = keyName;
  return jwt.sign(object, signingKey, {
    ...options,
    algorithm: "HS256",
  });
}

export function verifyJwt(token: string, keyName: string) {
  const publicKey = keyName;

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
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
