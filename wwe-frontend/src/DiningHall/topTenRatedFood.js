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
  // const [topTenRatedFood, setTopTenRatedFood] = useState([]);

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
          // setTopTenRatedFood(data.topTenRatedFood)
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
          {topTenRatedFood.top_ten_rated_food.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.dish_name}</TableCell>
              <TableCell>{item.average_rating}</TableCell>
              <TableCell>{item.num_rates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const topTenRatedFood = {
  top_ten_rated_food: [
    {
      dish_name: "Spaghetti",
      average_rating: 4.5,
      num_rates: 20,
    },
    {
      dish_name: "Burger",
      average_rating: 4.2,
      num_rates: 15,
    },
    {
      dish_name: "Pizza",
      average_rating: 4.7,
      num_rates: 18,
    },
    {
      dish_name: "Salad",
      average_rating: 4.0,
      num_rates: 12,
    },
    {
      dish_name: "Sushi",
      average_rating: 4.8,
      num_rates: 25,
    },
    {
      dish_name: "Steak",
      average_rating: 4.6,
      num_rates: 22,
    },
    {
      dish_name: "Pasta",
      average_rating: 4.3,
      num_rates: 17,
    },
    {
      dish_name: "Chicken Sandwich",
      average_rating: 4.4,
      num_rates: 19,
    },
    {
      dish_name: "Tacos",
      average_rating: 4.1,
      num_rates: 14,
    },
    {
      dish_name: "Sushi Rolls",
      average_rating: 4.9,
      num_rates: 28,
    },
  ],
}
