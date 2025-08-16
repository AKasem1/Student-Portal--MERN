# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Coligo Student Portal

A full-stack student portal application built with React, Redux, TypeScript, and Material-UI for the frontend, and Express.js with MongoDB for the backend.

## 🚀 Features

### Authentication System
- **Login/Signup**: User authentication with JWT tokens
- **Protected Routes**: HOC (`requireAuth`) that protects dashboard routes
- **Quick Login**: Demo login without credentials
- **Persistent Sessions**: Tokens stored in localStorage

### Dashboard Features
- **Responsive Design**: Works on all screen sizes
- **Material-UI Components**: Modern, clean UI design
- **Internationalization (i18n)**: Ready for multi-language support
- **Sidebar Navigation**: With hover effects
- **Announcements & Quizzes**: Integration with backend APIs

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **i18next** for internationalization
- **Axios** for API calls
- **Vitest** for testing

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Joi** for validation

## 🏗 Project Structure

```
client/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hoc/              # Higher Order Components
│   ├── store/            # Redux store and slices
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── tests/            # Test files
│   └── utils/            # Utility functions
├── public/               # Static assets
└── package.json

server/
├── modules/
│   ├── announcements/    # Announcement CRUD
│   ├── quizzes/         # Quiz CRUD
│   └── users/           # User authentication
├── middleware/          # Express middleware
└── utils/              # Server utilities
```

## 🎯 Key Components

### HOC (Higher Order Component)
- **requireAuth**: Protects routes and redirects unauthenticated users

### Authentication Flow
1. User visits home page
2. Can use "Quick Login" or enter credentials
3. JWT token stored in localStorage
4. Protected routes accessible via HOC
5. Auto-redirect to home if token expires

### State Management
- **Redux Toolkit** for global state
- **Auth Slice**: Handles user authentication state
- **Persistent State**: Tokens and user data in localStorage

## 🎨 Design Features

- **Teal Color Scheme**: Matches the provided design
- **Responsive Layout**: Mobile-first approach
- **Hover Effects**: Sidebar links change to white on hover
- **Material Design**: Clean, modern interface
- **Loading States**: Proper loading indicators

## 🧪 Testing

- **Vitest** for unit tests
- **React Testing Library** for component tests
- **HOC Testing**: Comprehensive authentication flow tests

## 🌐 Internationalization

Ready for multiple languages:
- English (default)
- Arabic (RTL support ready)
- Extensible for more languages

## 🔧 Environment Variables

```env
VITE_API_URL=http://localhost:4000
```

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected routes with HOC
- Automatic token expiration handling
- CORS enabled

## 🚦 Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`

The application will be available at `http://localhost:5173`

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Student Portal Frontend

A modern React frontend application built with Vite, TypeScript, and Redux Toolkit for the Student Portal.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls
- **react-i18next** for internationalization
- **Vitest** + **React Testing Library** for testing

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── dashboard/           # Dashboard widgets
│   │   └── layout/              # Layout components
│   ├── pages/                   # Page components
│   ├── hoc/                     # Higher-Order Components
│   ├── store/                   # Redux store & slices
│   ├── services/                # API services
│   ├── types/                   # TypeScript definitions
│   ├── tests/                   # Test files
│   └── utils/                   # Utility functions
├── package.json
└── vite.config.ts
```

## Features

### 🔐 Authentication
- JWT token management
- Protected routes with `requireAuth` HOC
- Persistent login state

### 📊 Dashboard
- **Announcements Card** - Latest announcements
- **What's Due Card** - Upcoming assignments
- **Exam Tips Card** - Study guidance
- Responsive layout

### 🌐 Internationalization
- Multi-language support with react-i18next
- RTL support ready

### 🧪 Testing
- **Vitest** for unit tests
- **React Testing Library** for component tests
- Comprehensive test coverage for components, HOCs, store, and services

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_NODE_ENV=development
```

## Key Components

### Authentication HOC
```typescript
// Protects routes and redirects unauthenticated users
export const requireAuth = (Component) => {
  // Checks authentication state
  // Redirects to login if not authenticated
  // Shows loading spinner during auth check
};
```

### Redux Store
```typescript
// Authentication state management
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### API Service
```typescript
// Type-safe API calls with interceptors
export const apiService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getAnnouncements: (params) => apiClient.get('/announcements', { params }),
  getQuizzes: (params) => apiClient.get('/quizzes', { params }),
};
```

## Testing

### Test Categories
- **Component Tests** - UI components and interactions
- **HOC Tests** - Authentication flow testing
- **Store Tests** - Redux state management
- **Service Tests** - API layer testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Scripts

```bash
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview production build
npm test              # Run tests
npm run lint          # Code linting
npm run type-check    # TypeScript validation
```

## Type Definitions

```typescript
// User authentication
interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
}

// API responses
interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

// Announcements
interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}
```

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify
# Set environment variables in platform
```

---

## Support & Resources

### Quick Commands
- **🚀 Start Development**: `npm run dev`
- **🧪 Run Tests**: `npm test`
- **🏗️ Build Production**: `npm run build`
- **📊 Test Coverage**: `npm run test:coverage`

### Project-Specific Documentation
- **Dashboard Components**: [DASHBOARD.md](./DASHBOARD.md)
- **API Integration**: Backend server documentation
- **Testing Guide**: Comprehensive testing patterns and examples

This frontend application provides a modern, type-safe, and well-tested foundation for the Student Portal with comprehensive documentation and testing coverage.
