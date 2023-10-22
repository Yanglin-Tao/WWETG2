import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './navigateCommonUserDashboard';
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