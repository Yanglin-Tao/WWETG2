import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/* TODO: This component should show a line chart of common user's calories in take in the day. 
This component is optional to have.  
*/

export default function CalorieChart({ userId }) {
  const theme = useTheme();

  const [calorieIntakeByTime, setCalorieIntakeByTime] = useState([]);

  useEffect(() => {
    const getDailyCalorieIntakeByTime = async () => {
      const token = Cookies.get('token');
      const apiUrl = `http://127.0.0.1:8080/getDailyCalorieIntakeByTime`;
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
        setCalorieIntakeByTime(data.calorie_intake);
      } catch (error) {
        console.error('There was a problem fetching daily calories intake by time:', error);
      }
    };

    getDailyCalorieIntakeByTime();
  }, [userId]);

  const chartData = calorieIntakeByTime.map((entry, index) => ({
    ...entry,
    key: `calorie-intake-${index}`,
  }));

  console.log("chartData: ", chartData);

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
            dataKey="calorie_intake"
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
            dataKey="calorie_intake"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}