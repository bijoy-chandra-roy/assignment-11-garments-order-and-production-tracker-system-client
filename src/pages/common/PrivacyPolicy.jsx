import React from 'react';
import Helmet from '../../components/common/Helmet';

const PrivacyPolicy = () => {
    return (
        <div className="py-16 bg-base-100 text-base-content">
            <Helmet title="Privacy Policy" />
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-base-content/70 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
                        <p className="text-base-content/80">
                            We collect information you provide directly to us when you create an account on <strong>Haystack</strong>, place an order, or communicate with us. This includes:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-base-content/80 space-y-1">
                            <li>Account information (Name, Email, Role).</li>
                            <li>Order specifications (Garment details, quantities).</li>
                            <li>Payment information (Processed securely via Stripe).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
                        <p className="text-base-content/80">
                            We use the collected data to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-base-content/80 space-y-1">
                            <li>Process and track your garment production orders.</li>
                            <li>Provide real-time updates via our tracking dashboard.</li>
                            <li>Process secure payments and prevent fraud.</li>
                            <li>Improve our platform functionality and user experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">3. Data Security</h2>
                        <p className="text-base-content/80">
                            We implement industry-standard security measures, including Firebase Authentication and JWT (JSON Web Tokens), to protect your personal information. Payment details are handled directly by Stripe and are never stored on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">4. Cookies</h2>
                        <p className="text-base-content/80">
                            We use local storage and session cookies to maintain your login session and preferences. You can control cookie settings through your browser.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;