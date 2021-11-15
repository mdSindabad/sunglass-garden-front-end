import { Alert, CircularProgress, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Banner from '../../components/Banner/Banner';
import Product from '../../components/Product/Product';
import useProducts from '../../hooks/useProducts';

const Home = () => {
    // products context
    const { products, isLoading, error } = useProducts();

    return (
        <div>
            <Banner />
            <Container sx={{ m: '0 auto 20px' }}>
                <h1>Our Products</h1>
                {
                    isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box> :
                        error ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Alert severity="error">{error}!</Alert>
                        </Box> :
                            <Grid sx={{ m: "2 auto" }} container spacing={2} >
                                {
                                    products?.slice(0, 6).map(product => {
                                        return <Product data={product} key={product._id} />
                                    })
                                }
                            </Grid>}
            </Container>
        </div>
    )
}

export default Home;