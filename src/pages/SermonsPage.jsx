import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const SermonsPage = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSermon, setSelectedSermon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const sermonsColRef = collection(db, 'sermons');
        const q = query(sermonsColRef, orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sermonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSermons(sermonsData);
            if (sermonsData.length > 0) setSelectedSermon(sermonsData[0]);
            setLoading(false);
        }, (err) => {
            console.error("Firestore Error:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filtered = sermons.filter(s =>
        (s.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.speaker || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (date) => {
        if (!date) return '';
        const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b1d3a]">
            <div className="w-12 h-12 border-4 border-[#ffb703] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-serif selection:bg-[#ffb703]/30">

            {/* --- HERO SECTION: THE CINEMATIC SPOTLIGHT --- */}
            <section className="relative h-[80vh] md:h-[75vh] bg-[#0b1d3a] flex items-center overflow-hidden">
                {selectedSermon && (
                    <>
                        <div className="absolute inset-0 z-0">
                            <img
                                src={`https://img.youtube.com/vi/${selectedSermon.youtubeVideoId}/maxresdefault.jpg`}
                                className="w-full h-full object-cover opacity-30 scale-105 blur-[2px]"
                                alt="Background"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/80 to-transparent" />
                        </div>

                        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="lg:col-span-3 text-white"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-[#ffb703] text-[#0b1d3a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Latest Message</span>
                                    <span className="text-white/60 text-xs font-sans tracking-widest uppercase">{formatDate(selectedSermon.date)}</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                                    {selectedSermon.title}
                                </h1>
                                <p className="text-lg text-slate-300 mb-8 max-w-xl italic font-sans leading-relaxed">
                                    "Join us as {selectedSermon.speaker} delivers a powerful message that will transform your walk with Christ."
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
                                    className="bg-white text-[#0b1d3a] px-10 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#ffb703] transition-all shadow-2xl"
                                >
                                    Start Watching
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="lg:col-span-2 hidden lg:block"
                            >
                                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedSermon.youtubeVideoId}?rel=0&modestbranding=1`}
                                        title="Featured Sermon"
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </section>

            {/* --- BROWSE & SEARCH SECTION --- */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-bold text-[#0b1d3a] mb-2">Message Archive</h2>
                        <div className="h-1 w-20 bg-[#ffb703] rounded-full" />
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ffb703] transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Search by speaker or topic..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-2xl font-sans focus:border-[#ffb703] focus:ring-4 focus:ring-[#ffb703]/10 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Sermon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                    {filtered.map((sermon, index) => (
                        <motion.div
                            key={sermon.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group cursor-pointer flex flex-col"
                            onClick={() => {
                                setSelectedSermon(sermon);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl bg-slate-200 mb-6">
                                <img
                                    src={`https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`}
                                    alt={sermon.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-[#0b1d3a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-16 h-16 bg-[#ffb703] rounded-full flex items-center justify-center text-[#0b1d3a] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <i className="fas fa-play text-xl ml-1"></i>
                                    </div>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-sans uppercase font-bold tracking-widest">
                                    {formatDate(sermon.date)}
                                </div>
                            </div>

                            <div className="px-1">
                                <p className="text-[#ffb703] text-[11px] font-black uppercase tracking-[0.2em] mb-2 font-sans">
                                    {sermon.speaker}
                                </p>
                                <h3 className="text-2xl font-bold text-[#0b1d3a] leading-tight group-hover:text-[#ffb703] transition-colors line-clamp-2">
                                    {sermon.title}
                                </h3>
                                <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs font-sans group-hover:text-slate-600">
                                    <span className="w-8 h-[1px] bg-slate-300"></span>
                                    <span>Watch Message</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-32">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                            <i className="fas fa-video-slash text-slate-300 text-2xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-400 font-sans">No sermons found</h3>
                        <p className="text-slate-400 font-sans mt-2">Try searching for a different keyword or speaker.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SermonsPage;