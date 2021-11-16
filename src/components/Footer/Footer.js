import { Button, Container, FormControl, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import './footer.css';

const Footer = () => {
    // auth context
    const { user } = useAuth();

    // router hook
    const history = useHistory();

    const handleClick = (path) => {
        history.push(path)
    };

    return (
        <div className="footer">
            <Container>
                <div>
                    <Typography as={Link} to="/" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <span>S</span>unglass<span>G</span>arden
                    </Typography>
                    <div>
                        <p><MailOutlineIcon />info@sunglassgarden.com</p>
                        <p><PhoneCallbackIcon />+880 742 3960</p>
                        <p> <AddLocationAltIcon />112/B, Banani, Dhaka</p>
                    </div>
                </div>
                <p style={{ margin: '10px 0' }}>&copy; Copyright 2021, Sunglass Garden</p>
            </Container>
        </div>
    )
}

export default Footer;