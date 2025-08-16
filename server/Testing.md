# Testing Documentation

## Overview

This server application uses **Jest** as the primary testing framework with **Supertest** for HTTP endpoint testing. The testing setup includes unit tests, integration tests, and comprehensive API endpoint testing with a MongoDB test database.

## Testing Framework Stack

- **Jest**: Main testing framework
- **Supertest**: HTTP assertion library for API testing
- **MongoDB**: Test database using MongoDB Atlas
- **TypeScript**: Full TypeScript support with ts-jest
- **bcryptjs**: Password hashing for test users
- **jsonwebtoken**: JWT token generation for authenticated tests

## Test Configuration

### Jest Configuration ([jest.config.js](jest.config.js))

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/modules'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      // ts-jest configuration options
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 30000,
  detectOpenHandles: true,
  forceExit: true,
  maxWorkers: 1, // Run tests sequentially
};
```

### Test Environment Setup ([jest.setup.ts](jest.setup.ts))

The setup file handles:
- MongoDB Atlas test database connection
- Database cleanup between tests
- Global test utilities
- Environment variable configuration

```typescript
// Key features:
- beforeAll: Connects to MongoDB Atlas test database
- afterEach: Cleans up test data between tests
- afterAll: Closes database connections
- Global test utilities for creating test data
```

## Test Structure

### Directory Organization

```
server/
├── tests/
│   ├── controllers/
│   │   ├── announcement.controller.test.ts
│   │   ├── quiz.controller.test.ts
│   │   └── user.controller.test.ts
│   ├── integration.test.ts
│   └── model.test.ts
├── modules/
│   ├── announcements/
│   ├── quizzes/
│   └── users/
└── jest.setup.ts
```

## Test Categories

### 1. Controller Tests

**Announcement Controller Tests** ([tests/controllers/announcement.controller.test.ts](tests/controllers/announcement.controller.test.ts))
- `GET /api/announcements` - Pagination and filtering
- `GET /api/announcements/:id` - Single announcement retrieval
- `POST /api/announcements` - Creation with authentication
- Authentication and validation tests

**Quiz Controller Tests** ([tests/controllers/quiz.controller.test.ts](tests/controllers/quiz.controller.test.ts))
- `GET /api/quizzes` - List with pagination
- `GET /api/quizzes/:id` - Single quiz retrieval
- `POST /api/quizzes` - Creation with validation
- Question validation and scoring tests

**User Controller Tests** ([tests/controllers/user.controller.test.ts](tests/controllers/user.controller.test.ts))
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - Authentication
- `GET /api/users/profile` - Profile retrieval
- Password validation and JWT token tests

### 2. Integration Tests

**Full Application Flow** ([tests/integration.test.ts](tests/integration.test.ts))
- API health check
- Complete user registration and login flow
- End-to-end workflow testing

### 3. Model Tests

**Database Model Validation** ([tests/model.test.ts](tests/model.test.ts))
- User model creation and validation
- Password hashing verification
- JSON serialization (password exclusion)
- Duplicate email validation

## Test Utilities

### Global Test Helpers

The `jest.setup.ts` file provides global utilities accessible in all tests:

```typescript
global.testUtils = {
  createTestUser: () => ({
    email: `test_${Date.now()}@example.com`,
    password: 'testPassword123',
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
    // ... quiz configuration
  })
};
```

### Authentication Helpers

Tests that require authentication use JWT tokens:

```typescript
// Example from controller tests
const authToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET || 'testsecret',
  { expiresIn: '1h' }
);

// Usage in tests
.set('Authorization', `Bearer ${authToken}`)
```

## Running Tests

### Available Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run integration tests only
npm run test:integration

# Run unit tests only
npm run test:unit

# Debug tests
npm run test:debug
```

### Test Environment Variables

Tests use a separate environment configuration (`.env.test`):

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/TestDB
JWT_SECRET=testsecret
NODE_ENV=test
```

## Test Database Strategy

### MongoDB Atlas Test Database

- **Connection**: Connects to MongoDB Atlas test database
- **Isolation**: Each test file gets a clean database state
- **Cleanup**: Automatic cleanup between tests
- **Performance**: Sequential test execution to avoid conflicts

### Data Management

```typescript
// Before each test
beforeEach(async () => {
  // Create fresh test data
  const userData = global.testUtils.createTestUser();
  user = await User.create(userData);
});

