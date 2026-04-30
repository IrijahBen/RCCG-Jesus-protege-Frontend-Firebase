import React, { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db, appId } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const AdminGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [newGalleryItem, setNewGalleryItem] = useState({ title: '', description: '', file: null, type: '' });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const { userId } = useAuth();

    // --- DIRECT CLOUDINARY CONFIGURATION ---
    const CLOUDINARY_CLOUD_NAME = "dganagy58";
    // UPDATED: Using your exact Unsigned Upload Preset name
    const CLOUDINARY_UPLOAD_PRESET = "rccgjesusprotege";
    // ---------------------------------------

    useEffect(() => {
        if (!userId) return;
        const galleryColRef = collection(db, `artifacts/${appId}/public/data/gallery`);
        const q = query(galleryColRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGalleryItems(items);
            setLoading(false);
        }, (err) => {
            setMessage('Error fetching gallery items.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewGalleryItem({
                ...newGalleryItem,
                file: file,
                type: file.type.startsWith('image/') ? 'image' : (file.type.startsWith('video/') ? 'video' : '')
            });
        }
    };

    // CLOUDINARY UPLOAD FUNCTION
    const uploadToCloudinary = async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const resourceType = type === 'video' ? 'video' : 'image';
        const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        // Improved Error Handling: Captures exact Cloudinary response
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Cloudinary Error Details:", errorData);
            throw new Error(errorData.error?.message || "Failed to upload to Cloudinary");
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!newGalleryItem.title || !newGalleryItem.file || !newGalleryItem.type) {
            setMessage('Please provide a title and select a valid image/video file.');
            return;
        }

        setUploading(true);
        setMessage('Uploading to Cloudinary... Please wait.');

        try {
            // 1. Upload to Cloudinary
            const fileUrl = await uploadToCloudinary(newGalleryItem.file, newGalleryItem.type);

            setMessage('Saving to Database...');

            // 2. Save the resulting URL to Firebase Database
            await addDoc(collection(db, `artifacts/${appId}/public/data/gallery`), {
                title: newGalleryItem.title,
                description: newGalleryItem.description,
                url: fileUrl,
                type: newGalleryItem.type,
                timestamp: new Date().toISOString(),
            });

            setMessage('Gallery item added successfully!');
            setNewGalleryItem({ title: '', description: '', file: null, type: '' });
            if (fileInputRef.current) fileInputRef.current.value = '';

        } catch (error) {
            // Displays the exact error to your screen
            setMessage(`Upload Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = async (item) => {
        if (window.confirm('Are you sure you want to delete this item from the gallery?')) {
            setMessage('Deleting...');
            try {
                await deleteDoc(doc(db, `artifacts/${appId}/public/data/gallery`, item.id));
                setMessage('Gallery item deleted successfully!');
            } catch (error) {
                setMessage('Error deleting item: ' + error.message);
            }
        }
    };

    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            {message && (
                <div className={`mb-4 text-center p-3 font-semibold rounded ${message.includes('Error') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-yellow-100 text-yellow-800'}`}>
                    {message}
                </div>
            )}

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Add New Gallery Item</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 p-6 border rounded-lg bg-white shadow-sm">
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Title</label>
                    <input type="text" value={newGalleryItem.title} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })} required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Description (Optional)</label>
                    <textarea value={newGalleryItem.description} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" rows="2"></textarea>
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Image/Video File</label>
                    <input type="file" onChange={handleFileChange} ref={fileInputRef} accept="image/*,video/*" required className="w-full border p-2 rounded bg-gray-50" />
                </div>
                <button type="submit" disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50">
                    {uploading ? 'Uploading...' : 'Add Gallery Item'}
                </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Existing Gallery Items</h3>
            {loading ? <p className="text-gray-500 font-medium">Loading gallery...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative border border-gray-100">
                            {item.type === 'image' && <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />}
                            {item.type === 'video' && <video src={item.url} controls className="w-full h-48 object-cover bg-black" />}
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 truncate mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-500 truncate mb-4">{item.description || 'No description'}</p>
                                <button onClick={() => handleDeleteClick(item)} className="w-full text-red-600 hover:bg-red-50 font-semibold py-2 rounded transition-colors border border-red-200">
                                    Remove from Website
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminGallery;