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
  // const [topTenFoodAllergies, setTopTenFoodAllergies] = useState([]);

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
          // setTopTenFoodAllergies(data.topTenFoodAllergies)
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
            <TableCell>Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTenFoodAllergies.top_ten_allergies.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.allergy}</TableCell>
              <TableCell>{item.num_users}</TableCell>
              <TableCell>{item.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const topTenFoodAllergies = {
  top_ten_allergies: [
    {
      allergy: "Peanuts",
      num_users: 10,
      percentage: 0.20,
    },
    {
      allergy: "Dairy",
      num_users: 8,
      percentage: 0.16,
    },
    {
      allergy: "Gluten",
      num_users: 12,
      percentage: 0.24,
    },
    {
      allergy: "Eggs",
      num_users: 7,
      percentage: 0.14,
    },
    {
      allergy: "Soy",
      num_users: 9,
      percentage: 0.18,
    },
    {
      allergy: "Fish",
      num_users: 5,
      percentage: 0.10,
    },
    {
      allergy: "Shellfish",
      num_users: 6,
      percentage: 0.12,
    },
    {
      allergy: "Tree Nuts",
      num_users: 11,
      percentage: 0.22,
    },
    {
      allergy: "Wheat",
      num_users: 9,
      percentage: 0.18,
    },
    {
      allergy: "Sesame",
      num_users: 4,
      percentage: 0.08,
    },
  ],
}
