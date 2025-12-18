import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitted }
    } = useForm({
        mode: 'onChange'
    });
    
    const { createUser, updateUserProfile, googleSignIn } = useAuth(); 
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated');
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            })
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            })
    }

    return (
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body">
                <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
                <p className="text-center text-base-content/60 mb-6">Create your account to get started</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Name Input */}
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
                        {/* Only show 'Required' error if submitted */}
                        {errors.name && (isSubmitted || errors.name.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Name is required</span>
                        )}
                    </div>

                    {/* Email Input */}
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

                    {/* Photo URL Input */}
                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Paste photo URL" 
                            className="input input-bordered w-full" 
                            {...register("photoURL", { required: true })} 
                        />
                        {errors.photoURL && (isSubmitted || errors.photoURL.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Photo URL is required</span>
                        )}
                    </div>

                    {/* Role Selection */}
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

                    {/* Password Input */}
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

                    {/* Submit Button */}
                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-white text-lg w-full">Register</button>
                    </div>
                </form>

                <div className="divider text-sm text-base-content/60 my-4">OR</div>

                {/* Google Button */}
                <button 
                    onClick={handleGoogleSignIn}
                    className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-gray-100 hover:border-gray-300"
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Login with Google
                </button>

                <p className="text-center mt-4 text-sm text-base-content/70">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;