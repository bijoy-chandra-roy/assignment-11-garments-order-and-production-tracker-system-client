import React from 'react';
import { motion } from 'framer-motion';

const Faq = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-base-content"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base-content/70"
                    >
                        Find answers to common questions about our garment production and delivery process.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "What is the Minimum Order Quantity (MOQ)?",
                            a: "Our Minimum Order Quantity varies by product category, but typically starts at 50 units for bulk production to ensure cost-effectiveness.",
                            defaultOpen: true
                        },
                        {
                            q: "Do you offer international shipping?",
                            a: "Yes, we ship globally using our network of logistics partners. You can track your shipment in real-time through your dashboard.",
                            defaultOpen: false
                        },
                        {
                            q: "Can I request a sample before placing a bulk order?",
                            a: "Absolutely. You can order a sample unit from the Product Details page to verify quality and sizing before committing to a larger volume.",
                            defaultOpen: false
                        },
                        {
                            q: "What payment methods do you accept?",
                            a: "We accept major credit cards via Stripe, as well as Cash on Delivery for specific regions. All transactions are secure and encrypted.",
                            defaultOpen: false
                        }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="collapse collapse-arrow bg-base-100 border border-base-300"
                        >
                            <input type="radio" name="my-accordion-2" defaultChecked={item.defaultOpen} />
                            <div className="collapse-title text-xl font-medium">
                                {item.q}
                            </div>
                            <div className="collapse-content">
                                <p className="text-base-content/80">{item.a}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;