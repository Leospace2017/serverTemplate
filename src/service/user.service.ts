import { Request, RequestParamHandler, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";


export async function compareDBPassword(
    email:string,
    password:string,
) {
    const user = await User.findOne({ email });
  
    if (!user) {
      return false;
    }
    const isValid = await bcrypt.compare(password,user.password)
  
    return isValid;
  }
  
export const dbCreateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ message: "email and password are required!" });

  const duplicate = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (duplicate)
    return res.status(409).json({ message: "account already exist!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });

  if (user) {
    console.log({ message: `${user} created` });
    res.status(201)
    return user;
  } else {
    throw new Error("failed created new User");
  }
};

export const dbFindAllUsers = async (res: Response) => {
  const users = await User.find().select("-password");

  if (!users.length) return res.json({ message: "no users found" });

  res.status(200).json(users);
};

export const dbFindOneUser = async (
  res: Response,
  params: string,
  populateKey: string = ""
) => {
  const user = await User.findById(params)
    .select("-password")
    .populate(populateKey);
  if (user) return res.status(200).json(user);
  res.json({ message: "not found" });
};

export const dbUpdateUser = async (
  req: Request,
  res: Response,
  userIDParams: string
) => {
  const { name, email, password } = req.body;

  const user = await User.findById(userIDParams);

  if (!user) return res.json({ message: "id not found" });

  user.name = name;
  user.email = email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.status(200).json({ message: `${updatedUser.name} updated!` });
};
