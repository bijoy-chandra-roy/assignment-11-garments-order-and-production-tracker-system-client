import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import SearchBar from '../../../components/common/SearchBar';
import FilterSelect from '../../../components/common/FilterSelect';
import OrderDetailsModal from '../../../components/dashboard/OrderDetailsModal';

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders'); 
            return res.data;
        }
    });

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filter === 'All' ? true : order.status === filter;
        
        const searchLower = search.toLowerCase();
        const matchesSearch = 
            order._id.toLowerCase().includes(searchLower) ||
            order.email.toLowerCase().includes(searchLower) ||
            (order.userName && order.userName.toLowerCase().includes(searchLower)) ||
            (order.productName && order.productName.toLowerCase().includes(searchLower));

        return matchesStatus && matchesSearch;
    });

    if (isLoading) return <Loading />;

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Delivered', label: 'Delivered' },
    ];

    return (
        <>
            <DashboardTable 
                title="All Orders (Admin)"
                headerAction={
                    <div className="flex flex-col md:flex-row gap-2">
                        <FilterSelect 
                            options={statusOptions} 
                            value={filter} 
                            onChange={setFilter} 
                            defaultOption="All Status"
                        />
                        <SearchBar 
                            onSearch={setSearch} 
                            value={search} 
                            placeholder="Search ID, Email or Name..." 
                        />
                    </div>
                }
            >
                <Helmet title="Admin | All Orders" />
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
                            <td colSpan="6" className="text-center py-8 text-gray-500">
                                {search || filter !== 'All' ? "No matching orders found." : "No orders found."}
                            </td>
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
                                    <label 
                                        htmlFor="admin_order_details_modal" 
                                        onClick={() => setSelectedOrder(order)}
                                        className="btn btn-sm btn-ghost border border-base-300 cursor-pointer"
                                        title="View Full Details"
                                    >
                                        <FaEye /> View
                                    </label>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </DashboardTable>

            <OrderDetailsModal 
                order={selectedOrder} 
                modalId="admin_order_details_modal" 
            />
        </>
    );
};

export default AdminAllOrders;