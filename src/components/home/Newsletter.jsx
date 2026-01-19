import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email){
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: 'Thank you for subscribing to our newsletter.',
                background: 'var(--color-base-100)',
                color: 'var(--color-base-content)',
                confirmButtonColor: 'var(--color-primary)',
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset();
        }
    };

    return (
        <div className="pb-20 bg-base-200">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl">
                    <FaPaperPlane />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-base-content">Subscribe to Our Newsletter</h2>
                <p className="text-base-content/70 mb-8 max-w-lg mx-auto">
                    Get the latest updates on garment production trends and platform features delivered to your inbox.
                </p>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email address" 
                        className="input input-bordered w-full h-12 bg-base-200 text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
                        required
                    />
                    <button type="submit" className="btn btn-primary text-primary-content font-bold px-8 h-12">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;