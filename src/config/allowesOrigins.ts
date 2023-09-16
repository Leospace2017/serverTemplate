import { CorsOptions } from "cors";
import "dotenv/config";

const localPort = process.env.PORT || 3500;
const dbPort = `${process.env.DB_URI}${process.env.DB_NAME}`;

const allowedOrigins = [localPort, dbPort];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string | number) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
