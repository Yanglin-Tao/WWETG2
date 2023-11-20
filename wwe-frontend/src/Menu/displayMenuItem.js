import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline,
    Grid, Stack, Box, Toolbar, Typography, Container, Link,
    ThemeProvider, createTheme
} from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import DashboardLayout from '../DiningHall/DashboardLayout';
import Title from '../DiningHall/Title';
import Copyright from '../Copyright';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

function DisplayMenuItem({ userId }) {
    const location = useLocation();
    const dishes = location.state?.menuDetails || {
        name: 'Unknown Dish',
        calories: 'N/A',
        ingredients: 'N/A',
        customerRating: 'N/A',
        warning: 'N/A',
        imageUrl: 'https://source.unsplash.com/random?food'
    };
    console.log("dishes: ", dishes);
    const goBack = () => {
        window.open("/displayDailyMenu", "_self");
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title="Menu Item Details" userId={userId} />
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
                            {dishes.map((dish, index) => (
                                <Grid container spacing={3} key={index}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={`https://source.unsplash.com/random?food&${dish.dishID}`}
                                                alt={dish.dishName}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {dish.dishName}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary">
                                                    {dish.calories} calories per serving
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Ingredients: {dish.ingredients}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Category: {dish.categories.replace(/[{}]/g, '')}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Serving Size: {dish.servingSize}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Type: {dish.type}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            ))}
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button size="large" color="primary" onClick={goBack}>
                                    Back to Menu
                                </Button>
                            </CardActions>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </LocalizationProvider>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default DisplayMenuItem;
