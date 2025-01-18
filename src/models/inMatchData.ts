import mongoose, { Schema, Document, model } from 'mongoose';
import ParticipantData, { IParticipantData, ParticipantSchemaData } from './participantDataModel';
import { IArbriterData, ArbriterSchemaData } from './arbriterDataModel';

export interface IScore {
    participantId: string; // ID of the participant
    score: number; // Score for the participant
}

export interface IMatchData extends Document {
    participants: IParticipantData[];
    arbiter: IArbriterData;
    teamName: string[];
    matchId: string;
    matchDate: Date;
    tournamentId: string;
    scores: IScore[]; 
}

export const MatchDataSchema: Schema = new Schema({
    participants: { type: [ParticipantSchemaData], required: true },
    arbiter: { type: ArbriterSchemaData, required: true },
    teamName: { type: [String], required: false },
    matchId: { type: String, required: false },
    matchDate: { type: Date, required: true },
    tournamentId: { type: String, required: true },
    scores: [{ 
        participantId: { type: String, required: true },
        score: { type: Number, required: true }
    }]
});

const MatchData = mongoose.models?.MatchData || model<IMatchData>('MatchData', MatchDataSchema);

export default MatchData;
