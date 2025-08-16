import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test timeout
jest.setTimeout(30000);

// Setup before all tests
beforeAll(async () => {
  try {
    // Close any existing mongoose connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // Connect to MongoDB Atlas test database
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      throw new Error('MONGO_URL not found in environment variables');
    }

    console.log('Connecting to test database...');
    await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
    
    console.log('Connected to test database:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
}, 30000);

// Cleanup after each test
afterEach(async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Clear all collections but don't drop the database
      const collections = mongoose.connection.collections;
      const promises = Object.keys(collections).map(async (key) => {
        if (collections[key]) {
          await collections[key].deleteMany({});
        }
      });
      await Promise.all(promises);
    }
  } catch (error) {
    console.error('Error cleaning up test data:', error);
  }
}, 10000);

// Cleanup after all tests
afterAll(async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Clear all collections instead of dropping database
      const collections = mongoose.connection.collections;
      const promises = Object.keys(collections).map(async (key) => {
        if (collections[key]) {
          await collections[key].deleteMany({});
        }
      });
      await Promise.all(promises);
      
      await mongoose.connection.close();
    }
    
    console.log('Test database cleanup completed');
  } catch (error) {
    console.error('Error during test cleanup:', error);
  }
}, 30000);

// Global test utilities
global.testUtils = {
  createTestUser: () => ({
    email: `test_${Date.now()}@example.com`, // Unique email for each test
    password: 'testPassword123',
    name: 'Test User'
  }),
  
  createTestAnnouncement: () => ({
    title: `Test Announcement ${Date.now()}`,
    content: 'This is a test announcement',
    course: 'Test Course'
  }),
  
  createTestQuiz: () => ({
    title: `Test Quiz ${Date.now()}`,
    description: 'This is a test quiz',
    course: 'Test Course',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: 60,
    totalMarks: 100,
    questions: [
      {
        questionText: 'What is 2 + 2?',
        questionType: 'multiple-choice',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        marks: 25
      }
    ]
  })
};

// Extend global types
declare global {
  var testUtils: {
    createTestUser: () => any;
    createTestAnnouncement: () => any;
    createTestQuiz: () => any;
  };
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});