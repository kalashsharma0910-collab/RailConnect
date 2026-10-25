import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CircleX, Clock3, Ticket, TrainFront } from 'lucide-react';
import { formatDate, formatMoney } from '../utils/format';

export default function MyBookings({ bookings, onCancel }) {
  const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <main className="page-shell content-width">
      <div className="page-title-row"><div><span className="eyebrow">YOUR TRAVEL SPACE</span><h1>My bookings</h1><p>All your demo reservations in one place.</p></div><span className="booking-count">{bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}</span></div>
      <div className="notice-card booking-notice"><Ticket size={20} /><div><strong>Stored in this browser</strong><p>Booking history uses LocalStorage. It is not synced to an account or railway service.</p></div></div>
      {sorted.length === 0 ? (
        <div className="empty-state bookings-empty"><span><TrainFront size={30} /></span><h2>No bookings yet</h2><p>Your demo reservations will appear here after you complete a booking.</p><Link to="/" className="button button-primary">Explore trains</Link></div>
      ) : (
        <div className="booking-list">{sorted.map(booking => (
          <article className={`booking-card ${booking.status === 'Cancelled' ? 'cancelled' : ''}`} key={booking.id}>
            <div className="booking-card-top"><div className="booking-ref"><span className="train-icon"><TrainFront size={19} /></span><div><strong>{booking.id}</strong><span>{booking.trainName} · #{booking.trainNumber}</span></div></div><span className={booking.status === 'Cancelled' ? 'status-badge cancelled-badge' : 'status-badge'}>{booking.status}</span></div>
            <div className="booking-route"><div><small>FROM</small><strong>{booking.from}</strong><span>{booking.departure}</span></div><div className="booking-route-mid"><span><Clock3 size={14} /></span><div /></div><div><small>TO</small><strong>{booking.to}</strong><span>{booking.arrival}</span></div></div>
            <div className="booking-card-bottom"><div><CalendarDays size={15} /><span>{formatDate(booking.date)}</span><i /> <span>{booking.travelClass} · {booking.passengers} passenger(s)</span></div><strong>{formatMoney(booking.total)}</strong></div>
            {booking.status !== 'Cancelled' && <button className="cancel-button" onClick={() => onCancel(booking.id)}><CircleX size={15} /> Cancel demo booking</button>}
          </article>
        ))}</div>
      )}
    </main>
  );
}
