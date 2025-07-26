import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  featured?: boolean;
  price?: number;
  duration?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
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
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  duration: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);