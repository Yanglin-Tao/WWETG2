import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

/* This component should display top ten food items rated by common users. */

// Generate Order Data
function createData(id, foodItem, rating, rates) {
  return { id, foodItem, rating, rates };
}

const rows = [
  createData(
    0,
    'Chicken Curry',
    4.9,
    2100,
  ),
  createData(
    1,
    'Basmati Rice with Peas',
    4.72,
    1899,
  ),
  createData(
    2, 
    'Romaine Kale Lettuce Blend', 
    4.66,
    1029,
  ),
  createData(
    3,
    'Tomato Chutney',
    4.12,
    1567,
  ),
  createData(
    4,
    'Cheeseburger',
    3.89,
    2127,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function TopTenRatedFood() {
  const [userData, setUserData] = useState({top_ten_rated_food: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8080/get_top_ten_rated_food');
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
      <Title>Top Ten Rated Food</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell># Rates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.foodItem}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>{row.rates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more food item rates
      </Link>
    </React.Fragment>
  );
}
