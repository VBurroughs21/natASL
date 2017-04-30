const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const appointmentSchema = new Schema({

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

module.exports.appointmentSchema = appointmentSchema;
module.exports.Appointment = mongoose.model('Appointment', appointmentSchema);
