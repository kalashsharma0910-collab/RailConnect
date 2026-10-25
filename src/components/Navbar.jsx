import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TrainFront, Ticket, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="RailConnect home">
          <span className="brand-mark"><TrainFront size={22} /></span>
          <span>Rail<span>Connect</span></span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <LayoutDashboard size={17} /> <span>Explore</span>
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Ticket size={17} /> <span>My bookings</span>
          </NavLink>
        </nav>
        <div className="demo-pill"><span className="pulse-dot" /> DEMO MODE</div>
      </div>
    </header>
  );
}
