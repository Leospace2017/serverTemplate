import { Request, Response } from "express";
import { validateInput } from "../helpers/utils/validateInput";
import { User} from "../models/user.model";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";
import { UserSchema, loginFormSchema } from "../models/schema/user.schema";
import { compareDBPassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/auth.service";
import { verifyJwt } from "../helpers/utils/jwt.utils";

const accessTokenP = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenP =  process.env.REFRESH_TOKEN_SECRET || "";
export const login = async (req: Request, res: Response) => {
  validateInput(loginFormSchema, req.body, res);

  const { email, password } = req.body;
  await compareDBPassword(email, password)
  const updatedUser: UserSchema |null   = await User.findOneAndUpdate(
    { email: email },
    { $set: { role: "admin" } }
  );

    const session = await createSession(updatedUser?._id, req.get("user-agent" || ""))

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: updatedUser?.email,
        role: updatedUser?.role,
        session: session._id
      },
    },
    accessTokenP,
    { expiresIn: "30000" }
  );

   res
    .cookie("accessJwt", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email: updatedUser?.email ,
        role: updatedUser?.role,
        session: session._id
      }
    },
   refreshTokenP,
    { expiresIn: "60000" }
  );

  res.cookie("refreshJwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "none", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });


  res.status(200)
  .json({ message: "success logging in" });
};



export const sessionRefreshHandler = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) 
    return res.status(401).json({ message: "Json Web Token not found" });

  const { decoded, valid } = verifyJwt(cookies.refreshJwt, refreshTokenP)

  const sessions = await findSessions({_id:decoded?.UserInfo.session, valid: true})


  if(!sessions) return res.status(500).json({message: "Unauthorized"})

  res.status(200).json({message: "session refreshed"})

};

export const logout = async (req: Request, res: Response) => {
  const session = req.cookies.accessToken;

  const {decoded } = verifyJwt(session, accessTokenP)

  await updateSession({_id: decoded?.UserInfo.session }, {valid: false})

  res
    .clearCookie("accessJwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })

  res.clearCookie("refreshJwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })
    .status(200)
    .json({ message: "user success logged out" });
};
