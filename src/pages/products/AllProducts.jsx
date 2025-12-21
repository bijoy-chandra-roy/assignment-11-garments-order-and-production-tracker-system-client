import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/products/ProductCard';
import Loading from '../../components/common/Loading';
import useAxios from '../../hooks/useAxios';

const AllProducts = () => {
    const axiosPublic = useAxios();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
                <p className="max-w-2xl mx-auto text-base-content/70">
                    Explore our premium range of garments designed for style and durability.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;