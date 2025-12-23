import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaTruck, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import { formatDate } from '../../../utilities/dateFormat';
import OrderDetailsModal from '../../../components/dashboard/OrderDetailsModal';
import useUserInfo from '../../../hooks/useUserInfo';

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { userInfo } = useUserInfo();
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
        
        reset({
            status: order.status,
            location: order.location || '', 
            note: order.note || ''
        });
        document.getElementById('tracking_modal').showModal();
    };

    const closeTrackingModal = () => {
        document.getElementById('tracking_modal').close();
        reset(); 
        setSelectedOrder(null);
    };

    const onSubmit = (data) => {
        if (userInfo.status === 'suspended') {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Your account is suspended. You cannot update tracking information.',
            });
            return;
        }

        const trackingData = {
            ...data,
            date: new Date()
        };

        axiosSecure.patch(`/orders/tracking/${selectedOrder._id}`, trackingData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: "Tracking information updated.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    closeTrackingModal();
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

    const inputClass = "input input-bordered w-full h-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
    const selectClass = "select select-bordered w-full h-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
    const textareaClass = "textarea textarea-bordered h-24 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-base";
    const labelClass = "label-text font-bold mb-1 block";

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
                                            className="btn btn-sm btn-ghost btn-square text-info border border-base-300"
                                            title="View Tracking Timeline"
                                        >
                                            <FaMapMarkerAlt />
                                        </Link>

                                        <label 
                                            htmlFor="approved_order_details_modal" 
                                            onClick={() => setSelectedOrder(order)}
                                            className="btn btn-sm btn-ghost btn-square border border-base-300 cursor-pointer"
                                            title="View Full Details"
                                        >
                                            <FaEye />
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </DashboardTable>

            <OrderDetailsModal 
                order={selectedOrder} 
                modalId="approved_order_details_modal" 
            />

            <dialog id="tracking_modal" className="modal">
                <div className="modal-box max-w-2xl border border-base-300">
                    <h3 className="font-bold text-2xl mb-1 text-center">Update Production Status</h3>
                    <p className="text-sm text-center text-base-content/60 mb-8 font-mono">
                        Order ID: {selectedOrder?._id}
                    </p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label pt-0">
                                    <span className={labelClass}>Production Stage</span>
                                </label>
                                <select 
                                    {...register("status", { required: true })}
                                    className={selectClass}
                                >
                                    <option value="Approved">Approved (Pending Start)</option>
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
                                <label className="label pt-0">
                                    <span className={labelClass}>Current Location</span>
                                </label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-3.5 text-primary/70 z-10" />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Sewing Section B" 
                                        {...register("location", { required: true })}
                                        className={`${inputClass} pl-10`} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label pt-0">
                                <span className={labelClass}>Note (Optional)</span>
                            </label>
                            <textarea 
                                {...register("note")}
                                className={textareaClass} 
                                placeholder="Any additional details regarding this update..."
                            ></textarea>
                        </div>

                        <div className="modal-action mt-8">
                            <button 
                                type="button" 
                                className="btn btn-ghost hover:bg-base-300" 
                                onClick={closeTrackingModal}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary text-black font-bold px-8">
                                Update Status
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeTrackingModal}>close</button>
                </form>
            </dialog>
        </>
    );
};

export default ApprovedOrders;