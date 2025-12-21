import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/common/Loading';

const Payment = () => {
    const { id } = useParams();
    const axios = useAxios();

    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const res = await axios.get(`/orders/${id}`);
            return res.data;
        }
    });

    const handlePayment = () => {
        axios.post('/create-checkout-session', { order })
            .then(res => {
                if (res.data.url) {
                    window.location.href = res.data.url; // Redirect to Stripe
                }
            })
            .catch(err => console.error(err));
    };

    if (isLoading) return <Loading />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="card w-96 bg-base-200 shadow-xl border border-base-200">
                <div className="card-body text-center">
                    <h2 className="card-title justify-center">Complete Payment</h2>
                    <p>Pay for: <strong>{order.productName}</strong></p>
                    <p className="text-xl font-bold text-primary my-4">${order.totalPrice}</p>
                    <button onClick={handlePayment} className="btn btn-primary w-full text-black font-bold">
                        Pay with Stripe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;