import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { School, Person, Event, Business } from '@mui/icons-material';
import { announcementService } from '../../services/api';
import type { Announcement } from '../../types/announcement';



interface AnnouncementsCardProps {
  viewAllRoute?: string;
}

const AnnouncementsCard: React.FC<AnnouncementsCardProps> = ({
  viewAllRoute = '/announcements'
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await announcementService.getAnnouncements();
        // Limit to first 4 announcements for dashboard display
        console.log("response: ", response);
        setAnnouncements(response.data.announcements);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const getAvatarIcon = (course: string | undefined) => {
    if (!course) return <School />;
    const courseLower = course.toLowerCase();
    if (courseLower.includes('math') || courseLower.includes('physics')) return <Person />;
    if (courseLower.includes('management')) return <Business />;
    if (courseLower.includes('events')) return <Event />;
    return <School />;
  };

  const getAvatarColor = (course: string | undefined) => {
    if (!course) return 'primary';
    const colors = ['primary', 'secondary', 'error', 'warning'] as const;
    return colors[course.length % colors.length];
  };

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error && announcements.length === 0) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 2, boxShadow: 'none' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {t('dashboard.announcements.title')}
          </Typography>
          <Button
            size="small"
            onClick={() => navigate(viewAllRoute)}
            sx={{ 
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.875rem' }
            }}
          >
            {t('viewAll')}
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {announcements.map((announcement, index) => (
            <React.Fragment key={announcement._id}>
              <ListItem sx={{ px: 0, alignItems: 'flex-start', py: { xs: 1, sm: 1.5 } }}>
                <ListItemAvatar sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${getAvatarColor(announcement.course)}.main`,
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                    }}
                  >
                    {getAvatarIcon(announcement.course)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 0.5, sm: 1 }, 
                      mb: 0.5 
                    }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {announcement.author?.name || announcement.author?.email || 'Unknown'}
                      </Typography>
                      {announcement.course && (
                        <Chip 
                          label={announcement.course} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            height: { xs: 16, sm: 20 }, 
                            fontSize: { xs: '0.6rem', sm: '0.7rem' },
                            '& .MuiChip-label': {
                              px: { xs: 0.5, sm: 1 }
                            }
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 2, sm: 3 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {announcement.content}
                    </Typography>
                  }
                />
              </ListItem>
              {index < announcements.length - 1 && <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsCard;
