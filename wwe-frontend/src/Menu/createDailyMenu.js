import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DashboardLayout from '../DiningHall/DashboardLayout';
import Title from './Title';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import Copyright from '../Copyright';

/* TODO: This component should allow dining hall administrator create a new dailyMenu. 
    The component should have a button to display createMenuItem component and allow dining hall 
    administrator to add new menuItem to dailyMenu.
*/


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function CreateDailyMenu({userId}) {
    const [isEditable, setIsEditable] = useState(false);
    const possibleCategories = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian', 'None'];
    const possibleFoodTypes = ['Salad', 'Side', 'Main', 'Drink'];
    const [historicalMenus, setHistoricalMenus] = useState([]);
    const [menuDate, setMenuDate] = useState("");
    const [foodItems, setFoodItems] = useState([{ dishName: '', ingredients: '', type: '', calories: '', serving_size: '', categories: [] }]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setCreateDailyMenuDefaultState = () => {
        setMenuDate(""); 
        setFoodItems([{ dishName: '', ingredients: '', type: '', calories: '', serving_size: '', categories: [] }]);
    }

    const handleCategoriesChange = (event, index) => {
        const newSelection = event.target.value;
        setFoodItems((currentFoodItems) => {
            return currentFoodItems.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        categories: typeof newSelection === 'string' ? newSelection.replace(/[{}"]/g, '').split(',') : newSelection,
                    };
                }
                return item; 
            });
        });
    };

    useEffect(() => {
        fetchHistoricalMenus();
    }, [userId]);

    const fetchHistoricalMenus = async () => {
        const token = Cookies.get('token'); 
        const apiUrl = `http://127.0.0.1:8080/getHistoricalMenu`; 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ 
              diningHallID: userId
            })
        };
      
        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const menusArray = Object.keys(data).map(key => ({
              id: key,
              menu: `Menu ${key}`
            }));
            setHistoricalMenus(menusArray);
        } catch (error) {
            console.error('There was a problem fetching historical menu data:', error);
        }
      };

    const createDailyMenu = async () => {
        if (!validateMenu()) {
            setIsEditable(true);
            return;
        }
        try {
            const token = Cookies.get('token'); 
            const response = await fetch('http://127.0.0.1:8080/createDailyMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                  diningHallID: userId,
                  menuDate: menuDate,
                  dishes: foodItems
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.message === "Menu created") {
              setAlertSeverity('success');
              setAlertMessage(responseData.message);
              setOpen(true);
              setCreateDailyMenuDefaultState();
              await fetchHistoricalMenus();
            } else {
              setAlertSeverity('error');
              setAlertMessage(responseData.message);
              setOpen(true);
            }
        } catch (error) {
            console.error('There was a problem creating a new menu:', error.message);
        }
    };

    const deleteDailyMenu = async () => {
        for (const menuId of rowSelectionModel) {
            try {
                const token = Cookies.get('token'); 
                const response = await fetch('http://127.0.0.1:8080/deleteMenu', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify({
                    diningHallID: userId,
                    menuID: menuId,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } 

                const responseData = await response.json();
                console.log(responseData);
                if (responseData.message === "Menu deleted.") {
                    setAlertSeverity('success');
                    setAlertMessage(responseData.message);
                    setOpen(true);
                    setRowSelectionModel([]);
                    setCreateDailyMenuDefaultState();
                } else {
                    setAlertSeverity('error');
                    setAlertMessage(responseData.message);
                    setOpen(true);
                }
            } catch (error) {
                console.error('There was a problem deleting a menu:', error.message);
            }
        }
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
        if (isEditable) {
            console.log(foodItems)
            createDailyMenu();
        }
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'menu', 
            headerName: 'Menu', 
            width: 200,
            renderCell: (params) => (
                <div>
                    <MenuBookIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    {params.value}
                </div>
            )
        }
    ];

    const handleAddFoodItem = () => {
        setFoodItems([...foodItems, { dishName: '', ingredients: '', type: '', calories: '', serving_size: '', categories: [] }]);
    };

    const handleDeleteFoodItem = (index) => {
        const filteredItems = foodItems.filter((item, i) => i !== index);
        setFoodItems(filteredItems);
    };

    const handleInputChange = (index, field, value) => {
        const newFoodItems = [...foodItems];
        newFoodItems[index][field] = value;
        setFoodItems(newFoodItems);
    };

    const validateMenu = () => {
        if (!menuDate) {
          setAlertMessage('Menu date is required.');
          setAlertSeverity('error');
          setOpen(true);
          return false;
        }
      
        if (foodItems.length === 0) {
          setAlertMessage('At least one food item is required.');
          setAlertSeverity('error');
          setOpen(true);
          return false;
        }
      
        for (const item of foodItems) {
          if (!item.dishName || !item.calories || !item.serving_size || !item.ingredients || item.categories.length === 0 || !item.type) {
            setAlertMessage('All fields are required for each food item.');
            setAlertSeverity('error');
            setOpen(true);
            return false;
          }
        }
        return true;
      };

    return (
      <ThemeProvider theme={createTheme()}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardLayout title ="What We Eat Dashboard" userId={userId}/>
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
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertMessage}
              </Alert>
            </Snackbar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Historical Menus</Title>
                    <div style={{ height: 400, width: '100%', marginTop: '10px', marginBottom: '10px' }}>
                        <DataGrid 
                            rows={historicalMenus} 
                            columns={columns} 
                            pageSize={5} 
                            rowsPerPageOptions={[5]}
                            checkboxSelection={true}
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteDailyMenu}
                        disabled={rowSelectionModel.length === 0}
                        sx={{ mb: 2 }}
                    >
                        Delete Selected Menu
                    </Button>
                    <Title>Create Daily Menu </Title>
                    {isEditable && (
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Menu Date"
                                    value={menuDate}
                                    onChange={(newMenuDate) => setMenuDate(newMenuDate)}
                                    required
                                />
                            </LocalizationProvider>
                            {foodItems.map((item, index) => (
                                <div key={index}>
                                    <TextField
                                        label="Food Name"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        value={item.dishName}
                                        onChange={e => handleInputChange(index, 'dishName', e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Calories per serving"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={item.calories}
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        onChange={e => handleInputChange(index, 'calories', e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Serving size"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={item.serving_size}
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        onChange={e => handleInputChange(index, 'serving_size', e.target.value)}
                                        required
                                    />
                                    <FormControl variant="outlined" sx={{ width: 400, marginRight: '10px', marginBottom: '10px' }} >
                                        <InputLabel>Categories</InputLabel>
                                        <Select
                                        multiple
                                        value={item.categories}
                                        label="Categories"
                                        onChange={(event) => handleCategoriesChange(event, index)}
                                        required
                                        >
                                        {possibleCategories.map(category => (
                                            <MenuItem key={category} value={category}>
                                            {category}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" sx={{ width: 200, marginBottom: '10px' }} >
                                        <InputLabel>Food Type</InputLabel>
                                        <Select
                                            value={item.type}
                                            label="Food Type"
                                            onChange={e => handleInputChange(index, 'type', e.target.value)}
                                            required
                                        >
                                        {possibleFoodTypes.map(type => (
                                            <MenuItem key={type} value={type}>
                                            {type}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    <Box mb={2}> 
                                        <TextField
                                            label="Ingredients"
                                            variant="outlined"
                                            sx={{ width: '1120px'}}
                                            multiline 
                                            rows={4} 
                                            value={item.ingredients}
                                            onChange={e => handleInputChange(index, 'ingredients', e.target.value)}
                                            required
                                        />
                                    </Box>
                                    <Button onClick={() => handleDeleteFoodItem(index)}>Delete</Button>
                                </div>
                            ))}
                            <Button onClick={handleAddFoodItem}>Add</Button>
                        </div>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={toggleEdit}
                        >
                        {isEditable ? 'Done' : 'Create New Daily Menu'}
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
}

export default CreateDailyMenu;