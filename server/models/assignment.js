const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const assignmentSchema = new Schema({

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

module.exports.assignmentSchema = assignmentSchema;
module.exports.Assignment = mongoose.model('Assignment', assignmentSchema);
