import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import announcementRoutes from './modules/announcements/announcement.routes';
import quizRoutes from './modules/quizzes/quiz.routes';
import userRoutes from './modules/users/user.routes';
import { logger, requestId } from './middleware/logger';
import { notFound, errorHandler } from './middleware/errorHandler';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config({ path: '../.env' });
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestId);
app.use(logger);

//Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/announcements', announcementRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

// Add health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', notFound);

// Global error handler
app.use(errorHandler);

export default app;
