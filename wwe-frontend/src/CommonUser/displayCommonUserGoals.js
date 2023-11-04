import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Title from './Title';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import DashboardLayout from './DashboardLayout';
import dayjs from 'dayjs';

/* TODO: This component should display common user's dietary goals
*/

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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

function DisplayCommonUserGoals({userId}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const login = () => {
    window.open("/login", "_self");
  };

  const [isEditable, setIsEditable] = useState(false);
  const [startDate, setStartDate] = useState(dayjs('2023-01-01'));
  const [endDate, setEndDate] = useState(dayjs('2023-12-31'));
  const [calories, setCalories] = useState(2000);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const [userData, setUserData] = useState({user_goals: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('http://localhost:8080/get_common_user_goals');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setUserData(data);
          } catch (error) {
              console.error('There was a problem with the fetch operation:', error.message);
          } finally {
              setLoading(false);
          }
      };
      // fetchUserData();
  }, []);

  const updateCommonUserGoals = async () => {
      try {
          const response = await fetch('http://localhost:8080/update_common_user_goals', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: userData.userId, 
                  newFoodPreference: userData.user_goals,
              }),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          // handle the response data 

      } catch (error) {
          console.error('There was a problem updating common user goals:', error.message);
      }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title = 'My Goals' userId={userId}/>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Current Goals</Title>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                              Calories
                            </Typography>
                          </Grid>
                          <Grid item>
                            {isEditable ? (
                              <TextField
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                              />
                            ) : (
                              <Typography gutterBottom variant="h6" component="div">
                                {calories} cal per day
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2">
                          The total number of calories a person needs each day varies depending on a number of factors,
                          including the person's age, sex, height, weight, and level of physical activity.
                        </Typography>
                      </Box>
                      <Divider variant="middle" />
                    </Box>
                    {isEditable ? (
                      <>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                          sx={{ mt: 2 }}
                        />
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                          sx={{ mt: 2 }}
                        />
                      </>
                    ) : (
                      <>
                        <Box sx={{ m: 2 }}>
                          <Typography gutterBottom variant="body1">
                            Start Date
                          </Typography>
                          <Chip label={startDate.format('YYYY-MM-DD')} />
                        </Box>
                        <Box sx={{ m: 2 }}>
                          <Typography gutterBottom variant="body1">
                            End Date
                          </Typography>
                          <Chip label={endDate.format('YYYY-MM-DD')} />
                        </Box>
                      </>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={toggleEdit}
                    >
                      {isEditable ? 'Save My Goals' : 'Edit My Goals'}
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </LocalizationProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


export default DisplayCommonUserGoals;