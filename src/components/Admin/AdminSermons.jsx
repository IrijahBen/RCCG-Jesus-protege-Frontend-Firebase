import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

// Helper function to automatically extract the 11-character YouTube ID from any full link
const extractYouTubeId = (urlOrId) => {
    if (!urlOrId) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    // If it finds a match, return the 11 digit ID. Otherwise, just return what the user typed.
    return (match && match[2].length === 11) ? match[2] : urlOrId.trim();
};

const AdminSermons = () => {
    const [sermons, setSermons] = useState([]);
    const [newSermon, setNewSermon] = useState({ title: '', speaker: '', date: '', youtubeVideoId: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const sermonsColRef = collection(db, 'sermons');
        const q = query(sermonsColRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sermonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSermons(sermonsData);
            setLoading(false);
        }, (err) => {
            setMessage('Error fetching sermons: ' + err.message);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { title, speaker, date, youtubeVideoId } = newSermon;

        if (!title || !speaker || !date || !youtubeVideoId) {
            setMessage('Please fill all sermon fields.');
            return;
        }

        setMessage('Processing...');

        // Clean the YouTube input before saving to database
        const cleanVideoId = extractYouTubeId(youtubeVideoId);

        try {
            await addDoc(collection(db, 'sermons'), {
                title,
                speaker,
                youtubeVideoId: cleanVideoId, // Save the cleaned ID
                date: Timestamp.fromDate(new Date(date)),
            });
            setMessage('Sermon added successfully!');
            setNewSermon({ title: '', speaker: '', date: '', youtubeVideoId: '' });
        } catch (error) {
            setMessage('Error adding sermon: ' + error.message);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this sermon?')) {
            try {
                await deleteDoc(doc(db, 'sermons', id));
                setMessage('Sermon deleted successfully!');
            } catch (error) {
                setMessage('Error deleting sermon: ' + error.message);
            }
        }
    };

    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            {message && (
                <div className={`mb-4 text-center p-3 font-semibold rounded ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {message}
                </div>
            )}

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Add New Sermon</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 p-6 border rounded-lg bg-white shadow-sm">
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Sermon Title</label>
                    <input type="text" value={newSermon.title} onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })} required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Speaker</label>
                    <input type="text" value={newSermon.speaker} onChange={(e) => setNewSermon({ ...newSermon, speaker: e.target.value })} required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Date</label>
                    <input type="date" value={newSermon.date} onChange={(e) => setNewSermon({ ...newSermon, date: e.target.value })} required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">YouTube Link or Video ID</label>
                    <input
                        type="text"
                        value={newSermon.youtubeVideoId}
                        onChange={(e) => setNewSermon({ ...newSermon, youtubeVideoId: e.target.value })}
                        required
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can paste the full YouTube link here. We will extract the ID automatically.</p>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
                    Add Sermon
                </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Existing Sermons</h3>
            {loading ? <p className="text-gray-500 font-medium">Loading...</p> : (
                <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video ID</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sermons.map(sermon => (
                                <tr key={sermon.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sermon.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sermon.speaker}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {sermon.date?.seconds ? new Date(sermon.date.seconds * 1000).toLocaleDateString() : 'No date'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono bg-gray-50 rounded">
                                        {sermon.youtubeVideoId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button onClick={() => handleDeleteClick(sermon.id)} className="text-red-600 hover:text-red-900 font-bold bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminSermons;