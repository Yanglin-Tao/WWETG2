import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
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
import StarRateIcon from '@mui/icons-material/StarRate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/* TODO: This component should display the details of a menuItem, including a name, calories per serving, ingredients,
    customer rating, food warning/recommendation, and a button to add the menuItem to shopping cart
*/
function DisplayMenuItem() {
    const shop = () => {
        window.open("/mealShoppingCart", "_self");
    };
    const menu = () => {
        window.open("/displayDailyMenu", "_self");
    };
    const sampleMenuItem = {
        name: 'Delicious Dish',
        calories: 400,
        ingredients: 'Chicken, Vegetables, Spices',
        customerRating: 4.5,
        warning: 'Contains peanuts',
        imageUrl: 'https://source.unsplash.com/random?food'
    };
    return (
        <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar >
                    <TurnedInIcon sx={{ mr: 2 }} />
                    <Typography component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}>
                        Menu Item
                    </Typography>
                    <IconButton size="large" color="inherit" onClick={shop}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={menu}>
                        <MenuBookIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
                    <Container maxWidth="md">
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={sampleMenuItem.imageUrl}
                                alt={sampleMenuItem.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {sampleMenuItem.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {sampleMenuItem.calories} calories per serving
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Ingredients: {sampleMenuItem.ingredients}
                                </Typography>
                                <Stack direction="row" alignItems="center">
                                    <StarRateIcon color="primary" />
                                    <Typography variant="body2" color="text.secondary">
                                        {sampleMenuItem.customerRating} / 5
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" color="error">
                                    Warning: {sampleMenuItem.warning}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" color="primary">
                                    Add to Shopping Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );

}

export default DisplayMenuItem;