import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import Loading from '../../../components/common/Loading';
import { uploadImage } from '../../../utilities/imageUpload';
// Make sure this path is correct for your folder structure
import ProductForm from '../../../components/products/ProductForm';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        axiosPublic.get(`/products/${id}`)
            .then(res => {
                setProductData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                Swal.fire("Error", "Could not load product data", "error");
            });
    }, [id, axiosPublic]);

    const onSubmit = async (data) => {
        setUploading(true);
        let imageUrl = productData.image; 

        try {
            // FIX: Only upload if 'image' is an object/file list, NOT a string URL
            if (data.image && typeof data.image !== 'string' && data.image.length > 0) {
                imageUrl = await uploadImage(data.image[0]);
            }

            const updateItem = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                minimumOrder: parseInt(data.minimumOrder),
                image: imageUrl, // New URL or existing string
                video: data.video || '',
                paymentMethod: data.paymentMethod,
                showOnHome: data.showOnHome === true
            };

            const res = await axiosSecure.patch(`/products/${id}`, updateItem);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Product updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manage-products'); 
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
                    <ProductForm 
                        onSubmit={onSubmit} 
                        defaultValues={productData} 
                        isUpdate={true} 
                        loading={uploading} 
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;