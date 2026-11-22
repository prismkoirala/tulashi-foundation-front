import { LOGO_URL, CONTACT, PAGES } from '../data.js';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function Footer({ go }) {
  const { t } = useI18n();
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
            <img src={LOGO_URL} alt={t('brand.sealShort')} />
            <div className="brand-text">
              <div className="np">तुलसीमान श्रेष्ठ स्मृति समाज</div>
              <div className="en">Tulasiman Shrestha Memorial Society</div>
            </div>
          </a>
          <p>{t('footer.blurb')}</p>
        </div>
        <div>
          <h4>{t('footer.explore')}</h4>
          <ul>
            {PAGES.map((p) => (
              <li key={p.id}>
                <button onClick={() => go(p.id)}>{t(`nav.${p.id}`)}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t('footer.reach')}</h4>
          <ul>
            <li>{t('contact.address')}</li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
            </li>
            <li>{t('contact.hours')}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
        <span className="devanagari">{t('footer.motto')}</span>
      </div>
    </footer>
  );
}
