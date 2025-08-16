# Student Portal Backend

A comprehensive RESTful API backend for a Student Portal application built with Node.js, Express.js, TypeScript, and MongoDB. This backend provides complete functionality for announcements, quizzes, user management, and authentication with comprehensive testing coverage.

## Project Structure

```
server/
├── modules/
│   ├── announcements/
│   │   ├── announcement.model.ts      # Mongoose model and schema
│   │   ├── announcement.controller.ts # Request handlers and business logic
│   │   ├── announcement.routes.ts     # Route definitions
│   │   ├── announcement.schema.ts     # Joi validation schemas
│   │   └── announcement.test.ts       # Unit and integration tests
│   ├── quizzes/
│   │   ├── quiz.model.ts              # Mongoose model and schema
│   │   ├── quiz.controller.ts         # Request handlers and business logic
│   │   ├── quiz.routes.ts             # Route definitions
│   │   ├── quiz.schema.ts             # Joi validation schemas
│   │   └── quiz.test.ts               # Unit and integration tests
│   └── users/
│       ├── user.model.ts              # User model with password hashing
│       ├── user.controller.ts         # Authentication and user management
│       ├── user.routes.ts             # Auth routes (register, login, profile)
│       ├── user.schema.ts             # User validation schemas
│       └── user.test.ts               # Authentication tests
├── middleware/
│   ├── auth.ts                        # JWT authentication middleware
│   ├── errorHandler.ts                # Global error handling middleware
│   ├── validation.ts                  # Request validation middleware
│   └── logger.ts                      # Request logging middleware
├── utils/
│   ├── dateUtils.ts                   # Date utility functions
│   ├── responseUtils.ts               # API response utility functions
│   └── tokenUtils.ts                  # JWT token generation and validation
├── docs/
│   ├── swagger.config.ts              # Swagger configuration
│   └── swagger.yaml                   # OpenAPI 3.0 specification
├── tests/
│   ├── controllers/
│   │   ├── announcement.controller.test.ts  # Announcement API tests
│   │   ├── quiz.controller.test.ts          # Quiz API tests
│   │   └── user.controller.test.ts          # User authentication tests
│   ├── integration.test.ts            # End-to-end integration tests
│   └── model.test.ts                  # Database model tests
├── app.ts                             # Express app configuration
├── server.ts                          # Server entry point
├── db.ts                              # MongoDB connection setup
├── jest.config.js                     # Jest testing configuration
├── jest.setup.ts                      # Jest setup and test utilities
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── .env                               # Environment variables
├── .env.test                          # Test environment variables
└── .gitignore                         # Git ignore patterns
```

## Features

### 🔐 Authentication & User Management
- ✅ **User Registration** with email validation and password hashing
- ✅ **User Login** with JWT token generation
- ✅ **Password Security** using bcryptjs with salt rounds
- ✅ **JWT Authentication** for protected routes
- ✅ **User Profile Management** with password exclusion in responses
- ✅ **Role-based Access Control** (Admin, Instructor, Student)
- ✅ **Input Validation** with comprehensive error handling

### 📢 Announcements Module
- ✅ **Create** new announcements with title, content, author, and priority
- ✅ **Read** announcements with pagination and filtering (by priority, active status)
- ✅ **Update** existing announcements with authentication
- ✅ **Delete** announcements with proper authorization
- ✅ **Advanced Filtering** by date range, priority, and author
- ✅ **Validation** using Joi schemas
- ✅ **Tests** with comprehensive test coverage

### 📝 Quizzes Module
- ✅ **Create** quizzes with multiple-choice questions
- ✅ **Read** quizzes with filtering (by subject, instructor, active status)
- ✅ **Update** existing quizzes with validation
- ✅ **Delete** quizzes with proper authorization
- ✅ **Active Quizzes** endpoint for students (hides correct answers)
- ✅ **Question Management** with validation for correct answer indices
- ✅ **Automatic Point Calculation** based on question points
- ✅ **Date Range Validation** for quiz availability
- ✅ **Tests** with comprehensive test coverage

