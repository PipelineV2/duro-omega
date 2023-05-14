import { Schema, model, Document, Model } from "mongoose";
export interface User extends Document {
  userId: string;
  email: string;
  password: string;
  verificationToken: string;
  verified: boolean;
}

const UserSchema = new Schema<User>({
  userId: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  verificationToken: { type: String, required: true },
  verified: {type: Boolean, required: false, default: false}
});
export interface UserDocument extends Document, User {}

export const UserModel = model<User>('User', UserSchema);
