import React from 'react';
import { FaClipboardList, FaIndustry, FaShippingFast, FaBoxOpen } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: FaClipboardList,
            title: "Place Order",
            description: "Select your desired garments and place an order with your specifications."
        },
        {
            id: 2,
            icon: FaIndustry,
            title: "Production",
            description: "Our factory managers approve and assign your order to the production line."
        },
        {
            id: 3,
            icon: FaBoxOpen,
            title: "Quality Check",
            description: "Finished goods undergo rigorous quality control before packaging."
        },
        {
            id: 4,
            icon: FaShippingFast,
            title: "Delivery",
            description: "Track your shipment in real-time until it reaches your doorstep."
        }
    ];

    return (
        <div className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-base-content">How It Works</h2>
                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Experience a seamless production journey from order placement to final delivery.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <step.icon className="text-3xl text-primary" />
                                </div>
                                <h3 className="card-title text-xl mb-2">{step.title}</h3>
                                <p className="text-base-content/70">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;