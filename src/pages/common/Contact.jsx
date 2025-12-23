import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Helmet from './../../components/common/Helmet';

const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <Helmet title="Contact Us" />
            <h1 className="text-4xl font-bold text-center mb-12">Get in Touch</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
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

                {/* Contact Form */}
                <div className="card bg-base-200 shadow-xl border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Send us a message</h2>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" placeholder="Your Name" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" placeholder="your@email.com" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Message</span></label>
                            <textarea className="textarea textarea-bordered h-32" placeholder="How can we help?"></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-black font-bold">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;