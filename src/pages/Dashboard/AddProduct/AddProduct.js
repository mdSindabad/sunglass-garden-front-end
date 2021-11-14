import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
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

const AddProduct = () => {
    // router hook
    const history = useHistory();

    // products contect
    const { setUpdate } = useProducts();

    //local state
    const [values, setValues] = useState({
        name: '',
        image: '',
        price: '',
        optics: '',
        height: '',
        width: '',
        material: ''
    });
    const [error, setError] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        const { name, image, price, optics, height, width, material } = values;
        axios.post('http://localhost:5000/product', values)
            .then(res => {
                if (res.data.insertedId) {
                    setUpdate(true);
                    history.replace('/dashboard/manage-products');
                }
            })
            .catch(err => setError(err.message))

        // if (!name || !image || !price || !optics || !height || !width || !material) {
        //     setError('Please fill up all the fields')
        //     return
        // } else {
        //     axios.post('http://localhost:5000/product', values)
        //         .then(res => {
        //             console.log(res.body)
        //         })
        //         .catch(err => setError(err.message))
        // }
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
                <Button className="button" fullWidth type="submit" variant="outlined" onClick={handleSubmit}>Add</Button>
            </form>
        </Box >
    );
}

export default AddProduct;
