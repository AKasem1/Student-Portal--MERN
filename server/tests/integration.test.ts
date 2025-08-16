import request from 'supertest';
import app from '../app';

describe('Integration Tests', () => {
  describe('API Health Check', () => {
    it('should return API status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('environment', 'test');
    });
  });

  describe('Full User Flow', () => {
    it('should complete full user registration and login flow', async () => {
      const userData = global.testUtils.createTestUser();
      
      // 1. Register user
      const registerResponse: any = await request(app)
        .post('/api/users/signup')
        .send(userData)
        .expect(201);

      expect(registerResponse.body.data.token).toHaveProperty('token');
      expect(registerResponse.body.data.user).toHaveProperty('user');
      expect(registerResponse.body.user.email).toBe(userData.email);

      const token = registerResponse.body.token;

      // 3. Login with same credentials
      const loginResponse = await request(app)
        .post('/api/users/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(loginResponse.body).toHaveProperty('token');
      expect(loginResponse.body).toHaveProperty('user');
    }, 30000);
  });
});