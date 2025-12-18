import React from 'react';

const Faq = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-content">Frequently Asked Questions</h2>
                    <p className="text-base-content/70">
                        Find answers to common questions about our garment production and delivery process.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What is the Minimum Order Quantity (MOQ)?
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">Our Minimum Order Quantity varies by product category, but typically starts at 50 units for bulk production to ensure cost-effectiveness.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Do you offer international shipping?
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">Yes, we ship globally using our network of logistics partners. You can track your shipment in real-time through your dashboard.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Can I request a sample before placing a bulk order?
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">Absolutely. You can order a sample unit from the Product Details page to verify quality and sizing before committing to a larger volume.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            What payment methods do you accept?
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">We accept major credit cards via Stripe, as well as Cash on Delivery for specific regions. All transactions are secure and encrypted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;