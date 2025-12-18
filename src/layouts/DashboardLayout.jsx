import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/footer';


const DashboardLayout = () => {
    return (
        <div className='font-urbanist'>
            <Navbar />
            <div className='max-w-7xl mx-auto p-4 min-h-[calc(100vh-300px)]'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;