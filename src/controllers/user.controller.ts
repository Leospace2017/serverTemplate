import { User } from "../models/user.model";
import { validateInput } from "../helpers/utils/validateInput";
import { NextFunction, Request, Response } from "express";
import {
  UserSchema,
  registerFormSchema,
  updateFormSchema,
} from "../models/schema/user.schema";
import * as UserService from "../service/user.service";
import { createSession } from "../service/auth.service";
import { signJwt } from "../helpers/utils/jwt.utils";
import "dotenv/config";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateInput(registerFormSchema, req, res);
    const user: UserSchema | any = await UserService.dbCreateUser(req, res);

     await createSession(user?._id, req.get("user-agent" || ""));

;
res.json({message: "user created"}).redirect("./login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
};

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.dbFindAllUsers(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await UserService.dbFindOneUser(res, id, "notes");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  validateInput(updateFormSchema, req.body, res);

  try {
    await UserService.dbUpdateUser(req, res, id);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);

    res.status(200).json({ message: "success deleted!" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: "All User deleted" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
