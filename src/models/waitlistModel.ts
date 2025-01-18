import mongoose, { Schema, Document, model } from 'mongoose';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  date: Date;
}

const waitlistSchema = new Schema<IWaitlist>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const waitlistModel = mongoose.models.Waitlist || model<IWaitlist>('Waitlist', waitlistSchema);

export default waitlistModel;
