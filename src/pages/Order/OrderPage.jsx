import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/common/Loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxios from '../../hooks/useAxios';
import useUserInfo from '../../hooks/useUserInfo';
import Helmet from '../../components/common/Helmet';

const OrderPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { userInfo } = useUserInfo();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

    const { data: product, isLoading } = useQuery({
        queryKey: ['order-product', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (product) {
            setValue('price', product.price);
        }
    }, [product, setValue]);

    const orderQuantity = watch('quantity');
    const price = product?.price || 0;
    const totalPrice = orderQuantity ? (orderQuantity * price).toFixed(2) : 0;

    const onSubmit = (data) => {
        if (userInfo.status === 'suspended') {
            Swal.fire({
                icon: 'error',
                title: 'Account Suspended',
                text: 'You cannot place new orders. Please check your profile for details.',
            });
            return;
        }

        setSubmitting(true);

        const orderData = {
            ...data,
            totalPrice: parseFloat(totalPrice),
            quantity: parseInt(data.quantity),
            orderDate: new Date(),
            status: 'Pending',
            productId: product._id,
            productImage: product.image,
            productName: product.name,
            email: user?.email,
            userName: `${data.firstName} ${data.lastName}`,
            paymentMethod: product.paymentMethod
        };

        axiosSecure.post('/orders', orderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order placed successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    if (product.paymentMethod === 'PayFirst') {
                        navigate(`/dashboard/payment/${res.data.insertedId}`);
                    } else {
                        navigate('/dashboard/my-orders');
                    }
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (isLoading) return <Loading />;
    if (!product) return <div className="text-center py-20 text-error">Product not found</div>;

    const nameParts = user?.displayName ? user.displayName.split(' ') : [];
    const defaultFirstName = nameParts[0] || '';
    const defaultLastName = nameParts.slice(1).join(' ') || '';

    const minQty = product.minimumOrder || 1;
    const maxQty = product.quantity;

    const inputClass = "input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100";
    const readOnlyClass = "input input-bordered w-full bg-base-200 focus:outline-none cursor-not-allowed";

    return (
        <div className="max-w-4xl min-h-screen mx-auto px-4 py-12 font-urbanist">
            <Helmet title="Place Order" />
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
                                        className={readOnlyClass}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={defaultFirstName}
                                        className={inputClass}
                                        {...register("firstName", { required: "First name is required" })}
                                    />
                                    {errors.firstName && <span className="text-error text-sm mt-1">{errors.firstName.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={defaultLastName}
                                        className={inputClass}
                                        {...register("lastName", { required: "Last name is required" })}
                                    />
                                    {errors.lastName && <span className="text-error text-sm mt-1">{errors.lastName.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Unit Price</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={`$${product.price}`}
                                        readOnly
                                        className={readOnlyClass}
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
                                        className={readOnlyClass}
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
                                        <span className="label-text font-medium">Quantity (Min: {minQty}, Max: {maxQty})</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        min={minQty}
                                        max={maxQty}
                                        className={inputClass}
                                        {...register("quantity", {
                                            required: "Quantity is required",
                                            min: {
                                                value: minQty,
                                                message: `Minimum order is ${minQty}`
                                            },
                                            max: {
                                                value: maxQty,
                                                message: `Max available is ${maxQty}`
                                            },
                                            valueAsNumber: true,
                                            onChange: (e) => {
                                                const val = parseInt(e.target.value);
                                                if (val > maxQty) {
                                                    setValue('quantity', maxQty);
                                                }
                                                if (val < 0) {
                                                    setValue('quantity', minQty);
                                                }
                                            }
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
                                        className="input input-bordered w-full bg-base-100 font-bold text-lg text-primary focus:outline-none cursor-not-allowed"
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
                                        className={inputClass}
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
                                        className={inputClass}
                                        {...register("phone", { required: "Phone number is required" })}
                                    />
                                    {errors.phone && <span className="text-error text-sm mt-1">{errors.phone.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button 
                                disabled={submitting}
                                className="btn btn-primary btn-lg w-full text-black font-bold text-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                {submitting ? <span className="loading loading-spinner"></span> : "Place Order"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;