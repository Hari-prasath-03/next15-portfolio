import { Schema, model, models, Model, Document } from "mongoose";

interface Experience extends Document {
  date: string;
  title: string;
  organizing: string;
  type?: "work" | "internship" | "volunteer" | "freelance";
  contents?: string[];
  techStacks?: string[];
}

const experienceSchema = new Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  organizing: { type: String, required: true },
  type: {
    type: String,
    enum: ["work", "internship", "volunteer", "freelance"],
    required: false,
  },
  contents: { type: [String], required: false },
  techStacks: { type: [String], required: false },
});

const Experience: Model<Experience> =
  models.Experience || model<Experience>("Experience", experienceSchema);

export default Experience;
