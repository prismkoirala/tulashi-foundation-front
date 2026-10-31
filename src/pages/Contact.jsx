import { useState } from 'react';
import { CONTACT } from '../data.js';
import { Mountains, Divider, Icon } from '../components/Decor.jsx';

export default function Contact() {
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
          <h1>Contact Us</h1>
          <div className="np-sub">सम्पर्क गर्नुहोस्</div>
          <p>
            Whether you wish to support a scholarship, become a member, or learn about our folk
            literature programmes — our door, and our hearts, are open.
          </p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Reach out</span>
            <h2>We would love to hear from you</h2>
            <Divider />
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Tulasiman Shrestha Memorial Society</h3>
              <div className="np-sub">तुलसीमान श्रेष्ठ स्मृति समाज</div>
              <div className="contact-rows">
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="pin" size={22} />
                  </span>
                  <div>
                    <strong>Office Address</strong>
                    <span>{CONTACT.address}</span>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="phone" size={22} />
                  </span>
                  <div>
                    <strong>Phone</strong>
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
                    <strong>Email</strong>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="ic">
                    <Icon name="clock" size={22} />
                  </span>
                  <div>
                    <strong>Office Hours</strong>
                    <span>{CONTACT.hours}</span>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row2">
                  <input type="text" name="name" placeholder="Your full name" required />
                  <input type="email" name="email" placeholder="Email address" required />
                </div>
                <input type="text" name="subject" placeholder="Subject (e.g. Membership, scholarship)" />
                <textarea name="message" placeholder="Your message…" required />
                {sent && (
                  <div className="form-note">
                    Dhanyabad! Your message has been noted. We will reply within a few days.
                  </div>
                )}
                <button type="submit" className="btn btn-crimson" style={{ justifySelf: 'start' }}>
                  Send Message
                </button>
              </form>
            </div>

            <div className="map-frame">
              <iframe
                title="Tulasiman Shrestha Memorial Society — location map"
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
