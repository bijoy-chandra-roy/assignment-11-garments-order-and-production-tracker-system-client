import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('All');

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders'); 
            return res.data;
        }
    });

    const filteredOrders = filter === 'All' 
        ? orders 
        : orders.filter(order => order.status === filter);

    if (isLoading) return <Loading />;

    return (
        <DashboardTable 
            title="All Orders (Admin)"
            headerAction={
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Delivered">Delivered</option>
                </select>
            }
        >
            <thead className="bg-base-200">
                <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredOrders.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-500">No orders found.</td>
                    </tr>
                ) : (
                    filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td className="font-mono text-xs">{order._id}</td>
                            <td>
                                <div className="flex flex-col">
                                    <span className="font-bold">{order.userName || 'N/A'}</span>
                                    <span className="text-xs opacity-50">{order.email}</span>
                                </div>
                            </td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <span className={`badge ${
                                    order.status === 'Approved' ? 'badge-success' : 
                                    order.status === 'Pending' ? 'badge-warning' : 
                                    order.status === 'Rejected' ? 'badge-error' : 'badge-ghost'
                                } badge-outline font-bold`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <Link 
                                    to={`/dashboard/track-order/${order._id}`}
                                    className="btn btn-sm btn-ghost border border-base-300"
                                    title="View Details"
                                >
                                    <FaEye /> View
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </DashboardTable>
    );
};

export default AdminAllOrders;