import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query'; 
import ProductCard from '../../components/products/ProductCard';
import Loading from '../../components/common/Loading';
import useAxios from '../../hooks/useAxios';
import { FaSearch } from 'react-icons/fa';
import Helmet from '../../components/common/Helmet';

const AllProducts = () => {
    const axiosPublic = useAxios();
    
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6); 

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['products', search, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        },
        placeholderData: keepPreviousData, 
    });

    const products = data?.products || [];
    const count = data?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(0); 
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) setCurrentPage(currentPage + 1);
    }

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <Helmet title="Our Collection" />
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
                <p className="max-w-2xl mx-auto text-base-content/70 mb-8">
                    Explore our premium range of garments designed for style and durability.
                </p>

                <div className="max-w-md mx-auto">
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder="Search products..." 
                            onChange={handleSearch} 
                            value={search}
                        />
                        <FaSearch className="opacity-70" />
                    </label>
                </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] transition-opacity duration-200 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-xl mt-10">No products found.</div>
                )}
            </div>

            {count > 0 && (
                <div className="flex flex-col items-center justify-center mt-12 gap-4">
                    <div className="flex gap-2">
                        <button onClick={handlePrevPage} className="btn btn-outline" disabled={currentPage === 0}>Prev</button>
                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`btn ${currentPage === page ? 'btn-primary text-black' : 'btn-outline'}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} className="btn btn-outline" disabled={currentPage === numberOfPages - 1}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;