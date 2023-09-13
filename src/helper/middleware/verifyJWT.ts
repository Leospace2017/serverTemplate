import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req:Request, res: Response, next:NextFunction) => {
  const token = req.cookies.accessJwt;

  // const authHeader = req.headers["authorization"];

  // if (!authHeader?.startsWith("Bearer")) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({message: "dont have token"});
  }
  console.log(token);


    const {decoded }: any  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded) {
      req.email = decoded.UserInfo.email;
      req.role = decoded.UserInfo.role;
  
      next();
    }else{
      
      return res.status(403).json({ message: "Forbidden" });
    }
    


  
};
