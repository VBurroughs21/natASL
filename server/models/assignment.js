import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

export const assignmentSchema = new Schema({

  client: {
    type: ObjectId,
    ref: 'User',
  },
  appointment: {
    type: ObjectId,
    ref: 'Appointment',
  },
  description: {
    type: String,
  },
  completedAt: {
    type: Date,
  },

}, {
  timestamps: true,
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
