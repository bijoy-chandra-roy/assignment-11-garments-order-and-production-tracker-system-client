import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ProductCard from '../../components/products/ProductCard';
import Loading from '../../components/common/Loading';
import useAxios from '../../hooks/useAxios';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import Helmet from '../../components/common/Helmet';

const AllProducts = () => {
    const axiosPublic = useAxios();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const categories = ["Jacket", "T-Shirt", "Pants", "Coat", "Hoodie", "Accessories"];

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['products', search, currentPage, itemsPerPage, sort, category],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?search=${search}&page=${currentPage}&size=${itemsPerPage}&sort=${sort}&category=${category}`);
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

    const handleReset = () => {
        setCategory('');
        setSort('');
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

                <div className="bg-base-200 p-4 rounded-xl shadow-sm border border-base-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none z-10" />
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary"
                                placeholder="Search products..."
                                onChange={handleSearch}
                                value={search}
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">

                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`btn btn-circle btn-ghost border border-base-300 dark:border-base-content/30 ${category ? 'text-primary bg-primary/10 border-primary' : ''}`}
                                    title="Filter Category"
                                >
                                    <FaFilter />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200">
                                    <li className="menu-title px-4 py-2 opacity-50">Category</li>
                                    <li>
                                        <a onClick={() => { setCategory(''); setCurrentPage(0); }} className={!category ? 'active font-bold' : ''}>
                                            All Categories
                                        </a>
                                    </li>
                                    {categories.map((cat, idx) => (
                                        <li key={idx}>
                                            <a
                                                onClick={() => { setCategory(cat); setCurrentPage(0); }}
                                                className={category === cat ? 'active font-bold' : ''}
                                            >
                                                {cat}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`btn btn-circle btn-ghost border border-base-300 dark:border-base-content/30 ${sort ? 'text-primary bg-primary/10 border-primary' : ''}`}
                                    title="Sort Order"
                                >
                                    <FaSortAmountDown className={sort ? 'text-primary' : ''} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
                                    <li className="menu-title px-4 py-2 opacity-50">Sort By Price</li>
                                    <li>
                                        <a onClick={() => { setSort('asc'); setCurrentPage(0); }} className={sort === 'asc' ? 'active' : ''}>
                                            Low to High
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => { setSort('desc'); setCurrentPage(0); }} className={sort === 'desc' ? 'active' : ''}>
                                            High to Low
                                        </a>
                                    </li>
                                    {(sort || category) && (
                                        <li className="mt-2 border-t border-base-200">
                                            <a onClick={handleReset} className="text-error">
                                                Clear Filters
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
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