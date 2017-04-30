import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

export const appointmentSchema = new Schema({

  googleEventId: {
    type: String,
  },
  client: {
    type: ObjectId,
    ref: 'User',
  },
  payment: {
    type: ObjectId,
    ref: 'Payment',
  },

}, {
  timestamps: true,
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
