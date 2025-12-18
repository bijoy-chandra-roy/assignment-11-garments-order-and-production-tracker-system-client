import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
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
                navigate(from, { replace: true });
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
                <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
                <p className="text-center text-base-content/60 mb-6">Welcome back! Please login to your account.</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
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
                        {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
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
                            {...register("password", { required: true })} 
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">Password is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-white text-lg w-full">Login</button>
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
                    Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;