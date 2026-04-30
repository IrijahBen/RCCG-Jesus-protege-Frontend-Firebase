import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../firebase';
import { motion } from 'framer-motion';

const ProgrammeCard = ({ icon, title, description, day, time, imageSrc, highlight = false, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${highlight ? 'ring-2 ring-amber-400 ring-offset-2' : 'border border-gray-100'
            }`}
    >
        <div className="relative h-48 overflow-hidden bg-slate-200">
            <img src={imageSrc} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            {highlight && (
                <div className="absolute top-4 right-4">
                    <span className="badge bg-amber-400 text-amber-900">Featured</span>
                </div>
            )}
            <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <i className={`${icon} text-sm`}></i>
                    </div>
                    <span className="text-sm font-medium">{day}</span>
                </div>
            </div>
        </div>
        <div className="bg-white p-7">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-amber-600 font-semibold text-sm mb-3">
                <i className="fas fa-clock mr-2"></i>{time}
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
        </div>
    </motion.div>
);

const ServicesPage = () => {
    const [serviceContent, setServiceContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docRef = doc(db, `artifacts/${appId}/public/data/churchInfo`, 'services');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            setServiceContent(docSnap.exists() ? docSnap.data().content || '' : '');
            setLoading(false);
        }, () => setLoading(false));
        return () => unsubscribe();
    }, []);

    const programmes = [
        {
            icon: "fas fa-church",
            title: "Program Title Placeholder 1",
            day: "Every Sunday",
            time: "1st Service: 8:00 AM – 10:00 AM  ·  2nd Service: 10:30 AM – 12:30 PM",
            description: "Join us for a vibrant worship experience with inspiring sermons, heartfelt praise, and warm fellowship.",
            imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image+1",
            highlight: true,
        },
        {
            icon: "fas fa-bible",
            title: "Program Title Placeholder 2",
            day: "Every Wednesday",
            time: "5:30 PM – 7:00 PM",
            description: "Deepen your understanding of Scripture through our interactive, discussion-based study sessions.",
            imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image+2",
        },
        {
            icon: "fas fa-fire-alt",
            title: "Program Title Placeholder 3",
            day: "Every Friday",
            time: "5:00 PM – 9:00 PM",
            description: "A powerful evening of extended praise, intercession, and spiritual warfare.",
            imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image+3",
        },
        {
            icon: "fas fa-child",
            title: "Program Title Placeholder 4",
            day: "Every Sunday",
            time: "During Both Services",
            description: "Our children's programme runs concurrently with both Sunday services in a safe, fun environment.",
            imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image+4",
        },
        {
            icon: "fas fa-user-graduate",
            title: "Program Title Placeholder 5",
            day: "Saturdays",
            time: "3:00 PM – 6:00 PM",
            description: "Tailored ministry for teens and young adults, combining worship, teaching, and mentorship.",
            imageSrc: "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image+5",
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Hero */}
            <section className="relative py-28 overflow-hidden gradient-navy text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 border border-white/30 rounded-full translate-x-1/3 -translate-y-1/3" />
                </div>
                <div className="relative container mx-auto px-6 text-center">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">Weekly Gatherings</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-6xl font-bold mb-5">Our Programmes</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-blue-200 text-lg max-w-xl mx-auto">
                        There is something for everyone. Come and experience God's presence with us throughout the week.
                    </motion.p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Quick Schedule Bar */}
            <div className="bg-white shadow-sm py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap gap-6 justify-center md:justify-between items-center">
                        {[
                            { day: "Sunday", times: "8:00 AM & 10:30 AM", icon: "fas fa-church" },
                            { day: "Wednesday", times: "5:30 PM", icon: "fas fa-bible" },
                            { day: "Friday", times: "5:00 PM", icon: "fas fa-fire" },
                            { day: "Saturday", times: "3:00 PM (Program)", icon: "fas fa-users" },
                        ].map(({ day, times, icon }) => (
                            <div key={day} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <i className={`${icon} text-blue-600`}></i>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{day}</p>
                                    <p className="text-gray-500 text-xs">{times}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin-editable intro */}
            {serviceContent && !loading && (
                <div className="py-10 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
                            <i className="fas fa-info-circle text-amber-500 text-xl mb-3 block"></i>
                            {serviceContent.split('\n').filter(Boolean).map((p, i) => (
                                <p key={i} className="text-gray-700 leading-relaxed mb-2">{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Programme Cards */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl font-bold text-gray-900">All Programmes</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programmes.map((p, i) => (
                            <ProgrammeCard key={p.title} {...p} delay={Math.min(i * 0.08, 0.3)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a] py-20 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="font-display text-4xl font-bold mb-4">Join Us This Sunday</h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">We'd love to have you. Come experience the warmth and power of our community.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-gold text-base px-10 py-4">
                            <i className="fas fa-map-marker-alt"></i> Get Directions
                        </a>
                        <a href="tel:+256784290507" className="btn-outline text-base px-10 py-4">
                            <i className="fas fa-phone"></i> Call Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;