import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useUserInfo from '../../hooks/useUserInfo';
import Helmet from '../../components/common/Helmet';
import { formatDate } from '../../utilities/dateFormat';
import { FaClock, FaEdit, FaTimes } from 'react-icons/fa';
import { uploadImage } from '../../utilities/imageUpload';

const Profile = () => {
    const { user, logOut, updateUserProfile } = useAuth();
    const { role } = useRole();
    const { userInfo, refetch } = useUserInfo();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const handleLogout = () => {
        logOut()
            .then(() => {
                window.location.href = '/login';
            })
            .catch(err => console.error(err));
    }

    const handleProfileUpdate = async (data) => {
        setLoading(true);
        try {
            let imageUrl = user.photoURL;
            if (data.image && data.image[0]) {
                imageUrl = await uploadImage(data.image[0]);
            }

            await updateUserProfile(data.name, imageUrl);
            await refetch();
            
            setIsEditing(false);
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload(); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Helmet title="My Profile" />
            <div className="card w-96 bg-base-200 shadow-2xl border border-base-200 relative">
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    className="absolute top-4 right-4 btn btn-circle btn-ghost btn-sm text-primary"
                >
                    {isEditing ? <FaTimes /> : <FaEdit />}
                </button>

                <div className="card-body items-center text-center">
                    {!isEditing ? (
                        <>
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

                            {userInfo.status === 'pending' && (
                                <div role="alert" className="alert alert-warning mb-6 text-left shadow-lg">
                                    <FaClock className="text-xl" />
                                    <div>
                                        <h3 className="font-bold">Approval Pending</h3>
                                        <div className="text-sm opacity-90">Your account is waiting for admin approval. You may have limited access.</div>
                                    </div>
                                </div>
                            )}

                            <div className="divider"></div>

                            <div className="w-full space-y-2 text-left mb-6">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Last Login:</span>
                                    <span className="text-sm opacity-70">
                                        {formatDate(user?.metadata?.lastSignInTime)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Account Status:</span>
                                    <span className={`text-sm font-bold capitalize ${
                                        userInfo.status === 'active' ? 'text-success' : 
                                        userInfo.status === 'suspended' ? 'text-error' : 'text-warning'
                                    }`}>
                                        {userInfo.status}
                                    </span>
                                </div>
                            </div>

                            <div className="card-actions w-full">
                                <button onClick={handleLogout} className="btn btn-error w-full text-white font-bold">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit(handleProfileUpdate)} className="w-full space-y-4">
                            <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                            
                            <div className="form-control text-left">
                                <label className="label pt-0"><span className="label-text">Display Name</span></label>
                                <input 
                                    type="text" 
                                    defaultValue={user?.displayName}
                                    {...register("name", { required: true })}
                                    className="input input-bordered w-full" 
                                />
                            </div>

                            <div className="form-control text-left">
                                <label className="label pt-0"><span className="label-text">Profile Picture</span></label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    {...register("image")}
                                    className="file-input file-input-bordered w-full" 
                                />
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button type="submit" disabled={loading} className="btn btn-primary flex-1 text-black font-bold">
                                    {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;