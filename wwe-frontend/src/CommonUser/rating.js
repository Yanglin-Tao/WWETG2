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

export default function Rating({ openModel, handleClose, cartItems, handleRatingComplete}) {
    const [ratings, setRatings] = useState({});

    const handleRatingChange = (dishName, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [dishName]: rating
        }));
        //onRatingChange(dishId, rating); // Update the rating in the parent component
    };

    const handleSubmit = () => {
        console.log("Submitted Rating:", ratings);
        // Add your submission logic here
        handleRatingComplete(ratings);
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
                            <Card key={item.dishID} sx={{ marginBottom: 2 }}> {/* Use dishID as key */}
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/random?food`}
                                    alt={item.dishName}
                                />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="body1">{item.dishName}</Typography>
                                    <RadioGroupRating
                                        value={ratings[item.dishName] || 0}
                                        onChange={(e, val) => handleRatingChange(item.dishName, val)}
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
