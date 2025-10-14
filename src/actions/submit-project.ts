"use server";

import uploadImgToCloudinary from "@/lib/upload-image";
import axiosInstance from "@/utils/axiosInstance";

export default async function submitProject(
  prevState: unknown,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const techStacks = formData.getAll("techStacks") as string[];
  const description = formData.getAll("description") as string[];
  const githubLink = formData.getAll("githubLinks") as string[];
  const liveLink = formData.get("liveLink") as string;
  const image = formData.get("image") as File;

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const imgUploadResult = await uploadImgToCloudinary(buffer, "projects");

  if (typeof imgUploadResult === "string")
    return { success: false, message: imgUploadResult };

  const newProject = {
    image: {
      public_id: imgUploadResult.public_id,
      secure_url: imgUploadResult.secure_url,
    },
    name,
    shortDescription,
    techStacks,
    description,
    githubLink,
    liveLink,
  };

  const response = await axiosInstance.post("/projects", newProject);

  if (response.status === 201) return { success: true, message: "Project added successfully." };
  return { success: false, message: "Failed to add project." };
}
