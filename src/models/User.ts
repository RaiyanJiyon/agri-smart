// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  village?: string;
  district?: string;
  state?: string;
  primaryCrop?: string;
  landSize?: number;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords!
    village: String,
    district: String,
    state: String,
    primaryCrop: String,
    landSize: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
