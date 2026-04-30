import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db, appId } from '../firebase';

/* ─── Animated Counter ─── */
const Counter = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── Testimonial Card ─── */
const TestimonialCard = ({ quote, name, role, avatar, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="bg-white rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50"
    >
        <div className="text-orange-400 text-4xl mb-4 leading-none font-serif">"</div>
        <p className="text-gray-600 leading-relaxed italic mb-6">{quote}</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg">
                {avatar}
            </div>
            <div>
                <p className="font-bold text-slate-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    </motion.div>
);

/* ─── Helper: Safely Extract YouTube ID from Full Links or IDs ─── */
const getYouTubeId = (urlOrId) => {
    if (!urlOrId) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
};

/* ─── Main Page ─── */
const HomePage = () => {
    const [latestSermon, setLatestSermon] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        // Fetch latest sermon
        // Note: Using a fallback so the section still renders even if your DB is empty
        const sermonsRef = collection(db, 'sermons');
        const sq = query(sermonsRef, orderBy('date', 'desc'), limit(1));
        const unsubSermon = onSnapshot(sq, snap => {
            if (!snap.empty) {
                setLatestSermon({ id: snap.docs[0].id, ...snap.docs[0].data() });
            } else {
                // Fallback placeholder data if database is empty
                setLatestSermon({
                    id: 'placeholder',
                    title: 'The Power of Faith',
                    speaker: 'Lead Pastor',
                    youtubeVideoId: 'jNQXAC9IVRw', // Generic placeholder video ID
                    date: { seconds: Math.floor(Date.now() / 1000) }
                });
            }
        }, err => {
            console.error("Error fetching sermon:", err);
            // Fallback placeholder data on error
            setLatestSermon({
                id: 'error-placeholder',
                title: 'The Power of Faith',
                speaker: 'Lead Pastor',
                youtubeVideoId: 'jNQXAC9IVRw',
                date: { seconds: Math.floor(Date.now() / 1000) }
            });
        });

        // Fetch upcoming events
        const eventsRef = collection(db, `artifacts/${appId}/public/data/events`);
        const eq = query(eventsRef, orderBy('date', 'desc'), limit(3));
        const unsubEvents = onSnapshot(eq, snap => {
            setUpcomingEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => { unsubSermon(); unsubEvents(); };
    }, []);

    const testimonials = [
        { quote: "VCM changed my life. The warmth and love I felt the first Sunday I walked in told me I had found my spiritual home.", name: "Ruth Buyondo", role: "Member since 2017", avatar: "R" },
        { quote: "The Bible Study here is deeply transformative. Pastor Vicent makes scripture come alive in ways I've never experienced.", name: "John Muganga", role: "Church Administrator", avatar: "J" },
        { quote: "As a newcomer to Kampala, VCM became my family. The community here is genuine and the worship is electric.", name: "Enoch Muwanguzi", role: "Youth Member", avatar: "E" },
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
        <div className="bg-white overflow-x-hidden font-sans">

            {/* ── SECTION 1: Target Design Hero with Floating Card ──────────────── */}
            <section className="relative pb-32 pt-24 lg:pt-40 lg:pb-48 flex items-center z-10">
                <div className="absolute inset-0 -z-10">
                    <img
                        src="https://drive.google.com/thumbnail?id=1AA9-AWdpWIHOyD6MKNXwAmj2B47Zehhe&sz=w1920&.jpg"
                        alt="Church worship background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative">
                    <div className="max-w-2xl text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-orange-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-4"
                        >
                            Church Love, Faith Love
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
                        >
                            Welcome To <br /> Our Church
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-300 text-lg mb-10 leading-relaxed"
                        >
                            The Goodnews Center is based on faith, hope, and love, committed to serving God and humanity in our environment and wherever we find ourselves. Join us as we build a community of victorious believers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link to="/im-new" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded transition-colors shadow-lg shadow-orange-500/30">
                                I'm New Here
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Floating "Join Live Stream" Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute left-0 right-0 -bottom-24 z-20 px-6"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center p-6 gap-6">
                        <div className="w-full md:w-1/3 h-32 rounded-lg overflow-hidden shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                                alt="Live stream production"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Join the Sunday Live Stream</h3>
                            <p className="text-gray-500 text-sm mb-4">Every Sunday at 8:00 am & 10:30 am</p>
                            <div className="flex items-center gap-4">
                                <Link to="/live" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-2 rounded transition-colors">
                                    Join Now <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                </Link>
                                <Link to="/sermons" className="text-gray-500 hover:text-slate-900 text-sm font-medium transition-colors">
                                    Past Messages
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── SECTION 2: Target Design Services Split Layout ──────────────── */}
            <section className="bg-[#f8fafc] pt-40 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">

                        <div className="lg:col-span-5">
                            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-4">Our Services</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                We Love Serving Our Local Community
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Victory Church Masajja exists to lead people into a growing relationship with Jesus Christ. Rooted in the community of Kampala, we are a multigenerational family committed to worship, discipleship, and service.
                            </p>
                            <Link to="/ministries" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded transition-colors">
                                Learn More
                            </Link>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                            {[
                                { icon: 'fas fa-book-open', title: 'Weekly Services', desc: 'Join us for uplifting worship and biblical teaching.' },
                                { icon: 'fas fa-users', title: 'Youth', desc: 'Empowering the next generation for Christ.' },
                                { icon: 'fas fa-child', title: 'Kids', desc: 'A safe, fun place for children to learn about God.' },
                                { icon: 'fas fa-calendar-alt', title: 'Special Events', desc: 'Community gatherings and impactful conferences.' },
                                { icon: 'fas fa-comments', title: 'Counseling', desc: 'Biblical guidance for life\'s difficult seasons.' },
                                { icon: 'fas fa-hands-helping', title: 'Benevolence', desc: 'Meeting the practical needs of our community.' },
                            ].map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center shadow-sm mb-4 border border-gray-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                        <i className={`${item.icon} text-lg text-slate-700 group-hover:text-white`}></i>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ── SECTION 3: Target Design Events/Series Grid ──────────────── */}
            {upcomingEvents.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16">
                            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-3">Current Events</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Hope for Tomorrow</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Get caught up with the current upcoming events and messages. Join our community as we grow together in faith and purpose.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {upcomingEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col"
                                >
                                    <div className="h-64 bg-slate-200 overflow-hidden mb-6">
                                        <img
                                            src={`https://source.unsplash.com/600x400/?church,worship,community&sig=${i}`}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%]"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">
                                            Event | {new Date(event.date).toLocaleDateString('en-UG', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{event.title}</h3>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{event.description}</p>

                                        <div className="mt-auto">
                                            <Link to={`/events/${event.id}`} className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-orange-500 transition-colors">
                                                View Details <i className="fas fa-arrow-right ml-1"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── SECTION 4: Integrated Legacy Stats ──────────────── */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
                        {[
                            { end: 150, suffix: '+', label: 'Church Family' },
                            { end: 10, suffix: '+', label: 'Years of Ministry' },
                            { end: 10, suffix: '', label: 'Active Ministries' },
                            { end: 2, suffix: '', label: 'Sunday Services' },
                        ].map(({ end, suffix, label }, i) => (
                            <div key={label} className="text-center px-4">
                                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                                    <Counter end={end} suffix={suffix} />
                                </div>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: Legacy Vision/Community Area ──────────────── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <p className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4">Who We Are</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                Built on Faith,<br />Growing in Love
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Becoming a people of excellence exhibiting passion for God and love for others. We aim to create a community of victorious believers ready to go for God through Love, Scripture, Holy Spirit, and humble service to our city.
                            </p>
                            <Link to="/about" className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3 rounded transition-colors">
                                Read Our Story
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                            <div className="relative shadow-2xl">
                                <img
                                    src="https://drive.google.com/thumbnail?id=1AA9-AWdpWIHOyD6MKNXwAmj2B47Zehhe&sz=w1920&.jpg"
                                    alt="Church worship background"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-900/10 rounded" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-48 bg-orange-500 p-6 rounded shadow-xl text-white">
                                <span className="block font-bold text-4xl mb-1">10+</span>
                                <span className="text-sm font-medium uppercase tracking-wider">Years Strong</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: Featured Sermon ───────────────── */}
            {latestSermon && (
                <section className="py-24 bg-slate-50 border-t border-gray-200">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="shadow-xl bg-slate-900 rounded-lg overflow-hidden aspect-video"
                            >
                                <iframe
                                    // Utilizes the new helper function to safely pull out ID
                                    src={`https://www.youtube.com/embed/${getYouTubeId(latestSermon.youtubeVideoId)}?rel=0`}
                                    title={latestSermon.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4">Featured Message</p>
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{latestSermon.title}</h3>
                                <p className="text-gray-500 font-medium mb-6">
                                    {latestSermon.speaker} | {latestSermon.date?.seconds ? new Date(latestSermon.date.seconds * 1000).toLocaleDateString('en-UG', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Join us as we explore God's Word together. This message is available on demand — watch it at your own pace, and share it with a friend who needs encouragement today.
                                </p>
                                <Link to="/sermons" className="text-sm font-bold text-slate-900 uppercase tracking-widest hover:text-orange-500 transition-colors border-b-2 border-orange-500 pb-1">
                                    View All Sermons <i className="fas fa-arrow-right ml-1"></i>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── SECTION 7: Testimonials ───────────────────── */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900">What Our Family Says</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={i} {...t} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 8: Interactive Photo Gallery (UPGRADED) ───────────────────── */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 max-w-7xl mb-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-bold text-slate-900">Life at Our Church</h3>
                        <Link to="/gallery" className="text-sm font-bold text-orange-500 uppercase tracking-widest hover:text-slate-900 transition-colors hidden md:block">
                            View Full Gallery <i className="fas fa-arrow-right ml-1"></i>
                        </Link>
                    </div>
                </div>

                {/* Expanding Flex Box Gallery */}
                <div className="flex flex-col md:flex-row w-full h-[500px] gap-2 px-4 max-w-[1600px] mx-auto">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="relative flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden rounded-2xl group cursor-pointer">
                            <img src={img.src} alt={img.title} className="absolute inset-0 w-full h-full object-cover" />
                            {/* Overlay that darkens slightly on hover to make text pop */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Text Content - Slides up and fades in on hover */}
                            <div className="absolute bottom-0 left-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <h4 className="text-white font-bold text-2xl md:text-3xl mb-2 whitespace-nowrap">{img.title}</h4>
                                <p className="text-orange-300 text-sm md:text-base whitespace-nowrap">{img.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 9: Your Next Steps (NEW SECTION) ───────────────────── */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <p className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3">Grow With Us</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Your Next Steps</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            Whether you are new to faith or have been following Jesus for years, there is always a next step to take in your spiritual journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join a Group</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Find your people. Life is better connected in our small groups meeting across the city throughout the week.
                            </p>
                            <Link to="/groups" className="text-slate-900 font-bold uppercase text-sm tracking-widest hover:text-orange-500 transition-colors">
                                Find a Group <i className="fas fa-arrow-right ml-1"></i>
                            </Link>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                <i className="fas fa-hands-helping"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join a Team</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Use your unique gifts and talents to serve others. There is a place for you to make a difference here.
                            </p>
                            <Link to="/serve" className="text-slate-900 font-bold uppercase text-sm tracking-widest hover:text-orange-500 transition-colors">
                                Start Serving <i className="fas fa-arrow-right ml-1"></i>
                            </Link>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Give Online</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Your generosity helps us continue our mission of leading people into a growing relationship with Jesus Christ.
                            </p>
                            <Link to="/give" className="text-slate-900 font-bold uppercase text-sm tracking-widest hover:text-orange-500 transition-colors">
                                Ways to Give <i className="fas fa-arrow-right ml-1"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 10: Call to Action  ─────────────────── */}
            <section className="py-24 bg-slate-900 text-center px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Come as You Are.<br />
                        <span className="text-orange-400">Leave Transformed.</span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-10">
                        You don't have to have it all figured out. Just take the next step. We'd love to walk with you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/im-new" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-4 rounded transition-colors shadow-lg shadow-orange-500/20">
                            Plan Your First Visit
                        </Link>
                        <Link to="/pray" className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded transition-colors border border-slate-700">
                            Send a Prayer Request
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default HomePage;