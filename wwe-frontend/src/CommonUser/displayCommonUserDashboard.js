import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashboardLayout from './DashboardLayout';
import CalorieChart from './calorieChart';
import DailyCalorieIntake from './dailyCalorieIntake';
import RecentMeals from './recentMeals';
import DisplayCommonUserMontlyReport from './displayCommonUserMonthlyReport'
import DisplayCommonUserDietGoalReports from './displayCommonUserDietGoalReports';
import Copyright from '../Copyright';

/* TODO: This component should display common user's dashboard. It should navigate the common users to
different use cases. 
Dashboard -> displayCommonUserDashboard
Browse Menu -> browseDailyMenu
My Meal Cart -> mealShoppingCart
My Goals -> displayCommonUserGoals / editCommonUserGoals
My Reports -> displayCommonUserMonthlyReport
Allergies -> displayCommonUserAllergy / editCommonUserAllgery
Preferences -> displayCommonUserFoodPreference / editCommonUserFoodPreference
My Account -> displayCommonUserAccount
Privacy Settings -> displayCommonUserPrivacySettings / editCommonUserPrivacySettings
*/

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


function DisplayCommonUserDashboard({ userId }) {
  const [open, setOpen] = React.useState(true);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const login = () => {
    window.open("/", "_self");
  };
  const shop = () => {
    window.open("/mealShoppingCart", "_self");
  };
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
              {/* calorieChart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <CalorieChart />
                </Paper>
              </Grid>
              {/* Daily calorie intake */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <DailyCalorieIntake userId={userId} />
                </Paper>
              </Grid>
              {/* Recent Meals */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RecentMeals userId={userId} />
                </Paper>
              </Grid>
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

export default DisplayCommonUserDashboard;