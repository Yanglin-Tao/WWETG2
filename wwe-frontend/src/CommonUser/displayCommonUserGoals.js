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
import Title from './Title';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import DashboardLayout from './DashboardLayout';
import Copyright from '../Copyright';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* TODO: This component should display common user's dietary goals
*/

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayCommonUserGoals({ userId }) {
  const [isEditable, setIsEditable] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [maxCalories, setMaxCalories] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [noCurrentGoal, setNoCurrentGoal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      setPersonalDietGoal();
    }
  };

  const fetchPersonalDietGoal = async () => {
    const token = Cookies.get('token');
    const apiUrl = `http://127.0.0.1:8080/getPersonalDietGoal`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        userID: userId
      })
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      if (data.message === "Goal doesn't exist") {
        setNoCurrentGoal(true);
      } else {
        setStartDate(dayjs(data.startDate));
        setEndDate(dayjs(data.endDate));
        setMaxCalories(data.dailyCalorieIntakeMaximum);
        setMinCalories(data.dailyCalorieIntakeMinimum);
      }
    } catch (error) {
      console.error('There was a problem fetching the user goals:', error);
    }
  };

  useEffect(() => {
    fetchPersonalDietGoal();
  }, [userId]);

  const setPersonalDietGoal = async () => {
    if (!validateGoal()) {
      setIsEditable(true);
      return;
    }
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://127.0.0.1:8080/setPersonalDietGoal', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          userID: userId,
          startDate: startDate,
          endDate: endDate,
          dailyCalorieIntakeMaximum: maxCalories,
          dailyCalorieIntakeMinimum: minCalories
        }),
      });

      console.log(startDate);
      console.log(endDate);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.message === "The goal is sucessfully created.") {
        setAlertSeverity('success');
        setAlertMessage(responseData.message);
        setOpen(true);
        window.open("/displayCommonUserGoals", "_self");
      } else {
        setAlertSeverity('error');
        setAlertMessage(responseData.message);
        setOpen(true);
      }
    } catch (error) {
      console.error('There was a problem creating personal diet goal:', error.message);
    }
  };

  const validateGoal = () => {
    if (!maxCalories || !minCalories || !startDate || !endDate) {
      setAlertMessage('All fields are required');
      setAlertSeverity('error');
      setOpen(true);
      return false;
    }
    return true;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title='My Goals' userId={userId} />
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Current Diet Goal</Title>
                    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
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
                                label="Max cal per day"
                                value={maxCalories}
                                onChange={(e) => setMaxCalories(e.target.value)}
                              />
                            ) : (
                              !noCurrentGoal ? (
                                <Typography gutterBottom variant="h6" component="div">
                                  {maxCalories} max per day
                                </Typography>
                              ) : (
                                <Typography gutterBottom variant="h6" component="div">
                                  N/A max per day
                                </Typography>
                              )
                            )}
                            {isEditable ? (
                              <TextField
                                type="number"
                                label="Min cal per day"
                                value={minCalories}
                                onChange={(e) => setMinCalories(e.target.value)}
                                style={{ marginLeft: '10px' }}
                              />
                            ) : (
                              !noCurrentGoal ? (
                                <Typography gutterBottom variant="h6" component="div">
                                  {minCalories} min per day
                                </Typography>
                              ) : (
                                <Typography gutterBottom variant="h6" component="div">
                                  N/A min per day
                                </Typography>
                              )
                            )}
                          </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2" style={{ marginTop: '10px' }}>
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
                          {!noCurrentGoal ? (
                            <Chip label={startDate.format('YYYY-MM-DD')} />
                          ) : (
                            <Typography>
                              N/A
                            </Typography>
                          )
                          }
                        </Box>
                        <Box sx={{ m: 2 }}>
                          <Typography gutterBottom variant="body1">
                            End Date
                          </Typography>
                          {!noCurrentGoal ? (
                            <Chip label={endDate.format('YYYY-MM-DD')} />
                          ) : (
                            <Typography>
                              N/A
                            </Typography>
                          )
                          }
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
                      {isEditable ? 'Save Diet Goal' : 'Create Diet Goal'}
                    </Button>
                    {/* {noCurrentGoal ?
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={toggleEdit}
                      >
                        {isEditable ? 'Save Diet Goal' : 'Create Diet Goal'}
                      </Button>
                      : "Good luck with your current diet goal!"} */}
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