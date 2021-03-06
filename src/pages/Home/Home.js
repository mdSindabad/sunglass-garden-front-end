import { Alert, CircularProgress, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Banner from '../../components/Banner/Banner';
import Product from '../../components/Product/Product';
import useProducts from '../../hooks/useProducts';
import ReviewSlider from '../../components/ReviewSlider/ReviewSlider';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    // products context
    const { products, isLoading, error } = useProducts();

    return (
        <div>
            {/* banner */}
            <Banner />
            {/* our products */}
            <Container sx={{ m: '0 auto 20px' }}>
                <h2 style={{ textAlign: 'center' }}>Our Products</h2>
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
            {/* review */}
            <ReviewSlider />
            <Footer />
        </div>
    )
}

export default Home;