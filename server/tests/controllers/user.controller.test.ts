import request from 'supertest';
import app from '../../app';
import {User} from '../../modules/users/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('User Controller', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user successfully', async () => {
      const userData = global.testUtils.createTestUser();
      
      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User registered successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should not register user with existing email', async () => {
      const userData = global.testUtils.createTestUser();
      
      // Create user first
      await User.create({
        ...userData,
        password: await bcrypt.hash(userData.password, 10)
      });

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      const userData = global.testUtils.createTestUser();
      await User.create({
        ...userData,
        password: await bcrypt.hash(userData.password, 10)
      });
    });

    it('should login user with valid credentials', async () => {
      const userData = global.testUtils.createTestUser();
      
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
    });

    it('should not login with invalid password', async () => {
      const userData = global.testUtils.createTestUser();
      
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: userData.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/users/profile', () => {
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

    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should not get profile without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should not get profile with invalid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});