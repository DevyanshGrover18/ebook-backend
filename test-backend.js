import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebookplatform';

const app = express();
app.use('/api/categories', categoryRoutes);

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB.');
  const server = app.listen(5001, () => {
    console.log('Test server running on port 5001');
    fetch('http://127.0.0.1:5001/api/categories')
      .then(async r => {
        console.log('Local status:', r.status);
        const text = await r.text();
        console.log('Local output:', text.substring(0, 200));
        server.close();
        mongoose.disconnect();
      })
      .catch(err => {
        console.error(err);
        server.close();
        mongoose.disconnect();
      });
  });
});
