import mongoose from "mongoose";
import { QueueDoc } from "../Queue/QueueModel";

interface ServiceAttrs {
  serviceProviderId: string;
  name: string;
  location: string;
  duration: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export interface ServiceDoc extends mongoose.Document {
  id: string;
  serviceProviderId: string;
  name: string;
  location: string;
  duration: number;
  queue: QueueDoc;
  dateCreated?: Date;
  dateModified?: Date;
}

interface ServiceModel extends mongoose.Model<ServiceDoc> {
  build(attr: ServiceAttrs): ServiceDoc;
}

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true },
    serviceProviderId: { type: String, required: true },
    queue: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Queue",
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

serviceSchema.statics.build = (attrs: ServiceAttrs) => {
  return new ServiceProvider(attrs);
};

const ServiceProvider = mongoose.model<ServiceDoc, ServiceModel>(
  "Service",
  serviceSchema
);

export { ServiceProvider };
