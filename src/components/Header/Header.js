import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./header.css";
import { Link, useLocation } from 'react-router-dom';
import User from '../User/User';
import MobileMenu from '../MobileMenu/MobileMenu';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    // router hooks
    const path = useLocation().pathname;

    // auth contect
    const { user, isLoading } = useAuth();
    console.log(user)

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
                        <Link className={path === '/' && 'active'} to="/">Home</Link>
                        <Link className={path === '/products' && 'active'} to="/products">Products</Link>
                        {
                            user?.email &&
                            <Link className={path === '/dashboard' && 'active'} to="/dashboard">Dashboard</Link>
                        }
                        {
                            !isLoading &&
                            !user?.email &&
                            <Link className={path === '/login' && 'active'} to="/login">Login</Link>
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