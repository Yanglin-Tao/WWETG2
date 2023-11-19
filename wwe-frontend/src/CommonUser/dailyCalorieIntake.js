import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

/* TODO: This component should show common user's total calories intake in the day.  
*/

function preventDefault(event) {
  event.preventDefault();
}

const dailyCalorieIntakeTotal = 1200;
const todayDate = new Date();
const formattedDate = todayDate.toLocaleDateString();

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" size={175} thickness={6} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function DailyCalorieIntake({ userId }) {
  // const [dailyCalorieIntakeTotal, setDailyCalorieIntakeTotal] = useState("");
  const [progress, setProgress] = useState(70);

  useEffect(() => {
    const getDailyCalorieIntakeTotal = async () => {
      const token = Cookies.get('token'); 
      const apiUrl = `http://127.0.0.1:8080/getRecentMeals`; 
      console.log(userId);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Bearer prefix to the token
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
        // setDailyCalorieIntakeTotal(data.total_calorie_intake);
      } catch (error) {
        console.error('There was a problem fetching daily calorie intake total:', error);
      }
    };

    // getDailyCalorieIntakeTotal(); 
  }, [userId]);

  return (
    <React.Fragment>
      <Title>Total Calories Intake</Title>
      <Typography component="p" variant="h4">
        {dailyCalorieIntakeTotal} Cal
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {formattedDate}
      </Typography>
      <div>
        <CircularProgressWithLabel value={progress} />
      </div>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View My Goals
        </Link>
      </div>
    </React.Fragment>
  );
}
