import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import useUserInfo from '../../../hooks/useUserInfo';
import Helmet from '../../../components/common/Helmet';
import { formatDate } from '../../../utilities/dateFormat';

const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { userInfo } = useUserInfo();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/pending');
            return res.data;
        }
    });

    const handleStatusUpdate = (id, status) => {
        if (userInfo.status === 'suspended') {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Your account is suspended. You cannot approve or reject orders.',
            });
            return;
        }
        
        Swal.fire({
            title: `Are you sure you want to ${status} this order?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: status === 'Approved' ? "#36d399" : "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: `Yes, ${status} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/orders/status/${id}`, { status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `${status}!`,
                                text: `Order has been ${status.toLowerCase()}.`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: "Error",
                            text: "Could not update status.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <>
            <DashboardTable title="Pending Orders">
                <Helmet title="Manager | Pending Orders" />
                <thead className="bg-base-200">
                    <tr>
                        <th>Order ID</th>
                        <th>User Email</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-8 text-gray-500">
                                No pending orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => {
                            const isPayFirst = order.paymentMethod === 'PayFirst';
                            const isUnpaid = order.paymentStatus !== 'Paid';
                            const isApprovalDisabled = isPayFirst && isUnpaid;

                            return (
                                <tr key={order._id}>
                                    <td className="font-mono text-xs">{order._id.slice(-6).toUpperCase()}</td>
                                    <td>{order.email}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={order.productImage} alt="Product" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{order.productName}</span>
                                                <span className="text-xs opacity-50">${order.totalPrice}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>
                                        {order.paymentMethod === 'Cash on Delivery' ? (
                                            <span className="badge badge-ghost badge-xs">COD</span>
                                        ) : (
                                            <span className={`badge badge-xs ${order.paymentStatus === 'Paid' ? 'badge-success text-white' : 'badge-warning'}`}>
                                                {order.paymentStatus || 'Unpaid'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="flex gap-2">
                                        <label 
                                            htmlFor="order_details_modal" 
                                            onClick={() => setSelectedOrder(order)}
                                            className="btn btn-sm btn-circle btn-ghost border border-base-300 cursor-pointer"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </label>

                                        <button 
                                            onClick={() => handleStatusUpdate(order._id, 'Approved')}
                                            disabled={isApprovalDisabled}
                                            className="btn btn-sm btn-circle btn-success text-white disabled:bg-gray-300 disabled:text-gray-500"
                                            title={isApprovalDisabled ? "Payment Required" : "Approve"}
                                        >
                                            <FaCheck />
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(order._id, 'Rejected')}
                                            className="btn btn-sm btn-circle btn-error text-white"
                                            title="Reject"
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </DashboardTable>

            <input type="checkbox" id="order_details_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-3xl">
                    {selectedOrder && (
                        <>
                            <h3 className="text-xl font-bold border-b pb-3 mb-4">Order Details</h3>
                            
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
                                        <p><span className="font-bold opacity-70">Payment:</span> {selectedOrder.paymentMethod}</p>
                                        <p><span className="font-bold opacity-70">Status:</span> 
                                            <span className={`ml-2 badge badge-sm ${selectedOrder.paymentStatus === 'Paid' ? 'badge-success text-white' : 'badge-warning'}`}>
                                                {selectedOrder.paymentStatus || 'Pending'}
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
                                <label htmlFor="order_details_modal" className="btn">Close</label>
                            </div>
                        </>
                    )}
                </div>
                <label className="modal-backdrop" htmlFor="order_details_modal">Close</label>
            </div>
        </>
    );
};

export default PendingOrders;