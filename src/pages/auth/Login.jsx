import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/auth/SocialLogin';
import Helmet from '../../components/common/Helmet';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitted }
    } = useForm({
        mode: 'onChange'
    });
    const { signIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                Swal.fire({
                    title: `Welcome back ${result.user.displayName}`,
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
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            })
    };

    const handleDemoLogin = () => {
        setValue("email", "demo@user.com");
        setValue("password", "Demo1234");
        handleSubmit(onSubmit)();
    };

    return (
        <div className="card w-full max-w-md bg-base-200 shadow-xl border border-base-300">
            <Helmet title="Login" />
            <div className="card-body p-8">
                <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
                <p className="text-center text-base-content/60 mb-6">Welcome back! Please login to your account.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-bold">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type your email"
                            className="input input-bordered w-full h-11 focus:input-primary"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (isSubmitted || errors.email.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1 block">Email is required</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input input-bordered w-full h-11 focus:input-primary"
                                {...register("password", { required: true })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors cursor-pointer z-10"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (isSubmitted || errors.password.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1 block">Password is required</span>
                        )}
                        
                        <div className="mt-3">
                            <a 
                                href="https://mail.google.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm font-medium link link-hover hover:text-primary transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div className="form-control mt-2">
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="btn btn-outline w-full"
                        >
                            Guest Login (Demo)
                        </button>
                    </div>

                    <div className="form-control pt-2">
                        <button className="btn btn-primary text-lg w-full text-black font-bold">Login</button>
                    </div>
                </form>

                <SocialLogin />

                <p className="text-center mt-4 text-sm text-base-content/70">
                    Don't have an account? <Link to="/register" state={location.state} className="text-primary font-bold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;