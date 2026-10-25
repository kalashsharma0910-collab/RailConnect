import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrainDetails from './pages/TrainDetails';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import { getBookings, saveBookings } from './utils/storage';
import { ArrowUpRight } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

export default function App() {
  const [bookings, setBookings] = useState(() => getBookings());
  const [toast, setToast] = useState('');

  useEffect(() => { saveBookings(bookings); }, [bookings]);

  function addBooking(booking) {
    setBookings(current => [booking, ...current]);
    setToast('Demo booking saved successfully');
    window.setTimeout(() => setToast(''), 3200);
  }

  function cancelBooking(id) {
    setBookings(current => current.map(item => item.id === id ? { ...item, status: 'Cancelled' } : item));
    setToast('Demo booking cancelled');
    window.setTimeout(() => setToast(''), 3200);
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/train/:trainId" element={<TrainDetails onBook={addBooking} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/bookings" element={<MyBookings bookings={bookings} onCancel={cancelBooking} />} />
        <Route path="*" element={<main className="page-shell content-width"><div className="empty-state"><h2>Page not found</h2><a className="button button-primary" href="/">Go home</a></div></main>} />
      </Routes>
      <footer className="footer"><div className="footer-inner"><a href="/" className="brand footer-brand"><span className="brand-mark"><span className="footer-train">↗</span></span><span>Rail<span>Connect</span></span></a><p>Discover routes and organize your travel plans with ease.</p><div className="footer-right"><span>Plan your next journey</span><ArrowUpRight size={15} /></div></div></footer>
      {toast && <div className="toast"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  );
}
