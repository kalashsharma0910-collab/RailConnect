import React, { useState } from 'react';
import { X, UserRound, Mail, Phone, Users } from 'lucide-react';
import { formatDate, formatMoney } from '../utils/format';

export default function BookingModal({ train, journeyDate, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('18');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelClass, setTravelClass] = useState(train.classes[0]);
  const [passengers, setPassengers] = useState('1');
  const [error, setError] = useState('');
  const total = train.fare * Number(passengers);

  function submit(event) {
    event.preventDefault();
    if (name.trim().length < 2) return setError('Please enter the passenger’s full name.');
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError('Enter a valid email address.');
    if (!/^[0-9]{10}$/.test(phone)) return setError('Enter a 10-digit mobile number.');
    if (Number(age) < 1 || Number(age) > 120) return setError('Enter an age between 1 and 120.');
    setError('');
    onConfirm({ name: name.trim(), age: Number(age), email, phone, travelClass, passengers: Number(passengers), total });
  }

  return (
    <div className="modal-backdrop" onMouseDown={e => 
    { 
      if (e.target === e.currentTarget) onClose(); 

    }}>
      <section className="booking-modal"
       role="dialog" 
       aria-modal="true"
        aria-labelledby="booking-title">

        <div className="modal-header">
          <div><span className="eyebrow">DEMO RESERVATION</span><h2 id="booking-title">Passenger details</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><X size={20} />
          </button>
        </div>
        <div className="modal-trip">
          <div>
            <strong>{train.from}</strong>
            <span>{train.departure}</span>
                        git branch -M main
            git push -u origin main</div>
          <div className="modal-trip-middle">→ <small>{formatDate(journeyDate)}</small></div>
          <div className="modal-trip-destination"><strong>{train.to}</strong><span>{train.arrival}</span></div>
        </div>
        <form className="passenger-form" onSubmit={submit}>
          <label><span><UserRound size={15} /> Full name</span><input value={name} onChange={e => setName(e.target.value)} placeholder="Passenger name" autoFocus /></label>
          <div className="form-grid">
            <label><span>Age</span><input type="number" min="1" max="120" value={age} onChange={e => setAge(e.target.value)} /></label>
            <label><span>Passengers</span><select value={passengers} onChange={e => setPassengers(e.target.value)}><option value="1">1 passenger</option><option value="2">2 passengers</option><option value="3">3 passengers</option><option value="4">4 passengers</option><option value="5">5 passengers</option><option value="6">6 passengers</option></select></label>
          </div>
          <label><span><Mail size={15} /> Email address</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
          <label><span><Phone size={15} /> Mobile number</span><input inputMode="numeric" maxLength="10" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number" /></label>
          <label><span><Users size={15} /> Travel class</span><select value={travelClass} onChange={e => setTravelClass(e.target.value)}>{train.classes.map(item => <option key={item}>{item}</option>)}</select></label>
          {error && <p className="form-error">{error}</p>}
          <div className="fare-summary"><div><span>Demo fare × {passengers}</span><strong>{formatMoney(train.fare)} × {passengers}</strong></div><div className="total-row"><span>Total demo fare</span><strong>{formatMoney(total)}</strong></div></div>
          <button className="button button-primary full-width" type="submit">Confirm demo booking <span>→</span></button>
          <p className="fine-print">No payment is collected. This does not create a real railway ticket.</p>
        </form>
      </section>
    </div>
  );
}
