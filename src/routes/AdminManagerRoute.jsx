import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/common/Loading';
import Forbidden from '../pages/error/Forbidden';

const AdminManagerRoute = ({ children }) => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === 'admin' || role === 'manager') {
        return children;
    }

    return <Forbidden />;
};

export default AdminManagerRoute;