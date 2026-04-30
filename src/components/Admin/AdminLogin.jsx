import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Note: Adjust this path if your AuthContext is in a different folder

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Bring in the login function from AuthContext and the router navigator
    const { loginAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Use the Context function to log in
            await loginAdmin(email, password);
            // Upon success, redirect straight to the admin dashboard
            navigate('/admin');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">

                {/* Header */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <i className="fas fa-lock text-2xl"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Admin Portal</h2>
                    <p className="text-sm text-gray-500">Sign in to manage Victory Church Masajja</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="admin@vcm.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg shadow-orange-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                {/* Back to Home Link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm font-medium text-gray-500 hover:text-slate-900 transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Return to Main Website
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdminLogin;