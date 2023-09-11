import {logRecords} from "./logger.js"

export const errorHandler = (err, req, res, next) => {
    logRecords(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,"errLog.log")
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({message: err.message, isError: true})
}