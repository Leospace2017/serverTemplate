import { NextFunction, Request, Response } from "express";
import "dotenv/config"
import { verifyJwt } from "../utils/jwt.utils";


const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {

  const {role} = res.locals;
  // jwt tests
  // const {accessJwt}= req.cookies;
  // console.log(accessJwt)
  //     const {decoded } = verifyJwt(accessJwt,process.env.ACCESS_TOKEN_SECRET || "")
  //     console.log("refreshcode", decoded)

  if (role !== "admin") {

    res.locals.role = ""
    return res.sendStatus(403);
  }


  return next();
};

export default verifyAdmin;





// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { UserInfo } from "../../Types/cookieTypes";
// import { verifyJwt } from "../utils/jwt.utils";

// export const verify = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
  // const authHeader = req.headers["authorization"]; //direct access to jwt
  // if (!authHeader?.startsWith("Bearer")) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  // const token = authHeader && authHeader.split(" ")[1];

//   const token = req.cookies.accessJwt;
//   console.log(token)

//   if (!token) {
//     return res.status(403).json({ message: "don't have token" });
//   }
//   try {
//     const {decoded} = verifyJwt(token, process.env.ACCESS_TOKEN_SECRET || "") as JwtPayload;
//     console.log(decoded)
//     if(decoded){
//         req.email = decoded.UserInfo.email;
//         req.role = decoded.UserInfo.role;
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "server error" });
//   }
// };
