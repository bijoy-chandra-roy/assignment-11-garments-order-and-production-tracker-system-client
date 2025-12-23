import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/common/Loading';
import DashboardTable from '../../../components/dashboard/DashboardTable';
import Helmet from '../../../components/common/Helmet';

const ManageProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['my-products', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/products?size=1000'); 
            
            return res.data.products.filter(product => product.managerEmail === user.email);
        }
    });

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
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error",
                            text: err.message,
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <DashboardTable title="Manage My Products">
            <Helmet title="Manager | Manage Products" />
            <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Payment Mode</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center py-8 text-gray-500">
                            No products found. Add some products to manage them here.
                        </td>
                    </tr>
                ) : (
                    products.map((product, index) => (
                        <tr key={product._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                </div>
                            </td>
                            <td className="font-bold">{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.paymentMethod}</td>
                            <td className="flex gap-2">
                                <Link to={`/dashboard/update-product/${product._id}`}>
                                    <button className="btn btn-sm btn-square btn-ghost text-info" title="Update">
                                        <FaEdit className="text-lg" />
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(product._id)}
                                    className="btn btn-sm btn-square btn-ghost text-error"
                                    title="Delete"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </DashboardTable>
    );
};

export default ManageProducts;