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

/* TODO: This component should allow dining hall administrator create a new dailyMenu. 
    The component should have a button to display createMenuItem component and allow dining hall 
    administrator to add new menuItem to dailyMenu.
*/

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
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

function CreateDailyMenu({userId}) {
    const [isEditable, setIsEditable] = useState(false);
    const possibleCategories = ['Halal', 'Vegetarian', 'Gluten Free', 'Balanced', 'Vegan', 'Pescatarian'];
    const possibleFoodTypes = ['Salad', 'Side', 'Main', 'Drink'];
    const [historicalMenus, setHistoricalMenus] = useState([]);
    const [menuDate, setMenuDate] = useState("")
    const [foodItems, setFoodItems] = useState([{ name: '', ingredients: '', type: '', calories: '', serving_size: '', category: [] }]);
    const [displayCategories, setDisplayCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleDisplayCategoriesChange = (event) => {
        const {
            target: { value },
        } = event;
        setDisplayCategories(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const fetchHistoricalMenus = async () => {
          const token = Cookies.get('token'); 
          const apiUrl = `http://127.0.0.1:8080/getHistoricalMenus`; 
          console.log(userId);
          const requestOptions = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token,
              },
              body: JSON.stringify({ 
                userID: userId
              })
          };
  
          try {
              const response = await fetch(apiUrl, requestOptions);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data);
              setHistoricalMenus(data)
          } catch (error) {
              console.error('There was a problem fetching historical menu data:', error);
          }
        };
        fetchHistoricalMenus();
    }, [userId]);

    const createDailyMenu = async () => {
        try {
            const token = Cookies.get('token'); 
            const response = await fetch('http://127.0.0.1:8080/createDailyMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                  menuDate: menuDate,
                  menuItems: foodItems
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 

            const responseData = await response.json();
            console.log('Menu creation successful', responseData);
            if (responseData.Message === "Successfully created a new menu.") {
              setAlertSeverity('success');
              setAlertMessage(responseData.Message);
              setOpen(true);
            } else {
              setAlertSeverity('error');
              setAlertMessage(responseData.Message);
              setOpen(true);
            }
        } catch (error) {
            console.error('There was a problem creating a new menu:', error.message);
        }
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
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

    const menus = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        menu: `2023-10-${String(i+1).padStart(2, '0')} Daily Menu`
    }));

    const handleAddFoodItem = () => {
        setFoodItems([...foodItems, { name: '', ingredients: '', type: '' }]);
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
                            rows={menus} 
                            columns={columns} 
                            pageSize={5} 
                            rowsPerPageOptions={[5]}
                            checkboxSelection={false}
                        />
                    </div>
                    <Title>Create Daily Menu </Title>
                    {isEditable && (
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Menu Date"
                                    value={menuDate}
                                    onChange={(newMenuDate) => setMenuDate(newMenuDate)}
                                />
                            </LocalizationProvider>
                            {foodItems.map((item, index) => (
                                <div key={index}>
                                    <TextField
                                        label="Food Name"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        value={item.name}
                                        onChange={e => handleInputChange(index, 'name', e.target.value)}
                                    />
                                    <TextField
                                        label="Calories per serving"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={item.calories}
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        onChange={e => handleInputChange(index, 'calories', e.target.value)}
                                    />
                                    <TextField
                                        label="Serving size"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={item.serving_size}
                                        sx={{ width: '300px', marginRight: '10px' }}
                                        onChange={e => handleInputChange(index, 'serving_size', e.target.value)}
                                    />
                                    <FormControl variant="outlined" sx={{ width: 400, marginRight: '10px', marginBottom: '10px' }} >
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                        multiple
                                        value={displayCategories}
                                        label="Category"
                                        onChange={handleDisplayCategoriesChange}
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