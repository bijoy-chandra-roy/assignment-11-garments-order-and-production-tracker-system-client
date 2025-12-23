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
import OrderDetailsModal from '../../../components/dashboard/OrderDetailsModal';

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

            <OrderDetailsModal 
                order={selectedOrder} 
                modalId="order_details_modal" 
            />
        </>
    );
};

export default PendingOrders;