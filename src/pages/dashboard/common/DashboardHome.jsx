import React from 'react';
import { Navigate } from 'react-router';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/common/Loading';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === 'admin') {
        return <Navigate to="/dashboard/admin-home" replace />;
    }
    
    if (role === 'manager') {
        return <Navigate to="/dashboard/manage-products" replace />;
    }

    if (role === 'buyer') {
        return <Navigate to="/dashboard/my-orders" replace />;
    }

    return <Navigate to="/dashboard/profile" replace />;
};

export default DashboardHome;