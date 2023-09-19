import { CorsOptions } from "cors";
import "dotenv/config";

const localPort = `http://localhost:${process.env.PORT || 3500}`;
const dbPort = ` "https://example.com"  //ProductionUrl`;

const allowedOrigins = [localPort, dbPort];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
