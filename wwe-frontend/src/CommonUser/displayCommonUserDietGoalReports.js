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
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
/* TODO: This component should display common user's diet goal reports.
*/

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function DisplayCommonUserDietGoalReports({ userId }) {
  const [dietGoalReports, setDietGoaReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCommonUserDietGoalReports = async () => {
      const token = Cookies.get('token');
      const apiUrl = `http://127.0.0.1:8080/getDietGoalReports`;
      console.log(userId);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          userID: userId,
        }),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setDietGoaReports(data.reports);
      } catch (error) {
        console.error(
          'There was a problem fetching dining hall diet goal reports:',
          error
        );
      }
    };
    getCommonUserDietGoalReports();
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
      <Title>Available Diet Goal Reports</Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px', 
        }}
      >
        {dietGoalReports.map((report) => (
          <Card key={report.id} sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {report.startDate} to {report.endDate} Report
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
        <DialogTitle>Diet Goal Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <div>
              <Typography variant="h6">
                Report start date: {selectedReport.startDate} <br />
                Report end date: {selectedReport.endDate}
              </Typography>
              <Typography variant="h6">
                Daily calorie intake maximum: {selectedReport.dailyCalorieIntakeMaximum} <br />
                Daily calorie intake minimum: {selectedReport.dailyCalorieIntakeMinimum}
              </Typography>
              <Typography variant="h6">
                Report progress: {selectedReport.progressPercentage} 
              </Typography>
              <Typography variant="h6">Days Breakdown:</Typography>
              <div style={{ height: 300 }}>
                <PieChart series={[
                  {
                    arcLabel: (item) => `${item.label} (${item.value} days)`,
                    arcLabelMinAngle: 0,
                    data: [
                      {
                        value: selectedReport.daysFullfilledGoal,
                        label: 'Fulfilled',
                      },
                      {
                        value: selectedReport.daysNotFullfilledGoal,
                        label: 'Not Fulfilled',
                      },
                      {
                        value: selectedReport.daysWithoutData,
                        label: 'No Data',
                      },
                    ],
                  },
                ]} 
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                  },
                }}
                width={800}
                height={400}
                 />
              </div>
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
