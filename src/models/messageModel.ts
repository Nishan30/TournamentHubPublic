// models/Message.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: string;
  senderName: string;
  senderTitle: string; 
  text: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderTitle: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Instead of exporting the model, export the schema
export { MessageSchema };
export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);