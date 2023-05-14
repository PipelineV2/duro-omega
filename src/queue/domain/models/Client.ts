import { Document, Schema, model } from 'mongoose';

export interface Client extends Document {
  name: string;
  email: string;
  message: string;
}

const ClientSchema = new Schema<Client>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export const ClientModel = model<Client>('Client', ClientSchema);
