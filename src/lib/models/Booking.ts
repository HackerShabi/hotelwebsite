import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  specialRequests?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  roomId: {
    type: String,
    required: true,
    ref: 'Room'
  },
  guestName: {
    type: String,
    required: true
  },
  guestEmail: {
    type: String,
    required: true
  },
  guestPhone: {
    type: String,
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'confirmed'
  },
  specialRequests: {
    type: String
  },
  paymentMethod: {
    type: String
  },
  transactionId: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
BookingSchema.index({ roomId: 1, checkInDate: 1, checkOutDate: 1 });
BookingSchema.index({ guestEmail: 1 });
BookingSchema.index({ bookingId: 1 });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);