// After each test
afterEach(async () => {
  // Clean up all collections
  await Promise.all([
    User.deleteMany({}),
    Announcement.deleteMany({}),
    Quiz.deleteMany({})
  ]);
});
```

## Test Patterns and Best Practices

### 1. Test Structure

```typescript
describe('Feature Name', () => {
  describe('Endpoint Group', () => {
    beforeEach(async () => {
      // Setup test data
    });

    it('should handle success case', async () => {
      // Arrange
      const testData = global.testUtils.createTestData();
      
      // Act
      const response = await request(app)
        .post('/api/endpoint')
        .send(testData)
        .expect(201);

      // Assert
      expect(response.body).toHaveProperty('expectedProperty');
    });

    it('should handle error case', async () => {
      // Test error scenarios
    });
  });
});
```

### 2. API Response Testing

```typescript
// Success response structure
expect(response.body).toEqual({
  status: 'success',
  data: {
    // Expected data structure
  }
});

// Error response structure
expect(response.body).toEqual({
  status: 'error',
  message: 'Error description'
});
```

### 3. Authentication Testing

```typescript
// Protected route testing
it('should require authentication', async () => {
  const response = await request(app)
    .post('/api/protected-endpoint')
    .send(testData)
    .expect(401);

  expect(response.body).toHaveProperty('error');
});
```

## Test Coverage Areas

### API Endpoints
- ✅ All CRUD operations
- ✅ Pagination and filtering
- ✅ Input validation
- ✅ Authentication and authorization
- ✅ Error handling

### Data Models
- ✅ Schema validation
- ✅ Business logic validation
- ✅ Data transformation
- ✅ Relationship handling

### Security
- ✅ Password hashing
- ✅ JWT token validation
- ✅ Input sanitization
- ✅ Authentication flows

### Edge Cases
- ✅ Invalid data handling
- ✅ Database connection issues
- ✅ Malformed requests
- ✅ Missing required fields

## Common Test Issues and Solutions

### 1. Jest Deprecation Warning

**Issue**: ts-jest configuration deprecation
**Solution**: Updated to use transform syntax instead of globals

### 2. API Response Structure Mismatch

**Issue**: Tests expect `response.body.announcements` but API returns `response.body.data.announcements`
**Solution**: Update test expectations to match actual API response structure

### 3. User Routes 404 Errors

**Issue**: User registration/login routes return 404
**Solution**: Ensure user routes are properly registered in main app

### 4. Error Property Inconsistency

**Issue**: Some endpoints return `error` property, others return `message`
**Solution**: Standardize error response format across all endpoints

## Performance Considerations

### Test Execution
- **Sequential Execution**: `maxWorkers: 1` prevents database conflicts
- **Connection Pooling**: Reuses database connections between tests
- **Cleanup Optimization**: Efficient collection clearing instead of database dropping

### Memory Management
- **Connection Cleanup**: Properly closes MongoDB connections after tests
- **Handle Detection**: `detectOpenHandles: true` identifies memory leaks
- **Force Exit**: `forceExit: true` ensures test process termination

## Debugging Tests

### Debug Configuration

```bash
# Run tests with Node.js debugger
npm run test:debug

# Debug specific test file
npx jest --detectOpenHandles --forceExit tests/controllers/user.controller.test.ts
```

### Common Debug Scenarios

1. **Database Connection Issues**
   - Check MongoDB Atlas connection string
   - Verify test database permissions
   - Monitor connection pool status

2. **Authentication Failures**
   - Verify JWT secret configuration
   - Check token expiration settings
   - Validate user creation in beforeEach hooks

3. **Test Data Conflicts**
   - Ensure proper cleanup between tests
   - Use unique identifiers for test data
   - Monitor database state between test runs

## Contributing to Tests

### Adding New Tests

1. **Follow naming conventions**: `*.test.ts` or `*.spec.ts`
2. **Use descriptive test names**: Clear description of what is being tested
3. **Include setup and teardown**: Proper data management
4. **Test both success and failure cases**: Comprehensive coverage
5. **Use global test utilities**: Consistent test data creation

### Test Maintenance

1. **Keep tests independent**: Each test should be able to run in isolation
2. **Update tests with API changes**: Maintain synchronization with code changes
3. **Monitor test performance**: Optimize slow-running tests
4. **Review test coverage**: Ensure all critical paths are tested

---

## Quick Reference

### Running Specific Tests
```bash
# Single test file
npm test tests/controllers/user.controller.test.ts

# Tests matching pattern
npm test -- --testNamePattern="should create user"

# Integration tests only
npm run test:integration
```

### Test Database Operations
```bash
# Connect to test database (MongoDB Atlas)
# Automatic connection via jest.setup.ts

# Manual cleanup if needed
# Database cleanup is automatic after each test
```

This testing documentation provides a comprehensive guide for understanding and working with the Jest testing setup in your server application.