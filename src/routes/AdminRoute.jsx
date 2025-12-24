import React from 'react';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/error/Forbidden';
import Loading from '../components/common/Loading';

const AdminRoute = ({ children }) => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === 'admin') {
        return children;
    }

    return <Forbidden />;
};

export default AdminRoute;