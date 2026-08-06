import { useState } from 'react';
import { LOGO_URL, CONTACT, PAGES } from '../data.js';

export default function Navbar({ page, go }) {
  const [open, setOpen] = useState(false);

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
          </ul>
        </div>
      </nav>
    </>
  );
}
