import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

/* TODO: This component should show common user's total calories intake in the day.  
*/

function preventDefault(event) {
  event.preventDefault();
}

export default function DailyCalorieIntake() {
  const [userData, setUserData] = useState({daily_total_calories_intake: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8080/get_user_daily_total_calories_intake');
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

  return (
    <React.Fragment>
      <Title>Total Calories Intake</Title>
      <Typography component="p" variant="h4">
        1,800 Cal
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View My Goals
        </Link>
      </div>
    </React.Fragment>
  );
}
