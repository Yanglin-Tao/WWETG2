import React from 'react';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DashboardLayout from '../DiningHall/DashboardLayout';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Title from './Title';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* TODO: This component should display a dining hall's email and institution
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayDiningHallAccount({ userId }) {
    const [isEditable, setIsEditable] = useState(false);
    const [userData, setUserData] = useState({institutionName: '', diningHallName: '', email: '', address: ''});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
        // if (isEditable) {
        //   updateDiningHallAccount();
        // }
    };
    
    const handleUserDataChange = (e) => {
        setUserData(e.target.value);
    };

    useEffect(() => {
        const fetchUserData = async () => {
          const token = Cookies.get('token'); 
          const apiUrl = `http://localhost:8080/get_dining_hall_account`; 
          console.log(userId);
          const requestOptions = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token,
              },
              body: JSON.stringify({ 
                diningHallID: userId
              })
          };
  
          try {
              const response = await fetch(apiUrl, requestOptions);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data);
              setUserData({
                institutionName: data.institutionName,
                diningHallName: data.diningHallName,
                email: data.email,
                address: data.address
              })
          } catch (error) {
              console.error('There was a problem fetching dining hall account data:', error);
          }
        };
        fetchUserData();
    }, [userId]);

    const updateDiningHallAccount = async () => {
      try {
          const token = Cookies.get('token'); 
          const response = await fetch('http://localhost:8080/update_dining_hall_account', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token,
              },
              body: JSON.stringify({
                  userID: userId, 
                  userData: userData
              }),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          console.log('Update successful', responseData);
            if (responseData.Message === "Successfully updated dining hall account info into your profile.") {
              setAlertSeverity('success');
              setAlertMessage(responseData.Message);
              setOpen(true);
            } else {
              setAlertSeverity('error');
              setAlertMessage(responseData.Message);
              setOpen(true);
            }

      } catch (error) {
          console.error('There was a problem updating dining hall user account:', error.message);
      }
    };
    
    return (
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardLayout title ="What We Eat Dashboard" userId={userId}/>
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Institution</Title>
                  {userData.institutionName}
                  <Title>Dining Hall</Title>
                  {userData.diningHallName}
                  <Title>Contact Email</Title>
                  {userData.email}
                  <Title>Address</Title>
                  { isEditable ? (
                      <input 
                          type="text"
                          value={userData}
                          onChange={handleUserDataChange}
                      />
                  ) : (
                      userData.address
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={toggleEdit}
                  >
                    {isEditable ? 'Save Changes' : 'Edit Dining Hall Profile'}
                  </Button>
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

export default DisplayDiningHallAccount;