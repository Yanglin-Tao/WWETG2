import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/* TODO: This component should show a line chart of common user's calories in take in the day. 
This component is optional to have.  
*/

const calorieIntakeByTime = {
  calorie_intake: [
    { time: '12am - 2am', calories_intake: 200 },
    { time: '2am - 4am', calories_intake: 150 },
    { time: '4am - 6am', calories_intake: 250 },
    { time: '6am - 8am', calories_intake: 400 },
    { time: '8am - 10am', calories_intake: 550 },
    { time: '10am - 12pm', calories_intake: 600 },
    { time: '12pm - 2pm', calories_intake: 700 },
    { time: '2pm - 4pm', calories_intake: 650 },
    { time: '4pm - 6pm', calories_intake: 500 },
    { time: '6pm - 8pm', calories_intake: 450 },
    { time: '8pm - 10pm', calories_intake: 300 },
    { time: '10pm - 12am', calories_intake: 250 },
  ],
};

export default function CalorieChart({ userId }) {
  const theme = useTheme();

  // const [calorieIntakeByTime, setCalorieIntakeByTime] = useState([]);

  useEffect(() => {
    const getDailyCalorieIntakeByTime = async () => {
      const token = Cookies.get('token'); 
      const apiUrl = `http://127.0.0.1:8080/getDailyCalorieIntakeByTime`; 
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
        // setCalorieIntakeByTime(data.calorie_intake);
      } catch (error) {
        console.error('There was a problem fetching daily calories intake by time:', error);
      }
    };

    // getDailyCalorieIntakeByTime(); 
  }, [userId]);

  const chartData = calorieIntakeByTime.calorie_intake.map((entry, index) => ({
    ...entry,
    key: `calorie-intake-${index}`,
  }));

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Calories (cal)
            </Label>
          </YAxis>
          <Line
            key="calorie-intake-line"
            dataKey="calories_intake"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}