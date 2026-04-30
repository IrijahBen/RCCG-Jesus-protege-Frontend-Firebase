import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0b1d3a] text-slate-300 pt-24 pb-12 border-t border-slate-800">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 items-start">

                    {/* Column 1: Brand & Identity - TIGHT VERTICAL STACK */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="mb-2"> {/* Reduced margin to pull text closer */}
                            <img
                                src="/Protegesss_.png"
                                alt="RCCG Jesus Protege Logo"
                                className="w-48 h-auto object-contain"
                            />
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-400 max-w-xs mb-8">
                            The Goodnews Center is based on faith, hope, and love, committed to serving God and humanity in our environment and wherever we find ourselves.
                        </p>

                        {/* Social Icons positioned under text with modern PlayFlow styling */}
                        <div className="flex gap-2">
                            {['facebook-f', 'instagram', 'tiktok', 'youtube'].map((icon) => (
                                <a
                                    key={icon}
                                    href="#"
                                    className="w-9 h-9 bg-white/5 hover:bg-[#ffb703] hover:text-[#0b1d3a] rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10"
                                >
                                    <i className={`fab fa-${icon} text-xs`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Navigate */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-8">Navigate</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/im-new" className="hover:text-[#ffb703] transition-colors">I'm New</Link></li>
                            <li><Link to="/about" className="hover:text-[#ffb703] transition-colors">Our Story</Link></li>
                            <li><Link to="/sermons" className="hover:text-[#ffb703] transition-colors">Sermons</Link></li>
                            <li><Link to="/events" className="hover:text-[#ffb703] transition-colors">Events</Link></li>
                            <li><Link to="/giving" className="hover:text-[#ffb703] transition-colors">Give</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-8">Connect</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link to="/contact" className="hover:text-[#ffb703] transition-colors">Contact Us</Link></li>
                            <li><Link to="/pray" className="hover:text-[#ffb703] transition-colors">Request Prayer</Link></li>
                            <li><Link to="/ministries" className="hover:text-[#ffb703] transition-colors">Join a Ministry</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Stay Updated & Contact Info */}
                    <div className="lg:col-span-4">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-8">Stay Updated</h4>
                        <form className="flex mb-8 rounded-xl overflow-hidden bg-white/5 border border-white/10 focus-within:border-[#ffb703] p-1 transition-all">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent text-white px-3 py-2 w-full outline-none text-sm"
                            />
                            <button className="bg-[#ffb703] text-slate-900 px-5 rounded-lg font-bold hover:bg-white transition-colors">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>

                        <div className="space-y-4 text-[12px] text-slate-400">
                            <div className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt text-[#ffb703] mt-0.5"></i>
                                <span>Cowbell Building, Ogunpa off Oke Bola Highway, Ibadan</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fas fa-phone text-[#ffb703]"></i>
                                <span>+234 901 222 5633</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fas fa-envelope text-[#ffb703]"></i>
                                <span>rccgjesusprotege@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Perfectly centered and spaced */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500">
                    <p>© {new Date().getFullYear()} RCCG JESUS PROTEGE. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-1 mt-4 md:mt-0">
                        DESIGNED WITH <i className="fas fa-heart text-red-500 mx-0.5 animate-pulse"></i> BY The Sight Technology Hub
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;