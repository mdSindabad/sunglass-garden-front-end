import React from 'react';
import useProducts from '../../hooks/useProducts';
import { Alert, CircularProgress, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Product from '../../components/Product/Product';


const Products = () => {
    // products context
    const { products, isLoading, error } = useProducts();

    return (
        <Container sx={{ m: '0 auto 20px' }}>
            <h1>Products</h1>
            {
                isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> :
                    error ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Alert severity="error">{error}!</Alert>
                    </Box> :
                        <Grid sx={{ m: "2 auto" }} container spacing={2} >
                            {
                                products?.map(product => {
                                    return <Product data={product} key={product._id} />
                                })
                            }
                        </Grid>}
        </Container>
    )
}

export default Products;