### 🧪 Testing Framework
- ✅ **Jest Testing Suite** with TypeScript support
- ✅ **Supertest** for HTTP endpoint testing
- ✅ **MongoDB Atlas Test Database** for realistic testing
- ✅ **Test Utilities** for creating test data
- ✅ **Authentication Testing** with JWT token validation
- ✅ **Integration Tests** for complete user flows
- ✅ **Model Tests** for database validation
- ✅ **Test Coverage** for all critical paths

### 📖 API Documentation
- ✅ **Swagger/OpenAPI 3.0** - Interactive API documentation
- ✅ **Live Testing Interface** - Test endpoints directly from documentation
- ✅ **Request/Response Examples** - Comprehensive examples for all endpoints
- ✅ **Authentication Documentation** - JWT token usage examples
- ✅ **Schema Validation** - Data model definitions and validation rules

## API Endpoints

### 🔐 Authentication
- `POST /api/users/signup` - Signup new user account
- `POST /api/users/login` - User login with email/password
- `GET /api/users/profile` - Get authenticated user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/logout` - User logout (token invalidation)

### 📢 Announcements
- `GET /api/announcements` - Get all announcements with pagination and filters
- `GET /api/announcements/:id` - Get single announcement by ID
- `POST /api/announcements` - Create new announcement (Auth required)
- `PUT /api/announcements/:id` - Update announcement (Auth required)
- `DELETE /api/announcements/:id` - Delete announcement (Auth required)

### 📝 Quizzes
- `GET /api/quizzes` - Get all quizzes with pagination and filters
- `GET /api/quizzes/active` - Get currently active quizzes (for students)
- `GET /api/quizzes/:id` - Get single quiz by ID
- `POST /api/quizzes` - Create new quiz (Auth required)
- `PUT /api/quizzes/:id` - Update quiz (Auth required)
- `DELETE /api/quizzes/:id` - Delete quiz (Auth required)

### 🏥 Health Check
- `GET /api/health` - API health check endpoint with database status

### 📖 API Documentation
- `GET /api-docs` - **Swagger UI** - Interactive API documentation interface
- `GET /api-docs.json` - OpenAPI 3.0 JSON specification
- `GET /api-docs.yaml` - OpenAPI 3.0 YAML specification

## API Documentation with Swagger

### Accessing the Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:4000/api-docs
```

The Swagger UI provides:
- **Interactive Testing**: Test all endpoints directly from the browser
- **Authentication**: Built-in JWT token authentication for protected routes
- **Request Examples**: Sample request bodies for all POST/PUT operations
- **Response Examples**: Expected response formats for all status codes
- **Schema Definitions**: Complete data model documentation

### Swagger Features

#### 🔐 Authentication Testing
```typescript
// In Swagger UI, authenticate using:
// 1. Click "Authorize" button
// 2. Enter: Bearer YOUR_JWT_TOKEN
// 3. All protected routes will use this token automatically
```

#### 📊 Complete API Coverage
- **All Endpoints**: Every API endpoint is documented with examples
- **HTTP Methods**: GET, POST, PUT, DELETE operations
- **Parameters**: Query parameters, path parameters, request bodies
- **Responses**: All possible response codes (200, 201, 400, 401, 404, 500)

#### 🎯 Interactive Testing Examples

**User Registration**:
```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "student"
}
```

**Create Announcement** (Authenticated):
```json
POST /api/announcements
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "title": "Important Announcement",
  "content": "This is an important message for all students.",
  "priority": "high",
  "targetAudience": "students"
}
```

