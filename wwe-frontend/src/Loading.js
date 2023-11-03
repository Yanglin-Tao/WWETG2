import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingIndicator() {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Adjust as needed
        backgroundColor: '#f0f0f0',  // Choose a background color that suits your design
      }}
    >
      <CircularProgress 
        size={80}  // Adjust the size as needed
        thickness={4}  // Adjust the thickness of the circular progress as needed
        sx={{
          color: '#3f51b5',  // Adjust the color as needed
        }}
      />
    </Box>
  );
}

export default LoadingIndicator;