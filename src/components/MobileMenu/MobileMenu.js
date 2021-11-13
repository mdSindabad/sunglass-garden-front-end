import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import './mobileMenu.css';

const MobileMenu = () => {
    // router hook
    const history = useHistory();
    const path = useLocation().pathname;

    // auth contect
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (path) => {
        setAnchorEl(null);
        history.push(path)
    };

    return (
        <div>
            <IconButton
                size="large"
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem className={path === '/' && 'active'} onClick={() => handleClose('/')}>Home</MenuItem>
                <MenuItem className={path === '/products' && 'active'} onClick={() => handleClose('/products')}>Products</MenuItem>
                {
                    user?.email &&
                    <MenuItem className={path === '/dashboard' && 'active'} onClick={() => handleClose('/dashboard')}>dashboard</MenuItem>
                }
                {
                    !user?.email &&
                    <MenuItem onClick={() => handleClose('/login')}>Login</MenuItem>
                }
            </Menu>
        </div>
    );
}

export default MobileMenu;