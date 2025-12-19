import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Loading from '../../components/common/Loading';
import useAuth from '../../hooks/useAuth';
import { FaStar, FaBoxOpen, FaTag, FaDollarSign } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(p => p._id === id);
                setProduct(foundProduct);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return <div className="text-center py-20 text-2xl font-bold text-error">Product not found</div>;

    const { _id, name, image, category, price, quantity, description, rating } = product;

    return (
        <div className="max-w-7xl min-h-screen mx-auto px-4 py-12 bg-base-100">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Image Section */}
                <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-base-200">
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 space-y-6">
                    <div>
                        <div className="badge badge-primary badge-outline mb-4">{category}</div>
                        <h1 className="text-4xl font-bold mb-2 text-base-content">{name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-sm text-base-content/60">({rating} Rating)</span>
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
                            <span>Minimum Order Quantity: <strong>50 Units</strong></span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-8">
                            {/* Role check logic will be added here later. For now, showing to all logged-in users */}
                            {user ? (
                                <Link to={`/order/${_id}`} className="btn btn-primary btn-lg w-full text-black font-bold shadow-lg hover:shadow-xl transition-all">
                                    Order Now
                                </Link>
                            ) : (
                                <div className="text-center">
                                    <p className="mb-2 text-error">Please login to place an order</p>
                                    <Link to="/login" className="btn btn-secondary w-full">Login to Order</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;