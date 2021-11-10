import { CircularProgress } from '@mui/material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center mt-5 pt-4 vh-100">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <Route
                {...rest}
                render={
                    ({ location }) => (
                        user.email ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        )
                    )
                }

            />
        )
    }
}

export default PrivateRoute;