import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
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
import Title from './Title';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DashboardLayout from './DashboardLayout';
import Rating from './rating';
import Cookies from 'js-cookie';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function MealShoppingCart({ userId }) {
    const userCartCookieKey = `cart_${userId}`;
    const cartItemsFromCookie = JSON.parse(Cookies.get(userCartCookieKey) || '[]');
    const diningHallID = Cookies.get('selectedDiningHallID');
    const [cartItems, setCartItems] = React.useState(cartItemsFromCookie);
    const [totalCalories, setTotalCalories] = React.useState(cartItemsFromCookie.reduce((acc, curr) => acc + (curr.calories * curr.count), 0));
    const [modalOpen, setModalOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [ratingMessage, setRatingMessage] = React.useState(false);

    const trackMeals = async () => {
        const dishNameList = cartItems.map(item => item.name);

        try {
            const response = await fetch('http://127.0.0.1:8080/track_meal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: userId,
                    dishList: dishNameList,
                    diningHallID,
                }),
            });

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error tracking meals:', error);
        }
    };

    const handleMessage = (event, reason) => {  // New handleClose function
        if (reason === 'clickaway') {
            setRatingMessage(false);
        }

        setRatingMessage(false);
    };

    const handleClose = (event, reason) => {  // New handleClose function
        if (reason === 'clickaway') {
            setOpen(false);
        }

        setOpen(false);
    };

    const handleCheckout = async () => {
        await trackMeals();
        setOpen(true);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setRatingMessage(true);
    }

    const handleRatingSubmit = async (dishName, rating) => {

        try {
            const response = await fetch('http://127.0.0.1:8080/update_food_item_rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: userId,
                    rating,
                    diningHallID,
                    dishName,
                }),
            });

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error updating food item rating:', error);
        }
    };

    const handleRatingComplete = () => {
        cartItems.forEach(item => {
            handleRatingSubmit(item.name, item.rating); // Assume each item has a 'rating' field
        });

        setCartItems([]);
        setTotalCalories(0);
        handleCloseModal();

        Cookies.set(userCartCookieKey, JSON.stringify([]), { expires: 1 });
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
    };



    const handleRemoveFromCart = (foodId) => {
        setCartItems((prevCartItems) => {
            const itemIndex = prevCartItems.findIndex(item => item.id === foodId);
            if (itemIndex === -1) return prevCartItems;

            const newCartItems = [...prevCartItems];
            const item = newCartItems[itemIndex];
            if (item.count > 1) {
                newCartItems[itemIndex].count -= 1;
            } else {
                newCartItems.splice(itemIndex, 1);
            }
            const newTotalCalories = newCartItems.reduce((acc, curr) => acc + (curr.calories * curr.count), 0);
            setTotalCalories(newTotalCalories);

            Cookies.set(userCartCookieKey, JSON.stringify(newCartItems), { expires: 1 }); // Expires in 1 day

            window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCartItems }));

            return newCartItems;
        });
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title='Shopping Cart' userId={userId} />
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
                                                                    <Card sx={{ width: { xs: '100%', sm: '300px' }, height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={cartItems.length === 0}
                                            onClick={() => handleCheckout()}
                                        >
                                            Check Out
                                        </Button>
                                        <Snackbar
                                            open={open}
                                            autoHideDuration={6000}
                                            onClose={handleClose}
                                        >
                                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                                Total Calories for this meal: {totalCalories}!
                                            </Alert>
                                        </Snackbar>
                                        <Rating
                                            openModel={modalOpen}
                                            handleClose={handleCloseModal}
                                            cartItems={cartItems}
                                            handleRatingComplete={handleRatingComplete}
                                        />
                                        <Snackbar
                                            open={ratingMessage}
                                            autoHideDuration={6000}
                                            onClose={handleMessage}
                                        >
                                            <Alert onClose={handleMessage} severity="success" sx={{ width: '100%' }}>
                                                Thank you for Rating!
                                            </Alert>
                                        </Snackbar>
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

export default MealShoppingCart;
