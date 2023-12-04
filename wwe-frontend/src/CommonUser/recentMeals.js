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

export default function RecentMeals({ userId }) {
  const [recentMeals, setRecentMeals] = useState([]);

  useEffect(() => {
    const getRecentMeals = async () => {
      const token = Cookies.get('token'); 
      const apiUrl = `http://127.0.0.1:8080/getRecentMeals`; 
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
        setRecentMeals(data.recentMeals);
      } catch (error) {
        console.error('There was a problem fetching recent meals:', error);
      }
    };

    getRecentMeals(); 
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
          {recentMeals.map((meal, index) => (
            <TableRow key={index}>
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