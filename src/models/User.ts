// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  village?: string;
  district?: string;
  state?: string;
  primaryCrop?: string;
  landSize?: number;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Store hashed passwords!
    role: {
      type: String, 
      require: true,
      enum: ['user', 'admin', 'expert'],
      default: 'user', // Set default role
      required: true
    },
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
