  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import Layout from './components/Layout';
  import ScrollToTop from './components/ScrollToTop'; 

  import HomePage from './pages/HomePage';
  import AboutPage from './pages/AboutPage';
  import ServicesPage from './pages/ServicesPage';
  import EventsPage from './pages/EventsPage';
  import GalleryPage from './pages/GalleryPage';
  import ContactPage from './pages/ContactPage';
  import AdminPage from './pages/AdminPage';
  import SermonsPage from './pages/SermonsPage';
  import GivingPage from './pages/GivingPage';
  import PrayerRequestPage from './pages/PrayerRequestPage';
  import ImNewPage from './pages/ImNewPage';
  import MinistriesPage from './pages/MinistriesPage';

  function App() {
    return (
      <>
        <ScrollToTop /> {/* ✅ Automatically scrolls on route change */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="sermons" element={<SermonsPage />} />
            <Route path="giving" element={<GivingPage />} />
            <Route path="pray" element={<PrayerRequestPage />} />
            <Route path="im-new" element={<ImNewPage />} />
            <Route path="ministries" element={<MinistriesPage />} />
          </Route>

          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </>
    );
  }

  export default App;
