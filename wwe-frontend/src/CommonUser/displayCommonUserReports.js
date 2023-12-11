import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DashboardLayout from './DashboardLayout';
import Copyright from '../Copyright';
import DisplayCommonUserMontlyReport from './displayCommonUserMonthlyReport'
import DisplayCommonUserDietGoalReports from './displayCommonUserDietGoalReports';

/* TODO: This component should display common user's monthly and diet goal reports
*/

const defaultTheme = createTheme();

export default function DisplayCommonUserReports({ userId }) {
    return (
        <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardLayout title='What We Eat Dashboard' userId={userId} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>          
                {/* Monthly Reports */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <DisplayCommonUserMontlyReport userId={userId}/>
                  </Paper>
                </Grid>
                {/* Diet Goal Reports */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <DisplayCommonUserDietGoalReports userId={userId} />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider >
    );
}
