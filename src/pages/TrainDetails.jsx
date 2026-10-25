import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, MapPin, ShieldCheck, TrainFront } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { trains } from '../data/trains';
import { formatDate, formatDuration, formatMoney } from '../utils/format';

export default function TrainDetails({ onBook }) {
  const { trainId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const train = trains.find(item => item.id === trainId);
  const journeyDate = location.state?.search?.date || new Date().toISOString().slice(0, 10);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!train) return <main className="page-shell content-width"><div className="empty-state"><h2>Train not found</h2><button className="button button-primary" onClick={() => navigate('/')}>Back to search</button></div></main>;

  function confirmBooking(passenger) {
    const booking = {
      ...passenger,
      id: `RC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      trainId: train.id,
      trainName: train.name,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      date: journeyDate,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    onBook(booking);
    setBookingOpen(false);
    navigate('/confirmation', { state: { booking } });
  }

  return (
    <main className="page-shell content-width">
      <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft size={17} /> Back to results</button>
      <div className="detail-layout">
        <section className="detail-main">
          <div className="detail-heading"><span className="train-icon large"><TrainFront size={24} /></span><div><span className="eyebrow">JOURNEY DETAILS</span><h1>{train.name}</h1><p>Train #{train.number} <span className="separator">·</span> {train.type}</p></div></div>
          <div className="journey-panel">
            <div className="journey-date"><span>{formatDate(journeyDate)}</span><span className="demo-tag">Sample schedule</span></div>
            <div className="big-journey">
              <div><strong>{train.departure}</strong><h3>{train.from}</h3><p>Departure</p></div>
              <div className="journey-middle"><span><Clock3 size={15} /> {formatDuration(train.duration)}</span><div className="line"><span /></div><small>Direct journey</small></div>
              <div className="align-right"><strong>{train.arrival}</strong><h3>{train.to}</h3><p>Arrival</p></div>
            </div>
          </div>
          <div className="detail-info-grid">
            <div className="info-tile"><span className="info-icon"><Clock3 size={18} /></span><div><small>Journey duration</small><strong>{formatDuration(train.duration)}</strong></div></div>
            <div className="info-tile"><span className="info-icon"><MapPin size={18} /></span><div><small>Route</small><strong>{train.from} → {train.to}</strong></div></div>
            <div className="info-tile"><span className="info-icon"><CheckCircle2 size={18} /></span><div><small>Runs</small><strong>{train.days}</strong></div></div>
          </div>
          <div className="notice-card"><ShieldCheck size={20} /><div><strong>About this demo</strong><p>Times, classes, and fares are sample values for this portfolio project. They are not a live timetable or a guarantee of availability.</p></div></div>
        </section>
        <aside className="fare-card">
          <span className="eyebrow">FARE OVERVIEW</span><h2>Choose your class</h2><p className="muted">Illustrative starting fare per passenger.</p>
          <div className="class-options">{train.classes.map((item, index) => <div className={`class-option ${index === 0 ? 'selected' : ''}`} key={item}><div><strong>{item}</strong><span>{({ CC: 'AC Chair Car', EC: 'Executive Chair', SL: 'Sleeper', '3A': 'AC 3 Tier', '2A': 'AC 2 Tier', '1A': 'First AC' })[item] || 'Travel class'}</span></div><strong>{formatMoney(Math.round(train.fare * (index === 0 ? 1 : index === 1 ? 1.45 : index === 2 ? 1.9 : 2.5)))}</strong></div>)}</div>
          <div className="fare-total"><span>Starting fare</span><strong>{formatMoney(train.fare)} <small>/ person</small></strong></div>
          <button className="button button-primary full-width" onClick={() => setBookingOpen(true)}>Continue to booking <ArrowRight size={17} /></button>
          <p className="fine-print">No payment or real reservation is made.</p>
        </aside>
      </div>
      {bookingOpen && <BookingModal train={train} journeyDate={journeyDate} onClose={() => setBookingOpen(false)} onConfirm={confirmBooking} />}
    </main>
  );
}
