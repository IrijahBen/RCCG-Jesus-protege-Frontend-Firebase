import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../firebase';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const [aboutContent, setAboutContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docRef = doc(db, `artifacts/${appId}/public/data/churchInfo`, 'aboutUs');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().content) {
                setAboutContent(docSnap.data().content);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-[#ffb703] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="bg-white font-serif selection:bg-[#ffb703]/30">

            {/* --- HERO SECTION: Sanctuary Background --- */}
            <section className="relative h-[85vh] flex items-center bg-[#0b1d3a] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://drive.google.com/thumbnail?id=1AA9-AWdpWIHOyD6MKNXwAmj2B47Zehhe&sz=w1920&.jpg"
                        className="w-full h-full object-cover opacity-30 scale-105"
                        alt="RCCG Jesus Protege Sanctuary"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-6xl md:text-8xl font-bold max-w-4xl leading-[1.1] mb-8">
                            Our Church <br /> Works to Inspire
                        </h1>
                        <div className="flex items-center gap-6">
                            <div className="h-px w-12 bg-[#ffb703]" />
                            <p className="text-white/80 text-sm uppercase tracking-[0.3em] font-sans">
                                Ignite Passion to Follow Jesus
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- VALUES SECTION: Outreach & Family Images --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                        {/* Left: Overlapping Composition */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative z-10 w-4/5 aspect-[4/5] overflow-hidden shadow-2xl rounded-sm"
                            >
                                <img
                                    src="https://drive.google.com/thumbnail?id=1p9YYmd4gMMikBhAaLU09kl7PYCTZvDsN&sz=w1200&.jpg"
                                    className="w-full h-full object-cover"
                                    alt="Community Outreach"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-12 -right-4 md:right-12 z-20 w-3/5 aspect-square bg-white p-4 shadow-2xl rounded-sm"
                            >
                                <img
                                    src="https://drive.google.com/thumbnail?id=1al3tt96B-pjbmpS1dCkIFyItCA9iSDut&sz=w1200&.jpg"
                                    className="w-full h-full object-cover"
                                    alt="Family Ministry"
                                />
                            </motion.div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="lg:pl-10">
                            <div className="mb-10">
                                <span className="text-5xl text-[#ffb703]/20 block mb-2">†</span>
                                <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-400 font-sans">Our Identity</p>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold text-[#0b1d3a] mb-10 leading-tight">
                                A Sanctuary of <br /> Faith and Love
                            </h2>

                            <div className="text-gray-500 leading-relaxed text-lg font-sans space-y-6 max-w-xl">
                                {aboutContent ? (
                                    aboutContent.split('\n').map((para, i) => <p key={i}>{para}</p>)
                                ) : (
                                    <p>We are a community dedicated to the transformative power of faith, providing a sanctuary for those seeking spiritual growth and a deeper connection with God.</p>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ y: -2 }}
                                className="mt-12 border-b-2 border-[#ffb703] pb-2 text-sm font-bold uppercase tracking-widest text-[#0b1d3a] hover:text-[#ffb703] transition-colors font-sans"
                            >
                                Learn More
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION QUOTE --- */}
            <section className="bg-[#f8f9fa] py-32 border-y border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-[#ffb703] mb-10 font-sans">The Vision</p>
                    <h3 className="text-4xl md:text-6xl font-bold text-[#0b1d3a] max-w-5xl mx-auto leading-[1.2] mb-12">
                        Teaching people to weather worldly sorrow and suffering through <span className="relative inline-block">
                            Hope
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#ffb703]" />
                        </span>.
                    </h3>
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-[#0b1d3a] text-xl">Pastor Moses. O. Oladimeji</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-2 font-sans">Lead Pastor</p>
                    </div>
                </div>
            </section>
    </div>
);
};

export default AboutPage;