import mongoose from "mongoose";
import { QueueDoc } from "../Queue/QueueModel";

export enum Status {
  waiting = "waiting",
  inProgress = "in-progress",
  completed = "completed",
}

interface GuestAttrs {
  name: string;
  email: string;
  phone: string;
  position: number;
  estWaitTime: number;
  status: string;
  queue: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export interface GuestDoc extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: number;
  estWaitTime: number;
  status: string;
  queue: QueueDoc;
  dateCreated: Date;
  dateModified: Date;
}

interface GuestModel extends mongoose.Model<GuestDoc> {
  build(attr: GuestAttrs): GuestDoc;
}

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: Number, required: true },
    estWaitTime: { type: Number, required: true },
    status: { type: String, enum: Object.values(Status), default: "waiting" },
    queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

guestSchema.statics.build = (attrs: GuestAttrs) => {
  return new Guest(attrs);
};

const Guest = mongoose.model<GuestDoc, GuestModel>("Guest", guestSchema);

export { Guest };
