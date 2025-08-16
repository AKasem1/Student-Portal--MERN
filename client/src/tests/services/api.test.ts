import { describe, it, expect, vi, beforeEach } from 'vitest';

// Create mock functions that will be accessible globally
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();
const mockRequestInterceptorUse = vi.fn();
const mockResponseInterceptorUse = vi.fn();

// Mock axios with our global mock functions
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: mockGet,
      post: mockPost,
      put: mockPut,
      delete: mockDelete,
      interceptors: {
        request: {
          use: mockRequestInterceptorUse,
        },
        response: {
          use: mockResponseInterceptorUse,
        },
      },
    })),
  },
}));

import axios from 'axios';
import { authService, announcementService, quizService } from '../../services/api';

const mockedAxios = vi.mocked(axios);

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('authService', () => {
    it('should call login endpoint with correct data', async () => {
      const loginData = { email: 'test@example.com', password: 'password' };
      const expectedResponse = { 
        status: 'success',
        message: 'Login successful',
        data: { 
          user: { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' }, 
          token: 'mock-token' 
        } 
      };
      
      mockPost.mockResolvedValue({ data: expectedResponse });
      
      const result = await authService.login(loginData);
      
      expect(mockPost).toHaveBeenCalledWith('/api/users/login', loginData);
      expect(result).toEqual(expectedResponse);
    });

    it('should call signup endpoint with correct data', async () => {
      const signupData = { 
        email: 'test@example.com', 
        password: 'password'
      };
      const expectedResponse = { 
        status: 'success',
        message: 'Signup successful',
        data: { 
          user: { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' }, 
          token: 'mock-token' 
        } 
      };
      
      mockPost.mockResolvedValue({ data: expectedResponse });
      
      const result = await authService.signup(signupData);
      
      expect(mockPost).toHaveBeenCalledWith('/api/users/signup', signupData);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle login error', async () => {
      const loginData = { email: 'test@example.com', password: 'wrong-password' };
      const error = new Error('Invalid credentials');
      
      mockPost.mockRejectedValue(error);
      
      await expect(authService.login(loginData)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('announcementService', () => {
    it('should fetch announcements', async () => {
      const expectedResponse = {
        status: 'success',
        data: {
          announcements: [
            { _id: '1', title: 'Test Announcement', content: 'Test content' }
          ]
        }
      };
      
      mockGet.mockResolvedValue({ data: expectedResponse });
      
      const result = await announcementService.getAnnouncements();
      
      expect(mockGet).toHaveBeenCalledWith('/api/announcements?limit=5');
      expect(result).toEqual(expectedResponse);
    });

    it('should fetch single announcement', async () => {
      const announcementId = '1';
      const expectedResponse = {
        status: 'success',
        data: { _id: '1', title: 'Test Announcement', content: 'Test content' }
      };
      
      mockGet.mockResolvedValue({ data: expectedResponse });
      
      const result = await announcementService.getAnnouncementById(announcementId);
      
      expect(mockGet).toHaveBeenCalledWith(`/api/announcements/${announcementId}`);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('quizService', () => {
    it('should fetch quizzes', async () => {
      const expectedResponse = {
        status: 'success',
        data: {
          quizzes: [
            { _id: '1', title: 'Math Quiz', questions: [] }
          ]
        }
      };
      
      mockGet.mockResolvedValue({ data: expectedResponse });
      
      const result = await quizService.getQuizzes();
      
      expect(mockGet).toHaveBeenCalledWith('/api/quizzes?limit=2');
      expect(result).toEqual(expectedResponse);
    });

    it('should fetch single quiz', async () => {
      const quizId = '1';
      const expectedResponse = {
        status: 'success',
        data: { _id: '1', title: 'Math Quiz', questions: [] }
      };
      
      mockGet.mockResolvedValue({ data: expectedResponse });
      
      const result = await quizService.getQuizById(quizId);
      
      expect(mockGet).toHaveBeenCalledWith(`/api/quizzes/${quizId}`);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('API instance configuration', () => {
    it('should create axios instance with correct baseURL', () => {
      // The axios.create should be called when the api module is loaded
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:4000',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should set up request interceptor for token', () => {
      // The interceptors should be set up when the api module is loaded
      expect(mockRequestInterceptorUse).toHaveBeenCalled();
    });

    it('should set up response interceptor for error handling', () => {
      // The interceptors should be set up when the api module is loaded
      expect(mockResponseInterceptorUse).toHaveBeenCalled();
    });
  });
});
