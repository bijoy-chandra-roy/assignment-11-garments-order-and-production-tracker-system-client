import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_imgbb_api_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Watch the image input to generate a preview
    const watchedImage = watch('image');

    useEffect(() => {
        if (watchedImage && watchedImage.length > 0) {
            const file = watchedImage[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [watchedImage]);

    const onSubmit = async (data) => {
        setLoading(true);
        // Image Upload to ImageBB
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const productItem = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                minimumOrder: parseInt(data.minimumOrder),
                image: res.data.data.display_url,
                video: data.video || '',
                paymentMethod: data.paymentMethod,
                showOnHome: data.showOnHome === true,
                managerEmail: user.email,
                managerName: user.displayName,
                rating: 0, 
                addedAt: new Date(),
                status: 'approved' // Managers auto-approve their own products usually, or set to pending if Admin needs to approve
            }

            const productRes = await axiosSecure.post('/products', productItem);
            
            if(productRes.data.insertedId){
                reset();
                setImagePreview(null);
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the collection.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        setLoading(false);
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Add A New Product</h2>
            <div className="card bg-base-200 shadow-xl border border-base-300">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Product Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    {...register("name", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && <span className="text-error mt-1">Name is required</span>}
                            </div>

                            {/* Category */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Category*</span>
                                </label>
                                <select
                                    defaultValue="default"
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option disabled value="default">Select a category</option>
                                    <option value="Jacket">Jacket</option>
                                    <option value="T-Shirt">T-Shirt</option>
                                    <option value="Pants">Pants</option>
                                    <option value="Coat">Coat</option>
                                    <option value="Hoodie">Hoodie</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                {errors.category && <span className="text-error mt-1">Category is required</span>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description*</span>
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Product Details"
                            ></textarea>
                            {errors.description && <span className="text-error mt-1">Description is required</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Price */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Price ($)*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    {...register("price", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.price && <span className="text-error mt-1">Price is required</span>}
                            </div>

                            {/* Quantity */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Available Quantity*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    {...register("quantity", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.quantity && <span className="text-error mt-1">Quantity is required</span>}
                            </div>

                            {/* MOQ */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Min. Order Qty (MOQ)*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="MOQ"
                                    {...register("minimumOrder", { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.minimumOrder && <span className="text-error mt-1">MOQ is required</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Payment Options */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Payment Option*</span>
                                </label>
                                <select
                                    defaultValue="default"
                                    {...register("paymentMethod", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option disabled value="default">Select payment method</option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="PayFirst">PayFirst (Stripe)</option>
                                </select>
                                {errors.paymentMethod && <span className="text-error mt-1">Payment method is required</span>}
                            </div>

                            {/* Video Link */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Demo Video Link (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="YouTube/Vimeo Link"
                                    {...register("video")}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Image Upload & Show on Home */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Product Image*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { required: true })}
                                    className="file-input file-input-bordered w-full"
                                />
                                {errors.image && <span className="text-error mt-1">Image is required</span>}
                                
                                {imagePreview && (
                                    <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-base-300">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4 mt-9">
                                    <input 
                                        type="checkbox" 
                                        {...register("showOnHome")}
                                        className="checkbox checkbox-primary" 
                                    />
                                    <span className="label-text font-semibold">Show on Home Page</span>
                                </label>
                            </div>
                        </div>

                        <button disabled={loading} className="btn btn-primary w-full mt-4 text-black font-bold text-lg">
                            {loading ? <span className="loading loading-spinner"></span> : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;