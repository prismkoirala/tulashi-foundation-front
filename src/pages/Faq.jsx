import { useState } from 'react';
import { FAQS } from '../data.js';
import { Mountains, Divider } from '../components/Decor.jsx';

export default function Faq({ go }) {
  const [open, setOpen] = useState(0);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <div className="np-sub">धेरैजसो सोधिने प्रश्नहरू</div>
          <p>
            Everything you might wish to know about our society, folk literature honour,
            scholarships, and how you can take part. Still curious? We are only a message away.
          </p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Good to know</span>
            <h2>Answers, with warmth</h2>
            <Divider />
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${open === i ? 'open' : ''}`} key={f.q}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {f.q}
                  <span className="chev">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2.5 5 7 9.5 11.5 5" />
                    </svg>
                  </span>
                </button>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>Didn't find your answer?</h2>
          <p>
            Write to us or visit our office — a cup of chiya and an honest conversation await you.
          </p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            Ask Us Directly
          </button>
        </div>
      </section>
    </main>
  );
}
