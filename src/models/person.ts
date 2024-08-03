import mongoose, {
  Document,
  Schema,
  Model,
  CallbackError,
  ObjectId,
} from "mongoose";

export interface IVote {
  voterId: mongoose.Types.ObjectId;
  votes: number;
}

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
  role: "participant" | "reviewer" | "admin" | "selector";
  status: "pending" | "approved" | "spam" | "rejected" | "selected";
  isContestant: boolean;
  personId: number;
  votes: IVote[];
  photo: string;
  videoLink: string;
  getParticipantId: () => string;
  _id: ObjectId;
}

const voteSchema: Schema<IVote> = new Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  votes: { type: Number, required: true },
});

const personSchema: Schema<IPerson> = new Schema({
  personId: { type: Number, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    enum: ["reviewer", "participant", "admin", "selector"],
    default: "participant",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "spam", "rejected", "selected"],
    default: "pending",
  },
  isContestant: {
    type: Boolean,
    default: false,
  },
  votes: [voteSchema],
  photo: {
    type: String,
    default: "",
  },
  videoLink: {
    type: String,
    default: "",
  },
});

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 800 },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

personSchema.pre("save", async function (next) {
  try {
    const doc = this;
    const counter = await Counter.findOneAndUpdate(
      { _id: "personId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    ).exec();

    doc.personId = counter.seq;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

personSchema.methods.getParticipantId = function (): string {
  return `CAC_${800 + this.personId}`;
};

export const Person: Model<IPerson> =
  mongoose.models.Person || mongoose.model<IPerson>("Person", personSchema);
