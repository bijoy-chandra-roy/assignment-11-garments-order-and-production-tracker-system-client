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
            if (file instanceof File || file instanceof Blob) {
                setImagePreview(URL.createObjectURL(file));
            }
        }
    }, [watchedImage]);

    const inputClass = "input input-bordered w-full h-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100";
    const selectClass = "select select-bordered w-full h-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100";
    const labelClass = "label-text font-bold text-base mb-1 block";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Product Name*</span></label>
                <input
                    type="text"
                    placeholder="Product Name"
                    {...register("name", { required: true })}
                    className={inputClass}
                />
                {errors.name && <span className="text-error text-sm mt-1">Name is required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Category*</span></label>
                <select
                    defaultValue="default"
                    {...register("category", { required: true, validate: value => value !== 'default' || "Select category" })}
                    className={selectClass}
                >
                    <option disabled value="default">Select Category</option>
                    <option value="Jacket">Jacket</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Pants">Pants</option>
                    <option value="Coat">Coat</option>
                    <option value="Hoodie">Hoodie</option>
                    <option value="Accessories">Accessories</option>
                </select>
                {errors.category && <span className="text-error text-sm mt-1">Required</span>}
            </div>

            <div className="form-control md:col-span-2">
                <label className="label pt-0"><span className={labelClass}>Description*</span></label>
                <textarea
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered h-32 w-full text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter detailed product description..."
                ></textarea>
                {errors.description && <span className="text-error text-sm mt-1">Description is required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Min. Order (MOQ)*</span></label>
                <input
                    type="number"
                    placeholder="0"
                    {...register("minimumOrder", { required: true })}
                    className={inputClass}
                    min="1"
                />
                {errors.minimumOrder && <span className="text-error text-sm mt-1">Required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Stock Quantity*</span></label>
                <input
                    type="number"
                    placeholder="0"
                    {...register("quantity", { required: true })}
                    className={inputClass}
                    min="0"
                />
                {errors.quantity && <span className="text-error text-sm mt-1">Required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Price ($)*</span></label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price", { required: true })}
                    className={inputClass}
                    min="0"
                />
                {errors.price && <span className="text-error text-sm mt-1">Required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Payment Option*</span></label>
                <select
                    defaultValue="default"
                    {...register("paymentMethod", { required: true, validate: value => value !== 'default' || "Select payment" })}
                    className={selectClass}
                >
                    <option disabled value="default">Select Method</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="PayFirst">PayFirst (Stripe)</option>
                </select>
                {errors.paymentMethod && <span className="text-error text-sm mt-1">Required</span>}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>{isUpdate ? "Change Image" : "Product Image*"}</span></label>
                <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: !isUpdate })}
                    className="file-input file-input-bordered file-input-primary w-full h-11 leading-9 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.image && <span className="text-error text-sm mt-1">Image is required</span>}

                {imagePreview && (
                    <div className="mt-4 w-full h-48 rounded-lg overflow-hidden border border-base-300 bg-base-100">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                )}
            </div>

            <div className="form-control">
                <label className="label pt-0"><span className={labelClass}>Demo Video Link (Optional)</span></label>
                <input
                    type="text"
                    placeholder="YouTube/Vimeo URL"
                    {...register("video")}
                    className={inputClass}
                />
            </div>

            <div className="form-control md:col-span-2">
                <label className="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        {...register("showOnHome")}
                        className="checkbox checkbox-primary focus:outline-none"
                    />
                    <span className="font-semibold text-base-content">Show this product on Home Page</span>
                </label>
            </div>

            <div className="md:col-span-2 pt-4">
                <button 
                    disabled={loading} 
                    className="btn btn-primary w-full text-black font-bold text-lg h-12 shadow-md hover:shadow-lg transition-all"
                >
                    {loading ? <span className="loading loading-spinner"></span> : (isUpdate ? "Update Product" : "Add Product")}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;