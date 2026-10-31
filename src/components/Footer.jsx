import { LOGO_URL, CONTACT, PAGES } from '../data.js';

export default function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer-flags" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="container footer-grid">
        <div>
          <a className="brand" onClick={() => go('home')}>
            <img src={LOGO_URL} alt="TSMS seal" />
            <div className="brand-text">
              <div className="np">तुलसीमान श्रेष्ठ स्मृति समाज</div>
              <div className="en">Tulasiman Shrestha Memorial Society</div>
            </div>
          </a>
          <p>
            A non-profit society devoted to the memory of Late Tulasiman Shrestha — promoting
            education, folk literature and scholarships since 2073 B.S.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {PAGES.map((p) => (
              <li key={p.id}>
                <button onClick={() => go(p.id)}>{p.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Reach Us</h4>
          <ul>
            <li>{CONTACT.address}</li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
            </li>
            <li>{CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Tulasiman Shrestha Memorial Society. All rights reserved.</span>
        <span className="devanagari">शिक्षा, लोक साहित्य र सेवा — स्मृति नै प्रेरणा हो</span>
      </div>
    </footer>
  );
}
