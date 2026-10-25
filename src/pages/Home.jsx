import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownUp, ArrowRight, BadgeCheck, CalendarCheck, ShieldCheck, Sparkles, TrainFront } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import TrainCard from '../components/TrainCard';
import { trains } from '../data/trains';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: 'New Delhi', to: 'Chandigarh', date: new Date().toISOString().slice(0, 10) });
  const [hasSearched, setHasSearched] = useState(false);
  const [sort, setSort] = useState('recommended');
  const [classFilter, setClassFilter] = useState('all');

  const results = useMemo(() => {
    let found = trains.filter(train => train.from === search.from && train.to === search.to);
    if (classFilter !== 'all') found = found.filter(train => train.classes.includes(classFilter));
    if (sort === 'price') found.sort((a, b) => a.fare - b.fare);
    if (sort === 'duration') found.sort((a, b) => a.duration - b.duration);
    if (sort === 'departure') found.sort((a, b) => a.departure.localeCompare(b.departure));
    return found;
  }, [search, sort, classFilter]);

  function doSearch(nextSearch) {
    setSearch(nextSearch);
    setHasSearched(true);
    setSort('recommended');
    setClassFilter('all');
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  function selectTrain(train) {
    navigate(`/train/${train.id}`, { state: { train, search } });
  }

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={14} /> YOUR NEXT JOURNEY STARTS HERE</span>
              <h1>Every journey<br />has a <em>better way.</em></h1>
              <p>Find your route, compare your options, and plan your next trip — all in one place.</p>
              <div className="hero-trust"><span><BadgeCheck size={16} /> Simple search</span><span><ShieldCheck size={16} /> Demo-safe booking</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="sun"></div><div className="mountain mountain-back"></div><div className="mountain mountain-front"></div>
              <div className="track track-one"></div><div className="track track-two"></div>
              <div className="train-illustration"><div className="train-window"></div><div className="train-window"></div><div className="train-window"></div><div className="train-nose"></div></div>
              <div className="art-label"><span className="art-label-dot"></span> Your journey, simplified</div>
            </div>
          </div>
          <div className="search-wrap">
            <div className="search-card">
              <div className="search-card-heading"><div><span className="eyebrow">PLAN YOUR TRIP</span><h2>Where would you like to go?</h2></div><span className="step-count"><span>01</span> / SEARCH</span></div>
              <SearchForm initialSearch={search} onSearch={doSearch} />
              <p className="sample-note">This portfolio demo uses illustrative sample train data, not live railway schedules.</p>
            </div>
          </div>
        </section>

        <section className="benefits content-width">
          <div className="benefit"><span className="benefit-icon"><ArrowDownUp size={20} /></span><div><strong>Compare with ease</strong><p>Sort journeys by price, time, or departure.</p></div></div>
          <div className="benefit"><span className="benefit-icon"><CalendarCheck size={20} /></span><div><strong>Plan your date</strong><p>Choose a journey date that works for you.</p></div></div>
          <div className="benefit"><span className="benefit-icon"><ShieldCheck size={20} /></span><div><strong>Safe demo booking</strong><p>Try the booking flow without payment.</p></div></div>
        </section>

        <section className="results-section content-width" id="results">
          <div className="section-heading">
            <div><span className="eyebrow">{hasSearched ? 'SEARCH RESULTS' : 'GET INSPIRED'}</span><h2>{hasSearched ? `${search.from} to ${search.to}` : 'Popular demo routes'}</h2><p>{hasSearched ? 'Choose a journey to see details and continue.' : 'Try one of the sample journeys below.'}</p></div>
            {hasSearched && <span className="results-count">{results.length} {results.length === 1 ? 'train' : 'trains'} found</span>}
          </div>
          {hasSearched && (
            <div className="filter-bar">
              <label>Travel class <select value={classFilter} onChange={e => setClassFilter(e.target.value)}><option value="all">All classes</option><option value="CC">CC</option><option value="EC">EC</option><option value="SL">SL</option><option value="3A">3A</option><option value="2A">2A</option><option value="1A">1A</option></select></label>
              <label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price">Lowest fare</option><option value="duration">Shortest duration</option><option value="departure">Departure time</option></select></label>
            </div>
          )}
          {results.length > 0 ? (
            <div className="train-list">{(hasSearched ? results : trains.filter(t => t.from === 'New Delhi' && t.to === 'Chandigarh').slice(0, 2)).map(train => <TrainCard key={train.id} train={train} onSelect={selectTrain} />)}</div>
          ) : (
            <div className="empty-state"><span><TrainFront size={28} /></span><h3>No sample trains found</h3><p>Try another station pair or change your travel class.</p><button className="button button-outline" onClick={() => { setClassFilter('all'); setSearch({ from: 'New Delhi', to: 'Chandigarh', date: search.date }); }}>Reset search</button></div>
          )}
          {!hasSearched && <button className="text-button" onClick={() => { setHasSearched(true); document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore all results <ArrowRight size={16} /></button>}
        </section>
        <section className="bottom-cta content-width"><div><span className="eyebrow">MADE FOR YOUR NEXT ADVENTURE</span><h2>Good trips begin with a plan.</h2><p>Search a route above and explore the RailConnect demo experience.</p></div><TrainFront size={74} strokeWidth={1.2} /></section>
      </main>
    </>
  );
}
