import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardLayout from '../DiningHall/DashboardLayout';
import Title from './Title';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';

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

function CreateDailyMenu() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const login = () => {
      window.open("/login", "_self");
    };
    const [isEditable, setIsEditable] = useState(false);
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

    const [foodItems, setFoodItems] = React.useState([{ name: '', ingredients: '', type: '' }]);

    const handleAddFoodItem = () => {
        setFoodItems([...foodItems, { name: '', ingredients: '', type: '' }]);
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
          <DashboardLayout title ="What We Eat Dashboard" />
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
                    <Title>Create Daily Menu for 10-23-2023 </Title>
                    {isEditable && (
                        <div>
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
                                        label="Food Type"
                                        variant="outlined"
                                        margin="normal"
                                        value={item.type}
                                        sx={{ marginRight: '10px' }}
                                        onChange={e => handleInputChange(index, 'type', e.target.value)}
                                    />
                                    <TextField
                                        label="Calories per serving"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ marginRight: '10px' }}
                                    />
                                    <TextField
                                        label="Serving size"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        sx={{ marginRight: '10px' }}
                                    />
                                    <TextField
                                        label="Category"
                                        variant="outlined"
                                        margin="normal"
                                    />
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
                                    <Button>Delete</Button>
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