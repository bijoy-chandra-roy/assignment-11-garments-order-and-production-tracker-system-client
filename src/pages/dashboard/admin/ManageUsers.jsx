import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { FaTrash, FaUsers, FaSearch, FaBan, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import SuspendUserModal from '../../../components/dashboard/SuspendUserModal';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: users = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
        placeholderData: keepPreviousData, 
    });

    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        return user.role === filter;
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const openSuspendModal = (user) => {
        setSelectedUser(user);
        setIsSuspendModalOpen(true);
    };

    const closeSuspendModal = () => {
        setIsSuspendModalOpen(false);
        setSelectedUser(null);
    };

    const handleSuspendSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await axiosSecure.patch(`/users/suspend/${selectedUser._id}`, {
                status: 'suspended',
                reason: data.reason,
                feedback: data.feedback
            });

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Suspended!',
                    text: `${selectedUser.name} has been suspended.`,
                    timer: 1500,
                    showConfirmButton: false
                });
                closeSuspendModal();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to suspend user.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReactivateUser = (user) => {
        axiosSecure.patch(`/users/reactivate/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Reactivated!', `${user.name} is now active.`, 'success');
                }
            });
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    if (isLoading) return <Loading />;

    return (
        <>
            <DashboardTable 
                title="All Users" 
                headerAction={
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <h2 className="text-xl font-bold whitespace-nowrap">Total: {filteredUsers.length}</h2>
                        
                        <select 
                            className="select select-bordered w-full max-w-xs"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="buyer">Buyer</option>
                        </select>

                        <label className="input input-bordered flex items-center gap-2">
                            <input 
                                type="text" 
                                className="grow" 
                                placeholder="Search users..." 
                                onChange={(e) => setSearch(e.target.value)} 
                                value={search}
                            />
                            <FaSearch className="opacity-70" />
                        </label>
                    </div>
                }
            >
                <Helmet title="Admin | Manage Users" />
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <div className={isFetching ? "opacity-50 pointer-events-none contents" : "contents"}>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="font-bold text-primary">Admin</span>
                                    ) : (
                                        <span className="capitalize">{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    {user.status === 'suspended' ? (
                                        <span className="badge badge-error text-white font-bold">Suspended</span>
                                    ) : (
                                        <span className="badge badge-success text-white font-bold">Active</span>
                                    )}
                                </td>
                                <td className="flex gap-2">
                                    {user.role !== 'admin' && (
                                        user.status === 'suspended' ? (
                                            <button 
                                                onClick={() => handleReactivateUser(user)}
                                                className="btn btn-sm btn-square btn-success text-white"
                                                title="Reactivate User">
                                                <FaCheckCircle />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => openSuspendModal(user)}
                                                className="btn btn-sm btn-square btn-warning text-white"
                                                title="Suspend User">
                                                <FaBan />
                                            </button>
                                        )
                                    )}
                                    
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-sm btn-square bg-orange-500 text-white"
                                            title="Make Admin">
                                            <FaUsers />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-sm btn-square btn-ghost text-error"
                                        title="Delete User">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </div>
                </tbody>
            </DashboardTable>

            <SuspendUserModal 
                isOpen={isSuspendModalOpen}
                onClose={closeSuspendModal}
                user={selectedUser}
                onSubmit={handleSuspendSubmit}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default ManageUsers;