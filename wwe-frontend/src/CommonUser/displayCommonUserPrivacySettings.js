import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from './Title';
import Typography from '@mui/material/Typography';
import DashboardLayout from './DashboardLayout';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Copyright from '../Copyright';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';

/* TODO: This component should display common user's privacy settings
*/

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisplayCommonUserPrivacySettings({userId}) {
    const [isEditable, setIsEditable] = useState(false);
    const [privacySetting, setPrivacySetting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        const fetchPrivacySetting = async () => {
            const token = Cookies.get('token'); 
            const apiUrl = `http://127.0.0.1:8080/getPrivacySetting`; 
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
                setPrivacySetting(data.allowToCollectData)
            } catch (error) {
                console.error('There was a problem fetching privacy setting', error);
            }
        };
        fetchPrivacySetting();
    }, [userId]);

    const updatePrivacySetting = async () => {
        console.log("privacy setting in updatePrivacySetting");
        console.log(privacySetting);
        const token = Cookies.get('token'); 
        const apiUrl = `http://127.0.0.1:8080/setPrivacySetting`; 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ 
                userID: userId,
                allowToCollectData: privacySetting
            })
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            if (data.message === "Privacy setting updated seccessfully.") {
                setAlertSeverity('success');
                setAlertMessage(data.message);
                setOpen(true);
            } else {
                setAlertSeverity('error');
                setAlertMessage(data.message);
                setOpen(true);
            }
        } catch (error) {
            console.error('There was a problem updating privacy setting', error);
        }
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
        if (isEditable) {
            updatePrivacySetting();
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
                    <Title>Privacy Settings</Title>
                    <FormGroup>
                    {isEditable ? (
                        <FormControlLabel control={<Switch checked={privacySetting} onChange={() => setPrivacySetting(!privacySetting)} />} label="Authorize dining halls to collect my account data" />
                    ) : (
                        <FormControlLabel control={<Switch checked={privacySetting} disabled />} label="Authorize dining halls to collect my account data" />
                    )
                    }
                    </FormGroup>
                    { privacySetting ? (
                        <Typography color="text.secondary" variant="body2">
                            By authorizing dining halls to collect my account data, I agree that analytics report will be generated 
                            and displayed to administrative users based on information including but not limited to food allergies and preferences.
                        </Typography>)
                    : (
                        <Typography color="text.secondary" variant="body2">
                            Your account data will not be collected and used for generating dining hall analytics.
                        </Typography>)
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={toggleEdit}
                      >
                        {isEditable ? 'Save Privacy Settings' : 'Update Privacy Settings'}
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

export default DisplayCommonUserPrivacySettings;