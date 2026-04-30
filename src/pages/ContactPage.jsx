import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.topic || !formData.name || !formData.email || !formData.message) {
            setStatusMessage('Please fill out all required fields.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage('');

        try {
            await addDoc(collection(db, 'contactSubmissions'), {
                ...formData,
                timestamp: serverTimestamp()
            });
            setStatusMessage('Thank you! Your message has been sent successfully. We will get back to you shortly.');
            setFormData({ topic: '', name: '', email: '', phone: '', message: '' });
        } catch (error) {
            setStatusMessage('An error occurred. Please try again later.');
            console.error("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white font-sans">
            {/* Section 1: Hero Banner */}
            <section className="bg-[#0b1d3a] text-white py-28 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="pattern" className="w-full h-full" />
                </div>
                <div className="relative z-10 container mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#ffb703] uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
                    >
                        Connect With Us
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-serif font-bold"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-slate-300 mt-6 max-w-2xl mx-auto font-light"
                    >
                        Whether you have a question about our services, a prayer request, or simply want to say hello, we are here to listen and support you.
                    </motion.p>
                </div>
            </section>

            {/* Section 2: Main Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Left Column: Contact Form */}
                        <div className="lg:col-span-2">
                            <h2 className="text-4xl font-serif font-bold text-[#0b1d3a] mb-4">Send us a Message</h2>
                            <p className="text-slate-500 mb-10 text-lg">Your journey of faith is important to us. Reach out today.</p>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="topic" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Topic of Inquiry <span className="text-[#ffb703]">*</span></label>
                                    <select id="topic" value={formData.topic} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffb703] outline-none transition-all">
                                        <option value="" disabled>Select an option</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Pastoral Question">Pastoral Question</option>
                                        <option value="Becoming a Member">Becoming a Member</option>
                                        <option value="Counseling Request">Counseling Request</option>
                                        <option value="Testimony">Share a Testimony</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name <span className="text-[#ffb703]">*</span></label>
                                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffb703] outline-none" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address <span className="text-[#ffb703]">*</span></label>
                                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffb703] outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffb703] outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Comment or Message <span className="text-[#ffb703]">*</span></label>
                                    <textarea id="message" value={formData.message} onChange={handleInputChange} required rows="5" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffb703] outline-none resize-none"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" disabled={isSubmitting} className="bg-[#ffb703] hover:bg-[#0b1d3a] text-white hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-[#ffb703]/20 flex items-center gap-2">
                                        {isSubmitting ? 'Submitting...' : 'Send Message'} <i className="fas fa-paper-plane text-xs"></i>
                                    </button>
                                    {statusMessage && <p className={`mt-6 p-4 rounded-xl text-sm font-medium ${statusMessage.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>{statusMessage}</p>}
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Info Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="text-2xl font-serif font-bold text-[#0b1d3a] mb-8">Church Office</h3>
                                <div className="space-y-6 text-slate-600">
                                    <p className="flex items-start gap-4">
                                        <i className="fas fa-map-marker-alt mt-1 text-[#ffb703]"></i>
                                        <span>Cowbell Building, Ogunpa off Oke Bola Highway, Ibadan, Nigeria</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <i className="fas fa-phone text-[#ffb703]"></i>
                                        <span>+234 901 222 5633</span>
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <i className="fas fa-envelope text-[#ffb703]"></i>
                                        <span className="break-all">rccgjesusprotege@gmail.com</span>
                                    </p>
                                </div>

                                <div className="my-10 h-px bg-slate-200" />

                                <h3 className="text-2xl font-serif font-bold text-[#0b1d3a] mb-8">Weekly Services</h3>
                                <div className="space-y-6 text-slate-600">
                                    <div className="flex items-start gap-4">
                                        <i className="fas fa-calendar-check mt-1 text-[#ffb703]"></i>
                                        <div>
                                            <h4 className="font-bold text-[#0b1d3a]">Sunday Services</h4>
                                            <p className="text-sm mt-1">First Service: 8:00 AM</p>
                                            <p className="text-sm">Second Service: 10:30 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <i className="fas fa-clock mt-1 text-[#ffb703]"></i>
                                        <div>
                                            <h4 className="font-bold text-[#0b1d3a]">Mid-Week Service</h4>
                                            <p className="text-sm mt-1">Wednesday: 5:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Map Section */}
            <section className="h-[500px] w-full bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15827.469032658!2d3.8679549!3d7.3687352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d1a6750059b%3A0x6b6c6b4129b867!2sOke%20Bola%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1714318000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RCCG Jesus Protege Location"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;