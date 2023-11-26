import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Button, Card, CardActions, CardContent, CardMedia, CssBaseline,
    Grid, Box, Toolbar, Typography, Container,
    ThemeProvider, createTheme, TextField, Select, MenuItem
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DashboardLayout from '../DiningHall/DashboardLayout';
import Copyright from '../Copyright';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayMenuItem({ userId }) {
    const location = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableDish, setEditableDish] = useState(null);
    const [showNewDishForm, setShowNewDishForm] = useState(false);
    const possibleCategories = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian'];
    const possibleFoodTypes = ['Salad', 'Side', 'Main', 'Drink'];
    const [snackBarInfo, setSnackBarInfo] = React.useState({
        open: false,
        message: '',
        severity: 'info', // can be 'error', 'warning', 'info', 'success'
    });
    const [newDish, setNewDish] = useState({
        dishName: '',
        calorie: '',
        ingredients: '',
        categories: [],
        servingSize: '',
        type: '',
        imageUrl: 'https://source.unsplash.com/random?food'
    });
    const initialDishes = location.state?.menuDetails || {
        name: 'Unknown Dish',
        calories: 'N/A',
        ingredients: 'N/A',
        categories: [],
        warning: 'N/A',
        imageUrl: 'https://source.unsplash.com/random?food'
    };
    const menuid = location.state?.menuID || 'N/A';
    const menuID = Number(menuid);
    const [dishes, setDishes] = useState(initialDishes);

    const openSnackBar = (message, severity = 'info') => {
        setSnackBarInfo({ open: true, message, severity });
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarInfo({ ...snackBarInfo, open: false });
    };
    const goBack = () => {
        window.open("/displayDailyMenu", "_self");
    };

    const handleEdit = (dish) => {
        setIsEditMode(true);
        setEditableDish({ ...dish });
    };

    const handleSave = async (updatedDish) => {
        const success = await updateDish(updatedDish);

        // If the update was successful, update the dishes state
        if (success) {
            setDishes(dishes.map(dish =>
                dish.dishID === updatedDish.dishID ? updatedDish : dish
            ));
        }
        setIsEditMode(false);
        setEditableDish(null);
    };

    const handleChange = (e, key) => {
        let value = e.target.value;
        if (key === 'categories' && !Array.isArray(value)) {
            value = [value];
        }
        setEditableDish({ ...editableDish, [key]: value });
    };

    const updateDish = async (updatedDish) => {
        try {
            const response = await fetch('http://127.0.0.1:8080/updateDish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updatedDish.dishName,
                    diningHallID: userId, // Ensure this is the correct ID needed by your API
                    ingredients: updatedDish.ingredients,
                    calories: updatedDish.calorie,
                    categories: updatedDish.categories, // Make sure this is formatted correctly
                    servingSize: updatedDish.servingSize,
                    type: updatedDish.type
                }),
            });

            const responseData = await response.json();
            if (responseData.message === "Dish Information Updated.") {
                openSnackBar("Dish updated successfully", "success");
                return true;
            } else {
                openSnackBar("Error updating dish", "error");
                return false;
            }
        } catch (error) {
            console.error('There was a problem updating the dish:', error);
            return false;
        }
    };

    const deleteDishFromMenu = async (menuID, dishID) => {
        try {
            const response = await fetch('http://127.0.0.1:8080/deleteDishFromMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ menuID, dishID }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = response.status !== 204 ? await response.json() : {};
            if (responseData.message === "Deleted Successfully") {
                setDishes(dishes.filter(dish => dish.dishID !== dishID));
                openSnackBar("Dish deleted successfully", "success");
            } else {
                openSnackBar(responseData.message, "error");
            }
        } catch (error) {
            console.error('There was a problem deleting the dish from the menu:', error);
            openSnackBar("Error deleting dish", "error");
        }
    };

    const addNewDish = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/addDish', { // Replace with your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuID: menuID,
                    name: newDish.dishName,
                    diningHallID: userId, // Make sure this is the correct ID
                    ingredients: newDish.ingredients,
                    calories: newDish.calorie,
                    categories: newDish.categories,
                    servingSize: newDish.servingSize,
                    type: newDish.type
                }),
            });

            const responseData = await response.json();
            if (responseData.message === "finish uploading") {
                const updatedNewDish = { ...newDish, dishID: responseData.dishID };
                setDishes([...dishes, updatedNewDish]);
                resetNewDishForm();
                openSnackBar("Dish added successfully", "success");
                toggleNewDishForm();
            } else {
                openSnackBar(responseData.message, "error");
            }
        } catch (error) {
            console.error('There was a problem adding the new dish:', error);
        }
    }

    const resetNewDishForm = () => {
        setNewDish({
            dishName: '',
            calorie: '',
            ingredients: '',
            categories: [],
            servingSize: '',
            type: '',
        });
    };

    const toggleNewDishForm = () => {
        setShowNewDishForm(!showNewDishForm);
    };

    const handleNewDishChange = (e, key) => {
        let value = e.target.value;
        if (key === 'calorie' || key === 'servingSize') {
            value = parseInt(value, 10) || ''; // Convert to integer, or empty string if NaN
        }
        if (key === 'categories' && Array.isArray(value)) {
            value = value.map((item) => item); // Convert the selection to array
        }
        setNewDish({ ...newDish, [key]: value });
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
                                    <Grid item xs={12} >
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={`https://source.unsplash.com/random?food&${dish.dishID}`}
                                                alt={dish.dishName}
                                            />
                                            <CardContent>
                                                {isEditMode && editableDish.dishID === dish.dishID ? (<div>
                                                    <TextField
                                                        required
                                                        label="Dish Name"
                                                        value={editableDish.dishName}
                                                        onChange={(e) => handleChange(e, 'dishName')}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Calories"
                                                        type="number"
                                                        value={editableDish.calorie}
                                                        onChange={(e) => handleChange(e, 'calorie')}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Ingredients"
                                                        value={editableDish.ingredients}
                                                        onChange={(e) => handleChange(e, 'ingredients')}
                                                    />
                                                    <TextField
                                                        required
                                                        label="Serving Size"
                                                        value={editableDish.servingSize}
                                                        onChange={(e) => handleChange(e, 'servingSize')}
                                                    />
                                                    <FormControl fullWidth >
                                                        <InputLabel>Categories</InputLabel>
                                                        <Select
                                                            multiple
                                                            label="Categories"
                                                            value={editableDish.categories}
                                                            onChange={(e) => handleChange(e, 'categories')}
                                                            renderValue={(selected) => selected.join(', ')}
                                                        >
                                                            {possibleCategories.map(category => (
                                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth >
                                                        <InputLabel>Type</InputLabel>
                                                        <Select
                                                            label="Type"
                                                            value={editableDish.type}
                                                            onChange={(e) => handleChange(e, 'type')}
                                                        >
                                                            {possibleFoodTypes.map(type => (
                                                                <MenuItem key={type} value={type}>{type}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>) : (
                                                    // Display fields
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {dish.dishName}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" type="number">
                                                            {dish.calorie} calories per serving
                                                        </Typography>
                                                        <Typography variant="body1" color="text.secondary">
                                                            Ingredients: {dish.ingredients}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" type="number">
                                                            Serving Size: {dish.servingSize}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Category: {Array.isArray(dish.categories) ? dish.categories.join(', ') : dish.categories}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Type: {dish.type}
                                                        </Typography>
                                                    </div>
                                                )}
                                            </CardContent>
                                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button onClick={() => deleteDishFromMenu(Number(menuID), dish.dishID)}>Delete Dish</Button>
                                                {isEditMode && editableDish.dishID === dish.dishID ? (
                                                    <Button onClick={() => handleSave(editableDish)}>Save</Button>
                                                ) : (
                                                    <Button onClick={() => handleEdit(dish)}>Edit Dish</Button>
                                                )}
                                                <Button onClick={goBack}>Back to Menu</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            ))}
                            {showNewDishForm && (
                                <Grid item xs={12} >
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={`https://source.unsplash.com/random?food`}
                                        />
                                        <CardContent >
                                            <TextField
                                                required
                                                label="Dish Name"
                                                value={newDish.dishName}
                                                onChange={(e) => handleNewDishChange(e, 'dishName')}
                                            />
                                            <TextField
                                                required
                                                label="Calories"
                                                type="number"
                                                value={newDish.calorie}
                                                onChange={(e) => handleNewDishChange(e, 'calorie')}
                                            />
                                            <TextField
                                                required
                                                label="Ingredients"
                                                value={newDish.ingredients}
                                                onChange={(e) => handleNewDishChange(e, 'ingredients')}
                                            />
                                            <TextField
                                                required
                                                label="Serving Size"
                                                value={newDish.servingSize}
                                                onChange={(e) => handleNewDishChange(e, 'servingSize')}
                                            />
                                            <FormControl fullWidth >
                                                <InputLabel>Categories</InputLabel>
                                                <Select
                                                    multiple
                                                    label="Categories"
                                                    value={newDish.categories}
                                                    onChange={(e) => handleNewDishChange(e, 'categories')}
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {possibleCategories.map(category => (
                                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth >
                                                <InputLabel>Type</InputLabel>
                                                <Select
                                                    label="Type"
                                                    value={newDish.type}
                                                    onChange={(e) => handleNewDishChange(e, 'type')}
                                                >
                                                    {possibleFoodTypes.map(type => (
                                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </CardContent>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => addNewDish()}>Submit New Dish</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                            {showNewDishForm ? (
                                <Button onClick={toggleNewDishForm}>Close</Button>
                            ) : (
                                <Button onClick={toggleNewDishForm}>Add New Dish</Button>
                            )}
                            <Snackbar
                                open={snackBarInfo.open}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackBar}
                            >
                                <Alert onClose={handleCloseSnackBar} severity={snackBarInfo.severity} sx={{ width: '100%' }}>
                                    {snackBarInfo.message}
                                </Alert>
                            </Snackbar>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </LocalizationProvider>
                </Box>
            </Box >
        </ThemeProvider >
    );
}

export default DisplayMenuItem;
