import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface ShellLayoutProps {
  children: React.ReactNode;
}

const ShellLayout: React.FC<ShellLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = 280;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Sidebar
            open={mobileOpen}
            onClose={handleDrawerToggle}
            variant="temporary"
            width={sidebarWidth}
          />
        ) : (
          <Sidebar
            open={true}
            onClose={() => {}}
            variant="permanent"
            width={sidebarWidth}
          />
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: { md: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />

        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 2, md: 3 },
            backgroundColor: 'background.default',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ShellLayout;
