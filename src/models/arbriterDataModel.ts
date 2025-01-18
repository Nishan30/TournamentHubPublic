import mongoose, { Schema, Document, model } from 'mongoose';

export interface IArbriterData extends Document {
  name: string;
  email: string
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  phoneNumber:string;
  tournamentId:string
}

export const ArbriterSchemaData: Schema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  questions: { type: String, required: false },
  walletAddress: { type: String, default: false },
  paymentDetails: { type: String, default: false },
  phoneNumber: { type: String,required: false},
  tournamentId: { type: String,required: true},
});
const ArbriterData = mongoose.models?.ArbriterData || model<IArbriterData>('ArbriterData', ArbriterSchemaData);

export default ArbriterData;

