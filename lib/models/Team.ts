import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeam extends Document {
  name: string;
  mobile: string;
  teamName: string;
  address: string;
  managerName: string;
  registeredAt: Date;
  status: "pending" | "confirmed" | "rejected";
}

export interface TeamInput {
  name: string;
  mobile: string;
  teamName: string;
  address: string;
  managerName: string;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "নাম আবশ্যক"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "মোবাইল নাম্বার আবশ্যক"],
      unique: true,
      trim: true,
    },
    teamName: {
      type: String,
      required: [true, "দলের নাম আবশ্যক"],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "ঠিকানা আবশ্যক"],
      trim: true,
    },
    managerName: {
      type: String,
      required: [true, "ম্যানেজারের নাম আবশ্যক"],
      trim: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error in development
const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
