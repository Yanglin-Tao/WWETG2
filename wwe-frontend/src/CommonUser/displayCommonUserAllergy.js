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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; 
import DashboardLayout from './DashboardLayout';

/* TODO: This component should display common user's allergy. */

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

function DisplayCommonUserAllergy() {
  const [open, setOpen] = React.useState(true);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const login = () => {
    window.open("/login", "_self");
  };

  const [isEditable, setIsEditable] = useState(false);
  const [allergies, setAllergies] = useState([
    'Milk',
    'Eggs',
    'Fish',
    'Crustacean shellfish',
    'Peanuts'
  ]);
  const [newAllergy, setNewAllergy] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
        setAllergies(prevAllergies => [...prevAllergies, newAllergy]);
        setNewAllergy(''); 
    } else {
        setOpenSnackbar(true);  
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDelete = (allergyToRemove) => () => {
    setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const [userData, setUserData] = useState({userId: '', foodAllergies: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('http://localhost:8080/get_common_user_allergy');
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

  const updateCommonUserAllergy = async () => {
      try {
          const response = await fetch('http://localhost:8080/update_common_user_allergy', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: userData.userId, 
                  newFoodAllergies: newAllergy,
              }),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          // handle the response data 

      } catch (error) {
          console.error('There was a problem updating common user allergy:', error.message);
      }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title = 'Allergies'/>
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
                  <Title>My Food Allergies</Title>
                  <Stack direction="row" spacing={1}>
                  {allergies.map(allergy => (
                    <Chip 
                      key={allergy}
                      label={allergy}
                      variant="outlined"
                      onDelete={isEditable ? handleDelete(allergy) : undefined}
                    />
                  ))}
                  </Stack>
                  <Snackbar 
                      open={openSnackbar} 
                      autoHideDuration={6000} 
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  >
                      <Alert onClose={handleCloseSnackbar} severity="warning" variant="filled">
                          This allergy already exists!
                      </Alert>
                  </Snackbar>
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