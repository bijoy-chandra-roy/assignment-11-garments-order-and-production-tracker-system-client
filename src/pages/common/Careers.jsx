import React from 'react';
import { FaBriefcase, FaCode, FaChartLine, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Helmet from '../../components/common/Helmet';

const Careers = () => {
    const openings = [
        {
            id: 1,
            title: "Junior Full Stack Developer",
            department: "Engineering",
            type: "Full-time",
            location: "Remote / Dhaka",
            icon: FaCode,
            description: "We are looking for a developer proficient in React.js and Node.js to help build our production tracking features."
        },
        {
            id: 2,
            title: "Supply Chain Analyst",
            department: "Operations",
            type: "Full-time",
            location: "Chittagong",
            icon: FaChartLine,
            description: "Analyze factory production data to identify bottlenecks and improve garment delivery timelines."
        },
        {
            id: 3,
            title: "Customer Success Manager",
            department: "Sales",
            type: "Remote",
            location: "Anywhere",
            icon: FaBriefcase,
            description: "Manage relationships with international buyers and ensure they have a smooth experience using Haystack."
        }
    ];

    const handleApply = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Demo Project',
            text: "Sorry, we are not hiring! This is just a demo website. We don't want to give false hope to any passerby.",
            confirmButtonColor: '#ffd300',
            color: 'var(--color-base-content)',
            background: 'var(--color-base-100)'
        });
    };

    return (
        <div className="py-16 bg-base-100 min-h-screen">
            <Helmet title="Careers" />
            
            <div className="max-w-4xl mx-auto px-4 text-center mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-base-content"
                >
                    Join the <span className="text-primary">Haystack</span> Team
                </motion.h1>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    We are revolutionizing the garment manufacturing industry. Come build the future of supply chain transparency with us.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 mb-20">
                <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
                <div className="grid gap-6">
                    {openings.map((job, index) => (
                        <motion.div 
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card bg-base-200 border border-base-300 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="card-body flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary text-xl">
                                        <job.icon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                                        <div className="flex flex-wrap gap-2 text-sm text-base-content/60 mb-3">
                                            <span className="badge badge-outline">{job.department}</span>
                                            <span className="badge badge-outline">{job.type}</span>
                                            <span className="badge badge-outline">{job.location}</span>
                                        </div>
                                        <p className="text-base-content/80 max-w-xl">{job.description}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleApply}
                                    className="btn btn-primary px-8 whitespace-nowrap"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-base-200 rounded-3xl p-8 md:p-12 text-center">
                    <div className="w-16 h-16 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                        <FaEnvelope />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Don't see the right fit?</h2>
                    <p className="text-base-content/70 mb-8">
                        We are always looking for talented individuals. Send your CV and a brief introduction to our HR team.
                    </p>
                    <a 
                        href="mailto:careers@haystack.com" 
                        onClick={handleApply}
                        className="btn btn-outline border-base-content/20 hover:bg-base-content hover:text-base-100"
                    >
                        Email Your Resume
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Careers;