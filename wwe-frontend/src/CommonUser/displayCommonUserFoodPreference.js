import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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

function DisplayCommonUserFoodPreference() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const login = () => {
      window.open("/login", "_self");
    };

    const [isEditable, setIsEditable] = useState(false);
    const [preferences, setPreferences] = useState([
      'Halal',
      'Vegetarian',
      'Gluten Free',
      'Balanced'
    ]);
    const [selectedPreference, setSelectedPreference] = useState('');
    const possiblePreferences = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian']; 

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
    };

    const [userData, setUserData] = useState({userId: '', foodPreferences: ''});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/get_common_user_food_preferences');
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

    const updateCommonUserAllergyFoodPreference = async () => {
        try {
            const response = await fetch('http://localhost:8080/update_common_user_food_preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userData.userId, 
                    newFoodPreference: selectedPreference,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // handle the response data 

        } catch (error) {
            console.error('There was a problem updating common user food preference:', error.message);
        }
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardLayout title = 'Preferences'/>
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
                  <Title>My Food Preferences</Title>
                  <Stack direction="row" spacing={1}>
                  {preferences.map(preference => (
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
                          {possiblePreferences.filter(p => !preferences.includes(p)).map(preference => (
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