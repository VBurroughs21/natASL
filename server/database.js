import mongoose from 'mongoose';
import './models';

export const connectDB = (dbUri) => {
  const uri = dbUri || 'mongodb://localhost/nat-asl-development';
  mongoose.connect(uri, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MongoDB Server');
  });
}
