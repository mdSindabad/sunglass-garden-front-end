import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Rating } from '@mui/material';

export default function ReviewCard({ review }) {

    return (
        <Box sx={{ minWidth: 275, m: '0 5px' }} style={{ textAlign: 'center' }}>
            <Card variant="contained">
                <CardContent>
                    <Typography color="text.secondary" variant="h6" style={{ margin: '0' }} gutterBottom>
                        {review.product}
                    </Typography>
                    <Typography component="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0' }}>
                        {
                            review.customerImage ? <img className='userImage' src={review.customerImage} alt={review.customer?.split(" ")[0]} /> :
                                <AccountCircle />
                        }
                        <h4 style={{ textTransform: "capitalize", marginLeft: "2px", margin: '0' }}>{review.customer}</h4>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <Rating name="readOnly" value={review.rating} readOnly />
                    </Typography>
                    <Typography variant="body2">
                        {review.message}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
