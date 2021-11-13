import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Review = ({ orders }) => {
    // router hooks
    const history = useHistory();
    const { path, url } = useRouteMatch();

    return (
        <div>
            {
                orders.map(order => {
                    return (
                        <Card sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid className='card' item xs={12} sm={6} md={4}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: "100%" }}
                                        image={order.product.image}
                                        alt={order.customer.name}
                                    />
                                </Grid>
                                <Grid className='card' item xs={12} sm={6} md={8}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                <p>{order.product.name}</p>
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                <p><b>Price:</b> ${order.product.price}</p>
                                                <p style={{ textTransform: 'capitalize' }}><b>Customer Name:</b> {order.customer.name}</p>
                                            </Typography>
                                            <Box sx={{ mt: 2 }}>
                                                <Button variant='contained' color='primary' onClick={() => history.push(`${url}/${order._id}`)}>Review</Button>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card >
                    )
                })
            }
        </div>
    )
}

export default Review;
