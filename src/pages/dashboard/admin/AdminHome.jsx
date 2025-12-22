import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/common/Loading';
import { FaUsers, FaBoxOpen, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const barData = [
        { name: 'Products', count: stats.products },
        { name: 'Users', count: stats.users },
        { name: 'Orders', count: stats.orders }
    ];

    const pieData = [
        { name: 'Products', value: stats.products },
        { name: 'Orders', value: stats.orders },
        { name: 'Users', value: stats.users }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Custom Label for Pie Chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Overview</h2>
            <p className="text-gray-500 mb-8">Welcome back, {user?.displayName}</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="stat bg-base-200 text-secondary rounded-2xl shadow-lg border border-base-200">
                    <div className="stat-figure text-primary">
                        <FaDollarSign className="text-4xl" />
                    </div>
                    <div className="stat-title font-bold text-gray-500">Revenue</div>
                    <div className="stat-value text-primary">${stats.revenue}</div>
                </div>

                <div className="stat bg-base-200 text-secondary rounded-2xl shadow-lg border border-base-200">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-4xl" />
                    </div>
                    <div className="stat-title font-bold text-gray-500">Users</div>
                    <div className="stat-value text-secondary">{stats.users}</div>
                </div>

                <div className="stat bg-base-200 text-secondary rounded-2xl shadow-lg border border-base-200">
                    <div className="stat-figure text-accent">
                        <FaBoxOpen className="text-4xl" />
                    </div>
                    <div className="stat-title font-bold text-gray-500">Products</div>
                    <div className="stat-value text-accent">{stats.products}</div>
                </div>

                <div className="stat bg-base-200 text-secondary rounded-2xl shadow-lg border border-base-200">
                    <div className="stat-figure text-warning">
                        <FaClipboardList className="text-4xl" />
                    </div>
                    <div className="stat-title font-bold text-gray-500">Orders</div>
                    <div className="stat-value text-warning">{stats.orders}</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Bar Chart */}
                <div className="w-full lg:w-1/2 h-[400px] bg-base-200 p-6 rounded-2xl shadow-xl border border-base-200">
                    <h3 className="text-xl font-bold mb-6 text-center">System Activity</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" barSize={50} radius={[10, 10, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="w-full lg:w-1/2 h-[400px] bg-base-200 p-6 rounded-2xl shadow-xl border border-base-200">
                    <h3 className="text-xl font-bold mb-6 text-center">Data Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;