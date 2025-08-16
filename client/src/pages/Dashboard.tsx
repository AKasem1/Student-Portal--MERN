import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
} from '@mui/material';
import requireAuth from '../hoc/requireAuth';
import ShellLayout from '../components/layout/ShellLayout';
import ExamTipsCard from '../components/dashboard/ExamTipsCard';
import AnnouncementsCard from '../components/dashboard/AnnouncementsCard';
import WhatsDueCard from '../components/dashboard/WhatsDueCard';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleExamTipsClick = () => {
    navigate('/exam-tips');
  };

  return (
    <ShellLayout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 1, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          {/* Exam Tips Section */}
          <Box sx={{ px: { xs: 1, sm: 0 } }}>
            <ExamTipsCard onButtonClick={handleExamTipsClick} />
          </Box>

          {/* Grid Section - Announcements and What's Due */}
          <Box sx={{ px: { xs: 1, sm: 0 } }}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} md={6}>
                <AnnouncementsCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <WhatsDueCard />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ShellLayout>
  );
};

export default requireAuth(Dashboard);
