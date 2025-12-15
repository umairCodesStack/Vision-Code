import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { useAuth } from '../context/FakeAuth';
const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const {signup}=useAuth();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Signup Form */}
            <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Create Account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                        placeholder="Create Password"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg font-semibold transition"
                    >
                        Get Started Free
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already a member?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SignUp;