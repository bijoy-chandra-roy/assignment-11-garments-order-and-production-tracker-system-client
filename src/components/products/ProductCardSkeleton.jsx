import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="card bg-base-200 shadow-xl border border-base-200 h-full animate-pulse">
            <figure className="h-64 w-full bg-gray-300 dark:bg-gray-700"></figure>
            
            <div className="card-body">
                <h2 className="card-title justify-between">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </h2>
                
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>

                <div className="card-actions justify-end mt-auto">
                    <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;