import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import SearchBar from '../../../components/common/SearchBar';
import FilterSelect from '../../../components/common/FilterSelect';
import { formatDate } from '../../../utilities/dateFormat';

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

            <input type="checkbox" id="admin_order_details_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-3xl">
                    {selectedOrder && (
                        <>
                            <h3 className="text-xl font-bold border-b pb-3 mb-4">Order Details (Admin View)</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">Customer Information</h4>
                                    <div className="bg-base-200 p-4 rounded-lg space-y-1 text-sm">
                                        <p><span className="font-bold opacity-70">Name:</span> {selectedOrder.userName}</p>
                                        <p><span className="font-bold opacity-70">Email:</span> {selectedOrder.email}</p>
                                        <p><span className="font-bold opacity-70">Phone:</span> {selectedOrder.phone || 'N/A'}</p>
                                        <p><span className="font-bold opacity-70">Address:</span> {selectedOrder.address || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">Order Summary</h4>
                                    <div className="bg-base-200 p-4 rounded-lg space-y-1 text-sm">
                                        <p><span className="font-bold opacity-70">Order ID:</span> <span className="font-mono">{selectedOrder._id}</span></p>
                                        <p><span className="font-bold opacity-70">Date:</span> {formatDate(selectedOrder.orderDate)}</p>
                                        <p><span className="font-bold opacity-70">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                                        <p><span className="font-bold opacity-70">Status:</span> 
                                            <span className={`ml-2 badge badge-sm ${selectedOrder.status === 'Approved' ? 'badge-success text-white' : 'badge-warning'}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 mt-2">
                                    <h4 className="font-semibold text-primary uppercase text-sm tracking-wide mb-2">Product Purchased</h4>
                                    <div className="flex gap-4 items-center bg-base-100 border border-base-300 p-4 rounded-lg">
                                        <div className="avatar">
                                            <div className="w-20 h-20 rounded-xl">
                                                <img src={selectedOrder.productImage} alt="Product" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg">{selectedOrder.productName}</h4>
                                            <p className="text-sm opacity-70">Unit Price: ${(selectedOrder.totalPrice / selectedOrder.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs uppercase font-bold opacity-50">Quantity</p>
                                            <p className="font-bold text-lg">{selectedOrder.quantity}</p>
                                        </div>
                                        <div className="text-right pl-6 border-l border-base-300">
                                            <p className="text-xs uppercase font-bold opacity-50">Total</p>
                                            <p className="font-bold text-xl text-primary">${selectedOrder.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action">
                                <label htmlFor="admin_order_details_modal" className="btn">Close</label>
                            </div>
                        </>
                    )}
                </div>
                <label className="modal-backdrop" htmlFor="admin_order_details_modal">Close</label>
            </div>
        </>
    );
};

export default AdminAllOrders;