import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, appId } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const galleryColRef = collection(db, `artifacts/${appId}/public/data/gallery`);
    const q = query(galleryColRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGalleryItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => { setLoading(false); });
    return () => unsubscribe();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.type === filter);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading Gallery...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3">
          {[
            'https://drive.google.com/thumbnail?id=1al3tt96B-pjbmpS1dCkIFyItCA9iSDut&sz=w1200&.jpg',
            'https://drive.google.com/thumbnail?id=1y9beH4Of8TivBhOepSEQrybg3DtepZqB&sz=w1200&.jpg',
            'https://drive.google.com/thumbnail?id=1y9beH4Of8TivBhOepSEQrybg3DtepZqB&sz=w1200&.jpg',
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-full object-cover" />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1d3a]/70 via-[#0b1d3a]/60 to-[#0b1d3a]/80" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">Moments & Memories</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-6xl font-bold">Our Gallery</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-blue-200 mt-3 text-lg">Life together at RCCG JESUS PROTEGE</motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="bg-white sticky top-[60px] z-20 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {[
              { value: 'all', label: 'All', icon: 'fas fa-th' },
              { value: 'image', label: 'Photos', icon: 'fas fa-camera' },
              { value: 'video', label: 'Videos', icon: 'fas fa-video' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  filter === tab.value
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={tab.icon}></i> {tab.label}
              </button>
            ))}
            <span className="ml-auto text-gray-400 text-sm self-center whitespace-nowrap">
              {filtered.length} {filter === 'all' ? 'items' : filter === 'image' ? 'photos' : 'videos'}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <i className="fas fa-images text-6xl text-gray-200 mb-4"></i>
              <p className="text-gray-400 text-xl font-medium">No items yet</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for photos and videos from our services.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => item.type === 'image' && setLightbox(item)}
                    className={`relative rounded-2xl overflow-hidden group break-inside-avoid mb-4 shadow-md hover:shadow-xl transition-shadow duration-300 ${
                      item.type === 'image' ? 'cursor-pointer' : ''
                    }`}
                  >
                    {item.type === 'image' ? (
                      <>
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <p className="text-white font-bold text-sm">{item.title}</p>
                            {item.description && <p className="text-white/70 text-xs mt-1">{item.description}</p>}
                          </div>
                          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <i className="fas fa-expand text-white text-sm"></i>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-gray-900 rounded-2xl overflow-hidden">
                        <video controls className="w-full">
                          <source src={item.url} type="video/mp4" />
                        </video>
                        <div className="p-3 bg-gray-900">
                          <p className="text-white text-sm font-semibold">{item.title}</p>
                          {item.description && <p className="text-gray-400 text-xs mt-1">{item.description}</p>}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-xl">{lightbox.title}</h3>
                {lightbox.description && <p className="text-gray-400 text-sm mt-1">{lightbox.description}</p>}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
