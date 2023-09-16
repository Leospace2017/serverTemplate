import { NextFunction, Request, Response } from "express";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  // if (process.env.NODE_ENV === 'development') {
  const { method, path, params } = req;

  console.log(`Development Mode: ${method} ${path}`);
  console.log("Parameters:", params);

  if (method === "GET") {
  } else if (method === "POST") {
  }

  // Sie können auch Fehlerausgaben hinzufügen, um Fehler zu debuggen
  // console.error('An error occurred during development.');
  next();

  //   } else {
  //     // Wenn nicht im Entwicklungsmodus, führen Sie die nächste Middleware aus
  //     next();
  //   }
};

export default logger;
