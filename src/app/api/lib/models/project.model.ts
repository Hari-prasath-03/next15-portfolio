import { Schema, model, models, Model, Document } from "mongoose";

interface Project extends Document {
  name: string;
  image: {
    public_id: string;
    secure_url: string;
  };
  shortDescription: string;
  techStacks: string[];
  description: string[];
  githubLink?: string[];
  liveLink?: string;
}

const projectSchema = new Schema({
  name: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
  shortDescription: { type: String, required: true },
  techStacks: { type: [String], required: true },
  description: { type: [String], required: true },
  githubLink: { type: [String], required: false },
  liveLink: { type: String, required: false },
});

const Project: Model<Project> =
  models.Project || model<Project>("Project", projectSchema);

export default Project;
