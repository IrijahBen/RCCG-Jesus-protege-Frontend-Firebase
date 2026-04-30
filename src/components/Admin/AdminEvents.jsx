import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db, appId } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) return;
        const eventsColRef = collection(db, `artifacts/${appId}/public/data/events`);
        const q = query(eventsColRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching events:", err);
            setMessage('Error fetching events. You may need to create a Firestore index.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.date || !newEvent.description) {
            setMessage('Please fill all event fields.');
            return;
        }
        setMessage('Processing...');
        try {
            if (editingEvent) {
                const eventDocRef = doc(db, `artifacts/${appId}/public/data/events`, editingEvent.id);
                await updateDoc(eventDocRef, newEvent);
                setMessage('Event updated successfully!');
                setEditingEvent(null);
            } else {
                await addDoc(collection(db, `artifacts/${appId}/public/data/events`), newEvent);
                setMessage('Event added successfully!');
            }
            setNewEvent({ title: '', date: '', description: '' });
        } catch (error) {
            setMessage('Error processing event: ' + error.message);
        }
    };

    const handleEditClick = (event) => {
        setEditingEvent(event);
        setNewEvent({ title: event.title, date: event.date, description: event.description });
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteDoc(doc(db, `artifacts/${appId}/public/data/events`, id));
                setMessage('Event deleted successfully!');
            } catch (error) {
                setMessage('Error deleting event: ' + error.message);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
        setNewEvent({ title: '', date: '', description: '' });
    };

    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            {message && <p className="mb-4 text-center p-2 bg-yellow-100 text-yellow-800 rounded">{message}</p>}
            
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 p-4 border rounded-lg bg-white">
                <div>
                    <label className="block font-bold">Title</label>
                    <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required className="input-field" />
                </div>
                <div>
                    <label className="block font-bold">Date</label>
                    <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required className="input-field" />
                </div>
                <div>
                    <label className="block font-bold">Description</label>
                    <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required className="input-field" rows="3"></textarea>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="btn-primary">{editingEvent ? 'Update Event' : 'Add Event'}</button>
                    {editingEvent && <button type="button" onClick={handleCancelEdit} className="btn-secondary">Cancel Edit</button>}
                </div>
            </form>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Existing Events</h3>
            {loading ? <p>Loading events...</p> : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="th-cell">Title</th>
                                <th className="th-cell">Date</th>
                                <th className="th-cell">Description</th>
                                <th className="th-cell text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.id} className="border-b">
                                    <td className="td-cell">{event.title}</td>
                                    <td className="td-cell">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="td-cell max-w-xs truncate">{event.description}</td>
                                    <td className="td-cell text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button onClick={() => handleEditClick(event)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleDeleteClick(event.id)} className="btn-delete">Delete</button>
                                        </div>
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

export default AdminEvents;