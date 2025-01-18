import mongoose, { Schema, Document, model } from 'mongoose';
import ParticipantData, {IParticipantData, ParticipantSchemaData} from './participantDataModel';
import { IArbriterData, ArbriterSchemaData } from './arbriterDataModel';

export interface IScore {
  participantId: string; // ID of the participant
  score: number; // Score for the participant
}
export interface IMatchModel extends Document {
  participants: IParticipantData[];
  arbiter: IArbriterData;
  teamName:String[];
  type:String;
  round: number;
  matchDate: Date;
  tournamentId:String;
  status:String;
  scores: IScore[]; 
  arbiterComment: String;
  nextMatchId: String; 
}

export interface ISeedProps {
  id: string;
  date: string;
  teams: Array<{ name: string }>;
}

export interface IRoundProps {
  title: string;
  seeds: ISeedProps[];
}

export const MatchModelScheme: Schema = new Schema({
  participants: { type: [ParticipantSchemaData], required: true},
  arbiter: { type:ArbriterSchemaData, required: true},
  teamName: { type: [String], required: false },
  type: { type: String, required: false },
  round: { type: Number, required: true },
  matchDate: { type: Date, required: true },
  tournamentId: { type: String,required: true},
  status: { type: String,required: true},
  scores: [{ 
    participantId: { type: String, required: true },
    score: { type: Number, required: true }
}],
  arbiterComment: { type: String,required: false},
  nextMatchId: { type: String,required: false},

});
const MatchModel = mongoose.models?.MatchModel || model<IMatchModel>('MatchModel', MatchModelScheme);

export default MatchModel;

