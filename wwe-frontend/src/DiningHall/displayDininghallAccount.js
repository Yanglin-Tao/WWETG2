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
function DisplayDiningHallAccount() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const login = () => {
      window.open("/login", "_self");
    };
    const [isEditable, setIsEditable] = useState(false);
    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const current_institution = "New York University";
    const current_dining_hall = "NYU Jasper Kane Dining Hall";
    const contact_email = "askcampusservices@nyu.edu";
    const [address, setAddress] = useState("6 MetroTech Center, Brooklyn, NY 11201");
    
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const [userData, setUserData] = useState({institution: '', dining_hall: '', contact_email: '', password: '', address: ''});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/get_dining_hall_account');
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

    const updateDiningHallAccount = async () => {
        try {
            const response = await fetch('http://localhost:8080/update_dining_hall_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email, 
                    newPassword: userData.password,
                    newAddress: userData.address,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // handle the response data 

        } catch (error) {
            console.error('There was a problem updating the dining hall password:', error.message);
        }
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
                  <Title>Current Institution</Title>
                  {current_institution}
                  <Title>Current Dining Hall</Title>
                  {current_dining_hall}
                  <Title>Contact Email</Title>
                  {contact_email}
                  <Title>Address</Title>
                  { isEditable ? (
                      <input 
                          type="text"
                          value={address}
                          onChange={handleAddressChange}
                      />
                  ) : (
                      address
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