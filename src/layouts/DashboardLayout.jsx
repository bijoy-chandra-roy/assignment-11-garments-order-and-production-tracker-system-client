import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaShoppingBag, FaUser, FaBars, FaHistory, FaUsers, FaClipboardList, FaBoxOpen, FaPlusCircle, FaTasks, FaCheckCircle } from 'react-icons/fa';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="flex flex-col min-h-screen font-urbanist">
            <Navbar />

            <div className="drawer lg:drawer-open flex-1">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col p-6 bg-base-100">
                    <div className="flex items-center gap-4 mb-6">
                        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost border border-base-300">
                            <FaBars className="text-xl" />
                        </label>
                        <div>
                            <h2 className="text-2xl font-bold">Dashboard</h2>
                            <p className="text-sm text-base-content/60">Welcome back, {user?.displayName}</p>
                        </div>
                    </div>

                    <Outlet />
                </div>

                <div className="drawer-side z-40 is-drawer-close:overflow-visible">
                    <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                    <div className="flex min-h-full flex-col items-start bg-base-200 text-base-content border-r border-base-300 transition-all duration-300 is-drawer-close:w-[80px] is-drawer-open:w-72">

                        <ul className="menu w-full grow gap-2 p-4">
                            {role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Manage Users">
                                                <FaUsers className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Manage Users</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-products"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="All Products">
                                                <FaBoxOpen className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">All Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-orders"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="All Orders">
                                                <FaClipboardList className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">All Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/my-orders"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="My Orders">
                                                <FaShoppingBag className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">My Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/payment-history"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Payment History">
                                                <FaHistory className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Payment History</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'manager' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/add-product"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Add Product">
                                                <FaPlusCircle className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Add Product</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-products"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Manage Products">
                                                <FaTasks className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Manage Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/pending-orders"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Pending Orders">
                                                <FaClipboardList className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Pending Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/approved-orders"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Approved Orders">
                                                <FaCheckCircle className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Approved Orders</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'buyer' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/my-orders"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="My Orders">
                                                <FaShoppingBag className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">My Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/payment-history"
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                            }
                                        >
                                            <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Payment History">
                                                <FaHistory className="text-xl" />
                                            </span>
                                            <span className="is-drawer-close:hidden whitespace-nowrap">Payment History</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            <div className="divider my-2"></div>

                            <li>
                                <NavLink
                                    to="/dashboard/profile"
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-black font-bold' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="My Profile">
                                        <FaUser className="text-xl" />
                                    </span>
                                    <span className="is-drawer-close:hidden whitespace-nowrap">My Profile</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/"
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-300 transition-colors"
                                >
                                    <span className="is-drawer-close:tooltip is-drawer-close:tooltip-right z-50" data-tip="Home">
                                        <FaHome className="text-xl" />
                                    </span>
                                    <span className="is-drawer-close:hidden whitespace-nowrap">Back to Home</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardLayout;