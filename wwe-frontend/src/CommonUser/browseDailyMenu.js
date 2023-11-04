import * as React from 'react';
import Button from '@mui/material/Button';
import Title from './Title';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
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
import DashboardLayout from './DashboardLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

/* TODO: This component should let common user browse a list of menuItems in dailyMenu. 
    Each item displays a name, customer rating, food warning/recommendation and a button to add 
    the menuItem to shopping cart. 
    When click on the menuItem to view details, it should show displayMenuItem component. 
*/

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        What We Eat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [
  {
    id: 1,
    name: 'Food Item 1',
    calories: 300,
    imageUrl: 'https://source.unsplash.com/random?food&1',
  },
  {
    id: 2,
    name: 'Food Item 2',
    calories: 450,
    imageUrl: 'https://source.unsplash.com/random?food&2',
  },
];

function BrowseDailyMenu({ userId }) {
  const [cartItems, setCartItems] = React.useState(() => {
    const userCartCookieName = `cart_${userId}`;
    const itemsFromCookies = Cookies.get(userCartCookieName);
    return itemsFromCookies ? JSON.parse(itemsFromCookies) : [];
  });

  const handleAddToCart = (foodItem) => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex(item => item.id === foodItem.id);
      let newCartItems;
      if (itemIndex > -1) {
        newCartItems = [...prevCartItems];
        newCartItems[itemIndex].count += 1;
      } else {
        newCartItems = [...prevCartItems, { ...foodItem, count: 1 }];
      }

      console.log('New Cart Items:', newCartItems);

      const userCartCookieName = `cart_${userId}`;
      Cookies.set(userCartCookieName, JSON.stringify(newCartItems), { expires: 1 }); // Expires in 1 day

      window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCartItems }));

      return newCartItems;
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title="Menu" userId={userId}/>
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Today's Menu</Title>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                              Food Items:
                            </Typography>
                          </Grid>
                          {/* Display the Shopping Cart using Cards */}
                          <Grid container spacing={4}>
                            {cards.map((card) => (
                              <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card
                                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                  <CardMedia
                                    component="div"
                                    sx={{
                                      pt: '56.25%',
                                    }}
                                    image={card.imageUrl}
                                  />
                                  <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      {card.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {card.calories} calories
                                    </Typography>
                                    <Typography>
                                      Rating: 5 stars
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleAddToCart(card)}>
                                      Add to Cart
                                    </Button>
                                    <Button size="small">View Details</Button>
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider variant="middle" />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </LocalizationProvider>
        </Box >
      </Box>
    </ThemeProvider >
  );
}

export default BrowseDailyMenu;
