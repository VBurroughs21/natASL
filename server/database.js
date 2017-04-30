const mongoose = require('mongoose');

require('./models');

module.exports.connectDB = (dbUri) => {
  const uri = dbUri || 'mongodb://localhost/nat-asl-development';
  mongoose.connect(uri, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MongoDB Server');
  });
  return mongoose.connection;
}
