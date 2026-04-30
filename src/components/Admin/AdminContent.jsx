import React, { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, appId } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const AdminContent = () => {
    const [aboutContent, setAboutContent] = useState('');
    const [servicesContent, setServicesContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { userId } = useAuth();

    // Fetch data for "About Us" and "Services"
    const fetchData = useCallback(() => {
        if (!userId) return;
        setLoading(true);
        const churchInfoRef = (docId) => doc(db, `artifacts/${appId}/public/data/churchInfo`, docId);

        const unsubAbout = onSnapshot(churchInfoRef('aboutUs'), doc => setAboutContent(doc.exists() ? doc.data().content : ''));
        
        // The last listener now sets loading to false
        const unsubServices = onSnapshot(churchInfoRef('services'), doc => {
            setServicesContent(doc.exists() ? doc.data().content : '');
            setLoading(false); 
        });
        
        return () => { // Cleanup function
            unsubAbout();
            unsubServices();
        };
    }, [userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdate = async (docId, data) => {
        setMessage(`Updating ${docId}...`);
        try {
            const docRef = doc(db, `artifacts/${appId}/public/data/churchInfo`, docId);
            await setDoc(docRef, data, { merge: true });
            setMessage(`${docId} content updated successfully!`);
        } catch (error) {
            setMessage(`Error updating content: ${error.message}`);
        }
    };
    
    if (loading) return <p>Loading content...</p>;

    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner space-y-8">
            {message && <p className="mb-4 text-center p-2 bg-yellow-100 text-yellow-800 rounded">{message}</p>}
            
            {/* Form for "About Us" */}
            <div className="p-4 border rounded-lg bg-white">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">About Us Content</h3>
                <textarea rows="8" value={aboutContent} onChange={e => setAboutContent(e.target.value)} className="input-field"></textarea>
                <button onClick={() => handleUpdate('aboutUs', { content: aboutContent })} className="btn-primary mt-2">Update About Us</button>
            </div>
            
            {/* Form for "Services" / "Programmes" */}
            <div className="p-4 border rounded-lg bg-white">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Programmes Page Content</h3>
                <p className="text-sm text-gray-600 mb-2">This is the introductory text that appears above the Programme cards.</p>
                <textarea rows="8" value={servicesContent} onChange={e => setServicesContent(e.target.value)} className="input-field"></textarea>
                <button onClick={() => handleUpdate('services', { content: servicesContent })} className="btn-primary mt-2">Update Programmes Content</button>
            </div>

            {/* The Contact Information management section has been removed. */}
        </div>
    );
};

export default AdminContent;
