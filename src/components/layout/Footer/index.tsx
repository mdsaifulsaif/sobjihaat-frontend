"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaCcVisa,
    FaCcMastercard,
} from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { FiSend, FiArrowRight } from "react-icons/fi";
import { RiEBike2Line } from "react-icons/ri";
import { useSubscribeNewsletterMutation } from "@/redux/api/subscriberApi";
import toast from "react-hot-toast";
const Footer: React.FC = () => {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribeNewsletter, { isLoading: isSubscribing }] = useSubscribeNewsletterMutation();

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newsletterEmail.trim();
        if (!trimmed) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            await subscribeNewsletter({ email: trimmed }).unwrap();
            toast.success("Thank you! You have subscribed to SobjiHaat newsletter.");
            setNewsletterEmail("");
        } catch (error: any) {
            toast.error(error?.data?.message || "Subscription failed. Please try again.");
        }
    };

    const quickLinks = [
        { label: "About Us", href: "/about" },
        { label: "Track Order", href: "/track-order" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/#faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ];

    return (
        <footer className="bg-[#141613] text-gray-300 pt-16 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                {/* Upper Footer: Newsletter & Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-12 border-b border-gray-800/80">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full mb-3">
                            Fresh Updates & Weekly Deals
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                            Subscribe to SobjiHaat Newsletter
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Get weekly market arrivals, fresh produce price drops, and exclusive subscriber deals delivered to your inbox.
                        </p>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-grow">
                            <input
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                className="w-full bg-[#1e221d] border border-gray-700/80 rounded-xl py-3 px-4 outline-none focus:border-[var(--color-primary)] transition-all text-white placeholder-gray-500 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="bg-[var(--color-primary)] hover:bg-[#52861c] text-white px-7 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shrink-0 text-sm shadow-md"
                        >
                            {isSubscribing ? 'Subscribing...' : 'Subscribe'} <FiSend size={15} />
                        </button>
                    </form>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-14">
                    {/* Column 1: Brand & About (4 cols) */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-sm">
                                S
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Sobji<span className="text-[var(--color-primary)]">Haat</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Barisal&apos;s trusted online grocery and fresh produce doorstep delivery platform. Delivering 100% farm-fresh vegetables, organic fruits, fish, meat, and daily kitchen essentials directly to your home.
                        </p>
                        
                        <div className="flex items-center gap-2.5">
                            <Link href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-[#20241f] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300">
                                <FaFacebookF size={14} />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-[#20241f] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300">
                                <FaTwitter size={14} />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-[#20241f] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300">
                                <FaInstagram size={14} />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-[#20241f] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300">
                                <FaLinkedinIn size={14} />
                            </Link>
                            <a href="https://wa.me/8801522114096" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-[#20241f] border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300">
                                <BsWhatsapp size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (3 cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item, i) => (
                                <li key={i}>
                                    <Link 
                                        href={item.href} 
                                        className="text-sm text-gray-400 hover:text-[var(--color-primary)] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                                    >
                                        <span className="text-xs opacity-50 font-mono">›</span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Be a Rider (No border, No background) (3 cols) */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                                <RiEBike2Line size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                                Earn With Us
                            </span>
                        </div>

                        <h4 className="text-white font-bold text-base mb-2">
                            Become a Delivery Rider
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed mb-5">
                            Deliver fresh groceries in Barisal on your own flexible schedule. Enjoy competitive payouts, guaranteed weekly settlements, and rider incentives.
                        </p>

                        <Link 
                            href="/rider-apply"
                            className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[#52861c] text-white font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md group"
                        >
                            <span>Apply as a Rider</span>
                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Column 4: Contact & App Download (3 cols) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Contact Info</h3>
                        <ul className="space-y-3.5 mb-6">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <HiOutlineLocationMarker className="text-[var(--color-primary)] shrink-0 mt-0.5" size={18} />
                                <span>Barishal City, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <AiOutlinePhone className="text-[var(--color-primary)] shrink-0" size={18} />
                                <a href="tel:01783176838" className="hover:text-white transition-colors">
                                    +880 1783-176838
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <BsWhatsapp className="text-[#25D366] shrink-0" size={17} />
                                <a href="https://wa.me/8801522114096" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    +880 1522-114096 (WhatsApp)
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <AiOutlineMail className="text-[var(--color-primary)] shrink-0" size={18} />
                                <a href="mailto:support@sobjihaat.com" className="hover:text-white transition-colors truncate">
                                    support@sobjihaat.com
                                </a>
                            </li>
                        </ul>

                        <div>
                            <h4 className="text-white font-bold mb-3 uppercase text-[11px] tracking-wider text-gray-400">Download Mobile App</h4>
                            <div className="flex gap-2">
                                <div className="bg-[#1e221d] p-1.5 rounded-lg border border-gray-800 cursor-pointer hover:border-[var(--color-primary)] transition-all">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" className="h-7" />
                                </div>
                                <div className="bg-[#1e221d] p-1.5 rounded-lg border border-gray-800 cursor-pointer hover:border-[var(--color-primary)] transition-all">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Apple App Store" className="h-7" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Area */}
            <div className="bg-[#0e0f0d] py-6 border-t border-gray-900">
                <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>
                        Copyright © {new Date().getFullYear()} <span className="text-gray-300 font-semibold">SobjiHaat</span>. All Rights Reserved. Barisal, Bangladesh.
                    </p>
                    <div className="flex items-center gap-3 text-gray-500">
                        <span className="text-[11px]">100% Secure Payments</span>
                        <div className="flex items-center gap-2 grayscale opacity-40">
                            <FaCcVisa size={24} />
                            <FaCcMastercard size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
