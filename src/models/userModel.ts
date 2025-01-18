import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
}

const user: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
});

const userModel = mongoose.models?.User || model<IUser>('User', user);

export default userModel;
