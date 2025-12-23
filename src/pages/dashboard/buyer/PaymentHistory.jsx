import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';
import { formatDate } from '../../../utilities/dateFormat';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <DashboardTable 
            title="Payment History"
            subtitle={<p className="text-gray-500">Total Payments: {payments.length}</p>}
        >
            <Helmet title="Payment History" />
            <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {payments.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="text-center py-8 text-gray-500">
                            No payment history found.
                        </td>
                    </tr>
                ) : (
                    payments.map((payment, index) => (
                        <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={payment.productImage} alt="Product" />
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">{payment.productName}</td>
                            <td>{payment.quantity}</td>
                            <td>${payment.amount}</td>
                            <td className="font-mono text-xs">{payment.transactionId}</td>
                            <td>{formatDate(payment.date)}</td>
                            <td>
                                <span className="badge badge-success badge-outline font-bold">
                                    {payment.status}
                                </span>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </DashboardTable>
    );
};

export default PaymentHistory;