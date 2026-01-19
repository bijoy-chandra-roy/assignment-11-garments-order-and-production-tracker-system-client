import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const CallToAction = () => {
    const { user } = useAuth();

    return (
        <div className="py-24 bg-primary">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    Ready to Streamline Production?
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg dark:font-bold mb-10 max-w-2xl mx-auto"
                >
                    Join thousands of fashion brands and factories using Haystack to manage their supply chain efficiently.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link 
                        to={user ? "/dashboard" : "/register"}
                        className="btn btn-lg font-bold px-10 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        {user ? "Go to Dashboard" : "Get Started Now"}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CallToAction;