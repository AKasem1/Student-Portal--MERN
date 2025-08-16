# Student Portal - Full-Stack Application

A comprehensive Student Portal application built with modern web technologies. This full-stack solution provides students and instructors with a complete platform for managing announcements, quizzes, and academic activities.

## 🏗️ Architecture Overview

```
Student Portal/
├── client/                    # React Frontend Application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Redux state management
│   │   ├── services/         # API integration layer
│   │   └── tests/            # Frontend test suites
│   └── package.json
├── server/                    # Node.js Backend API
│   ├── modules/
│   │   ├── announcements/    # Announcements module
│   │   ├── quizzes/          # Quizzes module
│   │   └── users/            # User authentication module
│   ├── tests/                # Backend test suites
│   └── package.json
├── postman/                   # API Testing Collection
│   └── Student-Portal-API.postman_collection.json
└── README.md                 # This file
```

## 🚀 Tech Stack

### Frontend (Client)
- **React 18** with TypeScript for UI development
- **Vite** for fast development and optimized builds
- **Redux Toolkit** for state management
- **React Router** for client-side routing
- **Axios** for HTTP requests
- **react-i18next** for internationalization
- **Vitest** + **React Testing Library** for testing

### Backend (Server)
- **Node.js** with **Express.js** framework
- **TypeScript** for type safety
- **MongoDB Atlas** for database
- **Mongoose** for ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Joi** for input validation
- **Jest** + **Supertest** for testing

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Role-based access control (Student, Instructor, Admin)
- Password hashing and security
- Protected routes and middleware

### 📢 Announcements System
- Create, read, update, delete announcements
- Priority levels (Low, Medium, High)
- Target audience filtering
- Pagination and advanced filtering
- Real-time notifications

### 📝 Quiz Management
- Interactive quiz creation and management
- Multiple-choice questions with validation
- Time-limited quizzes
- Automatic scoring and feedback
- Student quiz attempts tracking

### 🌐 Internationalization
- Multi-language support
- RTL language support
- Dynamic language switching
- Localized content management

### 📊 Dashboard
- Student dashboard with key metrics
- Upcoming assignments and deadlines
- Recent announcements
- Exam tips and study guidance

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/AKasem1/Student-Portal--MERN
cd student-portal
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Server Environment Variables** (`.env`):
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_portal
MONGO_DB_NAME=student_portal

# Server
PORT=4000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Client Environment Variables** (`.env`):
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api
VITE_NODE_ENV=development

# Authentication
VITE_TOKEN_STORAGE_KEY=student_portal_token

# Internationalization
VITE_DEFAULT_LANGUAGE=en
VITE_SUPPORTED_LANGUAGES=en,ar,fr
```

### 4. Database Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGO_URI` in server `.env`
4. The application will create collections automatically

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:4000
```

**Terminal 2 - Frontend Application:**
```bash
cd client
npm run dev
# Client runs on http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 🧪 Testing

### Backend Testing
```bash
cd server

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run in watch mode
npm run test:watch
```

### Frontend Testing
```bash
cd client

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Full Test Suite
```bash
# Run both backend and frontend tests
npm run test:all
```

## 📋 API Documentation & Testing

### Interactive API Documentation
The backend includes comprehensive API documentation with interactive testing capabilities:

- **Swagger UI**: Available at `http://localhost:4000/api-docs` when server is running
- **OpenAPI 3.0**: Complete API specification with request/response examples
- **Authentication**: Built-in JWT token testing in Swagger interface

### Postman Collection
A complete Postman collection is included for API testing and development:

**Location**: `./postman/Student-Portal-API.postman_collection.json`

**Features**:
- ✅ All API endpoints with examples
- ✅ Pre-configured environment variables
- ✅ Authentication workflow with automatic token management
- ✅ Test scripts for response validation
- ✅ Request/response examples for all endpoints

**Import Instructions**:
1. Open Postman
2. Click "Import" button
3. Select `Student-Portal-API.postman_collection.json`
4. Configure environment variables:
   - `base_url`: `http://localhost:4000/api`
   - `token`: Will be auto-set after login

**Collection Structure**:
```
Student Portal API/
├── Authentication/
│   ├── Register User
│   ├── Login User
│   └── Get Profile
├── Announcements/
│   ├── Get All Announcements
│   ├── Get Announcement by ID
│   ├── Create Announcement
│   ├── Update Announcement
│   └── Delete Announcement
├── Quizzes/
│   ├── Get All Quizzes
│   ├── Get Active Quizzes
│   ├── Get Quiz by ID
│   ├── Create Quiz
│   ├── Update Quiz
│   └── Delete Quiz
└── Health Check/
    └── API Health Status
```

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Announcements Endpoints
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get single announcement
- `POST /api/announcements` - Create announcement (Auth required)
- `PUT /api/announcements/:id` - Update announcement (Auth required)
- `DELETE /api/announcements/:id` - Delete announcement (Auth required)