**Quiz Creation** (Authenticated):
```json
POST /api/quizzes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "title": "Mathematics Quiz",
  "description": "Basic algebra and geometry questions",
  "subject": "Mathematics",
  "duration": 60,
  "questions": [
    {
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": 1,
      "points": 10
    }
  ],
  "startDate": "2025-08-20T09:00:00Z",
  "endDate": "2025-08-25T18:00:00Z"
}
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB (v5 or higher)
- npm or yarn

### Install Dependencies
```bash
cd server
npm install

# Swagger dependencies are included:
# - swagger-ui-express: Interactive documentation UI
# - swagger-jsdoc: Generate OpenAPI spec from JSDoc comments
# - @types/swagger-ui-express: TypeScript definitions
```

### Environment Variables

Create a `.env` file in the project root:
```env
# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_portal
MONGO_DB_NAME=student_portal

# Server Configuration
PORT=4000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# API Documentation
API_DOCS_ENABLED=true
API_DOCS_PATH=/api-docs

# Logging
LOG_LEVEL=info
```

Create a `.env.test` file for testing:
```env
# Test Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_portal_test
MONGO_DB_NAME=student_portal_test

# Test JWT Configuration
JWT_SECRET=test-jwt-secret
JWT_EXPIRES_IN=1h

# Test Environment
NODE_ENV=test
API_DOCS_ENABLED=false
```

### Run the Application

#### Development Mode
```bash
npm run dev

# API Documentation available at:
# http://localhost:4000/api-docs
```

#### Production Build
```bash
npm run build
npm start

# API Documentation (if enabled):
# http://localhost:4000/api-docs
```

#### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests only
npm run test:integration

# Run with coverage report
npm run test:coverage

# Debug tests
npm run test:debug
```

## Data Models

### User Model
```typescript
interface IUser {
  name: string;            // Required, 2-50 chars
  email: string;           // Required, unique, valid email
  password: string;        // Required, min 6 chars (hashed in DB)
  role: 'student' | 'instructor' | 'admin';  // Default: 'student'
  isActive: boolean;       // Default: true
  lastLogin: Date;         // Auto-updated on login
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-generated
}
```

### Announcement Model
```typescript
interface IAnnouncement {
  title: string;           // Required, max 200 chars
  content: string;         // Required, max 2000 chars
  author: ObjectId;        // Required, references User model
  priority: 'low' | 'medium' | 'high';  // Default: 'medium'
  isActive: boolean;       // Default: true
  targetAudience: 'all' | 'students' | 'instructors';  // Default: 'all'
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-generated
}
```

### Quiz Model
```typescript
interface IQuiz {
  title: string;           // Required, max 200 chars
  description: string;     // Required, max 1000 chars
  instructor: ObjectId;    // Required, references User model
  subject: string;         // Required, max 100 chars
  duration: number;        // Minutes, min 5, max 300
  totalPoints: number;     // Auto-calculated from questions
  questions: IQuestion[];  // At least 1 question required
  isActive: boolean;       // Default: true
  startDate: Date;         // Required
  endDate: Date;           // Required, must be after startDate
  allowMultipleAttempts: boolean;  // Default: false
  passingScore: number;    // Percentage, default: 60
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-generated
}

interface IQuestion {
  question: string;        // Required, max 500 chars
  options: string[];       // 2-6 options, max 200 chars each
  correctAnswer: number;   // Index of correct option
  points: number;          // Min 1, default 1
  explanation?: string;    // Optional explanation for correct answer
}
```

## API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Optional success message",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "details": ["Validation error details"] // Optional
}
```

### Authentication Response
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "student"
      // Note: password is never included in responses
    }
  }
}
```

