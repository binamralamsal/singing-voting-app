import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPerson extends Document {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  contactNumber: string;
  alternateContactNumber?: string;
  address: string;
  profession: string;
  motivationReason: string;
  fileURL?: string;
}

const personSchema: Schema<IPerson> = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  alternateContactNumber: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  motivationReason: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    default: "",
  },
});

export const Person: Model<IPerson> =
  mongoose.models.Person || mongoose.model<IPerson>("Person", personSchema);
