import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

const uploadImgToCloudinary = async (file: Buffer, folder?: string) => {
  return new Promise<UploadApiResponse | string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `portfolio/${folder || "root"}` },
      (error, result) => {
        if (error) reject(error);
        if (!result) return reject("No result from Cloudinary");
        else resolve(result);
      }
    );
    stream.end(file);
  });
};

export default uploadImgToCloudinary;
