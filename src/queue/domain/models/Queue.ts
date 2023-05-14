import { Schema, model, Document, Model } from "mongoose";
import { Client } from './Client';

interface Queue extends Document {
  name: string;
  hostId: string;
  clients: Client[];
  currentClient: Client | null;
}

const queueSchema = new Schema<Queue>({
  name: { type: String, required: true },
  hostId: { type: String, required: true },
  clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  currentClient: { type: Schema.Types.ObjectId, ref: 'Client', default: null },
});

export interface QueueDocument extends Document, Queue {}

const QueueModel = model<Queue>('Queue', queueSchema);

export { QueueModel, Queue };
