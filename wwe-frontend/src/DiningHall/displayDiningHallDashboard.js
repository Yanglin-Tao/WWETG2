import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DashboardLayout from './DashboardLayout';
import TopTenRatedFood from './topTenRatedFood';
import TopTenFoodAllergies from './topTenFoodAllergies';
import DisplayDingHallMonthlyReport from './displayDiningHallMonthlyReport';

/* TODO: This component should display dining hall user's dashboard. It should navigate the dining hall users to
different use cases. 
Dashboard -> displayDiningHallDashboard
Today's Menu -> displayDailyMenu
Upload Menu -> createDailyMenu
My Reports -> displayDiningHallMonthlyReport
My Account -> displayDininghallAccount
*/

function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" to="/">
              What We Eat
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

function DisplayDiningHallDashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const login = () => {
    window.open("/login", "_self");
  };
  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title ="What We Eat Dashboard" />
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TopTenRatedFood />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TopTenFoodAllergies />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <DisplayDingHallMonthlyReport />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DisplayDiningHallDashboard;