import mongoose, { Schema, Document, model } from 'mongoose';

export interface IArbriter extends Document {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  walletAddress: boolean;
  paymentDetail: boolean;
  questions: string;
  formDeadline: Date|null;
}

export const ArbriterSchema: Schema = new Schema({
  name: { type: Boolean, required: true, default: true },
  email: { type: Boolean, required: true,default: true },
  phoneNumber: { type: Boolean, default: true },
  walletAddress: { type: Boolean, default: true },
  paymentDetail: { type: Boolean, default: true },
  questions: { type: String, required: true },
  formDeadline: { type: Date, required: true, default: false },
});
const Arbriter = mongoose.models?.Arbriter || model<IArbriter>('Arbriter', ArbriterSchema);

export default Arbriter;
