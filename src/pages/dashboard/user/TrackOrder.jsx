import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const TrackOrder = () => {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['track-order', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const trackingSteps = order.trackingHistory || [];
    const sortedSteps = [...trackingSteps].sort((a, b) => new Date(a.date) - new Date(b.date));

    const position = [23.8103, 90.4125];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Order Tracking</h2>

            {/* Order Info Summary */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-20 rounded-xl mask mask-squircle">
                                    <img src={order.productImage} alt="Product" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{order.productName}</h3>
                                <p className="text-sm opacity-70">Order ID: <span className="font-mono">{order._id}</span></p>
                                <div className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-primary'} mt-2`}>
                                    {order.status}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-xl">${order.totalPrice}</p>
                            <p className="text-sm">Qty: {order.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline Section */}
                <div className="card bg-base-100 shadow-xl border border-base-200">
                    <div className="card-body">
                        <h3 className="card-title mb-6">Shipment Progress</h3>

                        {sortedSteps.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                                <p>Order is being processed.</p>
                                <p className="text-sm">No tracking updates available yet.</p>
                            </div>
                        ) : (
                            <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon">
                                {sortedSteps.map((step, index) => {
                                    const isLatest = index === sortedSteps.length - 1;

                                    return (
                                        <li key={index}>
                                            <hr className={index === 0 ? 'hidden' : 'bg-primary'} />

                                            <div className="timeline-middle">
                                                <div className="w-6 h-6 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className={`${isLatest ? 'text-secondary h-6 w-6' : 'text-primary h-5 w-5'}`}
                                                    >
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className={`timeline-end mb-10 ${isLatest ? 'font-bold text-secondary scale-105 origin-left' : ''}`}>
                                                <time className="font-mono italic text-xs opacity-70">
                                                    {new Date(step.date).toLocaleString()}
                                                </time>
                                                <div className="text-lg font-black">{step.status}</div>
                                                <p className="text-sm font-semibold text-gray-600">Location: {step.location}</p>
                                                {step.note && <p className="text-sm text-gray-500 mt-1">Note: {step.note}</p>}

                                                {isLatest && (
                                                    <div className="badge badge-secondary badge-outline mt-2 animate-pulse">
                                                        Current Status
                                                    </div>
                                                )}
                                            </div>

                                            <hr className={index === sortedSteps.length - 1 ? 'hidden' : 'bg-primary'} />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden h-[600px] z-0">
                    <MapContainer center={position} zoom={10} className="h-full w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                <div className="text-center">
                                    <p className="font-bold">{order.status}</p>
                                    <p className="text-xs">Latest known location</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;