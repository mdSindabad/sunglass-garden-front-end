import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button } from '@mui/material';
import useProducts from '../../../hooks/useProducts';

const UpdateProduct = () => {
    // router hook
    const history = useHistory();
    const params = useParams();


    // products contect
    const { products, setUpdate } = useProducts();

    const product = products.filter(prod => prod._id === params.id)[0];

    //local state
    const [values, setValues] = useState({
        name: product.name,
        image: product.image,
        price: product.price,
        optics: product.details.optics,
        height: product.details.height,
        width: product.details.width,
        material: product.details.material
    });
    const [error, setError] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        const { name, image, price, optics, height, width, material } = values;
        if (!name || !image || !price || !optics || !height || !width || !material) {
            setError('Please fill up all the fields')
            return
        } else {
            axios.put(`https://whispering-gorge-61124.herokuapp.com/product/update/${params.id}`, values)
                .then(res => {
                    if (res.data.acknowledged) {
                        setUpdate(true);
                        history.replace('/dashboard/manage-products');
                    }
                })
                .catch(err => setError(err.message))
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name"
                        type='text'
                        value={values.name}
                        onChange={handleChange('name')}
                        label="name"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-image">Image Link</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-image"
                        type='text'
                        value={values.image}
                        onChange={handleChange('image')}
                        label="image"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-price"
                        type='number'
                        value={values.price}
                        onChange={handleChange('price')}
                        label="price"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-optics">Optics Type</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-optics"
                        type='text'
                        value={values.optics}
                        onChange={handleChange('optics')}
                        label="optics"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-height">Optics Height</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-height"
                        type='text'
                        value={values.height}
                        onChange={handleChange('height')}
                        label="height"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-width">Optics Width</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-width"
                        type='text'
                        value={values.width}
                        onChange={handleChange('width')}
                        label="width"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-material">Frame Material</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-material"
                        type='text'
                        value={values.material}
                        onChange={handleChange('material')}
                        label="material"
                    />
                </FormControl>
                {
                    error && <Alert style={{ margin: "0 0 0 8px" }} severity="error"> {error} </Alert>

                }
                <Button className="button" fullWidth type="submit" variant="outlined">Update</Button>
            </form>
        </Box >
    );
}

export default UpdateProduct;
