import React from 'react';

const DashboardTable = ({ title, children, headerAction, subtitle }) => {
    return (
        <div className="bg-base-100 p-8 rounded-xl shadow-lg border border-base-200">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{title}</h2>
                {headerAction && <div>{headerAction}</div>}
            </div>
            
            {subtitle && <div className="mb-6">{subtitle}</div>}

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {children}
                </table>
            </div>
        </div>
    );
};

export default DashboardTable;