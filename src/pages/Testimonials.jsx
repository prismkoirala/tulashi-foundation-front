import { useState, useEffect, useCallback, useMemo } from 'react';
import { Mountains, Divider } from '../components/Decor.jsx';
import { fetchTestimonials } from '../lib/api.js';
import { isSupabaseConfigured } from '../lib/supabase.js';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        setError('Events will appear once Supabase keys are configured.');
        return;
      }
      try {
        const data = await fetchTestimonials();
        if (alive) setItems(data);
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const flatImages = useMemo(
    () =>
      items.flatMap((item) =>
        (item.images || []).map((img) => ({
          ...img,
          title: item.title,
          event_address: item.event_address,
        }))
      ),
    [items]
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) => {
      if (!flatImages.length) return;
      setActive((i) => (i + dir + flatImages.length) % flatImages.length);
    },
    [flatImages.length]
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

  const openFromItem = (item, imageIndex = 0) => {
    const first = item.images?.[imageIndex];
    if (!first) return;
    const idx = flatImages.findIndex((img) => img.id === first.id);
    if (idx >= 0) setActive(idx);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Events &amp; Memories</h1>
          <div className="np-sub">स्मृतिहरू र कार्यक्रमहरू</div>
          <p>
            Scholarship days, folk literature honours, and gatherings — moments from the society’s
            journey in education and folk heritage.
          </p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Gallery</span>
            <h2>Moments we hold dear</h2>
            <p>Each entry includes place, story, and photographs from the day.</p>
            <Divider />
          </div>

          {loading && <div className="dash-empty">Loading events…</div>}
          {!loading && error && <div className="dash-alert">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="dash-empty">
              Events and memories will appear here once published from the admin dashboard.
            </div>
          )}

          <div className="event-list">
            {items.map((item) => (
              <article className="event-card" key={item.id}>
                <div className="event-copy">
                  <h3>{item.title}</h3>
                  {item.event_address && (
                    <div className="event-place">{item.event_address}</div>
                  )}
                  {item.description && <p>{item.description}</p>}
                </div>
                {(item.images || []).length > 0 && (
                  <div className="event-gallery">
                    {item.images.map((img, i) => (
                      <button
                        type="button"
                        className="event-thumb"
                        key={img.id}
                        onClick={() => openFromItem(item, i)}
                        aria-label={`${item.title} photo ${i + 1}`}
                      >
                        <img src={img.image_url} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {active !== null && flatImages[active] && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-btn lb-close" onClick={close} aria-label="Close">
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
            src={flatImages[active].image_url}
            alt={flatImages[active].title}
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
            {active + 1} / {flatImages.length} — {flatImages[active].title}
            {flatImages[active].event_address ? ` · ${flatImages[active].event_address}` : ''}
          </div>
        </div>
      )}
    </main>
  );
}
