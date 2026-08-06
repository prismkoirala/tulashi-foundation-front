import { useState, useEffect, useCallback } from 'react';
import { GALLERY, VOICES } from '../data.js';
import { Mountains, Divider } from '../components/Decor.jsx';

export default function Testimonials() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) => setActive((i) => (i + dir + GALLERY.length) % GALLERY.length),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Testimonials &amp; Memories</h1>
          <div className="np-sub">स्मृतिहरू र अनुभूतिहरू</div>
          <p>
            Glimpses from scholarship days, health camps and classrooms — and the voices of the
            students and families whose journeys we are honoured to share.
          </p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Gallery</span>
            <h2>Moments we hold dear</h2>
            <p>Click any photograph to view it in full. Every frame is a story of hope.</p>
            <Divider />
          </div>
          <div className="gallery-grid">
            {GALLERY.map((img, i) => (
              <figure
                className="gallery-item"
                key={img.src}
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
                aria-label={img.caption}
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <figcaption className="caption">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-head">
            <span className="kicker">In their words</span>
            <h2>Voices of our family</h2>
            <Divider />
          </div>
          <div className="voice-grid">
            {VOICES.map((v) => (
              <article className="voice-card" key={v.name}>
                <p>{v.quote}</p>
                <div className="who">
                  <strong>{v.name}</strong>
                  <span>{v.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button
            className="lb-btn lb-close"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="lb-btn lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={GALLERY[active].src}
            alt={GALLERY[active].caption}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-btn lb-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="lb-count">
            {active + 1} / {GALLERY.length} — {GALLERY[active].caption}
          </div>
        </div>
      )}
    </main>
  );
}
