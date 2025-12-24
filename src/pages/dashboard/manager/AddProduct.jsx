import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { uploadImage } from '../../../utilities/imageUpload';
import ProductForm from '../../../components/products/ProductForm';
import useUserInfo from '../../../hooks/useUserInfo';
import Helmet from '../../../components/common/Helmet';

const AddProduct = () => {
    const { user } = useAuth();
    const { userInfo } = useUserInfo();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(0);

    if (userInfo.status === 'suspended') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Helmet title="Access Restricted" />
                <h2 className="text-3xl font-bold text-error mb-2">Access Restricted</h2>
                <p className="text-gray-500">Your account is suspended. You cannot add new products.</p>
            </div>
        );
    }

    const onSubmit = async (data) => {
        if (userInfo.status === 'suspended') {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Your account is suspended. You cannot add new products.',
            });
            return;
        }
        
        setLoading(true);
        try {
             if (data.showOnHome) {

                const res = await axiosSecure.get('/products?showOnHome=true');

                if (res.data.count >= 6) {

                    setLoading(false);

                    Swal.fire({

                        icon: "warning",

                        title: "Limit Reached",

                        text: "You can only feature up to 6 products on the home page.",

                    });

                    return;

                }

            }
            
            const imageUrl = await uploadImage(data.image[0]);

            const productItem = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                minimumOrder: parseInt(data.minimumOrder),
                image: imageUrl,
                video: data.video || '',
                paymentMethod: data.paymentMethod,
                showOnHome: data.showOnHome === true,
                managerEmail: user.email,
                managerName: user.displayName,
                rating: 0,
                addedAt: new Date(),
                status: 'approved'
            }

            const productRes = await axiosSecure.post('/products', productItem);

            if (productRes.data.insertedId) {
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: `${data.name} is added to the collection.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormKey(prev => prev + 1);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again.",
            });
        }
    };

    return (
        <div className="w-full p-4 md:p-8">
            <Helmet title="Manager | Add Product" />
            <h2 className="text-3xl font-bold mb-8 text-center">Add A New Product</h2>
            <div className="card bg-base-200 shadow-xl border border-base-300 max-w-4xl mx-auto">
                <div className="card-body p-8">
                    <ProductForm 
                        key={formKey}
                        onSubmit={onSubmit} 
                        loading={loading} 
                    />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;