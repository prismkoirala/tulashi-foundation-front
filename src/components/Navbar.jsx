import { useEffect, useRef, useState } from 'react';
import { LOGO_URL, CONTACT, PAGES } from '../data.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';
import FlagIcon from './FlagIcon.jsx';

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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { user } = useAuth();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    if (!langOpen) return undefined;
    const onPointer = (event) => {
      if (!langRef.current?.contains(event.target)) setLangOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  if (hideChrome) return null;

  const nav = (id) => {
    go(id);
    setOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>{t('contact.address')}</span>
          <span>
            {CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone}
          </span>
        </div>
      </div>
      <nav className="navbar">
        <div className="container">
          <a className="brand" onClick={() => nav('home')}>
            <img src={LOGO_URL} alt={t('brand.seal')} />
            <div className="brand-text">
              <div className="np">तुलसीमान श्रेष्ठ स्मृति समाज</div>
              <div className="en">Tulasiman Shrestha Memorial Society</div>
            </div>
          </a>
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={t('nav.menu')}
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
                  {t(`nav.${p.id}`)}
                </button>
              </li>
            ))}
            <li>
              <button className="donate-btn" onClick={() => nav('contact')}>
                {t('nav.donate')}
              </button>
            </li>
            <li>
              <button
                className={`nav-user ${page === 'login' || page === 'dashboard' ? 'active' : ''}`}
                onClick={() => nav(user ? 'dashboard' : 'login')}
                aria-label={user ? t('nav.dashboard') : t('nav.login')}
                title={user ? t('nav.dashboard') : t('nav.login')}
              >
                <UserIcon />
              </button>
            </li>
            <li className="lang-menu" ref={langRef}>
              <button
                type="button"
                className={`lang-toggle${langOpen ? ' open' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t('nav.language')}
                onClick={() => setLangOpen((current) => !current)}
              >
                <FlagIcon code={lang === 'ne' ? 'np' : 'us'} />
                <svg className="lang-caret" viewBox="0 0 12 8" aria-hidden="true">
                  <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              {langOpen && (
                <ul className="lang-list" role="listbox" aria-label={t('nav.language')}>
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === 'ne'}
                      onClick={() => {
                        setLang('ne');
                        setLangOpen(false);
                      }}
                    >
                      <FlagIcon code="np" />
                      {t('nav.nepali')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === 'en'}
                      onClick={() => {
                        setLang('en');
                        setLangOpen(false);
                      }}
                    >
                      <FlagIcon code="us" />
                      {t('nav.english')}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
