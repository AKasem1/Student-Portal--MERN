import request from 'supertest';
import app from '../../app';
import {User} from '../../modules/users/user.model';
import {Announcement} from '../../modules/announcements/announcement.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('Announcement Controller', () => {
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

  describe('GET /api/announcements', () => {
    beforeEach(async () => {
      // Create test announcements
      for (let i = 0; i < 15; i++) {
        await Announcement.create({
          ...global.testUtils.createTestAnnouncement(),
          title: `Test Announcement ${i}`,
          author: user._id
        });
      }
    });

    it('should get all announcements with default pagination', async () => {
      const response = await request(app)
        .get('/api/announcements')
        .expect(200);

      expect(response.body).toHaveProperty('announcements');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.announcements).toHaveLength(10); // Default limit
      expect(response.body.pagination.totalAnnouncements).toBe(15);
    });

    it('should get announcements with custom limit', async () => {
      const response = await request(app)
        .get('/api/announcements?limit=5')
        .expect(200);

      expect(response.body.announcements).toHaveLength(5);
    });

    it('should get announcements with pagination', async () => {
      const response = await request(app)
        .get('/api/announcements?limit=5&page=2')
        .expect(200);

      expect(response.body.announcements).toHaveLength(5);
      expect(response.body.pagination.currentPage).toBe(2);
    });
  });

  describe('GET /api/announcements/:id', () => {
    let announcement: any;

    beforeEach(async () => {
      announcement = await Announcement.create({
        ...global.testUtils.createTestAnnouncement(),
        author: user._id
      });
    });

    it('should get announcement by valid ID', async () => {
      const response = await request(app)
        .get(`/api/announcements/${announcement._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('announcement');
      expect(response.body.announcement.title).toBe(announcement.title);
    });

    it('should return 404 for non-existent announcement', async () => {
      const nonExistentId = '64f8b2c3d4e5f6789abc99';
      
      const response = await request(app)
        .get(`/api/announcements/${nonExistentId}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/announcements/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/announcements', () => {
    it('should create announcement with valid data', async () => {
      const announcementData = global.testUtils.createTestAnnouncement();
      
      const response = await request(app)
        .post('/api/announcements')
        .set('Authorization', `Bearer ${authToken}`)
        .send(announcementData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Announcement created successfully');
      expect(response.body).toHaveProperty('announcement');
      expect(response.body.announcement.title).toBe(announcementData.title);
    });

    it('should not create announcement without authentication', async () => {
      const announcementData = global.testUtils.createTestAnnouncement();
      
      const response = await request(app)
        .post('/api/announcements')
        .send(announcementData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/announcements')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});