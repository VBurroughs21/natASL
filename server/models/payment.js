const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const paymentSchema = new Schema({

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

module.exports.paymentSchema = paymentSchema;
module.exports.Payment = mongoose.model('Payment', paymentSchema);
