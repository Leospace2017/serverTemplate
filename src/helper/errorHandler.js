import {logRecords} from "./logger.js"

export const errorHandler = (err, req, res, next) => {
    logRecords(`${err.name}${err.message}${req.method}${req.url}${req.headers.origin}`,"errLog.log")
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).res.json({message: err.message, isError: true})
}