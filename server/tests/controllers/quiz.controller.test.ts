import request from 'supertest';
import app from '../../app';
import {User} from '../../modules/users/user.model';
import {Quiz} from '../../modules/quizzes/quiz.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('Quiz Controller', () => {
  let authToken: string;
  let user: any;

  beforeEach(async () => {
    const userData = global.testUtils.createTestUser();
    user = await User.create({
      ...userData,
      password: await bcrypt.hash(userData.password, 10)
    });
    
    authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'testsecret',
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/quizzes', () => {
    beforeEach(async () => {
      for (let i = 0; i < 5; i++) {
        await Quiz.create({
          ...global.testUtils.createTestQuiz(),
          title: `Test Quiz ${i}`,
          instructor: user._id
        });
      }
    });

    it('should get all quizzes with pagination', async () => {
      const response = await request(app)
        .get('/api/quizzes')
        .expect(200);

      expect(response.body).toHaveProperty('quizzes');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.quizzes).toHaveLength(5);
    });

    it('should get quizzes with custom limit', async () => {
      const response = await request(app)
        .get('/api/quizzes?limit=2')
        .expect(200);

      expect(response.body.quizzes).toHaveLength(2);
    });
  });

  describe('GET /api/quizzes/:id', () => {
    let quiz: any;

    beforeEach(async () => {
      quiz = await Quiz.create({
        ...global.testUtils.createTestQuiz(),
        instructor: user._id
      });
    });

    it('should get quiz by valid ID', async () => {
      const response = await request(app)
        .get(`/api/quizzes/${quiz._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('quiz');
      expect(response.body.quiz.title).toBe(quiz.title);
      expect(response.body.quiz.questions).toHaveLength(1);
    });

    it('should return 404 for non-existent quiz', async () => {
      const nonExistentId = '64f8b2c3d4e5f6789abc99';
      
      const response = await request(app)
        .get(`/api/quizzes/${nonExistentId}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/quizzes', () => {
    it('should create quiz with valid data', async () => {
      const quizData = global.testUtils.createTestQuiz();
      
      const response = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(quizData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Quiz created successfully');
      expect(response.body).toHaveProperty('quiz');
      expect(response.body.quiz.title).toBe(quizData.title);
    });

    it('should not create quiz without authentication', async () => {
      const quizData = global.testUtils.createTestQuiz();
      
      const response = await request(app)
        .post('/api/quizzes')
        .send(quizData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should validate quiz questions', async () => {
      const invalidQuizData = {
        ...global.testUtils.createTestQuiz(),
        questions: [
          {
            questionText: 'Invalid question',
            questionType: 'multiple-choice',
            // Missing required fields
          }
        ]
      };
      
      const response = await request(app)
        .post('/api/quizzes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidQuizData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});