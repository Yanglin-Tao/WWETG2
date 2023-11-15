import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Cookies from 'js-cookie';

/* This component should display top ten food items rated by common users. */

export default function TopTenRatedFood({ userId }) {
  const [topTenRatedFood, setTopTenRatedFood] = useState([]);

  useEffect(() => {
    const fetchTopTenRatedFood = async () => {
      const token = Cookies.get('token'); 
      const apiUrl = `http://127.0.0.1:8080/getTopTenHighestRatedDishes`; 
      console.log(userId);
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
          },
          body: JSON.stringify({ 
            diningHallID: userId
          })
      };

      try {
          const response = await fetch(apiUrl, requestOptions);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          setTopTenRatedFood(data.topTenRatedFood)
      } catch (error) {
          console.error('There was a problem fetching top ten rated food:', error);
      }
    };
    // fetchTopTenRatedFood();
}, [userId]);

  return (
    <React.Fragment>
      <Title>Top Ten Rated Food</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell># Rates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTenRatedFood.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.dish_name}</TableCell>
              <TableCell>{item.average_rating}</TableCell>
              <TableCell align="right">{item.num_rates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