### Paginated Response
```json
{
  "status": "success",
  "data": {
    "announcements": [...], // or "quizzes"
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

## Authentication & Security

### JWT Token Authentication
- **Token Generation**: On successful login/registration
- **Token Validation**: Required for protected routes
- **Token Expiration**: Configurable via environment variables
- **Password Security**: bcryptjs with salt rounds for hashing

### Protected Routes
All routes requiring authentication use the `auth` middleware:
```typescript
router.post('/announcements', auth, createAnnouncement);
router.put('/announcements/:id', auth, updateAnnouncement);
router.delete('/announcements/:id', auth, deleteAnnouncement);
```

### Swagger Authentication
In the Swagger UI, authenticate by:
1. Click the **"Authorize"** button (🔒)
2. Enter: `Bearer YOUR_JWT_TOKEN`
3. Click **"Authorize"**
4. All protected endpoints will now include the authorization header

### Role-based Access Control
```typescript
// Example role-based middleware usage
router.delete('/announcements/:id', auth, requireRole(['admin', 'instructor']), deleteAnnouncement);
```

## Testing Documentation

### Testing Framework Stack
- **Jest**: Main testing framework with TypeScript support
- **Supertest**: HTTP assertion library for API endpoint testing
- **MongoDB Atlas**: Real database testing environment
- **bcryptjs**: Password hashing for test user creation
- **jsonwebtoken**: JWT token generation for authenticated tests

### Test Categories

#### 1. Controller Tests
- **Announcement Controller**: CRUD operations, pagination, authentication
- **Quiz Controller**: Quiz management, question validation, date ranges
- **User Controller**: Registration, login, profile management, JWT validation

#### 2. Integration Tests
- **Full User Flow**: Complete registration → login → authenticated operations
- **API Health Check**: Database connectivity and service status

#### 3. Model Tests
- **User Model**: Password hashing, JSON serialization, validation
- **Database Relationships**: Foreign key constraints and population

### Test Utilities
Global test helpers available in all test files:
```typescript
// Available in jest.setup.ts
global.testUtils = {
  createTestUser: () => ({ /* user data */ }),
  createTestAnnouncement: () => ({ /* announcement data */ }),
  createTestQuiz: () => ({ /* quiz data */ }),
  generateAuthToken: (userId) => { /* JWT token */ }
};
```

### Running Tests
```bash
# All tests with MongoDB Atlas
npm test

# Specific test file
npm test tests/controllers/user.controller.test.ts

# Integration tests only
npm run test:integration

# Watch mode for development
npm run test:watch
```

## Error Handling

### Global Error Handler
Centralized error handling with proper HTTP status codes:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource doesn't exist)
- **500**: Internal Server Error (unexpected errors)

### Validation Errors
Comprehensive input validation using Joi schemas:
```typescript
// Example validation error response
{
  "status": "error",
  "message": "Validation error",
  "details": [
    "Email is required",
    "Password must be at least 6 characters long"
  ]
}
```

## Best Practices Implemented

### Code Organization
- ✅ **Modular Structure** - Feature-based module organization
- ✅ **Separation of Concerns** - Clear separation of models, controllers, routes
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Error Handling** - Centralized error handling with proper HTTP status codes

### Security
- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Input Sanitization** - Prevents injection attacks
- ✅ **CORS Configuration** - Cross-origin request handling
- ✅ **Environment Variables** - Sensitive data protection

### Data Validation
- ✅ **Input Validation** - Joi schemas for request validation
- ✅ **Database Validation** - Mongoose schema validation
- ✅ **Business Logic Validation** - Custom validation for complex rules
- ✅ **ObjectId Validation** - Proper MongoDB ObjectId handling

### Testing
- ✅ **Unit Tests** - Individual function testing
- ✅ **Integration Tests** - Full API endpoint testing
- ✅ **Authentication Tests** - JWT token validation and user flows
- ✅ **Real Database Testing** - MongoDB Atlas for realistic test scenarios
- ✅ **Comprehensive Coverage** - All CRUD operations and edge cases

### Documentation
- ✅ **Swagger/OpenAPI 3.0** - Interactive API documentation
- ✅ **Request/Response Examples** - Complete examples for all endpoints
- ✅ **Authentication Guide** - JWT token usage documentation
- ✅ **Live Testing** - Test endpoints directly from documentation

### Performance & Scalability
- ✅ **Database Indexing** - Optimized queries with proper indexes
- ✅ **Pagination** - Efficient data fetching for large datasets
- ✅ **Query Optimization** - Selective field retrieval
- ✅ **Connection Pooling** - MongoDB connection management

## Development Workflow

### Code Quality
```bash
# Linting (if configured)
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

