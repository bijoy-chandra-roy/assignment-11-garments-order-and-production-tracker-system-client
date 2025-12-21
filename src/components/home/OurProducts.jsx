import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../products/ProductCard';
import Loading from '../common/Loading';
import useAxios from '../../hooks/useAxios';

const OurProducts = () => {
    const axiosPublic = useAxios();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['our-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // Display only the first 6 products as per requirement
    const displayProducts = products.slice(0, 6);

    return (
        <div className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-content">Featured Products</h2>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Check out our latest arrivals and top-selling garments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurProducts;