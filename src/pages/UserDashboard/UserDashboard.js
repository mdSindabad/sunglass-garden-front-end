import React, { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import MyOrders from '../Dashboard/MyOrders/MyOrders';
import Payment from '../Dashboard/Payment/Payment';
import Review from '../Dashboard/Review/Review';
import { Alert, CircularProgress } from '@mui/material';
import ReviewDetails from '../ReviewDetails/ReviewDetails';


const drawerWidth = 240;

function UserDashboard(props) {
    // router hook
    const history = useHistory();
    const { path, url } = useRouteMatch();

    // auth contect
    const { user, logOut } = useAuth();

    // local state
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        setError('');
        setUpdate(false)

        axios.get(`https://whispering-gorge-61124.herokuapp.com/orders/${user.email}`)
            .then(res => {
                setOrders(res.data);
                setIsloading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsloading(false);
            })
    }, [update]);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={() => history.push('/')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => history.push(`${url}`)}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Order" />
                </ListItem>
                <ListItem button onClick={() => history.push(`${url}/payment`)}>
                    <ListItemIcon>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pay" />
                </ListItem>
                <ListItem button onClick={() => history.push(`${url}/review`)}>
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review" />
                </ListItem>
                <ListItem button onClick={logOut}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {
                isLoading ? <Box sx={{ margin: '20px auto' }}>
                    <CircularProgress />
                </Box> :
                    error ? <Box sx={{ margin: '20px auto' }}>
                        <Alert severity="error">{error}!</Alert>
                    </Box> :
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                            style={{ overflow: 'scroll' }}
                        >
                            <Route exact path={path}>
                                <h3>My Orders</h3>
                                <MyOrders setUpdate={setUpdate} orders={orders} />
                            </Route>
                            <Route exact path={`${path}/payment`}>
                                <h3>Payment</h3>
                                <Payment setUpdate={setUpdate} orders={orders} />
                            </Route>
                            <Route exact path={`${path}/review`}>
                                <h3>Review</h3>
                                <Review orders={orders} />
                            </Route>
                            <Route path={`${path}/review/:id`}>
                                <ReviewDetails orders={orders} />
                            </Route>
                        </Box>}
        </Box>
    );
}

UserDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default UserDashboard;