### Database Management
```bash
# Development with MongoDB Atlas
npm run dev

# Test database cleanup (automatic)
npm test
```

### Environment Management
- **Development**: `.env` with development database and enabled API docs
- **Testing**: `.env.test` with test database and disabled API docs
- **Production**: Environment-specific configuration

### API Documentation Workflow
1. **Development**: Update Swagger comments when adding/modifying endpoints
2. **Testing**: Verify documentation accuracy using Swagger UI
3. **Deployment**: Ensure API docs are properly configured for production

## Production Deployment Checklist

### Environment Configuration
- [ ] Production MongoDB Atlas cluster
- [ ] Secure JWT secret (min 32 characters)
- [ ] Proper CORS origins
- [ ] Environment variables secured
- [ ] Logging configuration
- [ ] API documentation settings (enable/disable for production)

### Security Hardening
- [ ] Rate limiting implementation
- [ ] Request size limits
- [ ] Security headers (helmet.js)
- [ ] Input sanitization review
- [ ] Password policy enforcement
- [ ] API documentation access control

### Performance Optimization
- [ ] Database indexing optimization
- [ ] Query performance monitoring
- [ ] Response compression
- [ ] Caching strategy (Redis)
- [ ] Load balancing configuration

### Monitoring & Logging
- [ ] Application logging (Winston)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database monitoring
- [ ] Health check endpoints

## Future Enhancements

### Advanced Features
- **File Upload**: Attachment support for announcements
- **Quiz Attempts**: Student quiz submission and scoring
- **Email Notifications**: Announcement and quiz notifications
- **Real-time Updates**: WebSocket integration for live updates
- **Analytics**: Dashboard with usage statistics

### API Improvements
- **API Versioning**: Support for multiple API versions
- **GraphQL**: Alternative to REST for complex queries
- **Pagination Cursors**: Cursor-based pagination for large datasets
- **Bulk Operations**: Batch processing for multiple records

### Documentation Enhancements
- **Postman Collections**: Exportable API collections
- **SDK Generation**: Auto-generated client SDKs
- **API Changelog**: Version history and breaking changes
- **Interactive Examples**: More comprehensive use cases

### DevOps & Infrastructure
- **Docker Containerization**: Multi-stage Docker builds
- **CI/CD Pipeline**: Automated testing and deployment
- **Kubernetes**: Container orchestration
- **Microservices**: Service decomposition for scalability

## Contributing

1. **Follow Code Standards**: Use TypeScript with proper type definitions
2. **Write Tests**: All new features must include comprehensive tests
3. **Update Documentation**: Keep API documentation synchronized with Swagger comments
4. **Security Review**: Ensure all inputs are validated and sanitized
5. **Performance Consideration**: Monitor database queries and response times

### Development Commands
```bash
# Setup development environment
npm install
cp .env.example .env
npm run dev

# Access API documentation
open http://localhost:4000/api-docs

# Run tests before committing
npm test
npm run test:coverage

# Build and verify production readiness
npm run build
npm start
```

---

## Support & Documentation

- **API Documentation**: Interactive Swagger UI at `/api-docs`
- **Testing Guide**: Detailed testing patterns and best practices
- **Security Guidelines**: Authentication and authorization implementation
- **Performance Tips**: Database optimization and scaling strategies

### Quick Links
- **📖 API Documentation**: `http://localhost:4000/api-docs`
- **🧪 Run Tests**: `npm test`
- **🚀 Start Development**: `npm run dev`
- **📊 Test Coverage**: `npm run test:coverage`

For detailed testing documentation, see the separate [Testing Documentation](./TESTING.md) file.
