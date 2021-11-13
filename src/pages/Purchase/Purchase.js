import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useHistory, useParams } from 'react-router';
import { Alert, CircularProgress, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import PurchaseProduct from '../../components/PurchaseProduct/PurchaseProduct';
import OrderForm from '../../components/OrderForm/OrderForm';

const Purchase = () => {
    // router hook
    const params = useParams();
    const history = useHistory();

    // auth contect
    const { user } = useAuth();

    // local State
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        address: '',
        phone: ''
    });

    // place order function
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, address, phone } = values;
        if (!name || !email || !address || !phone) {
            return
        } else {
            const order = {
                customer: {
                    name,
                    email,
                    address,
                    phone
                },
                product
            };
            axios.post('https://whispering-gorge-61124.herokuapp.com/order', order)
                .then(res => {
                    if (res.data.insertedId) {
                        history.replace('/products')
                    }
                })
                .catch(err => console.log(err))
        }
    };

    useEffect(() => {
        axios.get(`https://whispering-gorge-61124.herokuapp.com/product/${params.id}`)
            .then(res => {
                setProduct(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }, [])
    return (
        <Container style={{ margin: '25px 0' }}>
            {
                isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> :
                    error ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Alert severity="error">{error}!</Alert>
                    </Box> :
                        <>
                            <h1>Purchase</h1>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={5}>
                                    <PurchaseProduct product={product} />
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <h3 style={{ textAlign: 'center' }}>Address and Phone number</h3>
                                    <OrderForm values={values} setValues={setValues} handleSubmit={handleSubmit} />
                                </Grid>
                            </Grid>
                        </>
            }
        </Container >
    )
}

export default Purchase;
