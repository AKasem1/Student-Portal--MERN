import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ACC1',
      light: '#4DB6D6',
      dark: '#00838F',
    },
    secondary: {
      main: '#FF6B35',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Dashboard />} />
            <Route path="/courses" element={<Dashboard />} />
            <Route path="/gradebook" element={<Dashboard />} />
            <Route path="/performance" element={<Dashboard />} />
            <Route path="/announcement" element={<Dashboard />} />
            <Route path="/announcements" element={<Dashboard />} />
            <Route path="/due" element={<Dashboard />} />
            <Route path="/exam-tips" element={<Dashboard />} />
            <Route path="/notifications" element={<Dashboard />} />
            <Route path="/messages" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
