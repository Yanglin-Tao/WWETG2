import * as React from 'react';
import { useState, useEffect } from 'react';
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
import DashboardLayout from './DashboardLayout';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/* TODO: This component should display common user's privacy settings
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
    
function DisplayCommonUserPrivacySettings({userId}) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const login = () => {
        window.open("/login", "_self");
    };

    const [userData, setUserData] = useState({foodAllgeryPrivacy: true, foodPreferencePrivacy: true, otherPrivacy: true});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/get_user_privacy_settings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
            } finally {
                setLoading(false);
            }
        };
        // fetchUserData();
    }, []);

    const updateCommonUserPrivacySettings = async () => {
        try {
            const response = await fetch('http://localhost:8080/update_user_privacy_settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foodAllgeryPrivacy: userData.foodAllgeryPrivacy, 
                    foodPreferencePrivacy: userData.foodPreferencePrivacy, 
                    otherPrivacy: userData.otherPrivacy, 
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            // handle the response data 

        } catch (error) {
            console.error('There was a problem updating the privacy settings:', error.message);
        }
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Privacy Settings</Title>
                    Authorize dining halls to collect the following data:
                    <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Food allergies data" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Food preferences data" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Other account data" />
                    </FormGroup>
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

export default DisplayCommonUserPrivacySettings;