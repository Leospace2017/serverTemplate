import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import * as fsPromises from "fs/promises";
import path from "path";
import { __dirname } from "../../esm.js";
import { NextFunction, Request, Response } from "express";




export const logRecords = async (message:string, logFileName:string) => {
  const dateTime = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");
  const logString = `${dateTime}\t${uuid()}\t${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "historyLogs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "historyLogs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", logFileName),
      logString
    );
  } catch (error) {
    console.log(error);
  }
};

export const logger = (req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.method}\t${req.path}`);
    
        // logRecords(
        // `${req.method}\t${req.url}\t${req.headers.origin}\n`,
        //   "req.log"
        // );

  next();
};
