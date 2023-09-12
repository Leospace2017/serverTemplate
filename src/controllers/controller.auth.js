import { validateInput } from "../helper/utils/validateInput.js";
import { User, loginFormSchema } from "../models/model.user.js";
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

  if (!validPassword)
    return res.status(401).json({ message: "Invalid Password" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.status(200).json({ accessToken });
};


export const refresh = async (req, res) => {
  const cookies = req.cookies;
    console.log(cookies.jwt)
  if (!cookies.jwt) return res.status(401).json({ message: "Json Web Token not found" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
        console.log(err)
      const foundUser = await User.findOne({ email: decoded.username });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      res.json({ accessToken });
    }
  );
};

export const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
};
