import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    const { _id, name, image, category, price, quantity } = product;

    return (
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group">
            <figure className="h-64 overflow-hidden relative">
                <img
                    src={image || product.images[0]}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {quantity === 0 && (
                    <div className="absolute top-4 left-4 badge badge-error text-white font-semibold">
                        Out of Stock
                    </div>
                )}
                <div className="absolute top-4 right-4 badge badge-secondary">
                    {category}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {name}
                    <div className="badge badge-outline text-primary font-bold">${price}</div>
                </h2>
                <p className='text-sm text-base-content/70'>Available Quantity: {quantity}</p>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/products/${_id}`} className="btn btn-primary text-black w-full">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;