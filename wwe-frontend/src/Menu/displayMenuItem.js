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
import DashboardLayout from '../DiningHall/DashboardLayout';
import StarRateIcon from '@mui/icons-material/StarRate';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/* TODO: This component should display the details of a menuItem, including a name, calories per serving, ingredients,
    customer rating, food warning/recommendation, and a button to add the menuItem to shopping cart
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

function DisplayMenuItem() {
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
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Button size="large" color="primary" onClick={menu}>
                                                    Back to Menu
                                                </Button>
                                            </Box>
                                        </CardActions>
                                    </Card>

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

export default DisplayMenuItem;