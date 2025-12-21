import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('orderId');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId && orderId) {
            axiosSecure.post('/payments/success', { sessionId, orderId })
                .then(res => {
                    if (res.data.paymentResult.insertedId) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            text: 'Your order has been confirmed.',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            navigate('/dashboard/my-orders');
                        });
                    }
                })
                .catch(err => {
                    console.error("Payment verification failed", err);
                    setLoading(false);
                });
        }
    }, [sessionId, orderId, axiosSecure, navigate]);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-bold text-success mb-4">Payment Successful!</h2>
            <p>We are updating your order status...</p>
        </div>
    );
};

export default PaymentSuccess;