import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router'; // Fixed import from 'react-router'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxios from '../../../hooks/useAxios'; // Use public axios for fetching
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../../components/common/Loading';

const image_hosting_key = import.meta.env.VITE_imgbb_api_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    // 1. Fetch existing product data
    useEffect(() => {
        axiosPublic.get(`/products/${id}`)
            .then(res => {
                const data = res.data;
                // Populate form fields
                setValue('name', data.name);
                setValue('description', data.description);
                setValue('category', data.category);
                setValue('price', data.price);
                setValue('quantity', data.quantity);
                setValue('minimumOrder', data.minimumOrder);
                setValue('paymentMethod', data.paymentMethod);
                setValue('video', data.video);
                setValue('showOnHome', data.showOnHome);
                
                setImagePreview(data.image);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                Swal.fire("Error", "Could not load product data", "error");
            });
    }, [id, axiosPublic, setValue]);

    const watchedImage = watch('image');

    // Handle Image Preview for new uploads
    useEffect(() => {
        if (watchedImage && watchedImage.length > 0) {
            const file = watchedImage[0];
            setImagePreview(URL.createObjectURL(file));
        }
    }, [watchedImage]);

    const onSubmit = async (data) => {
        setUploading(true);
        let imageUrl = imagePreview; // Default to existing image

        try {
            // 2. Check if a new image was selected
            if (data.image && data.image.length > 0) {
                const imageFile = { image: data.image[0] };
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                }
            }

            // 3. Prepare Update Data
            const updateItem = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                minimumOrder: parseInt(data.minimumOrder),
                image: imageUrl,
                video: data.video || '',
                paymentMethod: data.paymentMethod,
                showOnHome: data.showOnHome === true
            };

            // 4. Send Patch Request
            const res = await axiosSecure.patch(`/products/${id}`, updateItem);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manage-products'); // Or navigate back
            } else {
                Swal.fire("Info", "No changes were made", "info");
            }

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update product", "error");
        }
        setUploading(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="w-full p-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Update Product</h2>
            <div className="card bg-base-200 shadow-xl border border-base-300">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                                <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" />
                            </div>

                            {/* Category */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Category</span></label>
                                <select {...register("category", { required: true })} className="select select-bordered w-full">
                                    <option value="Jacket">Jacket</option>
                                    <option value="T-Shirt">T-Shirt</option>
                                    <option value="Pants">Pants</option>
                                    <option value="Coat">Coat</option>
                                    <option value="Hoodie">Hoodie</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Description</span></label>
                            <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Price */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Price ($)</span></label>
                                <input type="number" step="0.01" {...register("price", { required: true })} className="input input-bordered w-full" />
                            </div>

                            {/* Quantity */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Quantity</span></label>
                                <input type="number" {...register("quantity", { required: true })} className="input input-bordered w-full" />
                            </div>

                            {/* MOQ */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">MOQ</span></label>
                                <input type="number" {...register("minimumOrder", { required: true })} className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Payment Option</span></label>
                                <select {...register("paymentMethod", { required: true })} className="select select-bordered w-full">
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="PayFirst">PayFirst (Stripe)</option>
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Demo Video Link</span></label>
                                <input type="text" {...register("video")} className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-semibold">Change Image (Optional)</span></label>
                                <input type="file" accept="image/*" {...register("image")} className="file-input file-input-bordered w-full" />
                                {imagePreview && (
                                    <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-base-300">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4 mt-9">
                                    <input type="checkbox" {...register("showOnHome")} className="checkbox checkbox-primary" />
                                    <span className="label-text font-semibold">Show on Home Page</span>
                                </label>
                            </div>
                        </div>

                        <button disabled={uploading} className="btn btn-primary w-full mt-4 text-black font-bold text-lg">
                            {uploading ? <span className="loading loading-spinner"></span> : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;