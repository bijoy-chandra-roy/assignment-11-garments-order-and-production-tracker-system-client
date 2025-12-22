import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/common/Loading';
import Forbidden from '../pages/error/Forbidden';

const ManagerRoute = ({ children }) => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === 'manager') {
        return children;
    }

    return <Forbidden />;
};

export default ManagerRoute;