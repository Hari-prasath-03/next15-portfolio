import z from "zod";

export const AboutSchema = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string(),
  contents: z.array(z.string()),
});

export const TechStackSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  category: z.string(),
  icon: z.url(),
});

export const ExperienceSchems = z.object({
  id: z.number().optional(),
  date: z.string(),
  title: z.string(),
  organizing: z.string(),
  type: z.enum(["work", "internship", "volunteer", "freelance"]).optional(),
  contents: z.array(z.string()).optional(),
  techStacks: z.array(z.string()).optional(),
});

export const SocialsSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  link: z.string(),
});

export const CloudinaryImageSchema = z.object({
  public_id: z.string(),
  secure_url: z.url(),
})

export const ProjectsSchema = z.object({
  id: z.number().optional(),
  image: CloudinaryImageSchema,
  name: z.string(),
  shortDescription: z.string(),
  techStacks: z.array(z.string()),
  description: z.array(z.string()),
  githubLink: z.array(z.string()).optional(),
  liveLink: z.url().optional(),
});
