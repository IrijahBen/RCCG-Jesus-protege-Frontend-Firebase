import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GivingOption = ({ icon, title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
        <div className="w-14 h-14 bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-100">
            <i className={`${icon} text-[#ffb703] text-xl`}></i>
        </div>
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3 text-gray-700">{children}</div>
    </motion.div>
);

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className="font-semibold text-[#0b1d3a] text-right text-sm max-w-[200px]">{value}</span>
    </div>
);

const GivingPage = () => {
    return (
        <div className="bg-white min-h-screen">

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-[#0b1d3a]">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
                        alt="Giving and Community"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1d3a]/80 to-[#0b1d3a]" />
                </div>
                <div className="relative container mx-auto px-6 text-center text-white z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-[#ffb703] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Partner With Us</span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">Generosity <br /> Changes Lives</h1>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-sans">
                            "Your generosity enables us to reach our community for Christ and provide a sanctuary for spiritual growth. Every gift is a seed sown into fertile ground."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Scripture Banner */}
            <div className="bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p className="text-[#0b1d3a] font-serif italic text-xl max-w-3xl mx-auto">
                        "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                    </p>
                    <p className="text-[#ffb703] text-xs mt-3 font-black uppercase tracking-widest">2 Corinthians 9:7</p>
                </div>
            </div>

            {/* Giving Methods */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0b1d3a]">Ways to Give</h2>
                        <div className="h-1 w-20 bg-[#ffb703] mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {/* Option 1: Mobile Transfer */}
                        <GivingOption icon="fas fa-mobile-alt" title="Mobile Transfer" delay={0}>
                            <div className="space-y-4">
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Network Option A</p>
                                    <p className="font-bold text-[#0b1d3a] text-xl font-sans">0000 000 000</p>
                                    <p className="text-slate-500 text-xs mt-1 uppercase font-bold">[Recipient Name]</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Network Option B</p>
                                    <p className="font-bold text-[#0b1d3a] text-xl font-sans">0000 000 000</p>
                                    <p className="text-slate-500 text-xs mt-1 uppercase font-bold">[Recipient Name]</p>
                                </div>
                            </div>
                        </GivingOption>

                        {/* Option 2: Digital Pay */}
                        <GivingOption icon="fas fa-qrcode" title="Digital Pay" delay={0.1}>
                            <div className="bg-[#0b1d3a] rounded-2xl p-8 text-center shadow-2xl">
                                <div className="w-20 h-20 bg-[#ffb703] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-hashtag text-[#0b1d3a] text-3xl"></i>
                                </div>
                                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2">Merchant Code</p>
                                <p className="font-sans text-5xl font-bold text-white tracking-tighter">000000</p>
                                <p className="text-[#ffb703] text-xs mt-4 uppercase font-bold tracking-widest">[Account Name]</p>
                            </div>
                            <p className="text-slate-400 text-xs text-center mt-6 font-medium italic">Dial your provider's code and enter the merchant ID above.</p>
                        </GivingOption>

                        {/* Option 3: Bank Transfer */}
                        <GivingOption icon="fas fa-university" title="Bank Deposit" delay={0.2}>
                            <div className="bg-slate-50 rounded-2xl p-6 space-y-1 border border-slate-100">
                                <InfoRow label="Bank" value="[Your Bank Name]" />
                                <InfoRow label="Account Name" value="[Church Account Name]" />
                                <InfoRow label="Account Number" value="0000000000" />
                                <InfoRow label="Swift/Sort" value="[Optional Code]" />
                                <InfoRow label="Branch" value="[Bank Branch Location]" />
                            </div>
                        </GivingOption>

                    </div>
                </div>
            </section>

            {/* Stewardship Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-[#ffb703] uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block">Stewardship</span>
                        <h2 className="font-serif text-4xl font-bold text-[#0b1d3a]">Where Your Giving Goes</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: "fas fa-church", title: "Worship", desc: "Supporting Sunday experiences, sound, media, and hospitality." },
                            { icon: "fas fa-child", title: "Next Gen", desc: "Funding safe and engaging programs for our children and youth." },
                            { icon: "fas fa-hands-helping", title: "Outreach", desc: "Feeding, supporting, and sharing hope with our community." },
                            { icon: "fas fa-building", title: "Facilities", desc: "Maintaining and improving our church sanctuary for all." },
                        ].map(({ icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <i className={`${icon} text-[#ffb703] text-xl`}></i>
                                </div>
                                <h3 className="font-bold text-[#0b1d3a] mb-3 uppercase text-sm tracking-widest">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-sans">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Questions CTA */}
            <section className="bg-[#0b1d3a] py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center text-white relative z-10">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Questions About Giving?</h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 font-sans">
                        We are committed to transparency and faithful stewardship. Reach out to our finance team for any assistance.
                    </p>
                    <Link to="/contact" className="inline-block bg-[#ffb703] hover:bg-white text-[#0b1d3a] font-bold px-12 py-4 rounded-full transition-all uppercase text-xs tracking-widest shadow-xl">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GivingPage;