import React from 'react';
import { formatDate } from '../../utilities/dateFormat';

const OrderDetailsModal = ({ order, modalId = "order_details_modal" }) => {
    if (!order) return null;

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="text-xl font-bold border-b pb-3 mb-4">Order Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">Customer Information</h4>
                            <div className="bg-base-200 p-4 rounded-lg space-y-1 text-sm">
                                <p><span className="font-bold opacity-70">Name:</span> {order.userName}</p>
                                <p><span className="font-bold opacity-70">Email:</span> {order.email}</p>
                                <p><span className="font-bold opacity-70">Phone:</span> {order.phone || 'N/A'}</p>
                                <p><span className="font-bold opacity-70">Address:</span> {order.address || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-primary uppercase text-sm tracking-wide">Order Summary</h4>
                            <div className="bg-base-200 p-4 rounded-lg space-y-1 text-sm">
                                <p><span className="font-bold opacity-70">Order ID:</span> <span className="font-mono">{order._id}</span></p>
                                <p><span className="font-bold opacity-70">Date:</span> {formatDate(order.orderDate)}</p>
                                <p><span className="font-bold opacity-70">Payment:</span> {order.paymentMethod}</p>
                                <p><span className="font-bold opacity-70">Status:</span> 
                                    <span className={`ml-2 badge badge-sm ${order.status === 'Approved' || order.paymentStatus === 'Paid' ? 'badge-success text-white' : 'badge-warning'}`}>
                                        {order.status || order.paymentStatus}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-2">
                            <h4 className="font-semibold text-primary uppercase text-sm tracking-wide mb-2">Product Purchased</h4>
                            <div className="flex gap-4 items-center bg-base-100 border border-base-300 p-4 rounded-lg">
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-xl">
                                        <img src={order.productImage} alt="Product" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">{order.productName}</h4>
                                    <p className="text-sm opacity-70">Unit Price: ${(order.totalPrice / order.quantity).toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase font-bold opacity-50">Quantity</p>
                                    <p className="font-bold text-lg">{order.quantity}</p>
                                </div>
                                <div className="text-right pl-6 border-l border-base-300">
                                    <p className="text-xs uppercase font-bold opacity-50">Total</p>
                                    <p className="font-bold text-xl text-primary">${order.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <label htmlFor={modalId} className="btn">Close</label>
                    </div>
                </div>
                
                <label className="modal-backdrop" htmlFor={modalId}>Close</label>
            </div>
        </>
    );
};

export default OrderDetailsModal;