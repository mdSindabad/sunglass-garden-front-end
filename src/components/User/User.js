import React from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../hooks/useAuth';
import './user.css';

const User = () => {
    // auth contect
    const { user, logOut } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {
                    user?.image ? <img className='userImage' src={user?.image} alt={user?.displayName?.split(" ")[0]} /> :
                        <AccountCircle />
                }
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className="name">{user.name}</MenuItem>
                <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default User;
