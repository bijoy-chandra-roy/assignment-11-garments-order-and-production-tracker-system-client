import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/common/Loading';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const OrderPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        watch,
        setValue,
        formState: { errors } 
    } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(p => p._id === id);
                setProduct(foundProduct);
                setLoading(false);
                
                if (foundProduct) {
                    setValue('price', foundProduct.price);
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, setValue]);

    const orderQuantity = watch('quantity');
    const price = product?.price || 0;
    const totalPrice = orderQuantity ? orderQuantity * price : 0;

    const onSubmit = (data) => {
        const orderData = {
            ...data,
            totalPrice,
            orderDate: new Date(),
            status: 'Pending',
            productId: product._id,
            productImage: product.image,
            productName: product.name
        };

        axios.post('/orders', orderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Order placed successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Navigate to My Orders page (we will create this later)
                    navigate('/'); 
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };

    if (loading) return <Loading />;
    if (!product) return <div className="text-center py-20 text-error">Product not found</div>;

    return (
        <div className="max-w-4xl min-h-screen mx-auto px-4 py-12 font-urbanist">
            <h2 className="text-4xl font-bold text-center mb-8">Confirm Your Order</h2>
            
            <div className="card bg-base-200 shadow-2xl border border-base-300">
                <div className="card-body p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        
                        {/* Section 1: Product & Buyer Info */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-primary">Order Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Product Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        defaultValue={product.name} 
                                        readOnly 
                                        className="input input-bordered w-full bg-base-100 focus:outline-none" 
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Buyer Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.displayName} 
                                        readOnly 
                                        className="input input-bordered w-full bg-base-100 focus:outline-none" 
                                        {...register("userName")}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Unit Price</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        defaultValue={`$${product.price}`} 
                                        readOnly 
                                        className="input input-bordered w-full bg-base-100 focus:outline-none" 
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Buyer Email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        defaultValue={user?.email} 
                                        readOnly 
                                        className="input input-bordered w-full bg-base-100 focus:outline-none" 
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Section 2: Order Specifics */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-primary">Quantity & Total</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Quantity (Max: {product.quantity})</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        placeholder="Enter quantity" 
                                        className="input input-bordered input-primary w-full bg-base-100"
                                        {...register("quantity", { 
                                            required: "Quantity is required",
                                            min: { value: 1, message: "Minimum order is 1" },
                                            max: { value: product.quantity, message: `Max available is ${product.quantity}` }
                                        })} 
                                    />
                                    {errors.quantity && <span className="text-error text-sm mt-1">{errors.quantity.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Total Amount</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={`$${totalPrice}`} 
                                        readOnly 
                                        className="input input-bordered w-full bg-base-100 font-bold text-lg text-primary focus:outline-none" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Section 3: Shipping Info */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-primary">Shipping Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Delivery Address</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Street, City, Country" 
                                        className="input input-bordered w-full bg-base-100" 
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <span className="text-error text-sm mt-1">{errors.address.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Phone Number</span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        placeholder="Your contact number" 
                                        className="input input-bordered w-full bg-base-100" 
                                        {...register("phone", { required: "Phone number is required" })}
                                    />
                                    {errors.phone && <span className="text-error text-sm mt-1">{errors.phone.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button className="btn btn-primary btn-lg w-full text-black font-bold text-xl shadow-lg hover:shadow-xl transition-all">
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;