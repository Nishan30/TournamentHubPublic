import mongoose, { Schema, Document, model } from 'mongoose';

export interface IParticipant extends Document {
  name: boolean|null;
  email: boolean|null;
  questions: string;
  rules:string;
  walletAddress: boolean|null;
  paymentDetails: boolean|null;
  entryFeeDetails: boolean|null;
  individual:boolean|null;
  phoneNumber:boolean|null;
  formDeadline: Date|null;
}

export const ParticipantSchema: Schema = new Schema({
  name: { type: Boolean, required: true, default: false },
  email: { type: Boolean, required: true, default: false},
  questions: { type: String, required: true },
  rules: { type: String, required: true },
  walletAddress: { type: Boolean, default: false },
  paymentDetails: { type: Boolean, default: false },
  entryFeeDetails: { type: Boolean, default: false },
  phoneNumber: { type: Boolean,required: false, default: false },
  individual: { type: Boolean,required: false, default: false },
  formDeadline: { type: Date, required: true, default: false },
});
const Participant = mongoose.models?.Participant || model<IParticipant>('Participant', ParticipantSchema);

export default Participant;

