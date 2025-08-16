import axios from 'axios';
import type { AuthResponse, LoginRequest, SignupRequest } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  // console.log("Token in API interceptor: ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/users/login', data);
    return response.data;
  },

  // Signup user
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/users/signup', data);
    return response.data;
  },

  // Logout (client-side)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const quizService = {
  // Get all quizzes
  async getQuizzes() {
    const response = await api.get('/api/quizzes?limit=2');
    return response.data;
  },

  // Get quiz by ID
  async getQuizById(id: string) {
    const response = await api.get(`/api/quizzes/${id}`);
    return response.data;
  },
};

export const announcementService = {
  // Get all announcements
  async getAnnouncements() {
    const response = await api.get('/api/announcements?limit=5');
    return response.data;
  },

  // Get announcement by ID
  async getAnnouncementById(id: string) {
    const response = await api.get(`/api/announcements/${id}`);
    return response.data;
  },
};

export default api;
