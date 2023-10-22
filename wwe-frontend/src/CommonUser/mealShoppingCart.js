import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import MenuIcon from '@mui/icons-material/Menu';
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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
    const [open, setOpen] = React.useState(true);
    const [cartItems, setCartItems] = React.useState([]);
    const [totalCalories, setTotalCalories] = React.useState(0);

    const handleAddToCart = (foodItem) => {
        // Add the selected food item to the cart
        setCartItems([...cartItems, foodItem]);
        // Update the total calories
        setTotalCalories(totalCalories + foodItem.calories);
    };

    const handleRemoveFromCart = (foodId) => {
        const updatedCart = cartItems.filter(item => item.id !== foodId);
        setCartItems(updatedCart);
        // Update the total calories
        const newTotalCalories = updatedCart.reduce((acc, curr) => acc + curr.calories, 0);
        setTotalCalories(newTotalCalories);
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
                <DashboardLayout title = 'Shopping Cart'/>
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
                                                            image="https://source.unsplash.com/random?food"
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
