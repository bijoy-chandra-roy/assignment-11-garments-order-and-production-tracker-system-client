import React from 'react';
import Helmet from '../../components/common/Helmet';

const TermsOfService = () => {
    return (
        <div className="py-16 bg-base-100 text-base-content">
            <Helmet title="Terms of Service" />
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-base-content/70 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
                        <p className="text-base-content/80">
                            By accessing or using <strong>Haystack</strong> (Garments Order & Production Tracker System), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">2. User Accounts</h2>
                        <p className="text-base-content/80">
                            You are responsible for maintaining the confidentiality of your account credentials.
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-base-content/80 space-y-1">
                            <li><strong>Buyers:</strong> Must provide accurate order details and timely payments.</li>
                            <li><strong>Managers:</strong> Must update production statuses truthfully and promptly.</li>
                            <li><strong>Admins:</strong> Have the right to suspend users for violating platform policies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">3. Orders and Payments</h2>
                        <p className="text-base-content/80">
                            All orders placed through the platform are subject to acceptance by the factory. Payments are processed securely via Stripe. Refunds are subject to the specific agreement between the Buyer and the Factory Management.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">4. Intellectual Property</h2>
                        <p className="text-base-content/80">
                            The Haystack platform, including its code, design, and logos, is the property of the developers and protected by copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3">5. Limitation of Liability</h2>
                        <p className="text-base-content/80">
                            Haystack is provided "as is". We are not liable for any indirect damages arising from the use of our service, including production delays or shipping errors managed by third parties.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;