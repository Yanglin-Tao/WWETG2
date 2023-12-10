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
import Title from './Title';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DashboardLayout from './DashboardLayout';
import Rating from './rating';
import Cookies from 'js-cookie';
import Copyright from '../Copyright';

/* TODO: This component should display a shopping cart interface to users. 
    The component should display a list of foot item names and quantities. 
    The user should be able to delete the item from shopping cart or change its quantity.
    The component should have a check out button to calculate the total calories intake and add to user's monthly intake.
*/


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function MealShoppingCart({ userId }) {
    const userCartCookieKey = `cart_${userId}`;
    const cartItemsFromCookie = JSON.parse(Cookies.get(userCartCookieKey) || '[]');
    const diningHallID = Cookies.get('selectedDiningHallID');
    const [cartItems, setCartItems] = React.useState(cartItemsFromCookie);
    const [totalCalories, setTotalCalories] = React.useState(cartItemsFromCookie.reduce((acc, curr) => acc + (curr.calorie * curr.count), 0));
    const [modalOpen, setModalOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [snackBarInfo, setSnackBarInfo] = React.useState({
        open: false,
        message: '',
        severity: 'info', // can be 'error', 'warning', 'info', 'success'
    });

    const openSnackBar = (message, severity = 'info') => {
        setSnackBarInfo({ open: true, message, severity });
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarInfo({ ...snackBarInfo, open: false });
    };

    const trackMeals = async () => {
        const dishDetails = cartItems.map(item => ({
            dishName: item.dishName,
            quantity: item.count
        }));

        try {
            const response = await fetch('http://127.0.0.1:8080/track_meal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: userId,
                    dishDetails,
                    diningHallID,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                showTotalCaloriesMessage();
                setModalOpen(true); // Open rating modal only if the tracking was successful
            } else {
                // Handle unsuccessful response
                console.error('Error: ', data.message);
                openSnackBar(data.message || 'Error tracking meals', 'error');
            }
        } catch (error) {
            console.error('Error tracking meals:', error);
            openSnackBar('Error tracking meals', 'error');
        }
    };

    const showTotalCaloriesMessage = () => {
        const message = `Total Calories for this meal: ${totalCalories}!`;
        openSnackBar(message, 'info');
    };
    
    // Function to show rating message
    const showRatingMessage = () => {
        const message = 'Thank you for Rating!';
        openSnackBar(message, 'success');
    };

    const handleCheckout = async () => {
        await trackMeals();
        setOpen(true);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        
        setCartItems([]);
        setTotalCalories(0);
        Cookies.set(userCartCookieKey, JSON.stringify([]), { expires: 1 });
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
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
            if (!response.ok) {
                // Handle unsuccessful response
                console.error('Error: ', data.message);
                openSnackBar(data.message || 'Error updating food item rating', 'error');
            } else {
                showRatingMessage();
            }
        } catch (error) {
            console.error('Error updating food item rating:', error);
            openSnackBar('Error updating food item rating', 'error');
        }
    };

    const handleRatingComplete = (ratings) => {
        Object.entries(ratings).forEach(([dishID, rating]) => {
            handleRatingSubmit(dishID, rating);
        });

        handleCloseModal();
    };

    // const handleRatingChange = (dishName, newRating) => {
    //     setCartItems(cartItems => cartItems.map(item =>
    //         item.dishName === dishName ? { ...item, rating: newRating } : item
    //     ));
    // };

    const handleRemoveFromCart = (dishId) => {
        setCartItems((prevCartItems) => {
            const itemIndex = prevCartItems.findIndex(item => item.dishID === dishId);
            if (itemIndex === -1) return prevCartItems;

            const newCartItems = [...prevCartItems];
            const item = newCartItems[itemIndex];
            if (item.count > 1) {
                newCartItems[itemIndex].count -= 1;
            } else {
                newCartItems.splice(itemIndex, 1);
            }
            const newTotalCalories = newCartItems.reduce((acc, curr) => acc + (curr.calorie * curr.count), 0);
            setTotalCalories(newTotalCalories);

            Cookies.set(userCartCookieKey, JSON.stringify(newCartItems), { expires: 1 });
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
                                                            <Grid item key={item.dishID} xs={12} sm={6} md={4}>
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
                                                                                {item.dishName}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                Calories:  {item.calorie}
                                                                            </Typography>
                                                                        </CardContent>
                                                                        <CardActions>
                                                                            <Button size="small" color="primary" onClick={() => handleRemoveFromCart(item.dishID)}>
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
                                        
                                        <Rating
                                            openModel={modalOpen}
                                            handleClose={handleCloseModal}
                                            cartItems={cartItems}
                                            handleRatingComplete={handleRatingComplete}
                                            // onRatingChange={handleRatingChange} // New prop
                                        />
                                        <Snackbar
                                            open={snackBarInfo.open}
                                            autoHideDuration={6000}
                                            onClose={handleCloseSnackBar}
                                        >
                                            <Alert onClose={handleCloseSnackBar} severity={snackBarInfo.severity} sx={{ width: '100%' }}>
                                                {snackBarInfo.message}
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
