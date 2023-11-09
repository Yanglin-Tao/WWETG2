import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

/* This component should display top ten food allergies common users have. */

// Generate Order Data
function createData(id, allergy, students, percentage) {
  return { id, allergy, students, percentage };
}

const rows = [
  createData(
    0,
    'Milk',
    3500,
    22.44,
  ),
  createData(
    1,
    'Eggs',
    2998,
    19.80,
  ),
  createData(
    2, 
    'Fish',
    2777,
    18.70),
  createData(
    3,
    'Crustacean shellfish',
    1700,
    15.33,
  ),
  createData(
    4,
    'Tree nuts',
    1490,
    12.89,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function TopTenFoodAllergies() {
  const [userData, setUserData] = useState({top_ten_food_allergies: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8080/get_top_ten_food_allergies');
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
      <Title>Top Ten Food Allergies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Allergy</TableCell>
            <TableCell># Students</TableCell>
            <TableCell align="right">Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.allergy}</TableCell>
              <TableCell>{row.students}</TableCell>
              <TableCell align="right">{`${row.percentage}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more food allergies
      </Link>
    </React.Fragment>
  );
}
