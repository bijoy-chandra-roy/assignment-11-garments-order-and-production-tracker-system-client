import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, defaultValues, isUpdate = false, loading = false }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: defaultValues || {
            category: 'default',
            paymentMethod: 'default',
            showOnHome: false
        }
    });

    const [imagePreview, setImagePreview] = useState(null);
    const watchedImage = watch('image');

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
            if (defaultValues.image) {
                setImagePreview(defaultValues.image);
            }
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        if (watchedImage && typeof watchedImage !== 'string' && watchedImage.length > 0) {
            const file = watchedImage[0];
            if(file instanceof File || file instanceof Blob){
                setImagePreview(URL.createObjectURL(file));
            }
        }
    }, [watchedImage]);

    return (
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
                        {...register("category", { required: true, validate: value => value !== 'default' || "Please select a category" })}
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
                        {...register("paymentMethod", { required: true, validate: value => value !== 'default' || "Please select a payment method" })}
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
                        <span className="label-text font-semibold">{isUpdate ? "Change Image (Optional)" : "Product Image*"}</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: !isUpdate })}
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
                {loading ? <span className="loading loading-spinner"></span> : (isUpdate ? "Update Product" : "Add Product")}
            </button>
        </form>
    );
};

export default ProductForm;