import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    imageUrl: 'https://source.unsplash.com/random?food1',
  },
  {
    id: 2,
    name: 'Food Item 2',
    calories: 450,
    imageUrl: 'https://source.unsplash.com/random?food2',
  },
];

function BrowseDailyMenu() {
  const [cartItems, setCartItems] = React.useState([]);
  const [totalCalories, setTotalCalories] = React.useState(0);

  const handleAddToCart = (foodItem) => {
    // Add the selected food item to the cart
    setCartItems([...cartItems, foodItem]);
    // Update the total calories
    setTotalCalories(totalCalories + foodItem.calories);
  };

  const dashboard = () => {
    window.open("/displayCommonUserDashboard", "_self");
  };

  const shop = () => {
    window.open("/mealShoppingCart", "_self");
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar >
          <CameraIcon sx={{ mr: 2 }} />
          <Typography component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}>
            Today's Menu
          </Typography>
          <IconButton size="large" color="inherit" onClick={shop}>
            {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={dashboard}>
            <WidgetsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
            >
              Today's Menu
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {/* Your food cards */}
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Food Item Name
                    </Typography>
                    <Typography>
                      Rating: 5 stars
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleAddToCart({ name: 'Food Item Name', calories: 300 })}
                    >
                      Add to Cart
                    </Button>
                    <Button size="small">View Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
        {/* Display the shopping cart */}
      </Box>
    </ThemeProvider>
  );
}

export default BrowseDailyMenu;
