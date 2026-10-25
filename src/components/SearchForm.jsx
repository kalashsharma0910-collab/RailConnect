import React, { useState } from 'react';
import { ArrowLeftRight, CalendarDays, MapPin, Search } from 'lucide-react';
import { stations } from '../data/trains';

function todayString() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function SearchForm({ initialSearch, onSearch, compact = false }) {
  const [from, setFrom] = useState(initialSearch?.from || 'New Delhi');
  const [to, setTo] = useState(initialSearch?.to || 'Chandigarh');
  const [date, setDate] = useState(initialSearch?.date || todayString());
  const [error, setError] = useState('');

  function swapStations() {
    setFrom(to);
    setTo(from);
  }

  function submit(event) {
    event.preventDefault();
    if (from === to) {
      setError('Choose two different stations to search.');
      return;
    }
    setError('');
    onSearch({ from, to, date });
  }

  return (
    <form className={`search-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <label className="field">
        <span className="field-label"><MapPin size={15} /> FROM</span>
        <select value={from} onChange={e => setFrom(e.target.value)}>
          {stations.map(station => <option key={station}>{station}</option>)}
        </select>
      </label>
      <button type="button" className="swap-button" onClick={swapStations} aria-label="Swap stations" title="Swap stations">
        <ArrowLeftRight size={18} />
      </button>
      <label className="field">
        <span className="field-label"><MapPin size={15} /> TO</span>
        <select value={to} onChange={e => setTo(e.target.value)}>
          {stations.map(station => <option key={station}>{station}</option>)}
        </select>
      </label>
      <label className="field date-field">
        <span className="field-label"><CalendarDays size={15} /> JOURNEY DATE</span>
        <input type="date" min={todayString()} value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <button type="submit" className="button button-primary search-button"><Search size={18} /> Search trains</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
