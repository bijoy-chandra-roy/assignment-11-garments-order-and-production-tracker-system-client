import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { FaTrash, FaUsers, FaSearch, FaBan, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardTable from '../../../components/dashboard/DashboardTable';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');

    const { data: users = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
        placeholderData: keepPreviousData, 
    });

    // 1. Handle Make Admin
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

    // 2. Handle Suspend User (New Logic)
    const handleSuspendUser = (user) => {
        Swal.fire({
            title: `Suspend ${user.name}?`,
            html: `
                <p class="text-sm text-gray-500 mb-4">This will restrict the user's actions.</p>
                <div class="flex flex-col gap-3 text-left">
                    <label class="text-xs font-bold uppercase text-gray-500">Internal Reason (For Admin)</label>
                    <input id="swal-reason" class="input input-bordered w-full" placeholder="e.g., Suspicious activity" />
                    
                    <label class="text-xs font-bold uppercase text-gray-500">Feedback (Visible to User)</label>
                    <textarea id="swal-feedback" class="textarea textarea-bordered w-full h-24" placeholder="e.g., Your account is suspended due to policy violation."></textarea>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Suspend',
            preConfirm: () => {
                const reason = document.getElementById('swal-reason').value;
                const feedback = document.getElementById('swal-feedback').value;
                if (!reason || !feedback) {
                    Swal.showValidationMessage('Please enter both reason and feedback');
                }
                return { reason, feedback };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { reason, feedback } = result.value;
                axiosSecure.patch(`/users/suspend/${user._id}`, {
                    status: 'suspended',
                    reason,
                    feedback
                })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire('Suspended!', `${user.name} has been suspended.`, 'success');
                    }
                });
            }
        });
    };

    // 3. Handle Reactivate User (New Logic)
    const handleReactivateUser = (user) => {
        axiosSecure.patch(`/users/reactivate/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Reactivated!', `${user.name} is now active.`, 'success');
                }
            });
    }

    // 4. Handle Delete User
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
        <DashboardTable 
            title="All Users" 
            headerAction={
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <h2 className="text-xl font-bold whitespace-nowrap">Total Users: {users.length}</h2>
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
            <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th> {/* New Status Column */}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <div className={isFetching ? "opacity-50 pointer-events-none contents" : "contents"}>
                    {users.map((user, index) => (
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
                                {/* Suspend/Reactivate Button */}
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
                                            onClick={() => handleSuspendUser(user)}
                                            className="btn btn-sm btn-square btn-warning text-white"
                                            title="Suspend User">
                                            <FaBan />
                                        </button>
                                    )
                                )}
                                
                                {/* Make Admin Button */}
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm btn-square bg-orange-500 text-white"
                                        title="Make Admin">
                                        <FaUsers />
                                    </button>
                                )}

                                {/* Delete Button */}
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
    );
};

export default ManageUsers;