import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

const { ObjectId } = Schema.Types;

export const userSchema = new Schema({

  email: { type: String },

  appointments: [{
    type: ObjectId,
    ref: 'Appointment',
  }],

}, {
  timestamps: true,
});

userSchema.plugin(bcrypt);

export const User = mongoose.model('User', userSchema);
