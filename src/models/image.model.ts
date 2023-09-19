import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true},
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;
