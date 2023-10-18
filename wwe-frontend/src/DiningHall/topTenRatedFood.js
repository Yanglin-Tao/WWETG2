import * as React from 'react';
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