### Quizzes Endpoints
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/active` - Get active quizzes
- `GET /api/quizzes/:id` - Get single quiz
- `POST /api/quizzes` - Create quiz (Auth required)
- `PUT /api/quizzes/:id` - Update quiz (Auth required)
- `DELETE /api/quizzes/:id` - Delete quiz (Auth required)

### Authentication Header Format
```
Authorization: Bearer <jwt_token>
```

### API Response Format
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Testing Workflow with Postman
1. **Import Collection**: Load the provided Postman collection
2. **Register/Login**: Use authentication endpoints to get JWT token
3. **Auto Token**: Token automatically saved to environment variables
4. **Test Endpoints**: All protected routes will use the token automatically
5. **Validate Responses**: Built-in tests validate response structure

## 🔧 Configuration

### Environment Variables

#### Required Server Variables
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (min 32 characters)
- `PORT` - Server port (default: 4000)

#### Required Client Variables
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_DEFAULT_LANGUAGE` - Default application language

#### Optional Variables
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed origins for CORS
- `LOG_LEVEL` - Logging level

### 🎥 Demo Video
Watch the complete application walkthrough and feature demonstration:

**[📺 Student Portal Demo Video](https://drive.google.com/file/d/1aVbMoR4uWC8nYY5ef9qKunOQFx7Bf-SU/view?usp=sharing)**

*This video showcases the full functionality including user authentication, dashboard features, announcements management, quiz system, and internationalization capabilities.*

## 📚 Project Documentation

### Backend Documentation
- [Server README](./server/README.md) - Comprehensive backend documentation
- [API Documentation](./server/README.md#api-endpoints) - REST API reference
- [Swagger UI](http://localhost:4000/api-docs) - Interactive API testing
- [Testing Guide](./server/TESTING.md) - Backend testing documentation

### Frontend Documentation
- [Client README](./client/README.md) - Frontend application documentation
- [Dashboard Guide](./client/DASHBOARD.md) - Dashboard components documentation
- [Component Architecture](./client/README.md#component-architecture) - UI architecture guide

### API Testing Resources
- **Postman Collection**: `./postman/Student-Portal-API.postman_collection.json`
- **Swagger Documentation**: `http://localhost:4000/api-docs`
- **API Examples**: Comprehensive request/response examples in both tools

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API routes
- Secure password policies

### Data Protection
- Input validation and sanitization
- XSS protection
- CORS configuration
- Environment variable protection
- SQL injection prevention (NoSQL)

### Security Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Secure cookie settings

## 📊 Performance Optimization

### Frontend Optimizations
- Code splitting with React.lazy
- Image optimization and lazy loading
- Bundle size optimization
- Caching strategies
- Service worker for PWA features

### Backend Optimizations
- Database indexing
- Query optimization
- Response caching
- Connection pooling
- Rate limiting

### Development Commands
```bash
# Setup development environment
npm run setup

# Run both frontend and backend in development
npm run dev

# Run all tests
npm run test:all

# Build both applications
npm run build:all

# Clean all dependencies and builds
npm run clean
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check MongoDB connection string
# Ensure IP address is whitelisted in MongoDB Atlas
# Verify username/password credentials
```

#### CORS Errors
```bash
# Update CORS_ORIGIN in server .env
# Ensure client URL matches CORS configuration
```

#### Authentication Issues
```bash
# Check JWT_SECRET configuration
# Verify token storage in client localStorage
# Ensure API endpoints are correctly configured
```

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version compatibility
node --version  # Should be v18+
```

## 📈 Monitoring & Analytics

### Health Checks
- `GET /api/health` - API health status
- Database connectivity monitoring
- Service uptime tracking

### Logging
- Structured logging with Winston
- Error tracking and reporting
- Performance monitoring
- User activity analytics

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Full authentication system
- ✅ Announcements CRUD operations
- ✅ Quiz management system
- ✅ Dashboard with widgets
- ✅ Internationalization support
- ✅ Comprehensive testing suite
- ✅ API documentation


## 📞 Support

### Getting Help
- 📖 Check documentation in `/server/README.md` and `/client/README.md`

### Resources
- **Backend API**: [Server Documentation](./server/README.md)
- **Frontend Guide**: [Client Documentation](./client/README.md)
- **API Testing**: [Postman Collection](./postman/Student-Portal-API.postman_collection.json)
- **Interactive Docs**: [Swagger UI](http://localhost:4000/api-docs)
- **Testing**: [Testing Documentation](./server/TESTING.md)
- **Deployment**: [Deployment Guide](#deployment)

---

**Quick Start Commands:**
```bash
# Complete setup
git clone https://github.com/AKasem1/Student-Portal--MERN
cd student-portal

# Backend setup
cd server && npm install && cp .env.example .env

# Frontend setup  
cd ../client && npm install && cp .env.example .env

# Import Postman collection for API testing
# File: ./postman/Student-Portal-API.postman_collection.json

# Run development servers
cd ../server && npm run dev  # Terminal 1
cd ../client && npm run dev  # Terminal 2
```

🎉 **Happy coding!** Your Student Portal is ready to transform education.