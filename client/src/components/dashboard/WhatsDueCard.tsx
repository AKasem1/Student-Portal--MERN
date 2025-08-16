import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Quiz, Assignment, AccessTime } from '@mui/icons-material';
import { quizService } from '../../services/api';
import type { Quiz as QuizType } from '../../types/quiz';

interface DueItem {
  type: 'QuizCard' | 'AssignmentCard';
  course: string;
  topic: string;
  dueDate: string;
  button: {
    textKey: string;
    variant: 'contained' | 'outlined';
  };
}

interface WhatsDueCardProps {
  viewAllRoute?: string;
}

const WhatsDueCard: React.FC<WhatsDueCardProps> = ({
  viewAllRoute = '/due'
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dueItems, setDueItems] = useState<DueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await quizService.getQuizzes();
        
        const quizItems: DueItem[] = response.data.quizzes.map((quiz: QuizType) => ({
          type: 'QuizCard' as const,
          course: quiz.subject,
          topic: quiz.title,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          button: {
            textKey: 'dashboard.whatsDue.startQuiz',
            variant: 'contained' as const
          }
        }));

        setDueItems([...quizItems]);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes');
        
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [t]);

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours <= 24) {
      return `${diffHours}h left`;
    }
    
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d left`;
  };

  const getItemIcon = (type: string) => {
    return type === 'QuizCard' ? <Quiz /> : <Assignment />;
  };

  const getChipColor = (type: string) => {
    return type === 'QuizCard' ? 'primary' : 'secondary';
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

  if (error && dueItems.length === 0) {
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
              fontSize: { xs: '1rem', sm: '1.25rem' } // subtitle1 size on xs, h6 size on sm+
            }}
          >
            {t('dashboard.whatsDue.title')}
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
          {dueItems.map((item, index) => (
            <ListItem 
              key={index}
              sx={{ 
                px: 0, 
                py: { xs: 1, sm: 2 },
                flexDirection: 'column',
                alignItems: 'stretch',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                mb: index < dueItems.length - 1 ? { xs: 1, sm: 2 } : 0,
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: { xs: 1, sm: 2 }, 
                mb: { xs: 1, sm: 2 }, 
                px: { xs: 1, sm: 2 }
              }}>
                <Box sx={{ 
                  p: { xs: 0.75, sm: 1 }, 
                  borderRadius: 1, 
                  bgcolor: `${getChipColor(item.type)}.light`,
                  color: `${getChipColor(item.type)}.contrastText`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}>
                  {React.cloneElement(getItemIcon(item.type), {
                    sx: { fontSize: { xs: 18, sm: 24 } }
                  })}
                </Box>
                
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems={{ xs: 'flex-start', sm: 'center' }} 
                    spacing={{ xs: 0.5, sm: 1 }} 
                    mb={1}
                  >
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: '100%', sm: 'none' }
                      }}
                    >
                      {item.course}
                    </Typography>
                    <Chip
                      icon={<AccessTime sx={{ fontSize: { xs: 12, sm: 16 } + ' !important' }} />}
                      label={formatDueDate(item.dueDate)}
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ 
                        height: { xs: 16, sm: 20 }, 
                        fontSize: { xs: '0.6rem', sm: '0.7rem' },
                        '& .MuiChip-label': {
                          px: { xs: 0.5, sm: 1 }
                        },
                        '& .MuiChip-icon': {
                          fontSize: { xs: '12px', sm: '16px' }
                        }
                      }}
                    />
                  </Stack>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, sm: 2 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.topic}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
                <Button
                  variant={item.button.variant}
                  color="primary"
                  fullWidth
                  sx={{ 
                    textTransform: 'none',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  {t(item.button.textKey)}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default WhatsDueCard;
