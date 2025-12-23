import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/auth/SocialLogin';
import Helmet from '../../components/common/Helmet';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted }
    } = useForm({
        mode: 'onChange'
    });
    const { signIn, user } = useAuth();
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
                    title: 'Oops...',
                    text: error.message,
                });
            })
    };

    return (
        <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-base-200">
            <Helmet title="Login" />
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
                        {errors.email && (isSubmitted || errors.email.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Email is required</span>
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
                            {...register("password", { required: true })}
                        />
                        {errors.password && (isSubmitted || errors.password.type !== 'required') && (
                            <span className="text-red-500 text-xs mt-1">Password is required</span>
                        )}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4">
                        <button className="btn btn-primary text-lg w-full text-black">Login</button>
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