import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { uploadImage } from '../../utilities/imageUpload';
import SocialLogin from '../../components/auth/SocialLogin';
import Helmet from '../../components/common/Helmet';

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted }
    } = useForm({
        mode: 'onChange'
    });

    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxios();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            const imageUrl = await uploadImage(data.image[0]);

            createUser(data.email, data.password)
                .then(result => {
                    updateUserProfile(data.name, imageUrl)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                role: data.role,
                                image: imageUrl,
                                status: 'pending'
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate(from, { replace: true });
                                    }
                                })
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.message,
                            });
                        })
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                    });
                })
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Could not upload image.',
            });
        }
    };

    return (
        <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-base-200">
            <Helmet title="Register" />
            <div className="card-body">
                <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
                <p className="text-center text-base-content/60 mb-6">Create your account to get started</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type your name"
                            className="input input-bordered w-full"
                            {...register("name", { required: true })}
                        />
                        {errors.name && (isSubmitted || errors.name.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Name is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type your email"
                            className="input input-bordered w-full"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (isSubmitted || errors.email.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Email is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Profile Picture</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            accept='image/*'
                            {...register("image", { required: true })}
                        />
                        {errors.image && (isSubmitted || errors.image.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Image is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Role</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            defaultValue="buyer"
                            {...register("role", { required: true })}
                        >
                            <option value="buyer">Buyer</option>
                            <option value="manager">Manager</option>
                        </select>
                        {errors.role && (isSubmitted || errors.role.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Role is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                pattern: {
                                    value: /(?=.*[a-z])(?=.*[A-Z])/,
                                    message: "Must have uppercase and lowercase"
                                }
                            })}
                        />
                        {errors.password && (
                            (errors.password.type === 'required' && !isSubmitted) ? null :
                                <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-lg w-full text-black">Register</button>
                    </div>
                </form>

                <SocialLogin />

                <p className="text-center mt-4 text-sm text-base-content/70">
                    Already have an account? <Link to="/login" state={location.state} className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;