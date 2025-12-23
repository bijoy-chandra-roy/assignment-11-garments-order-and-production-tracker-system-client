import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../products/ProductCard';
import Loading from '../common/Loading';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

const OurProducts = () => {
    const axiosPublic = useAxios();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['our-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products?size=100');
            return res.data.products;
        }
    });

    if (isLoading) return <Loading />;

    const displayProducts = products
        .filter(product => product.showOnHome === true)
        .slice(0, 6);

    return (
        <div className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-base-content"
                    >
                        Featured Products
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base-content/70"
                    >
                        Check out our latest arrivals and top-selling garments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No featured products available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OurProducts;