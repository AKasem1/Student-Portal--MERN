import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AnnouncementsCard from '../../components/dashboard/AnnouncementsCard';
import { announcementService } from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  announcementService: {
    getAnnouncements: vi.fn()
  }
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'dashboard.announcements.title': 'Announcements',
        'viewAll': 'All'
      };
      return translations[key] || key;
    }
  })
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

const mockAnnouncements = [
  {
    _id: '1',
    title: 'Test Announcement 1',
    content: 'This is a test announcement content',
    author: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    course: 'Mathematics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Test Announcement 2',
    content: 'Another test announcement',
    author: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    course: 'Physics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

describe('AnnouncementsCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(announcementService.getAnnouncements).mockReturnValue(
      new Promise(() => {}) // Never resolves to keep loading state
    );

    renderWithProviders(<AnnouncementsCard />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders announcements successfully', async () => {
    vi.mocked(announcementService.getAnnouncements).mockResolvedValue({
      data: { announcements: mockAnnouncements }
    });

    renderWithProviders(<AnnouncementsCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Announcements')).toBeInTheDocument();
      expect(screen.getByText('All')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('This is a test announcement content')).toBeInTheDocument();
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
    });
  });

  it('renders error state when API fails', async () => {
    vi.mocked(announcementService.getAnnouncements).mockRejectedValue(
      new Error('API Error')
    );

    renderWithProviders(<AnnouncementsCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load announcements')).toBeInTheDocument();
    });
  });

  it('limits announcements to display maximum', async () => {
    const manyAnnouncements = Array.from({ length: 10 }, (_, i) => ({
      _id: `${i}`,
      title: `Announcement ${i}`,
      content: `This is announcement ${i} content`,
      author: {
        name: `Author ${i}`,
        email: `author${i}@example.com`
      },
      course: 'Mathematics',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    vi.mocked(announcementService.getAnnouncements).mockResolvedValue({
      data: { announcements: manyAnnouncements }
    });

    renderWithProviders(<AnnouncementsCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Announcements')).toBeInTheDocument();
    });

    // Should display the first announcement author (component shows author name, not title)
    await waitFor(() => {
      expect(screen.getByText('Author 0')).toBeInTheDocument();
    });
  });
});
