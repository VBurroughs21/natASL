const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({

  email: { type: String },

  password: { type: String, required: true },

  firstName: { type: String },

  lastName: { type: String },

  appointments: [{
    type: ObjectId,
    ref: 'Appointment',
  }],

}, {
  timestamps: true,
});

userSchema.statics.findUserByEmailAndPassword = function (email, password)
{
  return this.findOne({ email })
  .then(user => user.comparePassword(password))
  .catch(err => console.log(err));
}

userSchema.methods.safe = function ()
{
  const { _id, email, firstName, lastName } = this;
  return { _id, email, firstName, lastName };
}

userSchema.methods.comparePassword = function (candidatePassword)
{
  console.log('PASS', candidatePassword);
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      if (!isMatch) return reject({ name: 'Bad Credentials' });
      resolve(this);
    });
  });
};

const encryptPassword = (user, next) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password along with our new salt
    return bcrypt.hash(user.password, salt, (err_, hash) => {
      if (err_) return next(err_);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
}

userSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    return encryptPassword(this, next)
  }
  // generate a salt
  next();
});

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model('User', userSchema);
