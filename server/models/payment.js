import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

export const paymentSchema = new Schema({

  amount: {
    type: Number,
  },
  client: {
    type: ObjectId,
    ref: 'User',
  },
  appointment: {
    type: ObjectId,
    ref: 'Appointment',
  },
  isSquarePayment: {
    type: Boolean,
    default: false,
  },
  squarePaymentId: {
    type: String,
  },
  notes: {
    type: String,
  },

}, {
  timestamps: true,
});

export const Payment = mongoose.model('Payment', paymentSchema);
