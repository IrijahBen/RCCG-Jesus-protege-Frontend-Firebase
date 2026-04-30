import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, appId } from '../firebase';
import { motion } from 'framer-motion';

const EventCard = ({ event, featured = false }) => {
  const date = new Date(event.date);
  const month = date.toLocaleDateString('en-UG', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-UG', { weekday: 'long' });
  const year = date.getFullYear();

  if (featured) return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d3a] to-[#1e3a8a]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="relative p-10 md:p-14 text-white">
        <span className="badge bg-amber-400 text-amber-900 mb-6">Featured Event</span>
        <div className="flex items-start gap-8">
          <div className="text-center bg-white/10 rounded-2xl p-4 flex-shrink-0">
            <p className="text-blue-300 text-sm font-bold tracking-wider">{month}</p>
            <p className="font-display text-5xl font-bold">{day}</p>
            <p className="text-blue-300 text-sm">{year}</p>
          </div>
          <div>
            <p className="text-blue-300 text-sm mb-2">{weekday}</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{event.title}</h3>
            <p className="text-blue-100 leading-relaxed max-w-xl">{event.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 overflow-hidden border border-gray-100"
    >
      <div className="flex">
        {/* Date sidebar */}
        <div className="w-20 md:w-24 bg-gradient-to-b from-blue-700 to-indigo-700 flex flex-col items-center justify-center py-6 flex-shrink-0">
          <p className="text-blue-300 text-xs font-bold tracking-wider">{month}</p>
          <p className="font-display text-4xl font-bold text-white leading-none">{day}</p>
          <p className="text-blue-300 text-xs mt-1">{year}</p>
        </div>
        {/* Content */}
        <div className="p-6 flex-1">
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-2">{weekday}</p>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{event.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventsColRef = collection(db, `artifacts/${appId}/public/data/events`);
    const q = query(eventsColRef, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => {
      setError("Failed to load events.");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now);
  const past = events.filter(e => new Date(e.date) < now);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading Events...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden gradient-navy py-28 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 border border-white/30 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">What's Happening</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-6xl font-bold mb-4">Events & Activities</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-blue-200 text-lg max-w-xl mx-auto">Stay connected. Don't miss what God is doing at VCM.</motion.p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-red-700 text-center">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 ? (
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              Upcoming Events
            </h2>
            {/* Featured first event */}
            {upcoming[0] && <div className="mb-6"><EventCard event={upcoming[0]} featured /></div>}
            {/* Rest */}
            {upcoming.length > 1 && (
              <div className="grid md:grid-cols-2 gap-5 mt-5">
                {upcoming.slice(1).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fas fa-calendar text-6xl text-gray-200 mb-4"></i>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No upcoming events</h3>
            <p className="text-gray-400">Check back soon — God is always at work!</p>
          </div>
        )}

        {/* Weekly Program */}
        <div className="bg-white rounded-3xl shadow-lg p-10 mb-16 border border-gray-100">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Weekly Program</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { day: "Sunday", time: "8:00 AM & 10:30 AM", title: "Worship Services", icon: "fas fa-church", color: "from-blue-600 to-blue-700" },
              { day: "Wednesday", time: "5:30 PM", title: "Bible Study", icon: "fas fa-bible", color: "from-indigo-500 to-indigo-700" },
              { day: "Friday", time: "5:00 PM", title: "Worship Tabernacle", icon: "fas fa-fire", color: "from-amber-500 to-amber-600" },
            ].map(({ day, time, title, icon, color }) => (
              <div key={day} className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <i className={`${icon} text-white text-xl`}></i>
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">{day}</p>
                <h3 className="font-bold text-xl mb-1">{title}</h3>
                <p className="text-white/80 text-sm">{time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        {past.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-gray-500">Past Events</h2>
            <div className="grid md:grid-cols-2 gap-5 opacity-70">
              {past.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;