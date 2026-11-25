import { LOGO_URL, PORTRAIT_URL, PROGRAMS, GALLERY } from '../data.js';
import { Mountains, Divider, Icon } from '../components/Decor.jsx';
import { NpLine, useI18n } from '../i18n/I18nContext.jsx';

export default function Home({ go }) {
  const { lang, t } = useI18n();
  const titleBefore = t('home.titleBefore');

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-eyebrow">{t('home.eyebrow')}</div>
            <h1>
              {titleBefore ? `${titleBefore} ` : ''}
              <em>{t('home.titleEm')}</em> {t('home.titleAfter')}
            </h1>
            <div className="np-tagline">{t('home.motto')}</div>
            <p className="lead">{t('home.lead')}</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => go('contact')}>
                {t('home.support')}
              </button>
              <button className="btn btn-outline" onClick={() => go('testimonials')}>
                {t('home.seeWork')}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-portrait" src={PORTRAIT_URL} alt={t('home.portraitAlt')} />
            <div className="hero-seal">
              <img src={LOGO_URL} alt={t('brand.seal')} />
            </div>
          </div>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-photo-frame">
            <img src={GALLERY[0].src} alt={t('home.photoAlt')} loading="lazy" />
          </div>
          <div className="about-copy">
            <div className="section-head" style={{ textAlign: 'left', margin: '0 0 24px' }}>
              <span className="kicker">{t('home.who')}</span>
              <h2>{t('home.promise')}</h2>
              <Divider />
            </div>
            <h3 style={{ display: 'none' }}>About</h3>
            <p>{t('home.about1')}</p>
            <p>{t('home.about2')}</p>
            <ul className="about-values">
              <li>
                <span className="lotus">
                  <Icon name="heart" size={22} />
                </span>
                <div>
                  <strong>{t('home.value1Title')}</strong>
                  <span>{t('home.value1Text')}</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="book" size={22} />
                </span>
                <div>
                  <strong>{t('home.value2Title')}</strong>
                  <span>{t('home.value2Text')}</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="users" size={22} />
                </span>
                <div>
                  <strong>{t('home.value3Title')}</strong>
                  <span>{t('home.value3Text')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section crimson-band">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('home.impactKicker')}</span>
            <h2>{t('home.impactTitle')}</h2>
            <p>{t('home.impactText')}</p>
            <Divider />
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div className="num">80+</div>
              <div className="label">{t('home.statMembers')}</div>
              <NpLine k="home.statMembersNp" />
            </div>
            <div className="stat">
              <div className="num">8</div>
              <div className="label">{t('home.statHonours')}</div>
              <NpLine k="home.statHonoursNp" />
            </div>
            <div className="stat">
              <div className="num">2</div>
              <div className="label">{t('home.statSchools')}</div>
              <NpLine k="home.statSchoolsNp" />
            </div>
            <div className="stat">
              <div className="num">9+</div>
              <div className="label">{t('home.statYears')}</div>
              <NpLine k="home.statYearsNp" />
            </div>
          </div>
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('home.workKicker')}</span>
            <h2>{t('home.workTitle')}</h2>
            <p>{t('home.workText')}</p>
            <Divider />
          </div>
          <div className="program-grid">
            {PROGRAMS.map((p) => (
              <article className="program-card" key={p.id}>
                <div className="program-icon">
                  <Icon name={p.icon} />
                </div>
                {lang === 'en' && <span className="np-label">{t(`programs.${p.id}.np`)}</span>}
                <h3>{t(`programs.${p.id}.title`)}</h3>
                <p>{t(`programs.${p.id}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-banner">
          <p className="np-quote">{t('home.quoteNp')}</p>
          <blockquote>{t('home.quote')}</blockquote>
          <cite>{t('home.quoteCite')}</cite>
        </div>
      </section>

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaText')}</p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            {t('home.ctaButton')}
          </button>
        </div>
      </section>
    </main>
  );
}
