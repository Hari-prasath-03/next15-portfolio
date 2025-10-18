import { Schema, model, models, Model, Document } from "mongoose";

interface IAbout extends Document {
  name: string;
  role: string;
  description: string;
  contents: string[];
}

const AboutSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  contents: { type: [String], required: true },
});

const About: Model<IAbout> =
  models.About || model<IAbout>("About", AboutSchema);

export default About;
