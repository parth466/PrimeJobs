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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// console.log('MONGO_URI:', process.env.MONGO_URI); // 🔥 Debug here
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // Generic errors
    return res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });