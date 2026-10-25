import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, Copy, Ticket, TrainFront } from 'lucide-react';
import { useState } from 'react';
import { formatDate, formatMoney } from '../utils/format';

export default function Confirmation() {
  const { state } = useLocation();
  const booking = state?.booking;
  const [copied, setCopied] = useState(false);

  if (!booking) return <main className="page-shell content-width"><div className="empty-state"><h2>No booking to display</h2><p>Create a demo booking to see its confirmation.</p><Link className="button button-primary" to="/">Search trains</Link></div></main>;

  async function copyReference() {
    try { await navigator.clipboard.writeText(booking.id); setCopied(true); }
    catch { setCopied(false); }
  }

  return (
    <main className="page-shell content-width confirmation-page">
      <div className="success-icon"><Check size={34} /></div>
      <span className="eyebrow">DEMO BOOKING COMPLETE</span>
      <h1>Your journey is planned.</h1>
      <p className="confirmation-subtitle">A sample booking has been saved in this browser. This is not a real railway ticket.</p>
      <section className="ticket-card">
        <div className="ticket-top"><div className="ticket-brand"><span className="brand-mark"><TrainFront size={20} /></span><strong>RailConnect</strong></div><span className="confirmed-badge"><Check size={14} /> Demo confirmed</span></div>
        <div className="ticket-route"><div><small>FROM</small><h2>{booking.from}</h2><strong>{booking.departure}</strong></div><div className="ticket-route-line"><span>✦</span><div /></div><div className="ticket-dest"><small>TO</small><h2>{booking.to}</h2><strong>{booking.arrival}</strong></div></div>
        <div className="ticket-divider"><span></span><span></span></div>
        <div className="ticket-details">
          <div><small>PASSENGER</small><strong>{booking.name}</strong></div><div><small>JOURNEY DATE</small><strong>{formatDate(booking.date)}</strong></div><div><small>TRAIN</small><strong>{booking.trainName}</strong></div><div><small>CLASS / PEOPLE</small><strong>{booking.travelClass} · {booking.passengers}</strong></div><div><small>DEMO FARE</small><strong>{formatMoney(booking.total)}</strong></div><div><small>STATUS</small><strong className="green-text">{booking.status}</strong></div>
        </div>
        <div className="booking-reference"><div><small>DEMO BOOKING REFERENCE</small><strong>{booking.id}</strong></div><button className="icon-button" onClick={copyReference} title="Copy reference"><Copy size={17} />{copied ? 'Copied' : ''}</button></div>
      </section>
      <div className="confirmation-actions"><Link className="button button-primary" to="/bookings"><Ticket size={17} /> View my bookings</Link><Link className="button button-outline" to="/">Book another journey</Link></div>
    </main>
  );
}
