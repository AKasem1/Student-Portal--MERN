import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout, clearError } from '../../store/authSlice';

// Mock the API service
vi.mock('../../services/api', () => ({
  authService: {
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn()
  }
}));

import { authService } from '../../services/api';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    expect(store.getState().auth).toEqual(initialState);
  });

  it('should handle login.pending', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    
    store.dispatch(login({ email: 'test@example.com', password: 'password' }));
    
    expect(store.getState().auth.loading).toBe(true);
    expect(store.getState().auth.error).toBe(null);
  });

  it('should handle login.fulfilled', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    
    const userData = {
      user: { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      token: 'mock-token'
    };
    
    store.dispatch(login.fulfilled(userData, '', { email: 'test@example.com', password: 'password' }));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(userData.user);
    expect(state.token).toBe(userData.token);
    expect(state.error).toBe(null);
  });

  it('should handle login.rejected', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    
    const errorMessage = 'Invalid credentials';
    
    store.dispatch(login.rejected(
      new Error(errorMessage), 
      '', 
      { email: 'test@example.com', password: 'password' },
      errorMessage
    ));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle logout', () => {
    const initialAuthenticatedState = {
      isAuthenticated: true,
      user: { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      token: 'mock-token',
      loading: false,
      error: null,
    };
    
    const store = configureStore({ 
      reducer: { auth: authReducer },
      preloadedState: { auth: initialAuthenticatedState }
    });
    
    store.dispatch(logout());
    
    expect(store.getState().auth).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const initialErrorState = {
      ...initialState,
      error: 'Some error message',
    };
    
    const store = configureStore({ 
      reducer: { auth: authReducer },
      preloadedState: { auth: initialErrorState }
    });
    
    store.dispatch(clearError());
    
    expect(store.getState().auth.error).toBe(null);
  });

  it('should persist token in localStorage on successful login', async () => {
    // Mock the authService.login
    const mockResponse = {
      status: 'success',
      message: 'Login successful',
      data: {
        user: { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
        token: 'mock-token'
      }
    };
    
    vi.mocked(authService.login).mockResolvedValueOnce(mockResponse);
    
    // Mock localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    const store = configureStore({ reducer: { auth: authReducer } });
    
    // Dispatch the actual login thunk
    await store.dispatch(login({ email: 'test@example.com', password: 'password' }));
    
    expect(setItemSpy).toHaveBeenCalledWith('token', 'mock-token');
    expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data.user));
    
    setItemSpy.mockRestore();
  });

  it('should clear token from localStorage on logout', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    
    store.dispatch(logout());
    
    // The logout reducer calls authService.logout() which handles localStorage
    expect(vi.mocked(authService.logout)).toHaveBeenCalled();
  });
});
