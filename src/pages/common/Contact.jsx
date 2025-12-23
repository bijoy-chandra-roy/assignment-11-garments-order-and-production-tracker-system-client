import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Helmet from '../../components/common/Helmet';

const Contact = () => {
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;

        console.log({ name, email, message });

        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We will get back to you soon.',
            showConfirmButton: false,
            timer: 1500
        });
        
        form.reset();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <Helmet title="Contact Us" />
            <h1 className="text-4xl font-bold text-center mb-12">Get in Touch</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl">
                            <FaPhone />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Phone</h3>
                            <p className="text-base-content/70">+880 123 456 789</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Email</h3>
                            <p className="text-base-content/70">support@haystack.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Headquarters</h3>
                            <p className="text-base-content/70">123 Garment Ave, Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 shadow-xl border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Send us a message</h2>
                        
                        <form onSubmit={handleSendMessage}>
                            <div className="form-control">
                                <label className="label" htmlFor="name">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input 
                                    id="name"
                                    name="name"
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    required
                                />
                            </div>

                            <div className="form-control mt-4">
                                <label className="label" htmlFor="email">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    required
                                />
                            </div>

                            <div className="form-control mt-4">
                                <label className="label" htmlFor="message">
                                    <span className="label-text font-semibold">Message</span>
                                </label>
                                <textarea 
                                    id="message"
                                    name="message"
                                    className="textarea textarea-bordered h-32 w-full focus:textarea-primary resize-none" 
                                    placeholder="How can we help?"
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary text-black font-bold hover:shadow-lg transition-all">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;