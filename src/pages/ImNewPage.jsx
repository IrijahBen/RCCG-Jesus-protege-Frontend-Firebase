import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-100 last:border-0">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left py-5 px-2 hover:px-4 transition-all duration-200 group"
        >
            <span className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors pr-4">{question}</span>
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
            >
                <i className="fas fa-chevron-down text-sm"></i>
            </motion.span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="text-gray-600 leading-relaxed px-2 pb-5">{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const StaffCard = ({ name, title, avatar, imageUrl, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="text-center group"
    >
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={name}
                className="w-36 h-36 mx-auto rounded-full shadow-xl mb-4 object-cover transition-transform duration-300 group-hover:scale-105 border-4 border-white"
            />
        ) : (
            <div className={`w-36 h-36 mx-auto rounded-full shadow-xl mb-4 flex items-center justify-center text-white text-3xl font-bold font-display transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br ${avatar.gradient}`}>
                {avatar.initials}
            </div>
        )}
        <h4 className="text-lg font-bold text-gray-900 mb-1">{name}</h4>
        <p className="text-blue-600 text-sm font-medium">{title}</p>
    </motion.div>
);

const ImNewPage = () => {
    const [openFAQ, setOpenFAQ] = useState(0);

    const faqs = [
        { q: "What are your service times?", a: "Our Sunday services are at 8:00 AM (First Service – English) and 10:30 AM (Second Service – Luganda). We recommend arriving 15 minutes early to find parking and a good seat." },
        { q: "What is the worship music like?", a: "Our worship is vibrant and contemporary — a blend of modern praise songs and beloved hymns led by a passionate worship team. The focus is on heartfelt praise and creating an atmosphere to connect with God." },
        { q: "What should I wear?", a: "There is absolutely no dress code! You'll see people in everything from Gomesi and Kanzu to jeans and a t-shirt. Come in whatever makes you feel comfortable." },
        { q: "What about my children?", a: "We have a wonderful and secure children's Sunday School for the young ones through pre-teen. Our trained volunteers ensure your children have a fun, safe, and faith-filled experience while you enjoy the main service." },
        { q: "How do I get to the church?", a: "We are located in Masajja, just off the Entebbe-Highway. Boda-boda riders in the area know us well! You can find directions on our Contact page or search 'Victory Church Masajja' on Google Maps." },
        { q: "Do you have mid-week services?", a: "Yes! Bible Study meets every Wednesday at 5:30 PM, and our Worship Tabernacle (prayer service) is every Friday at 5:00 PM. All are welcome!" },
        { q: "How can I contribute or give?", a: "Your generosity helps us serve the community! You can give during our services, or online via Mobile Money or Bank Deposit. Details are on our Giving page." },
        { q: "How can I start serving at VCM?", a: "Every member is a minister! We have roles in worship, children's ministry, media, welcome team, and more. Visit our Ministries page or speak to any of our pastors after service." },
    ];

    // Replaced real staff with pure placeholders
    const staff = [
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
        {
            name: "Leader Name",
            title: "Leadership Role",
            imageUrl: "",
            avatar: { initials: "PN", gradient: "from-slate-400 to-slate-600" }
        },
    ];

    const whatToExpect = [
        { icon: "fas fa-music", title: "Uplifting Worship", desc: "Vibrant, spirit-filled praise led by a talented team" },
        { icon: "fas fa-bible", title: "Relevant Teaching", desc: "Practical, Bible-based messages for everyday life" },
        { icon: "fas fa-hands-holding-heart", title: "Warm Welcome", desc: "A hospitality team that will make you feel at home" },
        { icon: "fas fa-child", title: "Kids Ministry", desc: "Safe, fun, faith-building program for your children" },
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
        <div className="bg-white">

            {/* ── Hero ─── */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
                        alt="Church community"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d3a]/90 to-[#1e3a8a]/70" />
                </div>
                <div className="relative container mx-auto px-6 py-28 text-white">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">You Belong Here</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl mb-6">
                        Your Journey<br /><span className="text-amber-400">Begins Here</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 max-w-xl leading-relaxed mb-10">
                        We're so glad you're considering visiting us. At VCM, every person matters and every story is valued.
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                        <Link to="/contact" className="btn-gold px-8 py-4 text-base">
                            <i className="fas fa-map-marker-alt"></i> Get Directions
                        </Link>
                        <Link to="/pray" className="btn-outline px-8 py-4 text-base">
                            <i className="fas fa-praying-hands"></i> Request Prayer
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Service Times Strip ─── */}
            <section className="bg-gradient-to-r from-amber-500 to-amber-400 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap gap-8 justify-center md:justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <i className="fas fa-clock text-white/70 text-xl"></i>
                            <div>
                                <p className="font-bold text-sm">First Service</p>
                                <p className="text-white/80 text-sm">Sunday · 8:00 AM – 10:00 AM</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/30 hidden md:block" />
                        <div className="flex items-center gap-3">
                            <i className="fas fa-clock text-white/70 text-xl"></i>
                            <div>
                                <p className="font-bold text-sm">Second Service</p>
                                <p className="text-white/80 text-sm">Sunday · 10:30 AM – 12:30 PM</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/30 hidden md:block" />
                        <div className="flex items-center gap-3">
                            <i className="fas fa-map-marker-alt text-white/70 text-xl"></i>
                            <div>
                                <p className="font-bold text-sm">Location</p>
                                <p className="text-white/80 text-sm">Masajja, off Entebbe Highway, Kampala</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── What to Expect ─── */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-3">First Visit?</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">What to Expect</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whatToExpect.map(({ icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                                    <i className={`${icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Expanding Photo Strip (Reformed) ─── */}
            <section className="bg-slate-50 pb-16">
                <div className="flex flex-col md:flex-row w-full h-[400px] gap-2 px-4 max-w-[1600px] mx-auto">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="relative flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden rounded-2xl group cursor-pointer">
                            <img src={img.src} alt={img.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <h4 className="text-white font-bold text-2xl md:text-3xl mb-2 whitespace-nowrap">{img.title}</h4>
                                <p className="text-amber-300 text-sm md:text-base whitespace-nowrap">{img.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FAQ ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-14">
                        <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-3">We've Got Answers</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Common Questions</h2>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFAQ === i}
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Prayer Banner ─── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1920&q=80" alt="Prayer" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-indigo-900/90" />
                </div>
                <div className="relative container mx-auto px-6 text-center text-white">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <i className="fas fa-praying-hands text-amber-400 text-5xl mb-6"></i>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">How Can We Pray for You?</h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Life can be overwhelming. You are not alone. We believe in a God who listens and a church family that cares. We would be honoured to stand with you in prayer.
                        </p>
                        <Link to="/pray" className="btn-gold text-base px-10 py-4">
                            <i className="fas fa-paper-plane"></i> Send Your Prayer Request
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Next Steps ─── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-3">Take Action</p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-14">Your Next Steps</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: "fas fa-id-card", title: "Become a Member", desc: "Register and learn how to become a formal member of the VCM family.", action: "Membership", link: "/contact", color: "from-blue-600 to-indigo-600" },
                            { icon: "fas fa-hands-helping", title: "Serve With Us", desc: "Participate in the work of the Lord with your gifts in one of our ministries.", action: "Volunteer", link: "/ministries", color: "from-amber-500 to-amber-400" },
                            { icon: "fas fa-users", title: "Join a Team", desc: "Make a difference by serving on one of our ministry teams. A great way to build relationships.", action: "Explore Ministries", link: "/ministries", color: "from-emerald-500 to-emerald-400" },
                        ].map(({ icon, title, desc, action, link, color }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                            >
                                <div className={`bg-gradient-to-br ${color} p-8 text-white text-center`}>
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <i className={`${icon} text-white text-2xl`}></i>
                                    </div>
                                    <h3 className="font-display text-2xl font-bold">{title}</h3>
                                </div>
                                <div className="bg-white p-6">
                                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{desc}</p>
                                    <Link to={link} className="btn-primary w-full text-sm">{action}</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Meet the Team ─── */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-3">The People You'll Meet</p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-14">Our Leadership Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
                        {staff.map((member, i) => (
                            <StaffCard key={i} {...member} delay={i * 0.05} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImNewPage;