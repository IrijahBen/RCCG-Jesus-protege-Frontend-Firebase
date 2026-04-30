import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import AdminEvents from './AdminEvents';
import AdminGallery from './AdminGallery';
import AdminContent from './AdminContent';
import AdminSermons from './AdminSermons';

const AdminTab = ({ title, active, onClick }) => (
  <button
    className={`py-2 px-4 text-lg font-medium rounded-t-lg transition-colors ${active ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'}`}
    onClick={onClick}
  >
    {title}
  </button>
);

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('sermons');

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">Welcome, {user.email}!</p>
        </div>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold">Logout</button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <AdminTab title="Manage Sermons" active={activeTab === 'sermons'} onClick={() => setActiveTab('sermons')} />
        <AdminTab title="Manage Events" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
        <AdminTab title="Manage Gallery" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
        <AdminTab title="Edit Content" active={activeTab === 'content'} onClick={() => setActiveTab('content')} />
      </div>

      <div>
        {activeTab === 'sermons' && <AdminSermons />}
        {activeTab === 'events' && <AdminEvents />}
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'content' && <AdminContent />}
      </div>
    </div>
  );
};

export default AdminDashboard;