import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaShoppingBag, FaUser, FaBars } from 'react-icons/fa';
import Navbar from '../shared/Navbar';
import Footer from '../shared/footer';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen font-urbanist">
            {/* 1. Global Navbar */}
            <Navbar />

            {/* 2. Dashboard Content with Collapsible Sidebar */}
            <div className="drawer lg:drawer-open flex-1">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                
                {/* Main Content Area */}
                <div className="drawer-content flex flex-col p-6 bg-base-100">
                    {/* Sidebar Toggle Button */}
                    <div className="flex items-center gap-4 mb-6">
                        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost border border-base-300">
                            <FaBars className="text-xl" />
                        </label>
                        <div>
                            <h2 className="text-2xl font-bold">Dashboard</h2>
                            <p className="text-sm text-base-content/60">Welcome back, {user?.displayName}</p>
                        </div>
                    </div>

                    {/* Render the Dashboard Pages (Profile, Orders, etc.) */}
                    <Outlet />
                </div>

                {/* Sidebar Area */}
                <div className="drawer-side z-40 is-drawer-close:overflow-visible">
                    <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    
                    {/* Sidebar Container: Handles the width transition */}
                    <div className="flex min-h-full flex-col items-start bg-base-200 text-base-content border-r border-base-300 transition-all duration-300 is-drawer-close:w-[80px] is-drawer-open:w-72">
                        
                        {/* Sidebar Menu */}
                        <ul className="menu w-full grow gap-2 p-4">
                            {/* Profile Link */}
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

                            {/* My Orders Link */}
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

                            <div className="divider my-2"></div>

                            {/* Back to Home Link */}
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

            {/* 3. Global Footer */}
            <Footer />
        </div>
    );
};

export default DashboardLayout;