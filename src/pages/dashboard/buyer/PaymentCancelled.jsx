import React from 'react';
import { Link } from 'react-router';
import Helmet from '../../../components/common/Helmet';

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Helmet title="Payment Cancelled" />
            <h2 className="text-3xl font-bold text-error mb-4">Payment Cancelled</h2>
            <p className="mb-8">You have cancelled the payment process.</p>
            <Link to="/dashboard/my-orders" className="btn btn-primary text-black">
                Return to My Orders
            </Link>
        </div>
    );
};

export default PaymentCancelled;