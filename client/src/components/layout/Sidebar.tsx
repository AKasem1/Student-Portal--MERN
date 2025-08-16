import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Schedule,
  Book,
  Grade,
  BarChart,
  Announcement,
  School,
} from '@mui/icons-material';

interface MenuItemProps {
  icon: string;
  textKey: string;
  route: string;
  active?: boolean;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
  width?: number;
}

const iconMap = {
  Dashboard,
  Schedule,
  Book,
  Grade,
  BarChart,
  Announcement,
  School,
};

const menuItems: MenuItemProps[] = [
  { icon: 'Dashboard', textKey: 'menu.dashboard', route: '/dashboard' },
  { icon: 'Schedule', textKey: 'menu.schedule', route: '/schedule' },
  { icon: 'Book', textKey: 'menu.courses', route: '/courses' },
  { icon: 'Grade', textKey: 'menu.gradebook', route: '/gradebook' },
  { icon: 'BarChart', textKey: 'menu.performance', route: '/performance' },
  { icon: 'Announcement', textKey: 'menu.announcement', route: '/announcement' },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  variant = 'persistent', 
  width = 280 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleItemClick = (route: string) => {
    navigate(route);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <School color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="h6" component="div" fontWeight="bold" color="primary">
          {t('app.name')}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location.pathname === item.route;

          return (
            <ListItem key={item.route} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.route)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  minHeight: 48,
                  backgroundColor: isActive ? theme.palette.primary.light + '15' : 'transparent',
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '10',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  <IconComponent />
                </ListItemIcon>
                <ListItemText 
                  primary={t(item.textKey)}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: theme.shadows[1],
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
