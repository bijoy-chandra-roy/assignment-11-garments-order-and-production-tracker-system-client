import React from 'react'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router';
import DashboardTable from '../../../components/dashboard/DashboardTable';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
        <DashboardTable title="My Orders">
            <thead className="bg-base-200">
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Status</th>
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
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={order.productImage} alt="Product" />
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                <span className={`badge ${order.status === 'Pending' ? 'badge-warning' :
                                    order.status === 'Approved' ? 'badge-success' : 'badge-error'
                                } badge-outline font-bold`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                {order.status === 'Pending' && !order.paymentStatus && (
                                    <Link to={`/dashboard/payment/${order._id}`}>
                                        <button className="btn btn-sm btn-primary mr-2 text-black">Pay</button>
                                    </Link>
                                )}

                                {order.paymentStatus === 'Paid' && (
                                    <span className="badge badge-success badge-outline mr-2">Paid</span>
                                )}

                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCancel(order._id)}
                                        className="btn btn-sm btn-ghost text-error"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </DashboardTable>
    );
};

export default MyOrders;