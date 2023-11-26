import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WhatWeEatIcon from '../WhatWeEatIcon';
import Copyright from '../Copyright';

/* TODO: This component should provide a form to register an institution.
*/

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function RegisterInstitution() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('info');
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [institutionId, setInstitutionId] = React.useState('');

  const [formData, setFormData] = useState({
    name: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    if (!name.trim()) {
      setAlertMessage('Institution name cannot be empty.');
      setAlertSeverity('error');
      setOpen(true);
      return;
    }

    const apiUrl = `http://127.0.0.1:8080/register_institution`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.message === "The institution name already exists.") { // Change the condition based on the actual response structure
          setAlertMessage(data.message);
          setAlertSeverity('error');  // Red alert for error
        } else {
          setAlertMessage('Successful registration!');
          setAlertSeverity('success');  // Green alert for success
          setIsRegisterSuccess(true);
          setInstitutionId(data.institutionID);
        }
        setOpen(true);
      })
      .catch(error => {
        console.error("Error while registering institution:", error);
        setAlertMessage('Error while registering institution.');
        setAlertSeverity('error');
        setOpen(true);
      });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white', width: 50, height: 50 }}>
            <WhatWeEatIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"   // Updated the name attribute
                  required
                  fullWidth
                  id="name"
                  label="Institution Name"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {isRegisterSuccess && (
              <Typography variant="subtitle1" align="center" color="primary" sx={{ mt: 2 }}>
                Your Institution ID is: {institutionId}. Copy & share.
              </Typography>
            )}
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertMessage}   {/* Display the alert message here */}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterInstitution;