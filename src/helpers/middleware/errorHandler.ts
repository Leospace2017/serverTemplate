import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `ErrorHanle: >> ${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({ message: err.message, isError: true });
};
