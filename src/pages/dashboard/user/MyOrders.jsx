import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../../components/common/Loading';

const MyOrders = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`/orders?email=${user.email}`)
                .then(res => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, axios]);

    if (loading) return <Loading />;

    return (
        <div className="bg-base-100 p-8 rounded-xl shadow-lg border border-base-200">
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                                        <span className={`badge ${
                                            order.status === 'Pending' ? 'badge-warning' : 
                                            order.status === 'Approved' ? 'badge-success' : 'badge-error'
                                        } badge-outline font-bold`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost text-primary">View</button>
                                        {order.status === 'Pending' && (
                                            <button className="btn btn-sm btn-ghost text-error">Cancel</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;