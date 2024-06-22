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
  fileProcessing: boolean;
  profileCompleted: boolean;
  password?: string;
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
    default: null,
  },
  contactNumber: {
    type: String,
    default: "",
  },
  alternateContactNumber: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  profession: {
    type: String,
    default: "",
  },
  motivationReason: {
    type: String,
    default: "",
  },
  fileURL: {
    type: String,
    default: "",
  },
  fileProcessing: {
    type: Boolean,
    default: false,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: null,
  },
});

export const Person: Model<IPerson> =
  mongoose.models.Person || mongoose.model<IPerson>("Person", personSchema);
