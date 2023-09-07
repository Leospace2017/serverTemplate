import { format } from "date-fns";
import { v4 as uuid } from "uuid"
import fs from "fs"
import fsPromises from "fs/promises"
import path from "path"

export const logRecords = async (message, logFileName) => {
    const dateTime = format(new Date(), 'MM/dd/yyyy\tHH:mm:ss')
    const logString= `${dateTime}${uuid()}${message}`

    try {
        if(!fs.existsSync(path.join(__dirname,"..","historyLogs"))){
            await fsPromises.mkdir(path.join(__dirname,"..","historyLogs"))
        }
        await fsPromises.appendFile(path.join(__dirname,"..",logFileName),logString)
    } catch (error) {
        console.log(error)
    }
}

export const logger = (req, res, next) => {
    logRecords(`${req.method}${req.url}${req.headers.origin}`,"req.log")
    console.log(`${req.method}${req.path}`)
    next()
}


