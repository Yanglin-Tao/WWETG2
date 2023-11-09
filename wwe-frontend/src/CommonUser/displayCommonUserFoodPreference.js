import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DashboardLayout from './DashboardLayout';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
/* TODO: This component should display common user's food preference
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayCommonUserFoodPreference({ userId }) {

    const [isEditable, setIsEditable] = useState(false);
    const [preferences, setPreferences] = useState([]);
    const [selectedPreference, setSelectedPreference] = useState('');
    const possiblePreferences = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian']; 
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleDelete = (preferenceToRemove) => () => {
      setPreferences(preferences.filter(preference => preference !== preferenceToRemove));
    };

    const handleAddPreference = () => {
      if (selectedPreference && !preferences.includes(selectedPreference)) {
        setPreferences([...preferences, selectedPreference]);
        setSelectedPreference('');
      }
    };
  
    const toggleEdit = () => {
      setIsEditable(!isEditable);
      if (isEditable) {
        updateCommonUserFoodPreference();
      }
    };

    useEffect(() => {
      const fetchCommonUserFoodPreferences = async () => {
          const token = Cookies.get('token'); 
          const apiUrl = `http://127.0.0.1:8080/getUserPreference`; 
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
              setPreferences(data.Preferences);
          } catch (error) {
              console.error('There was a problem fetching the user preferences:', error);
          }
      };

      fetchCommonUserFoodPreferences();
  }, [userId]); 

    const updateCommonUserFoodPreference = async () => {
        try {
            const token = Cookies.get('token'); 
            console.log(preferences);
            const response = await fetch('http://127.0.0.1:8080/updateUserPreference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                  userID: userId,
                  userPref: preferences
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 

            const responseData = await response.json();
            console.log('Update successful', responseData);
            if (responseData.Message === "Successfully updated the food preference info into your profile.") {
              setAlertSeverity('success');
              setAlertMessage(responseData.Message);
              setOpen(true);
            } else {
              setAlertSeverity('error');
              setAlertMessage(responseData.Message);
              setOpen(true);
            }
        } catch (error) {
            console.error('There was a problem updating common user food preference:', error.message);
        }
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardLayout title = 'Preferences' userId={userId}/>
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
                  <Title>My Food Preferences</Title>
                  <Stack direction="row" spacing={1}>
                  {Array.isArray(preferences) && preferences.map(preference => (
                    <Chip 
                      key={preference}
                      label={preference}
                      variant="outlined"
                      onDelete={isEditable ? handleDelete(preference) : undefined}
                    />
                  ))}
                  </Stack>
                  {isEditable && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <FormControl variant="outlined" style={{ flex: 1 }}>
                        <InputLabel>Select Preference</InputLabel>
                        <Select
                          value={selectedPreference}
                          onChange={(e) => setSelectedPreference(e.target.value)}
                          label="Select Preference"
                        >
                          {possiblePreferences.filter(p => Array.isArray(preferences) && !preferences.includes(p)).map(preference => (
                            <MenuItem key={preference} value={preference}>
                              {preference}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        onClick={handleAddPreference}
                      >
                        Add Preference
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
                  {isEditable ? 'Done' : 'Edit My Food Preferences'}
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
  

export default DisplayCommonUserFoodPreference;