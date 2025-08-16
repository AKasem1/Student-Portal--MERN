import {User} from '../modules/users/user.model';
import bcrypt from 'bcryptjs';

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = global.testUtils.createTestUser();
      const user = new User(userData);
      
      await expect(user.save()).resolves.toBeTruthy();
      expect(user.email).toBe(userData.email);
    });

    it('should hash password before saving', async () => {
      const userData = global.testUtils.createTestUser();
      const user = new User(userData);
      
      await user.save();
      expect(user.password).not.toBe(userData.password);
      expect(user.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash pattern
    });

    it('should not save user without required fields', async () => {
      const user = new User({});
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should not save duplicate emails', async () => {
      const userData = global.testUtils.createTestUser();
      
      await User.create(userData);
      
      const duplicateUser = new User(userData);
      await expect(duplicateUser.save()).rejects.toThrow();
    });
  });

  describe('User Methods', () => {
    let user: any;

    beforeEach(async () => {
      const userData = global.testUtils.createTestUser();
      user = await User.create(userData);
    });

    it('should compare password correctly', async () => {
      const isMatch = await bcrypt.compare('testPassword123', user.password);
      expect(isMatch).toBe(true);
      
      const isNotMatch = await bcrypt.compare('wrongpassword', user.password);
      expect(isNotMatch).toBe(false);
    });

    it('should convert to JSON without password', () => {
      const userJson = user.toJSON();
      expect(userJson).not.toHaveProperty('password');
      expect(userJson).toHaveProperty('email');
      expect(userJson).toHaveProperty('name');
    });
  });
});