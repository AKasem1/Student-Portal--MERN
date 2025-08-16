import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import requireAuth from '../hoc/requireAuth';

// Mock component for testing
const MockComponent = () => <div>Protected Content</div>;
const ProtectedComponent = requireAuth(MockComponent);

// Create a mock store
const createMockStore = (isAuthenticated: boolean, loading = false) => {
  return configureStore({
    reducer: {
      auth: () => ({
        isAuthenticated,
        loading,
        user: isAuthenticated ? { id: '1', email: 'test@test.com' } : null,
        token: isAuthenticated ? 'mock-token' : null,
        error: null,
      }),
    },
  });
};

// Helper to render component with providers
const renderWithProviders = (component: React.ReactElement, isAuthenticated: boolean) => {
  const store = createMockStore(isAuthenticated);
  
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('requireAuth HOC', () => {
  it('renders protected component when user is authenticated', () => {
    renderWithProviders(<ProtectedComponent />, true);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not render protected component when user is not authenticated', () => {
    renderWithProviders(<ProtectedComponent />, false);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('shows loading state when auth is in progress', () => {
    const store = createMockStore(false, true);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedComponent />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
