import * as React from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';

const MobileMenu = () => {
    // router hook
    const history = useHistory();

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
                <MenuItem onClick={() => handleClose('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleClose('/products')}>Products</MenuItem>
                <MenuItem onClick={() => handleClose('/dashboard')}>Dashboard</MenuItem>
                {
                    !user?.email &&
                    <MenuItem onClick={() => handleClose('/login')}>Login</MenuItem>
                }
            </Menu>
        </div>
    );
}

export default MobileMenu;