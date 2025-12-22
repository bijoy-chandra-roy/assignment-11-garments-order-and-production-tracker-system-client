import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center px-4 font-urbanist">
            <FaExclamationTriangle className="text-6xl text-warning mb-4" />
            <h1 className="text-9xl font-black text-primary">404</h1>
            <h2 className="text-4xl font-bold mt-4 mb-8 text-base-content">Page Not Found</h2>
            <p className="text-lg text-base-content/70 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary btn-lg text-black font-bold flex items-center gap-2">
                <FaHome /> Back to Home
            </Link>
        </div>
    );
};

export default NotFound;