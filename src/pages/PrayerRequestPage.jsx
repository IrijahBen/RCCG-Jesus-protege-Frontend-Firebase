import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const PrayerRequestPage = () => {
    const [name, setName] = useState('');
    const [requestText, setRequestText] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!requestText) {
            setMessage("Please enter your prayer request.");
            return;
        }
        setSubmitting(true);
        setMessage('');

        try {
            await addDoc(collection(db, 'prayerRequests'), {
                name: name || "Anonymous",
                requestText: requestText,
                isPrivate: isPrivate,
                timestamp: serverTimestamp()
            });
            setMessage("Thank you. Your prayer request has been received. Our team will be praying for you.");
            setName('');
            setRequestText('');
        } catch (error) {
            setMessage("Sorry, there was an error submitting your request. Please try again.");
            console.error("Error adding document: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white py-16">
            <section className="container mx-auto px-6 max-w-2xl">
                <div className="text-center">
                    <i className="fas fa-praying-hands text-6xl text-blue-500 mb-4"></i>
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Prayer Requests</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We believe in the power of prayer. If you have a need, we would be honored to stand with you in faith. Please know that every request is treated with care and confidentiality.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name (Optional)</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Your name"/>
                    </div>
                    <div>
                        <label htmlFor="requestText" className="block text-gray-700 font-bold mb-2">Your Prayer Request</label>
                        <textarea id="requestText" value={requestText} onChange={(e) => setRequestText(e.target.value)} rows="6" required className="input-field" placeholder="Share what's on your heart..."></textarea>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="isPrivate" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                        <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-900">Please keep this request confidential to the pastoral team.</label>
                    </div>
                    <button type="submit" disabled={submitting} className="btn-primary w-full">
                        {submitting ? "Submitting..." : "Submit Prayer Request"}
                    </button>
                    {message && <p className={`mt-4 text-center p-3 rounded-lg ${message.startsWith('Sorry') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>}
                </form>
            </section>
        </div>
    );
};

export default PrayerRequestPage;