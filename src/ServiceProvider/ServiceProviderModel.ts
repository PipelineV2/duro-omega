import mongoose from "mongoose";
import { ServiceDoc } from "../Service/ServiceModel";

interface ServiceProviderAttrs {
  name: string;
  email: string;
  phone?: string;
  password: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export interface ServiceProviderDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: string | null;
  id: string;
  password: string;
  services: ServiceDoc;
  dateCreated: Date;
  dateModified: Date;
}

interface ServiceProviderModel extends mongoose.Model<ServiceProviderDoc> {
  build(attr: ServiceProviderAttrs): ServiceProviderDoc;
}

const serviceProviderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    password: { type: String, required: true, select: true},
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
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

serviceProviderSchema.statics.build = (attrs: ServiceProviderAttrs) => {
  return new ServiceProvider(attrs);
};

const ServiceProvider = mongoose.model<
  ServiceProviderDoc,
  ServiceProviderModel
>("ServiceProvider", serviceProviderSchema);

export { ServiceProvider };
