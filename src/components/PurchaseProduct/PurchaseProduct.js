import React from 'react';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';

const PurchaseProduct = ({ product }) => {
    // destructure
    const { name, image, details, price } = product;

    // router hook
    const history = useHistory();

    const theme = useTheme();

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid className='card' item xs={12} sm={6} md={4}>
                    <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image={image}
                        alt={name}
                    />
                </Grid>
                <Grid className='card' item xs={12} sm={6} md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                <p style={{ textTransform: 'uppercase' }}>{name}</p>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <p>$ {price}</p>
                                <p><b>Lenses Optical Attribute: </b>{details?.optics}</p>
                                <p><b>Lens Height: </b>{details?.height}</p>
                                <p><b>Lens Width: </b>{details?.width}</p>
                                <p><b>Lenses Material: </b>{details?.material}</p>
                            </Typography>
                            <Box>
                                <Button onClick={() => history.replace('/products')} style={{ margin: '5px' }} color="error" variant="contained" >Cancel</Button>
                            </Box>
                        </CardContent>
                    </Box>
                </Grid>
            </Grid>
        </Card >
    )
}

export default PurchaseProduct;
