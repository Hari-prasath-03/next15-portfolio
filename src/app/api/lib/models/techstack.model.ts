import { Schema, model, models, Document, Model } from "mongoose";

interface TechStack extends Document {
  name: string;
  category: string;
  icon: string;
}

const techStackSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        try {
          const url = new URL(v);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid http/https URL`,
    },
  },
});

const TechStack: Model<TechStack> =
  models.TechStack || model<TechStack>("TechStack", techStackSchema);

export default TechStack;
