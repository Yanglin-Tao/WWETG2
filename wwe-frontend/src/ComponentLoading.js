import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function ComponentLoading() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // This ensures that the Box takes the full viewport height.
                backgroundColor: '#f0f0f0', // Adjust the background color as needed.
                width: '100%', // Ensures the Box takes the full width of the viewport.
            }}
        >
            <CircularProgress
                size={80} // Adjust the size as needed.
                thickness={4} // Adjust the thickness of the circular progress as needed.
                sx={{
                    color: '#3f51b5', // Adjust the color as needed.
                }}
            />
        </Box>
    );
}

export default ComponentLoading;
