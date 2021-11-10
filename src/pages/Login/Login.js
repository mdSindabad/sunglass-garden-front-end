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
import { Alert, Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import './login.css';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    // router hook
    const location = useLocation();
    const history = useHistory();
    const path = location.state?.from || '/';

    // auth contect
    const { user, signInWithGoogle, loginWithEmail } = useAuth();

    //local state
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    // input functions
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // password field functions
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // submit login form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        e.preventDefault();
        const { email, password } = values;
        if (!email || !password) {
            return
        } else {
            loginWithEmail(email, password)
                .then(result => {
                    history.push(path)
                })
                .catch(err => setError(err.message))
        }
    };
    useEffect(() => {
        if (user.email) {
            history.push(path);
        }
    }, [user])

    return (
        <Box>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <Button color="secondary" className="button" fullWidth type="submit" variant="contained">Login</Button>
                <Button onClick={signInWithGoogle} className="button" fullWidth variant="contained" startIcon={<GoogleIcon style={{ color: "#f4c20d" }} />}>Google</Button>
                <p style={{ color: "gray", textAlign: "center", margin: "10px 0 0 0" }}>New to SunglassGarden?</p>
                <Button className="button" fullWidth variant="outlined" onClick={() => history.push('/register')}>Register</Button>
            </form>
        </Box>
    );
}

export default Login;
