import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const AuthLayout = () => {
    return (
        <div className='font-urbanist bg-base-100'>
            <Navbar />
            <div className='min-h-screen py-12 flex justify-center items-center'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default AuthLayout;