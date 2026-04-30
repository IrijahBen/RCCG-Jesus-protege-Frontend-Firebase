import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const { isLoggedIn, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading Admin...</div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    <Link to="/" className="text-blue-600 hover:underline">← Back to Site</Link>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-8">
                {isLoggedIn ? <AdminDashboard user={user} /> : <AdminLogin />}
            </main>
        </div>
    );
};

export default AdminPage;