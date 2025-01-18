import mongoose, { Schema, Document, model } from 'mongoose';

// Define the Feedback interface
export interface IFeedback extends Document {
  serviceName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Define the Feedback schema
export const FeedbackSchema: Schema = new Schema({
  serviceName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.models?.Feedback || model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;