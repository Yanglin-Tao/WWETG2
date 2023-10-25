import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import RadioGroupRating from './radioGroupRating';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Rating({ openModel, handleClose, cartItems, handleRatingComplete }) {
    const [ratings, setRatings] = useState(0);

    const handleRatingChange = (itemId, newValue) => {
        setRatings(prev => ({
            ...prev,
            [itemId]: newValue
        }));
    };

    const handleSubmit = () => {
        console.log("Submitted Rating:", ratings);
        // Add your submission logic here
        handleRatingComplete();
        handleClose();  // Close the modal after submission
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModel}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModel}>
                    <Box sx={{ ...style, display: 'flex', flexDirection: 'column' }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Rate Our Food Items
                        </Typography>
                        {cartItems.map(item => (
                            <Card key={item.id} sx={{ marginBottom: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="140" // Adjust the height as necessary
                                    image={item.imageUrl} // Assuming each item has an 'imageUrl' property
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography variant="body1">{item.name}</Typography>
                                    <RadioGroupRating
                                        value={ratings[item.id] || 0}
                                        onChange={(e, val) => handleRatingChange(item.id, val)}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={handleSubmit} sx={{ mt: 2, alignSelf: 'flex-end' }}>
                            Submit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
