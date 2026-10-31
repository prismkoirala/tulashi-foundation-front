import { useState } from 'react';
import { LOGO_URL, CONTACT, PAGES } from '../data.js';
import { useAuth } from '../context/AuthContext.jsx';

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar({ page, go, hideChrome = false }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  if (hideChrome) return null;

  const nav = (id) => {
    go(id);
    setOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>{CONTACT.address}</span>
          <span>
            {CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone}
          </span>
        </div>
      </div>
      <nav className="navbar">
        <div className="container">
          <a className="brand" onClick={() => nav('home')}>
            <img src={LOGO_URL} alt="Tulasiman Shrestha Memorial Society seal" />
            <div className="brand-text">
              <div className="np">तुलसीमान श्रेष्ठ स्मृति समाज</div>
              <div className="en">Tulasiman Shrestha Memorial Society</div>
            </div>
          </a>
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {PAGES.map((p) => (
              <li key={p.id}>
                <button className={page === p.id ? 'active' : ''} onClick={() => nav(p.id)}>
                  {p.label}
                </button>
              </li>
            ))}
            <li>
              <button className="donate-btn" onClick={() => nav('contact')}>
                Donate
              </button>
            </li>
            <li>
              <button
                className={`nav-user ${page === 'login' || page === 'dashboard' ? 'active' : ''}`}
                onClick={() => nav(user ? 'dashboard' : 'login')}
                aria-label={user ? 'Open dashboard' : 'Admin login'}
                title={user ? 'Dashboard' : 'Admin login'}
              >
                <UserIcon />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
