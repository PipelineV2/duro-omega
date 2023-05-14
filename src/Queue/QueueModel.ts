import mongoose from "mongoose";

interface QueueAttr {
  name: string;
  description?: string;
  isActive?: boolean;
  service: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export interface QueueDoc extends mongoose.Document {
  name: string;
  description: string | null;
  service: string;
  guests: string[];
  isActive: boolean;
  dateCreated: Date;
  dateModified: Date;
}

interface QueueModel extends mongoose.Model<QueueDoc> {
  build(attr: QueueAttr): QueueDoc;
}

const queueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false, default: null },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    guests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guest",
      },
    ],
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

queueSchema.statics.build = (attrs: QueueAttr) => {
  return new Queue(attrs);
};

const Queue = mongoose.model<QueueDoc, QueueModel>("Queue", queueSchema);

export { Queue };
