import React from 'react';
import useAuth from '../../../hooks/useAuth';
import AdminDashboard from '../../AdminDashboard/AdminDashboard';
import UserDashboard from '../../UserDashboard/UserDashboard';

const Dashboard = () => {
    // user context
    const { user } = useAuth();

    return (
        <>
            {
                user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
            }
        </>
    )
}

export default Dashboard;
