import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Updated: 6 Items for the middle row
const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/im-new', label: "I'm New" },
    {
        label: "Discover",
        dropdown: [
            { to: '/about', label: "Our Story" },
            { to: '/services', label: 'Programmes' },
        ]
    },
    { to: '/gallery', label: 'Gallery' },
    {
        label: "Media",
        dropdown: [
            { to: '/sermons', label: 'Sermons' },
            { to: '/events', label: 'Events' },
        ]
    },
    { to: '/contact', label: 'Contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const activeLinkStyle = { color: '#ffb703' };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#0b1d3a]/95 backdrop-blur-md shadow-xl py-3'
                    : 'bg-gradient-to-b from-[#0b1d3a]/80 to-transparent py-5'
                    }`}
            >
                <nav className="container mx-auto px-6 flex items-center justify-between">

                    {/* --- 1. Logo (Kept your specific scaling) --- */}
                    <div className="flex-1 flex justify-start">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <div className="w-48 md:w-64 flex items-center justify-start">
                                <img
                                    src="/Protegesss_.png"
                                    alt="RCCG Jesus Protege Logo"
                                    className="w-full h-auto max-h-24 object-contain object-left scale-125 md:scale-150 origin-left group-hover:scale-[1.35] md:group-hover:scale-[1.60] transition-transform duration-300"
                                />
                            </div>
                        </NavLink>
                    </div>

                    {/* --- 2. Middle Nav (Reconstructed for 6 items) --- */}
                    <div className="hidden lg:flex items-center justify-center gap-8">
                        {navLinks.map((link, index) => {
                            if (link.dropdown) {
                                return (
                                    <div key={index} className="relative group py-4">
                                        <button className="flex items-center gap-1 text-white font-semibold text-[14px] uppercase tracking-wide group-hover:text-[#ffb703] transition-colors">
                                            {link.label}
                                            <i className="fas fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform"></i>
                                        </button>

                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-44 bg-[#0b1d3a] shadow-2xl rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-2">
                                            {link.dropdown.map((sub, i) => (
                                                <NavLink
                                                    key={i}
                                                    to={sub.to}
                                                    className="block px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5 hover:text-[#ffb703] rounded-lg transition-colors font-bold uppercase tracking-wider"
                                                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                                                >
                                                    {sub.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={index}
                                    to={link.to}
                                    end={link.exact}
                                    className="text-white font-semibold text-[14px] uppercase tracking-wide hover:text-[#ffb703] transition-colors duration-300"
                                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                                >
                                    {link.label}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* --- 3. Right Action --- */}
                    <div className="flex-1 flex justify-end items-center">
                        <Link
                            to="/giving"
                            className="hidden lg:flex bg-[#ffb703] hover:bg-white text-slate-900 font-bold py-2.5 px-8 rounded-full text-[13px] uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Give
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
                        >
                            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 bottom-0 w-72 bg-[#0b1d3a] z-40 lg:hidden p-8 pt-24">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link, i) => (
                                    <div key={i}>
                                        {link.dropdown ? (
                                            <div className="mb-4">
                                                <p className="text-[#ffb703] text-[10px] uppercase font-black mb-2 opacity-50">{link.label}</p>
                                                {link.dropdown.map((sub, si) => (
                                                    <NavLink key={si} to={sub.to} onClick={() => setIsOpen(false)} className="block py-2 text-white font-bold uppercase text-sm">{sub.label}</NavLink>
                                                ))}
                                            </div>
                                        ) : (
                                            <NavLink to={link.to} onClick={() => setIsOpen(false)} className="block py-2 text-white font-bold uppercase text-sm border-b border-white/5">{link.label}</NavLink>
                                        )}
                                    </div>
                                ))}
                                <Link to="/giving" onClick={() => setIsOpen(false)} className="mt-4 bg-[#ffb703] text-center py-3 rounded-lg font-bold text-slate-900 uppercase text-xs">Give Now</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;