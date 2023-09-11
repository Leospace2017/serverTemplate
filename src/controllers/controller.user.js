import {User, registerFormSchema} from "../models/model.user.js";
import bcrypt from "bcrypt";
import z from "zod";



export const createUser = async (req, res, next) => {
  let userCreateError = {};
  try {
    const { fullName, email, password } = req.body;

    const result = registerFormSchema.safeParse(req.body);

    if (!result.success) {
      result.error.issues.forEach(
        (issue) => (userCreateError = { ...userCreateError, [issue.path[0]]: issue.message })
      );
      const message =
        Object.keys(userCreateError).length > 0
          ? { errors: userCreateError }
          : { success: true };

          return res.status(409).json({ message: message });

    }

    if (!email || !password)
      return res.json({ message: "email and password are required!" });

    const duplicate = await User.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });
    if (duplicate)
      return res.status(409).json({ message: "account already exist!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName: fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ message: `${user} created` });
    } else {
      throw new Error("failed created new User");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
    next(error)
  }
};

export const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    if (!users.length) return res.json({ message: "no users found" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};

export const findOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("notes");
    if (user) return res.status(200).json(user);
    res.json({ message: "not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;
  let userUpdateError = {};


  const result = registerFormSchema.safeParse(req.body);

  if (!result.success) {
    result.error.issues.forEach(
      (issue) => (userUpdateError = { ...userUpdateError, [issue.path[0]]: issue.message })
    );
    const message =
      Object.keys(userUpdateError).length > 0
        ? { errors: userUpdateError }
        : { success: true };
    return res.status(409).json({ message: message });
  }
  // if (!fullName || !email)
  //   return res.json({ message: "fullName and email are required" });

  try {
    const user = await User.findById(id);

    if (!user) return res.json({ message: "id not found" });

    user.userName = fullName;
    user.email = email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.status(200).json({ message: `${updatedUser.userName} updated!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);

    res.status(200).json({ message: "success deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: "All User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
