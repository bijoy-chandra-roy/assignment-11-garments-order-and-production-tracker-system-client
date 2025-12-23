import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FaTruck, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import { formatDate } from '../../../utilities/dateFormat';

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['approved-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/approved');
            return res.data;
        }
    });

    const openTrackingModal = (order) => {
        setSelectedOrder(order);
        document.getElementById('tracking_modal').showModal();
    };

    const onSubmit = (data) => {
        const trackingData = {
            ...data,
            date: new Date()
        };

        axiosSecure.patch(`/orders/tracking/${selectedOrder._id}`, trackingData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    reset();
                    document.getElementById('tracking_modal').close();
                    Swal.fire({
                        title: "Updated!",
                        text: "Tracking information added successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to add tracking info.",
                    icon: "error"
                });
            });
    };

    if (isLoading) return <Loading />;

    return (
        <>
            <DashboardTable title="Approved Orders (Production)">
                <Helmet title="Manager | Approved Orders" />
                <thead className="bg-base-200">
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Approved Date</th>
                        <th>Current Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-8 text-gray-500">
                                No active orders in production.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">{order._id.slice(-6)}...</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={order.productImage} alt="Product" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{order.productName}</span>
                                            <span className="text-xs opacity-50">{order.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{order.quantity}</td>
                                <td>{formatDate(order.approvedAt)}</td>
                                <td>
                                    <span className="badge badge-info badge-outline font-bold">
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openTrackingModal(order)}
                                            className="btn btn-sm btn-primary text-black"
                                            title="Add Tracking Update"
                                        >
                                            <FaTruck />
                                        </button>
                                        <Link 
                                            to={`/dashboard/track-order/${order._id}`}
                                            className="btn btn-sm btn-ghost border border-base-300"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </DashboardTable>

            {/* Tracking Modal */}
            <dialog id="tracking_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Update Production Status</h3>
                    <p className="text-sm text-gray-500 mb-4">Order ID: {selectedOrder?._id}</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Stage</span>
                            </label>
                            <select 
                                {...register("status", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="Cutting Completed">Cutting Completed</option>
                                <option value="Sewing Started">Sewing Started</option>
                                <option value="Finishing">Finishing</option>
                                <option value="QC Checked">QC Checked</option>
                                <option value="Packed">Packed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Current Location</span>
                            </label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="e.g. Sewing Section B, Warehouse" 
                                    {...register("location", { required: true })}
                                    className="input input-bordered w-full pl-10" 
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Note (Optional)</span>
                            </label>
                            <textarea 
                                {...register("note")}
                                className="textarea textarea-bordered h-24" 
                                placeholder="Any additional details..."
                            ></textarea>
                        </div>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={() => document.getElementById('tracking_modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary text-black">Update Status</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default ApprovedOrders;