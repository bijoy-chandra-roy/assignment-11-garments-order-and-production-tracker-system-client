import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <FaBan className="text-9xl text-error mb-6 opacity-80" />
            <h1 className="text-4xl font-bold text-error mb-2">Access Forbidden</h1>
            <p className="text-lg text-base-content/70 mb-8 max-w-md">
                You do not have permission to view this page. Please contact your administrator if you believe this is an error.
            </p>
            <div className="flex gap-4">
                <Link to="/" className="btn btn-primary text-black font-bold px-8">
                    Go Home
                </Link>
                <Link to="/dashboard" className="btn btn-outline px-8">
                    Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;