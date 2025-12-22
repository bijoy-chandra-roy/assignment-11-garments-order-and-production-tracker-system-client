import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/common/Loading';
import AdminHome from '../admin/AdminHome';
import ManageProducts from '../manager/ManageProducts';
import MyOrders from '../user/MyOrders';
import Profile from './Profile';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === 'admin') {
        return <AdminHome />;
    }
    
    if (role === 'manager') {
        return <ManageProducts />;
    }

    if (role === 'buyer') {
        return <MyOrders />;
    }

    return <Profile />;
};

export default DashboardHome;