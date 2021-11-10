import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./header.css";
import { Link } from 'react-router-dom';
import User from '../User/User';
import MobileMenu from '../MobileMenu/MobileMenu';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    // auth contect
    const { user, isLoading } = useAuth();

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
                        <Link to="/products">Products</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        {
                            !isLoading &&
                            !user?.email &&
                            <Link to="/login">Login</Link>
                        }
                    </div>
                    {
                        !isLoading &&
                        user?.email &&
                        <User />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;