import React from 'react';
import { useHistory } from 'react-router';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';




const OrderForm = ({ handleSubmit, values, setValues }) => {
    // router hook
    const history = useHistory();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
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
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    type='email'
                    value={values.email}
                    onChange={handleChange('email')}
                    label="email"
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-address"
                    type='text'
                    value={values.address}
                    onChange={handleChange('address')}
                    label="address"
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-phone"
                    type='number'
                    value={values.phone}
                    onChange={handleChange('phone')}
                    label="phone"
                />
            </FormControl>
            <Button color="success" fullWidth type="submit" variant="contained">Place Order</Button>
        </form>
    )
}

export default OrderForm;
