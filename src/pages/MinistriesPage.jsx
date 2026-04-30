import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MinistryCard = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full"
    >
        {/* Gold Accent Top Bar */}
        <div className="h-2 bg-[#ffb703]" />
        <div className="p-8 flex flex-col flex-1">
            <div className="w-14 h-14 rounded-2xl bg-[#0b1d3a] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <i className={`${icon} text-[#ffb703] text-xl`}></i>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0b1d3a] mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-sans flex-1">{description}</p>

            <div className="mt-6 flex items-center gap-2 text-[#ffb703] text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all cursor-pointer">
                <span>Learn More</span>
                <i className="fas fa-arrow-right"></i>
            </div>
        </div>
    </motion.div>
);

const MinistriesPage = () => {
    const ministries = [
        { icon: "fas fa-music", title: "Worship Team", description: "Leads the congregation into God's presence through music, vocals, and creative expression during all our services." },
        { icon: "fas fa-child", title: "VCM Kids", description: "A passionate ministry dedicated to providing a safe, fun, and faith-filled environment for children of all ages." },
        { icon: "fas fa-handshake", title: "Welcome & Hospitality", description: "The first impression of the church — greeting everyone with warmth, helping visitors navigate, and creating an atmosphere of belonging." },
        { icon: "fas fa-users", title: "Ushering Ministry", description: "A vital team ensuring our services run smoothly through seating, offering collection, and maintaining a peaceful atmosphere." },
        { icon: "fas fa-video", title: "Media & Production", description: "The technical team behind our services — managing sound, lighting, cameras, projections, and live streaming." },
        { icon: "fas fa-bullhorn", title: "Outreach & Evangelism", description: "Taking the love of Jesus beyond our walls through community service events, neighbourhood evangelism, and mission trips." },
        { icon: "fas fa-female", title: "Ladies Ministry", description: "Empowering women through prayer, mentorship, outreach, and tailored spiritual growth programmes for women at every life stage." },
        { icon: "fas fa-user-graduate", title: "Youth Ministry", description: "Raising young men and women in faith through mentorship, discipleship, worship, and engaging activities for teens and young adults." },
        { icon: "fas fa-ring", title: "Marrieds Fellowship", description: "Strengthening marriages through counseling, fellowship, mentorship, and family-building activities rooted in God's design for marriage." },
        { icon: "fas fa-praying-hands", title: "Intercessors", description: "Standing in the gap through prayer, fasting, and spiritual warfare — covering the church, families, our city, and nation." },
    ];

    const galleryImages = [
        {
            src: 'https://drive.google.com/thumbnail?id=1p9YYmd4gMMikBhAaLU09kl7PYCTZvDsN&sz=w1200&.jpg',
            title: 'Community Outreach',
            desc: 'Serving our local neighborhoods'
        },
        {
            src: 'https://drive.google.com/thumbnail?id=1al3tt96B-pjbmpS1dCkIFyItCA9iSDut&sz=w1200&.jpg',
            title: 'Family Love',
            desc: 'Sharing love and growth in the lord'
        },
        {
            src: 'https://drive.google.com/thumbnail?id=1y9beH4Of8TivBhOepSEQrybg3DtepZqB&sz=w1200&.jpg',
            title: 'Special Presentations',
            desc: 'Celebrating milestones together'
        },
        {
            src: 'https://drive.google.com/thumbnail?id=1g0OkLMgORZSw5ReljBcfphQzf8aPHMVt&sz=w1200&.jpg',
            title: 'Outpouring of Virtues',
            desc: 'Growing in faith and sharing the word of God'
        },
    ];

    return (
        <div className="bg-[#fcfcfc] min-h-screen">

            {/* --- HERO SECTION --- */}
            <section className="relative py-32 overflow-hidden bg-[#0b1d3a]">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80&w=2070&auto=format&fit=crop"
                        alt="Worship Ministry"
                        className="w-full h-full object-cover opacity-20 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1d3a]/90 to-[#0b1d3a]" />
                </div>

                <div className="relative container mx-auto px-6 text-center text-white z-10">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#ffb703] font-bold tracking-[0.3em] uppercase text-xs mb-4">Every Member Is a Minister</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-5xl md:text-7xl font-bold mb-6">Our Ministries</motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-300 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
                        Discover your place to belong, serve, and grow. There is a role uniquely fit for you in the house of God.
                    </motion.p>
                </div>
            </section>

            {/* --- MINISTRY IMPACT STRIP --- */}
            <div className="bg-white py-12 shadow-sm border-b border-slate-100 relative z-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                        {[
                            ['10+', 'Active Ministries'],
                            ['150+', 'Members Served'],
                            ['10+', 'Years of Impact'],
                            ['7', 'Days of Ministry']
                        ].map(([num, label], index) => (
                            <div key={index} className="px-4">
                                <p className="font-serif text-4xl font-bold text-[#0b1d3a] mb-2">{num}</p>
                                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- MINISTRIES GRID --- */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <span className="text-[#ffb703] font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Ways to Serve</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0b1d3a]">Find Your Ministry</h2>
                        <div className="w-16 h-1 bg-[#ffb703] mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ministries.map((m, i) => (
                            <MinistryCard key={m.title} {...m} delay={Math.min(i * 0.05, 0.3)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PHOTO GALLERY ROW (Fixed the map error here) --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80">
                {galleryImages.map((img, i) => (
                    <div key={i} className="overflow-hidden relative group cursor-pointer">
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Hover Gradient & Text Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3a]/90 via-[#0b1d3a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <h4 className="text-white font-serif font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h4>
                            <p className="text-[#ffb703] text-xs uppercase tracking-widest mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CTA SECTION --- */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center bg-slate-50 p-12 md:p-16 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-20 h-20 bg-[#0b1d3a] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <i className="fas fa-hands-helping text-[#ffb703] text-3xl"></i>
                        </div>
                        <h2 className="font-serif text-4xl font-bold text-[#0b1d3a] mb-6">Ready to Make a Difference?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
                            If you're interested in joining a ministry, we'd love to hear from you. Let's find the perfect place for you to use your gifts and talents for God's kingdom.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/contact" className="bg-[#ffb703] hover:bg-[#ff9e00] text-[#0b1d3a] font-bold px-10 py-4 rounded-full transition-all uppercase text-xs tracking-widest w-full sm:w-auto text-center shadow-lg">
                                <i className="fas fa-envelope mr-2"></i> Join a Team
                            </Link>
                            <Link to="/pray" className="bg-white border-2 border-[#0b1d3a] hover:bg-[#0b1d3a] hover:text-white text-[#0b1d3a] font-bold px-10 py-4 rounded-full transition-all uppercase text-xs tracking-widest w-full sm:w-auto text-center">
                                <i className="fas fa-praying-hands mr-2"></i> Request Prayer
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default MinistriesPage;