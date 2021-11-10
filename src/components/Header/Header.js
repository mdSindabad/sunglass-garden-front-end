import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./header.css";
import { Link } from 'react-router-dom';
import User from '../User/User';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div className="mobile-menu">
                        <MobileMenu />
                    </div>
                    <Typography as={Link} to="/" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <span>S</span>unglass<span>G</span>arden
                    </Typography>
                    <div className="desktop-menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Products</Link>
                        <Link to="/">Dashboard</Link>
                        <Link to="/login">Login</Link>
                    </div>
                    {(
                        <User />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;