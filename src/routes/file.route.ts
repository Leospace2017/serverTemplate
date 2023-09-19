import express, { request } from "express";
import { localUpload, dbUpload } from "../config/multerConfig";
import * as fileController from "../controllers/file.controllers"




const router = express.Router();

router
  .get("/", fileController.accessFile)
  .get("/images/:name",fileController.showImage)
//   .post("/image", localUpload.single("testImage"), fileController.uploadImage)
  .post("/image", dbUpload.single("testImage"), fileController.dbUploadImage)

export default router;
