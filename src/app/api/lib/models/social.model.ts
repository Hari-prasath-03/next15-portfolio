import { Schema, model, models, Document, Model } from "mongoose";

interface Social extends Document {
  name: string;
  link: string;
}

const socialSchema: Schema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const Social: Model<Social> =
  models.Social || model<Social>("Social", socialSchema);

export default Social;
