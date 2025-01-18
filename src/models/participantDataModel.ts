import mongoose, { Schema, Document, model } from 'mongoose';

export interface IParticipantData extends Document {
  name: string;
  email: string;
  teamName:string;
  questions: string;
  walletAddress: string;
  paymentDetails: string;
  entryFeeDetails: string;
  phoneNumber:string;
  tournamentId:string
}

export const ParticipantSchemaData: Schema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  teamName: { type: String, required: false },
  questions: { type: String, required: false },
  walletAddress: { type: String, default: false },
  paymentDetails: { type: String, default: false },
  entryFeeDetails: { type: String, default: false },
  phoneNumber: { type: String,required: false},
  tournamentId: { type: String,required: true},
});
const ParticipantData = mongoose.models?.ParticipantData || model<IParticipantData>('ParticipantData', ParticipantSchemaData);

export default ParticipantData;

