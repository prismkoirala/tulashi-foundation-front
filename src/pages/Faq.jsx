import { useState } from 'react';
import { FAQS } from '../data.js';
import { Mountains, Divider } from '../components/Decor.jsx';
import { NpLine, useI18n } from '../i18n/I18nContext.jsx';

export default function Faq({ go }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>{t('faq.title')}</h1>
          <NpLine k="faq.np" />
          <p>{t('faq.lead')}</p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('faq.kicker')}</span>
            <h2>{t('faq.heading')}</h2>
            <Divider />
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${open === i ? 'open' : ''}`} key={f.id}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {t(`faq.items.${f.id}.q`)}
                  <span className="chev">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2.5 5 7 9.5 11.5 5" />
                    </svg>
                  </span>
                </button>
                <div className="faq-a">
                  <p>{t(`faq.items.${f.id}.a`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>{t('faq.ctaTitle')}</h2>
          <p>{t('faq.ctaText')}</p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            {t('faq.ctaButton')}
          </button>
        </div>
      </section>
    </main>
  );
}
