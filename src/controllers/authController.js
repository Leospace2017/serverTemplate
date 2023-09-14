import { validateInput } from "../helper/utils/validateInput.js";
import { User, loginFormSchema } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  validateInput(loginFormSchema, req.body);

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(401).json({ message: "Email Not Found!" });
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { role: "admin" } }
  );

  console.log(updatedUser)
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: updatedUser.email,
        role: updatedUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "600000" }
  );
  return res
    .cookie("accessJwt", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
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

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.jwt);
  if (!cookies.jwt)
    return res.status(401).json({ message: "Json Web Token not found" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      console.log(err);
      const foundUser = await User.findOne({ email: decoded.UserInfo.email });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      res.json({ message: "jwt refreshed" });
    }
  );
};

export const logout = async (req, res) => {
  const { email } = req;

  if (!email) return res.sendStatus(204); //No content
  // const updatedUser = await User.findOneAndUpdate({ email: email }, { $set: { role: "guest" } });
  
  // if(!updatedUser){
  //   return res.status(401).json({message: updatedUser})
  // }


   return res
    .clearCookie("accessJwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ message: "user success logged out" });
};
