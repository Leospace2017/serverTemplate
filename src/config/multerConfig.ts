import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({   // storing files on disk
    destination: (req:Request, file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) => {
      cb(null, 'public/uploads/');
    },
    filename: (req:Request, file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) => {
      cb(null, /*Date.now() + "-" +*/ file.originalname);
    },
    
  });


const localUpload = multer({ storage });

const dbUpload = multer({
    limits: {
        fileSize: 30000000  //3mb
    }
})



export { localUpload, dbUpload }