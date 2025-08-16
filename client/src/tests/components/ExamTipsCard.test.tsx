import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExamTipsCard from '../../components/dashboard/ExamTipsCard';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'dashboard.examsTime.title': 'EXAMS TIME',
        'dashboard.examsTime.subtitle': 'Here we are, Are you ready to fight?',
        'dashboard.examsTime.quote': '"Nothing happens until something moves"',
        'dashboard.examsTime.button': 'View exams tips'
      };
      return translations[key] || key;
    }
  })
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ExamTipsCard', () => {
  it('renders the card with correct content', () => {
    renderWithTheme(<ExamTipsCard />);
    
    expect(screen.getByText('EXAMS TIME')).toBeInTheDocument();
    expect(screen.getByText('Here we are, Are you ready to fight?')).toBeInTheDocument();
    expect(screen.getByText('View exams tips')).toBeInTheDocument();
  });

  it('calls onButtonClick when button is clicked', () => {
    const mockOnButtonClick = vi.fn();
    
    renderWithTheme(<ExamTipsCard onButtonClick={mockOnButtonClick} />);
    
    const button = screen.getByText('View exams tips');
    fireEvent.click(button);
    
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });

  it('displays the quote on larger screens', () => {
    renderWithTheme(<ExamTipsCard />);
    
    // The quote should be in the document but might be hidden on mobile
    expect(screen.getByText('"Nothing happens until something moves"')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const mockOnButtonClick = vi.fn();
    renderWithTheme(<ExamTipsCard onButtonClick={mockOnButtonClick} />);
    
    const button = screen.getByRole('button', { name: 'View exams tips' });
    expect(button).toBeInTheDocument();
  });
});
