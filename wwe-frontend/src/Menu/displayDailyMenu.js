import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Title from '../DiningHall/Title';
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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import DashboardLayout from '../DiningHall/DashboardLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/* TODO: This component should display a list of menuItems in dailyMenu. 
    Each item displays a name, customer rating, food warning/recommendation and a button to add 
    the menuItem to shopping cart. 
    When click on the menuItem, it should show displayMenuItem component.
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
function DisplayDailyMenu() {
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
    const item = () => {
        window.open("/displayMenuItem", "_self");
    };
    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title="Menu" />
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
                                                    <Grid container spacing={4}>
                                                        {cards.map((card) => (
                                                            <Grid item key={card} xs={12} sm={6} md={4}>
                                                                <Card
                                                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                                                >
                                                                    <CardMedia
                                                                        component="div"
                                                                        sx={{
                                                                            // 16:9
                                                                            pt: '56.25%',
                                                                        }}
                                                                        image="https://source.unsplash.com/random?food"
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
                                                                        <Button size="small" onClick={item}>View Details</Button>
                                                                        <Button size="small">Edit</Button>
                                                                        <Button
                                                                            size="small"
                                                                            onClick={() => handleAddToCart({ name: 'Food Item Name', calories: 300 })}
                                                                        >
                                                                            Add to Cart
                                                                        </Button>
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

export default DisplayDailyMenu;