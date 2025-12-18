import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="Profile" />
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">{user?.displayName}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-6">
                <span className="badge badge-primary badge-lg">Role: Buyer</span>
            </div>
        </div>
    );
};

export default Profile;