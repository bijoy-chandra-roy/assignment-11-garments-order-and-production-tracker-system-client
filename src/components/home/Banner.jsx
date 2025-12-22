import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}
        >
            <div className='relative h-[600px]'>
                <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop" className='h-full object-cover' />
                <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-white'>
                    <motion.h2 
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className='text-5xl font-bold mb-4'
                    >
                        Precision in Every Stitch
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='text-xl mb-6'
                    >
                        Streamline your garment production workflow from cutting to delivery.
                    </motion.p>
                    <motion.button 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className='btn btn-primary text-black'
                    >
                        View Products
                    </motion.button>
                </div>
            </div>
            <div className='relative h-[600px]'>
                <img src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=2015&auto=format&fit=crop" className='h-full object-cover' />
                <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-white'>
                    <motion.h2 
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className='text-5xl font-bold mb-4'
                    >
                        Efficient Order Tracking
                    </motion.h2>
                    <motion.p 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='text-xl mb-6'
                    >
                        Monitor your orders in real-time and ensure timely shipments.
                    </motion.p>
                    <motion.button 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className='btn btn-primary text-black'
                    >
                        Track Order
                    </motion.button>
                </div>
            </div>
            <div className='relative h-[600px]'>
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop" className='h-full object-cover' />
                <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-white'>
                    <motion.h2 
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className='text-5xl font-bold mb-4'
                    >
                        Quality You Can Trust
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='text-xl mb-6'
                    >
                        Managing production stages with highest standards of quality control.
                    </motion.p>
                    <motion.button 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className='btn btn-primary text-black'
                    >
                        Learn More
                    </motion.button>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;