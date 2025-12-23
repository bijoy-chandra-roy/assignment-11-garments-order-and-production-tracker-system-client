import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaTimes } from 'react-icons/fa';
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
        <DashboardTable title="Pending Orders">
            <Helmet title="Manager | Pending Orders" />
            <thead className="bg-base-200">
                <tr>
                    <th>Order ID</th>
                    <th>User Email</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-500">
                            No pending orders found.
                        </td>
                    </tr>
                ) : (
                    orders.map((order) => (
                        <tr key={order._id}>
                            <td className="font-mono text-xs">{order._id}</td>
                            <td>{order.email}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-10 h-10">
                                            <img src={order.productImage} alt="Product" />
                                        </div>
                                    </div>
                                    <span className="font-bold">{order.productName}</span>
                                </div>
                            </td>
                            <td>{order.quantity}</td>
                            <td>{formatDate(order.orderDate)}</td>
                            <td className="flex gap-2">
                                <button 
                                    onClick={() => handleStatusUpdate(order._id, 'Approved')}
                                    className="btn btn-sm btn-circle btn-success text-white"
                                    title="Approve"
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
                    ))
                )}
            </tbody>
        </DashboardTable>
    );
};

export default PendingOrders;