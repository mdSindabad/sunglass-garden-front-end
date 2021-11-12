import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import './product.css';

const Product = ({ data }) => {
    // destructure data
    const { name, price, image, details } = data;

    return (
        <Grid className='card' item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name.slice(0, 15)}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p><b>Lenses Optical Attribute: </b>{details.optics}</p>
                        <p><b>Lens Height: </b>{details.height}</p>
                        <p><b>Lens Width: </b>{details.width}</p>
                        <p><b>Lenses Material: </b>{details.material}</p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small">Purchase</Button>
                </CardActions>
            </Card>
        </Grid>
    );

}

export default Product;
