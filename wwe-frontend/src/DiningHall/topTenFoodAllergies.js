import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Cookies from 'js-cookie';

/* This component should display top ten food allergies common users have. */

export default function TopTenFoodAllergies({ userId }) {
  const [topTenFoodAllergies, setTopTenFoodAllergies] = useState([]);

  useEffect(() => {
    const fetchTopTenFoodAllergies = async () => {
      const token = Cookies.get('token'); 
      const apiUrl = `http://127.0.0.1:8080/getTopTenPriorityFoodAllergies`; 
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
          setTopTenFoodAllergies(data.topTenFoodAllergies)
      } catch (error) {
          console.error('There was a problem fetching top ten food allergies:', error);
      }
    };
    // fetchTopTenFoodAllergies();
}, [userId]);

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
          {topTenFoodAllergies.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.allergy}</TableCell>
              <TableCell>{item.num_users}</TableCell>
              <TableCell align="right">{`${item.percentage}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
