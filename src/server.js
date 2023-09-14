import express from "express";
import "dotenv/config";
import cors from "cors";
import {corsOptions} from "./config/corsOption.js";
import { errorHandler } from "./helper/middleware/errorHandler.js";
import mongoose from "mongoose";
import dbConnection from "./config/dbConnection.js";
import { logRecords, logger } from "./helper/middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"


const port = process.env.PORT || 3500; 

const app = express();


dbConnection();


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)
app.use(cookieParser())
app.disable("x-powered-by")

// app.use(session({
//     secret:
// }))

// app.use("/", express.static(path.join(__dirname,'build')))
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/note", noteRoutes)

app.use(errorHandler)


mongoose.connection.once("open", () => {
    console.log("DB connected")
    app.listen(port, console.log(`Server started at port ${port}`))
})

mongoose.connection.on("error", err => {
    console.log(err)
    logRecords(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'dbErrLog.log')
})





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