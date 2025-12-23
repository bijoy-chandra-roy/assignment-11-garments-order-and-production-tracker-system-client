import React from 'react';
import { useParams, Link, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/common/Loading';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxios from '../../hooks/useAxios';
import { FaStar, FaBoxOpen, FaTag, FaDollarSign, FaMoneyBillWave, FaPlayCircle } from 'react-icons/fa';
import Helmet from '../../components/common/Helmet';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { role } = useRole();
    const axiosPublic = useAxios();
    const location = useLocation();

    const { data: product = null, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (!product) return <div className="text-center py-20 text-2xl font-bold text-error">Product not found</div>;

    const { _id, name, image, category, price, quantity, description, rating, paymentMethod, video } = product;

    const canOrder = !user || (role !== 'admin' && role !== 'manager');

    return (
        <div className="max-w-7xl min-h-screen mx-auto px-4 py-12 bg-base-100">
            <Helmet title={product?.name || "Product Details"} />
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-base-200 h-[500px]">
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <div className="badge badge-primary badge-outline mb-4">{category}</div>
                            {video && (
                                <a
                                    href={video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline btn-error gap-2"
                                >
                                    <FaPlayCircle /> Watch Demo
                                </a>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold mb-2 text-base-content">{name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.floor(rating || 0) ? "text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-sm text-base-content/60">({rating || 0} Rating)</span>
                        </div>
                    </div>

                    <p className="text-lg text-base-content/80 leading-relaxed">
                        {description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="stat bg-base-200 rounded-xl">
                            <div className="stat-figure text-secondary">
                                <FaDollarSign className="text-3xl" />
                            </div>
                            <div className="stat-title">Price</div>
                            <div className="stat-value text-primary text-2xl">${price}</div>
                        </div>
                        <div className="stat bg-base-200 rounded-xl">
                            <div className="stat-figure text-secondary">
                                <FaBoxOpen className="text-3xl" />
                            </div>
                            <div className="stat-title">Available</div>
                            <div className="stat-value text-secondary text-2xl">{quantity}</div>
                            <div className="stat-desc">In Stock</div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-base-content/70">
                            <FaTag className="text-primary" />
                            <span>Minimum Order Quantity: <strong>{product.minimumOrder || 50} Units</strong></span>
                        </div>

                        <div className="flex items-center gap-3 text-base-content/70">
                            <FaMoneyBillWave className="text-primary" />
                            <span>Payment Option: <strong>{paymentMethod || 'Online Payment'}</strong></span>
                        </div>

                        <div className="mt-8">
                            {!user ? (
                                <div className="text-center">
                                    <p className="mb-2 text-error">Please login to place an order</p>
                                    <Link to="/login" state={{ from: location }} className="btn btn-secondary w-full">Login to Order</Link>
                                </div>
                            ) : canOrder ? (
                                quantity > 0 ? (
                                    <Link to={`/order/${_id}`} className="btn btn-primary ...">Order Now</Link>
                                ) : (
                                    <button disabled className="btn btn-error w-full">Out of Stock</button>
                                )
                            ) : (
                                <button disabled className="btn btn-disabled w-full">
                                    Ordering Restricted (Role: {role})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;