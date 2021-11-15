import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

const ReviewDetails = ({ orders }) => {
    // router hooks
    const params = useParams();
    const history = useHistory();

    // filtered order
    const order = orders.filter(order => order._id === params.id)[0];

    // local state
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(3);
    const [hover, setHover] = useState(-1);
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const submitReview = (id) => {
        const data = {
            product: order.product.name,
            productImage: order.product.image,
            customer: order.customer.name,
            email: order.customer.email,
            customerImage: order.customer.image,
            rating: value,
            message: message
        };

        axios.post(`https://whispering-gorge-61124.herokuapp.com/review`, data)
            .then(res => {
                if (res.data.insertedId) {
                    history.push('/dashboard/review');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <h3>Review/ {order?.product?.name}</h3>
            <Card sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid className='card' item xs={12} sm={6} md={4}>
                        <CardMedia
                            component="img"
                            sx={{ width: "100%" }}
                            image={order?.product?.image}
                            alt={order?.product?.name}
                        />
                    </Grid>
                    <Grid className='card' item xs={12} sm={6} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    <p>{order?.product?.name}</p>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <p><b>Price: </b>${order?.product?.price}</p>
                                    <p><b>Lenses Optical Attribute: </b>{order?.product?.details.optics}</p>
                                    <p><b>Lens Height: </b>{order?.product?.details.height}</p>
                                    <p><b>Lens Width: </b>{order?.product?.details.width}</p>
                                    <p><b>Lenses Material: </b>{order?.product?.details.material}</p>
                                    <p><b>Rating:</b></p>
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </Typography>
                                <Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Message"
                                        multiline
                                        maxRows={4}
                                        value={message}
                                        onChange={handleChange}
                                    />
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant='contained' color='primary' onClick={submitReview}>Submit Review</Button>
                                </Box>
                            </CardContent>
                        </Box>
                    </Grid>
                </Grid>
            </Card >
        </>
    )
}

export default ReviewDetails;
