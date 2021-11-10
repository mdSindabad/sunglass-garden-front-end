import { Alert } from '@mui/material';
import React from 'react';
import './notfound.css';

const NotFound = () => {
    return (
        <div className="container">
            <h1>404</h1>
            <Alert severity="error"> Oops, sorry we can't find that page! </Alert>
        </div>
    )
}

export default NotFound;
