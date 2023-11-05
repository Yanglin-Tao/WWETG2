import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Title from './Title';
import Button from '@mui/material/Button';
import DashboardLayout from './DashboardLayout';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
/* TODO: This component should display common user's email and institution.
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

function DisplayCommonUserAccount({userId}) {

    const [userData, setUserData] = useState({email: '', institutionName: ''});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
          const token = Cookies.get('token'); 
          const apiUrl = `http://localhost:8080/get_common_user_account`; 
          console.log(userId);
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
              setUserData({
                institutionName: data.institutionName,
                email: data.email,
              })
          } catch (error) {
              console.error('There was a problem fetching common user account data:', error);
          }
        };
        fetchUserData();
    }, [userId]);
    
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Institution</Title>
                    {userData.institutionName}
                    <Title>Email</Title>
                    {userData.email}
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

export default DisplayCommonUserAccount;