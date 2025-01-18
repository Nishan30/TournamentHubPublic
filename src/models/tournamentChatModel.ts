// models/TournamentChat.ts
import mongoose, { Schema, Document } from 'mongoose';
import { MessageSchema, IMessage } from './messageModel';

export interface ITournamentChat extends Document {
  tournamentId: string;
  messages: IMessage[];
}

const TournamentChatSchema: Schema = new Schema({
  tournamentId: { type: String, required: true, unique: true },
  messages: [MessageSchema], // Use MessageSchema here
});

// Check if the model already exists before defining
export default mongoose.models.TournamentChat ||
  mongoose.model<ITournamentChat>('TournamentChat', TournamentChatSchema);