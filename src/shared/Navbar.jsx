import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../components/common/Logo';
import ThemeToggle from '../components/common/ThemeToggle';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            localStorage.removeItem('hasUser');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinkStyles = ({ isActive }) =>
        isActive
            ? "font-bold text-primary bg-primary/10 rounded-lg px-4 py-2"
            : "font-medium hover:text-primary transition-colors rounded-lg px-4 py-2";

    const links = <>
        <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
        <li><NavLink to="/products" className={navLinkStyles}>All Products</NavLink></li>
        <li><NavLink to="/about" className={navLinkStyles}>About Us</NavLink></li>
        <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
        {
            (user || localStorage.getItem('hasUser') === 'true') && <li><NavLink to="/dashboard" className={navLinkStyles}>Dashboard</NavLink></li>
        }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <ThemeToggle />
                {
                    loading ? (
                        <span className="loading loading-spinner loading-md text-primary"></span>
                    ) : user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt={user?.displayName || "User"} 
                                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                                <li className="px-4 py-2 font-bold text-center border-b border-base-200 mb-2">
                                    {user?.displayName || 'User'}
                                </li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                            </ul>
                        </div>
                    </> : <>
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary text-black">Register</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;