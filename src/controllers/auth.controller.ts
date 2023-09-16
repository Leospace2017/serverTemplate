import { Request, Response } from "express";
import { validateInput } from "../helpers/utils/validateInput";
import { User} from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { cookieSchemaType } from "../models/schema/session.schema";
import { loginFormSchema } from "../models/schema/user.schema";

const secreteToken = process.env.ACCESS_TOKEN_SECRET || "";
export const login = async (req: Request, res: Response) => {
  validateInput(loginFormSchema, req.body, res);

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(401).json({ message: "Email Not Found!" });
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const updatedUser: cookieSchemaType = await User.findOneAndUpdate(
    { email: email },
    { $set: { role: "admin" } }
  );

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: updatedUser?.email,
        role: updatedUser?.role,
      },
    },
    secreteToken,
    { expiresIn: "30000" }
  );

  return res
    .cookie("accessJwt", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "success logging in" });
  // const refreshToken = jwt.sign(
  //   {
  //     UserInfo: {
  //       email: foundUser.email ,
  //       role: foundUser.role
  //     }
  //   },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: "1m" }
  // );

  // // Create secure cookie with refresh token
  // res.cookie("refreshJwt", refreshToken, {
  //   httpOnly: true, //accessible only by web server
  //   secure: false, //https
  //   sameSite: "None", //cross-site cookie
  //   maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  // });

  // Send accessToken containing username and roles
};



export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies.jwt);
  if (!cookies.jwt)
    return res.status(401).json({ message: "Json Web Token not found" });

  const refreshToken = cookies.jwt;

  //   jwt.verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_SECRET || "",
  //     async (err:any, decoded) => {
  //       if (err) return res.status(403).json({ message: "Forbidden" });
  //       console.log(err);
  //       const foundUser = await User.findOne({ email: decoded.UserInfo.email });

  //       if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  //       const accessToken = jwt.sign(
  //         {
  //           UserInfo: {
  //             email: foundUser.email,
  //             role: foundUser.role,
  //           },
  //         },
  //         process.env.ACCESS_TOKEN_SECRET || "",
  //         { expiresIn: "1m" }
  //       );

  //       res.json({ message: "jwt refreshed" });
  //     }
  //   );
};

export const logout = async (req: Request, res: Response) => {
  return res
    .clearCookie("accessJwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "user success logged out" });
};
