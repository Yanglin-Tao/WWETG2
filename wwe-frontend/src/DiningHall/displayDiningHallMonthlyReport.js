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
  const [monthlyReports, setMonthlyReports] = useState([]);
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
        setMonthlyReports(data.reports);
      } catch (error) {
        console.error(
          'There was a problem fetching dining hall monthly reports:',
          error
        );
      }
    };
    getDiningHallMonthlyReports();
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
        {monthlyReports.map((report, index) => (
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
                  data: selectedReport.top_preferences.map((pref) => ({
                    value: pref.percentage,
                    label: pref.preference,
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