import React from 'react';
import useProducts from '../../hooks/useProducts';
import { Alert, CircularProgress, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Product from '../../components/Product/Product';


const Products = () => {
    // products context
    const { products, isLoading, error } = useProducts();

    return (
        <Container style={{ margin: '15px 0' }}>
            <h1>Products</h1>
            {
                isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> :
                    error ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Alert severity="error">{error}!</Alert>
                    </Box> :
                        <Grid sx={{ marginTop: 2 }} container spacing={2} >
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
