import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import { Link } from 'react-router';
import DashboardTable from '../../../components/dashboard/DashboardTable';

const AdminAllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });

    const handleToggleHome = (product) => {
        axiosSecure.patch(`/products/${product._id}`, { showOnHome: !product.showOnHome })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `Home page visibility updated`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <DashboardTable title="All Products (Admin)">
            <thead className="bg-base-200">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Created By</th>
                    <th>Show on Home</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={product.image} alt={product.name} />
                                </div>
                            </div>
                        </td>
                        <td className="font-bold">{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>
                            <div className="flex flex-col">
                                <span className="text-sm">{product.managerName}</span>
                                <span className="text-xs opacity-50">{product.managerEmail}</span>
                            </div>
                        </td>
                        <td>
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary" 
                                checked={product.showOnHome || false}
                                onChange={() => handleToggleHome(product)}
                            />
                        </td>
                        <td className="flex gap-2">
                            <Link to={`/dashboard/update-product/${product._id}`}>
                                <button className="btn btn-sm btn-square btn-ghost text-info">
                                    <FaEdit />
                                </button>
                            </Link>
                            <button 
                                onClick={() => handleDelete(product._id)}
                                className="btn btn-sm btn-square btn-ghost text-error"
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </DashboardTable>
    );
};

export default AdminAllProducts;