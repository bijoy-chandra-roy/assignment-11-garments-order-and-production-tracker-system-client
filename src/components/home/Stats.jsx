import React from 'react';
import { FaUsers, FaBoxOpen, FaGlobeAmericas, FaSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Stats = () => {
    const stats = [
        { id: 1, icon: FaUsers, count: "5000+", label: "Active Users" },
        { id: 2, icon: FaBoxOpen, count: "12K+", label: "Products Delivered" },
        { id: 3, icon: FaGlobeAmericas, count: "25+", label: "Countries Served" },
        { id: 4, icon: FaSmile, count: "98%", label: "Satisfaction Rate" }
    ];

    return (
        <div className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-content">Our Impact</h2>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Growing numbers that reflect our commitment to quality and reliability.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card bg-base-200 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="card-body items-center text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary text-3xl">
                                    <stat.icon />
                                </div>
                                <h3 className="text-4xl font-bold mb-1 text-base-content">{stat.count}</h3>
                                <p className="text-base-content/70 font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;