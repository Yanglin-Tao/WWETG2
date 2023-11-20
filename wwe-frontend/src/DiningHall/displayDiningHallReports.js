import React, { useState, useEffect } from 'react';
// ... other necessary imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DashboardLayout from './DashboardLayout';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Bar } from 'react-chartjs-2';
import Copyright from '../Copyright';

export default function DisplayDiningHallReports({ userId }) {
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
                <DashboardLayout title="Dining Hall Monthly Reports" userId={userId} />
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
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                {report.report_month} Report
                                            </Typography>
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    pt: '56.25%',
                                                }}
                                                image={`https://source.unsplash.com/random?food&${report.report_month}`}
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => handleViewDetailsClick(report)}
                                            >
                                                View Details
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="lg">
                            <DialogTitle>Monthly Report Details</DialogTitle>
                            <DialogContent>
                                {selectedReport && (
                                    <div>
                                        <Typography variant="h6">
                                            Report Month: {selectedReport.report_month}
                                        </Typography>
                                        <Typography variant="h6">
                                            Top Ten Rated Food
                                        </Typography>
                                        {/* Bar chart for top ten rated food */}
                                        <Bar
                                            data={{
                                                labels: selectedReport.top_ten_rated_food.map((food) => `${food.dish_name} (${food.num_rates} rates)`),
                                                datasets: [
                                                    {
                                                        label: 'Average Rating',
                                                        data: selectedReport.top_ten_rated_food.map((food) => food.average_rating),
                                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                        borderColor: 'rgba(75, 192, 192, 1)',
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        max: 5,
                                                    },
                                                },
                                            }}
                                        />
                                        <Typography variant="h6">
                                            Top Ten Food Allergies
                                        </Typography>
                                        {/* Bar chart for top ten allergies */}
                                        <Bar
                                            data={{
                                                labels: selectedReport.top_ten_allergies.map((allergy) => `${allergy.allergy} (${allergy.num_users} users)`),
                                                datasets: [
                                                    {
                                                        label: 'Percentage',
                                                        data: selectedReport.top_ten_allergies.map((allergy) => parseFloat(allergy.percentage)),
                                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                                        borderColor: 'rgba(255, 99, 132, 1)',
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        max: 1,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseModal} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
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
            top_ten_rated_food: [
                {
                    dish_name: "Spaghetti",
                    average_rating: 4.5,
                    num_rates: 20,
                },
                {
                    dish_name: "Burger",
                    average_rating: 4.2,
                    num_rates: 15,
                },
                {
                    dish_name: "Pizza",
                    average_rating: 4.7,
                    num_rates: 18,
                },
                {
                    dish_name: "Salad",
                    average_rating: 4.0,
                    num_rates: 12,
                },
                {
                    dish_name: "Sushi",
                    average_rating: 4.8,
                    num_rates: 25,
                },
                {
                    dish_name: "Steak",
                    average_rating: 4.6,
                    num_rates: 22,
                },
                {
                    dish_name: "Pasta",
                    average_rating: 4.3,
                    num_rates: 17,
                },
                {
                    dish_name: "Chicken Sandwich",
                    average_rating: 4.4,
                    num_rates: 19,
                },
                {
                    dish_name: "Tacos",
                    average_rating: 4.1,
                    num_rates: 14,
                },
                {
                    dish_name: "Sushi Rolls",
                    average_rating: 4.9,
                    num_rates: 28,
                },
            ],
            top_ten_allergies: [
                {
                    allergy: "Peanuts",
                    num_users: 10,
                    percentage: 0.20,
                },
                {
                    allergy: "Dairy",
                    num_users: 8,
                    percentage: 0.16,
                },
                {
                    allergy: "Gluten",
                    num_users: 12,
                    percentage: 0.24,
                },
                {
                    allergy: "Eggs",
                    num_users: 7,
                    percentage: 0.14,
                },
                {
                    allergy: "Soy",
                    num_users: 9,
                    percentage: 0.18,
                },
                {
                    allergy: "Fish",
                    num_users: 5,
                    percentage: 0.10,
                },
                {
                    allergy: "Shellfish",
                    num_users: 6,
                    percentage: 0.12,
                },
                {
                    allergy: "Tree Nuts",
                    num_users: 11,
                    percentage: 0.22,
                },
                {
                    allergy: "Wheat",
                    num_users: 9,
                    percentage: 0.18,
                },
                {
                    allergy: "Sesame",
                    num_users: 4,
                    percentage: 0.08,
                },
            ],
        },
        {
            report_month: "2023-10",
            top_ten_rated_food: [
                {
                    dish_name: "Chicken Parmesan",
                    average_rating: 4.7,
                    num_rates: 21,
                },
                {
                    dish_name: "Tofu Stir-Fry",
                    average_rating: 4.3,
                    num_rates: 17,
                },
                {
                    dish_name: "Grilled Cheese",
                    average_rating: 4.2,
                    num_rates: 15,
                },
                {
                    dish_name: "Pancakes",
                    average_rating: 4.6,
                    num_rates: 20,
                },
                {
                    dish_name: "Beef Stir-Fry",
                    average_rating: 4.5,
                    num_rates: 19,
                },
                {
                    dish_name: "Mashed Potatoes",
                    average_rating: 4.0,
                    num_rates: 12,
                },
                {
                    dish_name: "Caesar Salad",
                    average_rating: 4.4,
                    num_rates: 18,
                },
                {
                    dish_name: "Shrimp Scampi",
                    average_rating: 4.8,
                    num_rates: 23,
                },
                {
                    dish_name: "Chili",
                    average_rating: 4.1,
                    num_rates: 14,
                },
                {
                    dish_name: "Chicken Tenders",
                    average_rating: 4.9,
                    num_rates: 26,
                },
            ],
            top_ten_allergies: [
                {
                    allergy: "Peanuts",
                    num_users: 11,
                    percentage: 0.22,
                },
                {
                    allergy: "Dairy",
                    num_users: 9,
                    percentage: 0.18,
                },
                {
                    allergy: "Gluten",
                    num_users: 13,
                    percentage: 0.26,
                },
                {
                    allergy: "Eggs",
                    num_users: 8,
                    percentage: 0.16,
                },
                {
                    allergy: "Soy",
                    num_users: 10,
                    percentage: 0.20,
                },
                {
                    allergy: "Fish",
                    num_users: 6,
                    percentage: 0.12,
                },
                {
                    allergy: "Shellfish",
                    num_users: 7,
                    percentage: 0.14,
                },
                {
                    allergy: "Tree Nuts",
                    num_users: 12,
                    percentage: 0.24,
                },
                {
                    allergy: "Wheat",
                    num_users: 10,
                    percentage: 0.20,
                },
                {
                    allergy: "Sesame",
                    num_users: 5,
                    percentage: 0.10,
                },
            ],
        },
        {
            report_month: "2023-09",
            top_ten_rated_food: [
                {
                    dish_name: "Taco Salad",
                    average_rating: 4.4,
                    num_rates: 18,
                },
                {
                    dish_name: "BBQ Ribs",
                    average_rating: 4.8,
                    num_rates: 23,
                },
                {
                    dish_name: "Veggie Burger",
                    average_rating: 4.2,
                    num_rates: 16,
                },
                {
                    dish_name: "French Fries",
                    average_rating: 4.0,
                    num_rates: 12,
                },
                {
                    dish_name: "Chicken Noodle Soup",
                    average_rating: 4.6,
                    num_rates: 20,
                },
                {
                    dish_name: "Fried Rice",
                    average_rating: 4.3,
                    num_rates: 17,
                },
                {
                    dish_name: "Caesar Wrap",
                    average_rating: 4.5,
                    num_rates: 19,
                },
                {
                    dish_name: "Tiramisu",
                    average_rating: 4.9,
                    num_rates: 25,
                },
                {
                    dish_name: "Hot Wings",
                    average_rating: 4.7,
                    num_rates: 21,
                },
                {
                    dish_name: "Cheesecake",
                    average_rating: 4.1,
                    num_rates: 14,
                },
            ],
            top_ten_allergies: [
                {
                    allergy: "Peanuts",
                    num_users: 9,
                    percentage: 0.18,
                },
                {
                    allergy: "Dairy",
                    num_users: 7,
                    percentage: 0.14,
                },
                {
                    allergy: "Gluten",
                    num_users: 11,
                    percentage: 0.22,
                },
                {
                    allergy: "Eggs",
                    num_users: 6,
                    percentage: 0.12,
                },
                {
                    allergy: "Soy",
                    num_users: 8,
                    percentage: 0.16,
                },
                {
                    allergy: "Fish",
                    num_users: 4,
                    percentage: 0.08,
                },
                {
                    allergy: "Shellfish",
                    num_users: 5,
                    percentage: 0.10,
                },
                {
                    allergy: "Tree Nuts",
                    num_users: 10,
                    percentage: 0.20,
                },
                {
                    allergy: "Wheat",
                    num_users: 8,
                    percentage: 0.16,
                },
                {
                    allergy: "Sesame",
                    num_users: 3,
                    percentage: 0.06,
                },
            ],
        },
    ],
};