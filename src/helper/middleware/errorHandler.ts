import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {logRecords} from "./logger.js"

export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    logRecords(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`,"errLog.log")
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({message: err.message, isError: true})

}