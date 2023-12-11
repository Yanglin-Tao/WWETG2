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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DashboardLayout from './DashboardLayout';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Copyright from '../Copyright';

/* TODO: This component should display common user's allergy. */

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayCommonUserAllergy({ userId }) {
  const [isEditable, setIsEditable] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies(prevAllergies => [...prevAllergies, newAllergy]);
      setNewAllergy('');
    } else {
      setAlertSeverity('error');
      setAlertMessage('This allergy already exists!');
      setOpen(true);
    }
  };

  const handleDelete = (allergyToRemove) => () => {
    setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      updateCommonUserAllergy();
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (!userId) {
      console.log("UserID is not set.");
      return;
    }

    if (userId) {
      const fetchCommonUserAllergy = async () => {
        const token = Cookies.get('token');
        const apiUrl = `http://127.0.0.1:8080/getAllergy`;
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
          if (isMounted) {
            setAllergies(data.Allergies);
          }
        } catch (error) {
          console.error('There was a problem fetching the user allergies:', error);
        }
      };

      fetchCommonUserAllergy();
    }
  }, [userId]);

  const updateCommonUserAllergy = async () => {
    try {
      const token = Cookies.get('token');
      console.log(allergies);
      const response = await fetch('http://127.0.0.1:8080/updateAllergy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          userID: userId,
          allergies: allergies,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Update successful', responseData);
      if (responseData.Message === "Successfully updated the allergy info into your profile.") {
        setAlertSeverity('success');
        setAlertMessage(responseData.Message);
        setOpen(true);
      } else {
        setAlertSeverity('error');
        setAlertMessage(responseData.Message);
        setOpen(true);
      }

    } catch (error) {
      console.error('There was a problem updating common user allergy:', error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title='Allergies' userId={userId} />
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
                  <Title>My Food Allergies</Title>
                  <Stack direction="row" spacing={1}>
                    {Array.isArray(allergies) && allergies.map(allergy => (
                      <Chip
                        key={allergy}
                        label={allergy}
                        variant="outlined"
                        onDelete={isEditable ? handleDelete(allergy) : undefined}
                      />
                    ))}
                  </Stack>
                  {isEditable && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <TextField
                        variant="outlined"
                        placeholder="Enter food allergy"
                        fullWidth
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        onClick={handleAddAllergy}
                      >
                        Add
                      </Button>
                    </Stack>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={toggleEdit}
                  >
                    {isEditable ? 'Done' : 'Edit My Food Allergies'}
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


export default DisplayCommonUserAllergy;