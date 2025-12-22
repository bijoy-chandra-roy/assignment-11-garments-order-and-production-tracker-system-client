import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query'; // Import keepPreviousData
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { FaTrash, FaUsers, FaSearch } from 'react-icons/fa';
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
        // THIS LINE FIXES THE FLICKERING
        placeholderData: keepPreviousData, 
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

    // Only show full page loader on the very first load (when no data exists)
    if (isLoading) return <Loading />;

    return (
        <DashboardTable 
            title="All Users" 
            headerAction={
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <h2 className="text-xl font-bold whitespace-nowrap">Total Users: {users.length}</h2>
                    
                    {/* Search Input */}
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder="Search users..." 
                            onChange={(e) => setSearch(e.target.value)} 
                            value={search}
                            autoFocus // Optional: keeps focus if component re-renders
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* Add a subtle opacity effect when fetching new data in background */}
                <div className={isFetching ? "opacity-50 pointer-events-none contents" : "contents"}>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.role === 'admin' ? 'Admin' : (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500 text-white">
                                        <FaUsers className="text-2xl" />
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn btn-ghost btn-lg text-error">
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