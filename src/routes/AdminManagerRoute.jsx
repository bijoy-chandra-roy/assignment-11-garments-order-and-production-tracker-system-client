import React from 'react';
import useRole from '../hooks/useRole';
import useUserInfo from '../hooks/useUserInfo'; // 1. Import this
import Loading from '../components/common/Loading';
import Forbidden from '../pages/error/Forbidden';

const AdminManagerRoute = ({ children }) => {
    const { role, roleLoading } = useRole();
    const { userInfo, isLoading } = useUserInfo(); // 2. Get user info

    if (roleLoading || isLoading) return <Loading />;

    if (role === 'admin') {
        return children;
    }
    
    if (role === 'manager' && userInfo.status === 'active') {
        return children;
    }

    return <Forbidden />;
};

export default AdminManagerRoute;