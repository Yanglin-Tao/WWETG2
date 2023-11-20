import React, { useState, useEffect } from 'react';
import Title from './Title';
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Bar } from 'react-chartjs-2';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, ArcElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, ArcElement);

export default function DisplayDiningHallMonthlyReport({ userId }) {
  // const [monthlyReports, setMonthlyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getDiningHallMonthlyReports = async () => {
      const token = Cookies.get('token');
      const apiUrl = `http://127.0.0.1:8080/getDiningHallMonthlyReports`;
      console.log(userId);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          diningHallID: userId,
        }),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        // setMonthlyReports(data.reports);
      } catch (error) {
        console.error(
          'There was a problem fetching dining hall monthly reports:',
          error
        );
      }
    };
    // getDiningHallMonthlyReports();
  }, [userId]);

  const handleViewDetailsClick = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Title>Available Monthly Reports</Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
          gap: '16px', // Adjust the gap between cards
        }}
      >
        {monthlyReports.reports.map((report, index) => (
          <Card key={index} sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {report.report_month} Report
              </Typography>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                }}
                image={`https://source.unsplash.com/random?food`}
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
        ))}
      </div>

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
              <Typography variant="h6">
                Food Preferences
              </Typography>
              <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value}%)`,
                  arcLabelMinAngle: 0,
                  data: selectedReport.foodPreferences.map((pref) => ({
                    value: pref.percentage,
                    label: pref.food_preference,
                  })),
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
              width={1000}
              height={600}
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
    </React.Fragment>
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
        foodPreferences: [
          {
            food_preference: "Halal",
            percentage: 10,
          },
          {
            food_preference: "Vegetarian",
            percentage: 20,
          },
          {
            food_preference: "Gluten Free",
            percentage: 15,
          },
          {
            food_preference: "Balanced",
            percentage: 10,
          },
          {
            food_preference: "Vegan",
            percentage: 25,
          },
          {
            food_preference: "Pescatarian",
            percentage: 20,
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
        foodPreferences: [
          {
            food_preference: "Halal",
            percentage: 10,
          },
          {
            food_preference: "Vegetarian",
            percentage: 20,
          },
          {
            food_preference: "Gluten Free",
            percentage: 15,
          },
          {
            food_preference: "Balanced",
            percentage: 10,
          },
          {
            food_preference: "Vegan",
            percentage: 25,
          },
          {
            food_preference: "Pescatarian",
            percentage: 20,
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
        foodPreferences: [
          {
            food_preference: "Halal",
            percentage: 10,
          },
          {
            food_preference: "Vegetarian",
            percentage: 20,
          },
          {
            food_preference: "Gluten Free",
            percentage: 15,
          },
          {
            food_preference: "Balanced",
            percentage: 10,
          },
          {
            food_preference: "Vegan",
            percentage: 25,
          },
          {
            food_preference: "Pescatarian",
            percentage: 20,
          },
        ],
      },
    ],
  };
  