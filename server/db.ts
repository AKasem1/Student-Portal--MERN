import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Support both MONGO_URI and MONGO_URL for flexibility
    const mongoURL = process.env.MONGO_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/student_portal';

    await mongoose.connect(mongoURL);

    console.log('📦 MongoDB Connected Successfully');
    console.log(`🔗 Connected to: ${mongoURL.replace(/\/\/.*:.*@/, '//***:***@')}`); // Hide credentials in logs
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('📦 MongoDB Disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB Error:', error);
});
