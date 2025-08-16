import app from './app';
import { connectDB } from './db';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI configured: ${process.env.MONGO_URI ? 'Yes' : 'No'}`);
});
