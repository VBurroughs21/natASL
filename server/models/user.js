const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const userSchema = new Schema({

  email: { type: String },

  appointments: [{
    type: ObjectId,
    ref: 'Appointment',
  }],

}, {
  timestamps: true,
});

userSchema.plugin(bcrypt);

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model('User', userSchema);
