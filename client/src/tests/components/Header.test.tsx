import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../../components/layout/Header';
import authReducer from '../../store/authSlice';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        'dashboard.greeting': 'Welcome {{name}},',
        'search': 'Search',
        'profile': 'Profile',
        'logout': 'Logout',
        'aria.menu': 'menu',
        'aria.search': 'search',
        'aria.notifications': 'notifications',
        'aria.messages': 'messages',
        'aria.account': 'account of current user'
      };
      
      let translation = translations[key] || key;
      
      // Handle interpolation
      if (options && typeof options === 'object') {
        Object.keys(options).forEach(optionKey => {
          translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
        });
      }
      
      return translation;
    }
  })
}));

const theme = createTheme();

const createMockStore = (user = { _id: '1', email: 'test@example.com', createdAt: '2023-01-01', updatedAt: '2023-01-01' }) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user,
        token: 'mock-token',
        loading: false,
        error: null
      }
    }
  });
};

const renderWithProviders = (
  component: React.ReactElement, 
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('Header', () => {
  const mockOnMenuClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user greeting correctly', () => {
    const store = createMockStore({ 
      _id: '1', 
      email: 'john.doe@example.com', 
      createdAt: '2023-01-01', 
      updatedAt: '2023-01-01' 
    });
    
    renderWithProviders(
      <Header onMenuClick={mockOnMenuClick} />,
      store
    );
    
    expect(screen.getByText('Welcome john.doe,')).toBeInTheDocument();
  });

  it('renders search bar with correct placeholder', () => {
    renderWithProviders(<Header onMenuClick={mockOnMenuClick} />);
    
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('aria-label', 'search');
  });

  it('shows menu button on mobile screens', () => {
    renderWithProviders(<Header onMenuClick={mockOnMenuClick} />);
    
    const menuButton = screen.getByRole('button', { name: 'menu' });
    expect(menuButton).toBeInTheDocument();
  });

  it('calls onMenuClick when menu button is clicked', () => {
    renderWithProviders(<Header onMenuClick={mockOnMenuClick} />);
    
    const menuButton = screen.getByRole('button', { name: 'menu' });
    fireEvent.click(menuButton);
    
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders notification and message buttons with badges', () => {
    renderWithProviders(<Header onMenuClick={mockOnMenuClick} />);
    
    const notificationButton = screen.getByRole('button', { name: 'notifications' });
    const messageButton = screen.getByRole('button', { name: 'messages' });
    
    expect(notificationButton).toBeInTheDocument();
    expect(messageButton).toBeInTheDocument();
  });

  it('opens user menu when avatar is clicked', () => {
    renderWithProviders(<Header onMenuClick={mockOnMenuClick} />);
    
    const avatarButton = screen.getByRole('button', { name: 'account of current user' });
    fireEvent.click(avatarButton);
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('displays fallback name when no user email', () => {
    const store = createMockStore();
    
    renderWithProviders(
      <Header onMenuClick={mockOnMenuClick} userName="Talia" />,
      store
    );
    
    // Should show the email username since user exists
    expect(screen.getByText('Welcome test,')).toBeInTheDocument();
  });

  it('uses custom userName when no user is authenticated', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: null
        }
      }
    });
    
    renderWithProviders(
      <Header onMenuClick={mockOnMenuClick} userName="Talia" />,
      store
    );
    
    expect(screen.getByText('Welcome Talia,')).toBeInTheDocument();
  });
});
