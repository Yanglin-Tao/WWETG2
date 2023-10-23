import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
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
import Title from './Title';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DashboardLayout from './DashboardLayout';

/* TODO: This component should display a shopping cart interface to users. 
    The component should display a list of foot item names and quantities. 
    The user should be able to delete the item from shopping cart or change its quantity.
    The component should have a check out button to calculate the total calories intake and add to user's monthly intake.
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

function BrowseDailyMenu() {
    const [open, setOpen] = React.useState(true);
    const [cartItems, setCartItems] = React.useState([]);
    const [totalCalories, setTotalCalories] = React.useState(0);

    const handleAddToCart = (foodItem) => {
        setCartItems((prevCartItems) => {
            const itemIndex = prevCartItems.findIndex(item => item.id === foodItem.id);
            let newCartItems;
            if (itemIndex > -1) {
                // If the item is already in the cart, increment the count
                newCartItems = [...prevCartItems];
                newCartItems[itemIndex].count += 1;
            } else {
                // If the item is not in the cart, add it with a count of 1
                // Include the imageUrl in the food item data
                newCartItems = [...prevCartItems, { ...foodItem, count: 1, imageUrl: `https://source.unsplash.com/random?food&${foodItem.id}` }];
            }
            // Update the total calories
            const newTotalCalories = newCartItems.reduce((acc, curr) => acc + (curr.calories * curr.count), 0);
            setTotalCalories(newTotalCalories);
    
            return newCartItems;
        });
    };
    

    const handleRemoveFromCart = (foodId) => {
        setCartItems((prevCartItems) => {
            const itemIndex = prevCartItems.findIndex(item => item.id === foodId);

            // If the item is not found, do nothing
            if (itemIndex === -1) return prevCartItems;
            const newCartItems = [...prevCartItems];
            const item = newCartItems[itemIndex];
            // If the count is greater than 1, decrement the count
            if (item.count > 1) {
                newCartItems[itemIndex].count -= 1;
            } else {
                // If the count is 1, remove the item from the cart
                newCartItems.splice(itemIndex, 1);
            }
            // Update the total calories
            const newTotalCalories = newCartItems.reduce((acc, curr) => acc + (curr.calories * curr.count), 0);
            setTotalCalories(newTotalCalories);

            return newCartItems;
        });
    };


    const dashboard = () => {
        window.open("/displayCommonUserDashboard", "_self");
    };

    const shop = () => {
        window.open("/mealShoppingCart", "_self");
    };
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title='Shopping Cart' />
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
                                        <Title>Shopping Cart</Title>
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
                                                        {cartItems.map((item) => (
                                                            <Grid item key={item.id} xs={12} sm={6} md={4}>
                                                                <Badge badgeContent={item.count} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                                                    <Card sx={{ width: { xs: '100%', sm: '335px' }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                                        <CardMedia
                                                                            component="div"
                                                                            sx={{
                                                                                pt: '56.25%',
                                                                            }}
                                                                            image={item.imageUrl}
                                                                        />
                                                                        <CardContent sx={{ flexGrow: 1 }}>
                                                                            <Typography variant="h5" component="div">
                                                                                {item.name}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {item.calories} calories
                                                                            </Typography>
                                                                        </CardContent>
                                                                        <CardActions>
                                                                            <Button size="small" color="primary" onClick={() => handleRemoveFromCart(item.id)}>
                                                                                Remove from Cart
                                                                            </Button>
                                                                        </CardActions>
                                                                    </Card>
                                                                </Badge>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Divider variant="middle" />
                                            <Box sx={{ m: 2 }}>
                                                <p>Total Calories: {totalCalories}</p>
                                            </Box>
                                        </Box>
                                        {/* Display available Food Items */}
                                        <Grid container spacing={4}>
                                            {cards.map((card) => (
                                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                                    <Card
                                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                                    >
                                                        <CardMedia
                                                            component="div"
                                                            sx={{
                                                                // 16:9
                                                                pt: '56.25%',
                                                            }}
                                                            image = {card.imageUrl}
                                                        />
                                                        <CardContent sx={{ flexGrow: 1 }}>
                                                            <Typography variant="h5" component="div">
                                                                {card.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {card.calories} calories
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" color="primary" onClick={() => handleAddToCart(card)}>
                                                                Add to Cart
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Check Out
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </LocalizationProvider>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default BrowseDailyMenu;
