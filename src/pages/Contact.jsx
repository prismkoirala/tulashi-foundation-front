import { useState } from 'react';
import { CONTACT } from '../data.js';
import { Mountains, Divider, Icon } from '../components/Decor.jsx';
import { NpLine, useI18n } from '../i18n/I18nContext.jsx';

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <NpLine k="contact.np" />
          <p>{t('contact.lead')}</p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('contact.kicker')}</span>
            <h2>{t('contact.heading')}</h2>
            <Divider />
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>{t('contact.org')}</h3>
              <NpLine k="contact.orgNp" />
              <div className="contact-rows">
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="pin" size={22} />
                  </span>
                  <div>
                    <strong>{t('contact.addressLabel')}</strong>
                    <span>{t('contact.address')}</span>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="phone" size={22} />
                  </span>
                  <div>
                    <strong>{t('contact.phoneLabel')}</strong>
                    <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
                    {CONTACT.mobile ? (
                      <>
                        <br />
                        <a href={`tel:${CONTACT.mobile}`}>{CONTACT.mobile}</a>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="mail" size={22} />
                  </span>
                  <div>
                    <strong>{t('contact.emailLabel')}</strong>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="clock" size={22} />
                  </span>
                  <div>
                    <strong>{t('contact.hoursLabel')}</strong>
                    <span>{t('contact.hours')}</span>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row2">
                  <input type="text" name="name" placeholder={t('contact.name')} required />
                  <input type="email" name="email" placeholder={t('contact.email')} required />
                </div>
                <input type="text" name="subject" placeholder={t('contact.subject')} />
                <textarea name="message" placeholder={t('contact.message')} required />
                {sent && <div className="form-note">{t('contact.sent')}</div>}
                <button type="submit" className="btn btn-crimson" style={{ justifySelf: 'start' }}>
                  {t('contact.send')}
                </button>
              </form>
            </div>

            <div className="map-frame">
              <iframe
                title={t('contact.map')}
                src={CONTACT.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
