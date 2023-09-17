import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reSignToken } from "../../service/auth.service";
import "dotenv/config"


const accessTokenP = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenP =  process.env.REFRESH_TOKEN_SECRET || "";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessJwt;

  const refreshToken = req.cookies.refreshJwt;

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, accessTokenP);

  if (decoded) {
    res.locals.role = decoded.UserInfo.role;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reSignToken( refreshToken, refreshTokenP);

    if (newAccessToken) {
      res.cookie("accessJwt", newAccessToken);
    }

    const {decoded}  = verifyJwt(newAccessToken as string, accessToken);

    res.locals.role = decoded?.UserInfo.role;
    return next();
  }

  return next();
};

export default deserializeUser;
