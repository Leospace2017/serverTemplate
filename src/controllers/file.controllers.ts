import { Request, Response } from "express";
import path from "path";
import ImageModel from "../models/image.model";
import { nanoid } from "nanoid";

export const accessFile = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../public/index.html");
  res.sendFile(filePath);
};

export const showImage = async (req: Request, res: Response) => {
  console.log("req.params.name:", req.params.name);

  try {
    // falls das bild local aus befindet wird es im browser angezeigt
    // const filePath = path.join(
    //   __dirname,
    //   "../../public/uploads/",
    //   req.params.name
    // );

    // if (filePath) {
    //     console.log(filePath)
    //   return res.status(200).sendFile(filePath);
    // }

    const dbImage = await ImageModel.findOne({ name: req.params.name });
    if (dbImage) {
      return res
        .status(200)
        .contentType(dbImage?.contentType || "")
        .send(dbImage?.data);
    }
    return res.status(400).json({ message: "images not reached" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  //localDisk
  console.log("multer files:", req.file);
  res.redirect("images/" + req.file?.filename);
};

export const dbUploadImage = async (req: any, res: Response) => {
  console.log(req.file);
  try {
    const { buffer, originalname, mimetype } = req.file;
    const newImage = await ImageModel.create({
      name: /*nanoid(4) + "_" +*/ originalname,
      data: buffer,
      contentType: mimetype,
    });
    if (!newImage) return res.status(400).json({ message: "image not found" });
    console.log({ message: "image created" });
    res.redirect("images/" + newImage?.name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error (image creation)" });
  }
};
