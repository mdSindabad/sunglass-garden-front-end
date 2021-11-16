import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button } from '@mui/material';
import './register.css';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    // router hook
    const location = useLocation();
    const history = useHistory();
    const path = location.state?.from || '/';

    // auth contect
    const { user, registerWithEmail } = useAuth();

    //local state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        const { name, email, password } = values;
        if (!name || !email || !password) {
            return
        } else {
            const res = registerWithEmail(name, email, password);
        }
    };

    useEffect(() => {
        if (user.email) {
            history.push(path);
        }
    }, [user])

    return (
        <Box>
            <h2>Register</h2>
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
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {
                    error && <Alert style={{ margin: "0 0 0 8px" }} severity="error"> {error} </Alert>

                }
                <Button color="secondary" className="button" fullWidth type="submit" variant="contained">Register</Button>
                <p style={{ color: "gray", textAlign: "center", margin: "10px 0 0 0" }}>Already have Account?</p>
                <Button className="button" fullWidth type="submit" variant="outlined" onClick={() => history.push('/login')}>Login</Button>
            </form>
        </Box >
    );
}

export default Register;
