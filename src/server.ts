import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection";
import logger from "./helpers/middleware/logger";
import corsOptions from "./config/allowesOrigins";
import userRoute from "./routes/user.route";
import noteRoute from "./routes/note.route";
import authRoute from "./routes/auth.route";
import * as jwtUtils from "./helpers/utils/jwt.utils";

// console.log( generateRandom64BitString("for Token"));

const port = process.env.PORT || 3500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.disable("x-powered-by");


dotenv.config();
dbConnection();

app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);
app.use("/api/user", userRoute);

mongoose.connection.once("open", () => {
  console.log("DB connected");
});
app.listen(port, () => console.log(`server started at port ${port}`));

mongoose.connection.on("error", (err) => {
  console.log(err, `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`);
});

// Deploy
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/", express.static(path.join(__dirname, "/build")));
// app.get("/*", (req, res) => res.sendFile(__dirname + "/build/index.html"));
// => WICHTIG: diese Zeile unter den routes (z.b.  app.use("/users", usersRouter) schreiben
//                                                                                           :pfeil_aufwärts_klein:
// Das build Verzeichnis wird erstellt nachdem ihr den Befehl npm run build im Frontend ausgeführt habt.
// :ausrufezeichen:Achtung bei vite nennt sich das neu erstellte Verzeichnis dist anstelle von build:ausrufezeichen:
// Im Frontend
// im Frontend noch beim fetch die Route ändern (kein localhost, sondern nur noch z.b. /api/employee
// danach npm run build ausführen
// und den erstellten neuen Ordner mit dem gebuildeten Projekt (build/ dist) ins backend Projekt verschieben
// wenn alles in einem Projekt deployed wird müssen wir nicht auf cors achten
