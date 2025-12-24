import React from 'react';
import useRole from '../hooks/useRole';
import useUserInfo from '../hooks/useUserInfo';
import Loading from '../components/common/Loading';
import Forbidden from '../pages/error/Forbidden';

const ManagerRoute = ({ children }) => {
    const { role, roleLoading } = useRole();
    const { userInfo, isLoading } = useUserInfo();

    if (roleLoading || isLoading) return <Loading />;

    if (role === 'manager') {
        return children;
    }

    return <Forbidden />;
};

export default ManagerRoute;