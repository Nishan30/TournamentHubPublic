import mongoose, { Schema, Document, model } from 'mongoose';
import Participant ,{ IParticipant,ParticipantSchema }from './participantModel';
import Arbriter ,{ IArbriter,ArbriterSchema } from './arbriterModel';
export interface ITournament extends Document {
  name: string;
  organizerName: string;
  email: string;
  description: string;
  rules:string;
  location: string;
  playerCount: string;
  tournamentType: string;
  hasPlayerList: boolean;
  needsArbriter: boolean;
  isIndividual: boolean;
  paymentSystem: boolean;
  publicTournament: boolean;
  startDate: Date;
  endDate: Date;
  participants: IParticipant; 
  arbriter: IArbriter; 

}

const TournamentSchema: Schema = new Schema({
  name: { type: String, required: true },
  organizerName : { type: String, required: true },
  email: { type: String, required: true},
  description: { type: String, required: true },
  rules: { type: String, required: true },
  location: { type: String, required: true },
  playerCount: {type: String,required: true},
  hasPlayerList: { type: Boolean, default: true },
  needsArbriter: { type: Boolean, default: true },
  isIndividual: { type: Boolean, default: false },
  paymentSystem: { type: Boolean, default: true },
  publicTournament: { type: Boolean, default: true },
  tournamentType: { type: String, default: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participant: { type: ParticipantSchema },
  arbriter: { type:ArbriterSchema },
});

const Tournament = mongoose.models?.Tournament || model<ITournament>('Tournament', TournamentSchema);
export default Tournament;
