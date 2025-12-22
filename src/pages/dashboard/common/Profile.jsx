import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useUserInfo from '../../../hooks/useUserInfo';

const Profile = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const { userInfo } = useUserInfo();

    const handleLogout = () => {
        logOut()
            .then(() => {
                window.location.href = '/login';
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="card w-96 bg-base-200 shadow-2xl border border-base-200">
                <div className="card-body items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                    <h2 className="card-title text-2xl mb-1">{user?.displayName}</h2>
                    <p className="text-gray-500 mb-4">{user?.email}</p>

                    <div className="flex gap-2 mb-6">
                        <div className="badge badge-primary badge-lg uppercase font-bold">{role}</div>
                        {user?.emailVerified && <div className="badge badge-success badge-lg text-white">Verified</div>}
                    </div>

                    {userInfo.status === 'suspended' && (
                        <div role="alert" className="alert alert-error mb-6 text-left text-white shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <div>
                                <h3 className="font-bold">Account Suspended</h3>
                                <div className="text-sm opacity-90">{userInfo.suspendFeedback || "Contact admin for details."}</div>
                            </div>
                        </div>
                    )}

                    <div className="divider"></div>

                    <div className="w-full space-y-2 text-left mb-6">
                        <div className="flex justify-between">
                            <span className="font-semibold">User ID:</span>
                            <span className="text-xs opacity-50 font-mono self-center">...{user?.uid.slice(-6)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Last Login:</span>
                            <span className="text-sm opacity-70">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>

                    <div className="card-actions w-full">
                        <button onClick={handleLogout} className="btn btn-error w-full text-white font-bold">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;