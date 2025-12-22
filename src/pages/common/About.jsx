import React from 'react';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-bold mb-8">About Haystack</h1>
            <p className="max-w-3xl mx-auto text-lg text-base-content/80 leading-relaxed mb-12">
                Haystack is a cutting-edge Garment Production Tracker System designed to bridge the gap between buyers and factories. 
                We believe in transparency, efficiency, and quality. Our platform enables real-time tracking of production stages, 
                ensuring that every stitch meets the highest standards and every delivery arrives on time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card bg-base-200 shadow-xl p-6">
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p>To revolutionize the garment manufacturing industry through digital innovation.</p>
                </div>
                <div className="card bg-base-200 shadow-xl p-6">
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p>A world where supply chains are transparent, ethical, and seamless.</p>
                </div>
                <div className="card bg-base-200 shadow-xl p-6">
                    <h3 className="text-xl font-bold mb-2">Our Values</h3>
                    <p>Integrity, Quality, and Customer Satisfaction are at the core of what we do.</p>
                </div>
            </div>
        </div>
    );
};

export default About;