import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String,
    required: true
  }],
  maxGuests: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  bedType: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);