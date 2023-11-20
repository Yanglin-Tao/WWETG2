import React, { useState, useEffect } from 'react';
// ... other necessary imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DashboardLayout from './DashboardLayout';
import Copyright from '../Copyright';


export default function DisplayCommonUserReports({ userId }) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetailsClick = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
        setIsModalOpen(false);
    };
    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardLayout title="Monthly Reports" userId={userId} />
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
                        <Grid container spacing={4}>
                            {monthlyReports.reports.map((report) => (
                                <Grid item key={report.report_month} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="div"
                                            sx={{ pt: '56.25%' }}
                                            image={`https://source.unsplash.com/random?report&${report.report_month}`}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {report.report_month} Report
                                            </Typography>
                                            <Typography variant="body1">
                                                Total Calories Intake: {report.total_calorie_intake}
                                            </Typography>
                                            <Typography variant="body1">
                                                Average Daily Intake: {report.daily_average_calorie_intake}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <Copyright sx={{ pt: 4 }} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

const monthlyReports = {
    reports: [
        {
            report_month: "2023-11",
            total_calorie_intake: 30000,
            daily_average_calorie_intake: 1000
        },
        {
            report_month: "2023-10",
            total_calorie_intake: 28000,
            daily_average_calorie_intake: 933.33
        },
        {
            report_month: "2023-09",
            total_calorie_intake: 27000,
            daily_average_calorie_intake: 900
        }
    ]
};
