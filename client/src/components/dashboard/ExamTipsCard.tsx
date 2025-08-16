import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';

interface ExamTipsCardProps {
  title?: string;
  subtitle?: string;
  quote?: string;
  onButtonClick?: () => void;
}

const ExamTipsCard: React.FC<ExamTipsCardProps> = ({
  onButtonClick,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        background: 'white',
        color: theme.palette.primary.main,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 200,
        border: `1px solid ${theme.palette.primary.light}`,
        boxShadow: theme.shadows[2],
      }}
    >
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 }, 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        direction: 'ltr',
        flexDirection: { xs: 'column', md: 'row' },
        textAlign: { xs: 'center', md: 'left' }
      }}>
        {/* Left side - Text content */}
        <Box sx={{ 
          flex: 1, 
          maxWidth: { xs: '100%', md: '50%' }, 
          direction: 'ltr', 
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 2, md: 0 }
        }}>
          <Typography 
            variant="overline" 
            sx={{ 
              fontWeight: 'bold',
              letterSpacing: 2,
              opacity: 0.8,
              display: 'block',
              mb: 1,
              direction: 'ltr',
              textAlign: { xs: 'center', md: 'left' },
              color: theme.palette.primary.main,
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          >
            {t('dashboard.examsTime.title')}
          </Typography>
          
          <Typography 
            variant="h6"
            sx={{ 
              mb: 2,
              lineHeight: 1.4,
              fontWeight: 500,
              direction: 'ltr',
              textAlign: { xs: 'center', md: 'left' },
              color: theme.palette.primary.main,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {t('dashboard.examsTime.subtitle')}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontStyle: 'italic',
              opacity: 0.8,
              mb: 3,
              lineHeight: 1.5,
              direction: 'ltr',
              textAlign: { xs: 'center', md: 'left' },
              color: theme.palette.primary.main,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {t('dashboard.examsTime.quote')}
          </Typography>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              textTransform: 'none',
              fontWeight: 'bold',
              px: { xs: 2, sm: 3 },
              py: 1,
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
            onClick={onButtonClick}
          >
            {t('dashboard.examsTime.button')}
          </Button>
        </Box>

        {/* Right side - Illustration area */}
        <Box sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' }, 
          justifyContent: 'flex-end', 
          alignItems: 'center' 
        }}>
          {/* Placeholder for illustration - you can replace this with an actual SVG or image */}
          <Box
            sx={{
              width: { md: 200, lg: 250 },
              height: { md: 120, lg: 150 },
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 150'%3E%3Crect x='20' y='20' width='80' height='100' fill='${encodeURIComponent(theme.palette.primary.light)}' opacity='0.3' rx='8'/%3E%3Crect x='110' y='30' width='60' height='80' fill='${encodeURIComponent(theme.palette.primary.main)}' opacity='0.4' rx='6'/%3E%3Ccircle cx='200' cy='40' r='20' fill='${encodeURIComponent(theme.palette.primary.light)}' opacity='0.3'/%3E%3Cpath d='M30 130 Q50 110 70 130 Q90 110 110 130' stroke='${encodeURIComponent(theme.palette.primary.main)}' stroke-width='2' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </Box>
      </CardContent>
      
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `${theme.palette.primary.light}20`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          right: 20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `${theme.palette.primary.main}15`,
        }}
      />
    </Card>
  );
};

export default ExamTipsCard;
