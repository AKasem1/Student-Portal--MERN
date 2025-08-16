import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  NotificationsNone,
  MailOutline,
  AccountCircle,
  Logout,
  Search,
} from '@mui/icons-material';
import { logout } from '../../store/authSlice';
import type { RootState, AppDispatch } from '../../store';

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, userName = 'Talia' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const displayName = user?.email?.split('@')[0] || userName;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label={t('aria.menu')}
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Greeting */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography 
            variant="h6" 
            component="div" 
            fontWeight="600"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.9rem', sm: '1.25rem' }, 
            }}
          >
            {t('dashboard.greeting', { name: displayName })}
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.grey[300], 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.grey[300], 0.25),
            },
            marginRight: { xs: 0.5, sm: 2 },
            marginLeft: { xs: 1, sm: 3 },
            width: '100%',
            maxWidth: { xs: 100, sm: 300 },
            minWidth: { xs: 80, sm: 200 },
            display: 'block',
          }}
        >
          <Box
            sx={{
              padding: { xs: theme.spacing(0, 1), sm: theme.spacing(0, 2) },
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search sx={{ color: 'text.secondary', fontSize: { xs: 16, sm: 20 } }} />
          </Box>
          <InputBase
            placeholder={t('search')}
            inputProps={{ 'aria-label': t('aria.search') }}
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: { xs: theme.spacing(0.5, 0.5, 0.5, 0), sm: theme.spacing(1, 1, 1, 0) },
                paddingLeft: { xs: `calc(0.5em + ${theme.spacing(2.5)})`, sm: `calc(1em + ${theme.spacing(4)})` },
                transition: theme.transitions.create('width'),
                width: '100%',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                [theme.breakpoints.up('md')]: {
                  width: '20ch',
                },
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 1 } }}>
          <IconButton
            color="inherit"
            onClick={() => navigate('/notifications')}
            aria-label={t('aria.notifications')}
            size="medium"
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
              },
              width: { xs: 28, sm: 48 },
              height: { xs: 28, sm: 48 },
            }}
          >
            <Badge badgeContent={4} color="error" variant="dot">
              <NotificationsNone sx={{ color: 'primary.main', fontSize: { xs: 16, sm: 24 } }} />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => navigate('/messages')}
            aria-label={t('aria.messages')}
            size="medium"
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
              },
              width: { xs: 28, sm: 48 },
              height: { xs: 28, sm: 48 },
            }}
          >
            <Badge badgeContent={2} color="primary" variant="dot">
              <MailOutline sx={{ color: 'primary.main', fontSize: { xs: 16, sm: 24 } }} />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label={t('aria.account')}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: { xs: 24, sm: 32 }, height: { xs: 24, sm: 32 }, bgcolor: 'primary.main' }}>
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick}>
              <AccountCircle sx={{ mr: 1 }} />
              {t('profile')}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              {t('logout')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
