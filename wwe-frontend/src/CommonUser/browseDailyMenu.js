import React, { useEffect, useState } from 'react';
import {
  FormControl, InputLabel,
  MenuItem, Select
} from '@mui/material';
import Button from '@mui/material/Button';
import Title from './Title';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DashboardLayout from './DashboardLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import Cookies from 'js-cookie';

/* TODO: This component should let common user browse a list of menuItems in dailyMenu. 
    Each item displays a name, customer rating, food warning/recommendation and a button to add 
    the menuItem to shopping cart. 
    When click on the menuItem to view details, it should show displayMenuItem component. 
*/

function BrowseDailyMenu({ userId }) {
  const [userData, setUserData] = useState(null);
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedDiningHall, setSelectedDiningHall] = useState('');
  const [selectedDiningHallID, setSelectedDiningHallID] = useState('');
  const [currentMenuItems, setCurrentMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const userCartCookieName = `cart_${userId}`;
    const itemsFromCookies = Cookies.get(userCartCookieName);
    return itemsFromCookies ? JSON.parse(itemsFromCookies) : [];
  });

  const handleDiningHallChange = (event) => {
    const selectedHall = diningHalls.find(hall => hall.name === event.target.value);
    if (selectedHall) {
      setSelectedDiningHall(selectedHall.name);
      setSelectedDiningHallID(selectedHall.id);
      Cookies.set('selectedDiningHallID', selectedHall.id, { expires: 1 });
      setCartItems([]); // Clear the cart items in state
      Cookies.set(`cart_${userId}`, JSON.stringify([]), { expires: 1 });
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
    }
  };

  useEffect(() => {
    const userDetailsString = Cookies.get('userData');
    console.log('userDetailsString:', userDetailsString);

    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      console.log('Parsed userDetails:', userDetails);
      setUserData(userDetails);

      fetchDiningHalls(userDetails.institutionID);

    }
  }, [userId]);

  useEffect(() => {
    const selectedDiningHallIDFromCookie = Cookies.get('selectedDiningHallID');
    if (selectedDiningHallIDFromCookie) {
      // Find the dining hall name using the ID
      const hall = diningHalls.find(h => h.id === selectedDiningHallIDFromCookie);
      if (hall) {
        setSelectedDiningHall(hall.name);
      }
    }
  }, [diningHalls]);

  useEffect(() => {
    if (selectedDiningHall) {
      Cookies.set('selectedDiningHall', selectedDiningHall, { expires: 1 });
    }
  }, [selectedDiningHall]);

  useEffect(() => {
    if (selectedDiningHallID) {
      fetchMenuItems(selectedDiningHallID);
    }
  }, [selectedDiningHallID]);

  const fetchMenuItems = async (diningHallID) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/browseMenu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diningHallID, userID: userId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const menuData = await response.json();
      if (menuData.sortedDishList) {
        setCurrentMenuItems(menuData.sortedDishList);
      } else {
        console.error('No menu data returned');
        setCurrentMenuItems([]);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };



  const fetchDiningHalls = async (institutionID) => {
    console.log('Fetching dining halls for institutionID:', institutionID);
    const apiUrl = `http://127.0.0.1:8080/getAllDiningHalls`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ institutionID })
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const diningData = await response.json();
      console.log('Received diningData:', diningData);
      if (diningData.DiningHalls) {
        setDiningHalls(diningData.DiningHalls.map(hall => ({ name: hall.name, id: hall.id })));
      } else {
        console.error('No dining halls data returned');
      }
    } catch (error) {
      console.error('Error fetching dining halls:', error);
    }
  };

  const handleAddToCart = (foodItem) => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex(item => item.dishID === foodItem.dishID);
      let newCartItems;

      if (itemIndex > -1) {
        newCartItems = [...prevCartItems];
        newCartItems[itemIndex].count += 1;
      } else {
        newCartItems = [...prevCartItems, { ...foodItem, count: 1 }];
      }
      console.log('New Cart Items:', newCartItems);
      Cookies.set(`cart_${userId}`, JSON.stringify(newCartItems), { expires: 1 });
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCartItems }));
      return newCartItems;
    });
  };

  const formatCategories = (categories) => {
    if (categories) {
      return categories.replace(/[{}"]/g, '').split(',').join(', ');
    }
    return 'N/A'; // or any default string you wish to display
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title="Menu" userId={userId} />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {/* Dining Hall Selection */}
              <Grid item xs={12} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="dining-hall-select-label">Select Dining Hall</InputLabel>
                  <Select
                    labelId="dining-hall-select-label"
                    id="dining-hall-select"
                    value={selectedDiningHall || ''}
                    label="Select Dining Hall"
                    onChange={handleDiningHallChange}
                  >
                    {diningHalls.map((hall) => (
                      <MenuItem key={hall.id} value={hall.name}>{hall.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Display Demo Menu Items */}
              <Grid container spacing={4}>
                {currentMenuItems.map((item) => (
                  <Grid item key={item.dishID} xs={12} sm={6} md={4}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="div"
                        sx={{ pt: '56.25%' }}
                        image={`https://source.unsplash.com/random?food&${item.dishID}`}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.dishName}
                        </Typography>
                        <Typography>
                          Calories:  {item.calorie}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rating: {item.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Serving Size: {item.servingSize}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatCategories(item.categories)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ingredients: {item.ingredients}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Type: {item.type}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => handleAddToCart(item)}>
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Copyright sx={{ pt: 4 }} />
          </LocalizationProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default BrowseDailyMenu;
