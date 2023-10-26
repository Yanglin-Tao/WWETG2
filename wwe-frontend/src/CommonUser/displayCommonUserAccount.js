import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Title from './Title';
import Button from '@mui/material/Button';
import DashboardLayout from './DashboardLayout';
/* TODO: This component should display common user's email and institution.
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

function DisplayCommonUserAccount() {
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

    const current_institution = "New York University";
    const user_email = "janedoe@nyu.edu";
    const [password, setPassword] = useState("1234567890letMeIn");
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                    <Title>Current Institution</Title>
                    {current_institution}
                    <Title>User Email</Title>
                    {user_email}
                    <Title>Password</Title>
                    { isEditable ? (
                      <input 
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    ) : (
                        '*********'
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={toggleEdit}
                    >
                        {isEditable ? 'Save Changes' : 'Edit Common User Profile'}
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

export default DisplayCommonUserAccount;