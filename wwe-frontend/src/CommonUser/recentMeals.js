import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


/* TODO: This component shows a list of common user's recent meals. This component is optional to have.
*/

const recentMeals = {
  recentMeals: [
    {
      date: '2023-11-15',
      time: '12:30 PM',
      calories: 550,
      dining_hall: 'Main Dining Hall',
    },
    {
      date: '2023-11-14',
      time: '7:45 AM',
      calories: 320,
      dining_hall: 'Student Center Cafeteria',
    },
    {
      date: '2023-11-13',
      time: '6:15 PM',
      calories: 720,
      dining_hall: 'West Campus Dining',
    },
    {
      date: '2023-11-12',
      time: '1:00 PM',
      calories: 450,
      dining_hall: 'East Campus Dining',
    },
    {
      date: '2023-11-11',
      time: '8:30 AM',
      calories: 280,
      dining_hall: 'Main Dining Hall',
    },
  ],
};

function mapMealData(meals) {
  return meals.map((meal, index) => ({
    ...meal,
    key: `meal-${index}`,
  }));
}

export default function RecentMeals({ userId }) {

  const { recentMeals: mealData } = recentMeals;

  const mappedMealData = mapMealData(mealData);

  // const [recentMeals, setRecentMeals] = useState([]);

  useEffect(() => {
    const getRecentMeals = async () => {
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
        // setRecentMeals(data.recentMeals);
      } catch (error) {
        console.error('There was a problem fetching recent meals:', error);
      }
    };

    // getRecentMeals(); 
  }, [userId]);

  return (
    <React.Fragment>
      <Title>Recent Meals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Dining Hall</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedMealData.map((meal) => (
            <TableRow key={meal.key}>
              <TableCell>{meal.date}</TableCell>
              <TableCell>{meal.time}</TableCell>
              <TableCell>{meal.dining_hall}</TableCell>
              <TableCell align="right">{`${meal.calories} Cal`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}