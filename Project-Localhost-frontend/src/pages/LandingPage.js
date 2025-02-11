import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Globe, ArrowRight, MessageCircle } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900">
            {/* Header */}
            <header className="flex flex-col items-center justify-center text-center px-6 pt-20">
                <h1 className="text-5xl font-extrabold text-blue-600">
                    Welcome to BlueJack
                </h1>
                <p className="text-lg text-gray-700 mt-4 max-w-2xl">
                    The next-generation social hub for cybersecurity professionals and enthusiasts—unifying every corner of the digital security world
                    in one powerful platform.
                </p>
                <button
                    onClick={() => navigate("/signup")}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg font-semibold text-white rounded-lg transition"
                >
                    Let's Dive In
                </button>
            </header>

            {/* Features Section */}
            <section className="mt-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<ShieldCheck className="h-12 w-12 text-blue-500" />}
                    title="One Central Hub"
                    description="No more scattered security resources. Find everything in one place."
                />
                <FeatureCard
                    icon={<Users className="h-12 w-12 text-blue-500" />}
                    title="Expert Community"
                    description="Connect with security professionals, hackers, and researchers."
                />
                <FeatureCard
                    icon={<Globe className="h-12 w-12 text-blue-500" />}
                    title="Real-Time Updates"
                    description="Stay ahead with the latest security news, research, and tools."
                />
                <FeatureCard
                    icon={<MessageCircle className="h-12 w-12 text-blue-500" />}
                    title="Discussions & Writeups"
                    description="Learn and share through detailed cybersecurity writeups and discussions."
                />
            </section>

            {/* Call to Action */}
            <section className="mt-16 text-center px-6">
                <h2 className="text-3xl font-bold text-blue-600">
                    Ready to Join the Future of Cybersecurity?
                </h2>
                <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                    Become a part of a growing community dedicated to making security knowledge accessible to all.
                </p>
                <button
                    onClick={() => navigate("/signup")}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg font-semibold text-white rounded-lg transition"
                >
                    Sign Up Now
                </button>
            </section>

            {/* Footer */}
            <footer className="mt-16 py-6 bg-gray-200 text-center text-gray-600 text-sm">
                © 2025 BlueJack - All rights reserved.
            </footer>
        </div>
    );
}

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-200">
        <div className="flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold text-blue-600 mt-4">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
    </div>
);
