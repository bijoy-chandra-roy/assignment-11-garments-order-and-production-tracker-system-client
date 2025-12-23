import React, { useState } from 'react'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import { FaEye, FaTrash } from 'react-icons/fa';
import Helmet from '../../../components/common/Helmet';
import OrderDetailsModal from '../../../components/dashboard/OrderDetailsModal';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); 
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your order has been cancelled.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Could not cancel order.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    if (isLoading) return <Loading />;

    return (
        <>
            <DashboardTable title="My Orders">
                <Helmet title="My Orders" />
                <thead className="bg-base-200">
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-8 text-gray-500">
                                No orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">
                                    {order._id.slice(-6).toUpperCase()}
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={order.productImage} alt="Product" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{order.productName}</div>
                                            <div className="text-sm opacity-50">${order.totalPrice}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>{order.quantity}</td>

                                <td>
                                    <span className={`badge ${
                                        order.status === 'Pending' ? 'badge-warning' :
                                        order.status === 'Approved' ? 'badge-success' : 
                                        'badge-error'
                                    } badge-outline font-bold`}>
                                        {order.status}
                                    </span>
                                </td>

                                <td>
                                    {order.status === 'Pending' && order.paymentMethod !== 'Cash on Delivery' && !order.paymentStatus && (
                                        <Link to={`/dashboard/payment/${order._id}`}>
                                            <button className="btn btn-sm btn-primary text-black font-bold">Pay</button>
                                        </Link>
                                    )}

                                    {order.paymentMethod === 'Cash on Delivery' && (
                                        <span className="badge badge-ghost font-bold">COD</span>
                                    )}

                                    {order.paymentStatus === 'Paid' && (
                                        <span className="badge badge-success text-white font-bold">Paid</span>
                                    )}
                                </td>

                                <td>
                                    <div className="flex items-center gap-2">
                                        <label 
                                            htmlFor="my_order_details_modal" 
                                            onClick={() => setSelectedOrder(order)}
                                            className="btn btn-sm btn-ghost btn-square cursor-pointer"
                                            title="View Details"
                                        >
                                            <FaEye className="text-lg" />
                                        </label>

                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => handleCancel(order._id)}
                                                className="btn btn-sm btn-ghost btn-square text-error"
                                                title="Cancel Order"
                                            >
                                                <FaTrash className="text-lg" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </DashboardTable>

            <OrderDetailsModal 
                order={selectedOrder} 
                modalId="my_order_details_modal" 
            />
        </>
    );
};

export default MyOrders;