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
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
/* TODO: This component should display common user's monthly reports.
*/

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function DisplayCommonUserMonthlyReport({ userId }) {
  // const [monthlyReports, setMonthlyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCommonUserMonthlyReports = async () => {
      const token = Cookies.get('token');
      const apiUrl = `http://127.0.0.1:8080/getCommonUserMonthlyReports`;
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
    // getCommonUserMonthlyReports();
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
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px', 
        }}
      >
        {monthlyReports.reports.map((report) => (
          <Card key={report.id} sx={{ maxWidth: 275 }}>
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

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Monthly Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <div>
              <Typography variant="h6">
                Report Month: {selectedReport.report_month}
              </Typography>
              <Typography variant="h6">
                Total Calories Intake: {selectedReport.total_calorie_intake}
              </Typography>
              
              <Typography variant="h6">
                Average Calories Intake: {selectedReport.daily_average_calorie_intake}
              </Typography>
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
        total_calorie_intake: 30000,
        daily_average_calorie_intake: 1000,
        },
        {
        report_month: "2023-10",
        total_calorie_intake: 28000,
        daily_average_calorie_intake: 933.33,
        },
        {
        report_month: "2023-09",
        total_calorie_intake: 27000,
        daily_average_calorie_intake: 900,
        }
    ]
}

const dietGoalReports = {
  reports: [
    {
    daysFullfilledGoal: 15,
    daysNotFullfilledGoal: 10,		
    daysWithoutData: 5,	
    progressPercentage: 0.5
    },
    {
    daysFullfilledGoal: 15,
    daysNotFullfilledGoal: 10,		
    daysWithoutData: 5,	
    progressPercentage: 0.5
    },
    {
    daysFullfilledGoal: 15,
    daysNotFullfilledGoal: 10,		
    daysWithoutData: 5,	
    progressPercentage: 0.5
    }
]
}