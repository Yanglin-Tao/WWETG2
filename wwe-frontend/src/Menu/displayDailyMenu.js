import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DashboardLayout from '../DiningHall/DashboardLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
/* TODO: This component should display a list of menuItems in dailyMenu. 
    Each item displays a name, customer rating, food warning/recommendation and a button to add 
    the menuItem to shopping cart. 
    When click on the menuItem, it should show displayMenuItem component.
    */

const defaultTheme = createTheme();
function DisplayDailyMenu({ userId }) {

    const [menuList, setMenuList] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            const apiUrl = 'http://127.0.0.1:8080/getHistoricalMenu';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ diningHallID: userId })
            };

            try {
                const response = await fetch(apiUrl, requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMenuList(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, [userId]);

    const editMenu = (menuDetails, menuID) => {
        navigate('/displayMenuItem', { state: { menuDetails, menuID } });
    };
    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title="History Menus" userId={userId} />
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
                                        <Title>History Menus</Title>
                                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            <Box sx={{ my: 3, mx: 2 }}>
                                                <Grid container alignItems="center">
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="h4" component="div">
                                                            Menus:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid container spacing={4}>
                                                        {Object.entries(menuList).map(([menuID, details]) => (
                                                            <Grid item key={menuID} xs={12} sm={6} md={4}>
                                                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                                    <CardMedia
                                                                        component="div"
                                                                        sx={{ pt: '56.25%' }}
                                                                        image={`https://source.unsplash.com/random?food&${menuID}`}
                                                                    />
                                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                            Menu ID: {menuID}
                                                                        </Typography>
                                                                        <Typography>
                                                                            Date: {details.date}
                                                                        </Typography>
                                                                    </CardContent>
                                                                    <CardActions sx={{ justifyContent: 'flex-end', mt: 'auto' }}>
                                                                        <Button size="small" onClick={() => editMenu(details.dishes, menuID)}>Edit</Button>
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