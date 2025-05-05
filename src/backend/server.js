import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../backend/api/routes/user.js';

dotenv.config(); // Load env first!

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/user", userRoutes);

// console.log('MONGO_URI:', process.env.MONGO_URI); // 🔥 Debug here

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });