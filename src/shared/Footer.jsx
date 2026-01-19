import React from 'react';
import { Link } from 'react-router';
import Logo from '../components/common/Logo';
import { FaPinterest, FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="w-full bg-base-200 text-base-content">
            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4 p-8 md:p-10">
                <aside className="flex flex-col items-start gap-4 flex-1">
                    <Logo />
                    <p className="text-lg md:text-base font-medium">
                        Streamlining garment production
                        <br />
                        from order to delivery.
                    </p>
                </aside>

                <nav className="flex-1">
                    <h6 className="font-bold text-lg mb-3">Explore</h6>
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="hover:text-primary hover:underline transition">
                            Home
                        </Link>
                        <Link to="/products" className="hover:text-primary hover:underline transition">
                            All Products
                        </Link>
                        <Link to="/dashboard" className="hover:text-primary hover:underline transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>

                <nav className="flex-1">
                    <h6 className="font-bold text-lg mb-3">Company</h6>
                    <div className="flex flex-col gap-2">
                        <Link to="/about" className="hover:text-primary hover:underline transition">
                            About Us
                        </Link>
                        <Link to="/contact" className="hover:text-primary hover:underline transition">
                            Contact
                        </Link>
                        <Link to="/careers" className="hover:text-primary hover:underline transition">
                            Careers
                        </Link>
                        <Link to="/privacy" className="hover:text-primary hover:underline transition">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-primary hover:underline transition">
                            Terms of Service
                        </Link>
                    </div>
                </nav>

                <nav className="flex-1">
                    <h6 className="font-bold text-lg mb-3">Social</h6>
                    <div className="flex gap-4">
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-primary transition">
                            <FaXTwitter size={24} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary transition">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition">
                            <FaSquareInstagram size={24} />
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-primary transition">
                            <FaPinterest size={24} />
                        </a>
                    </div>
                </nav>
            </div>
            <div className="text-center py-8 border-t border-base-300">
                <p>Copyright © {new Date().getFullYear()} Haystack. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;