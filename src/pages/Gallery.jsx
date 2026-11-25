import { useCallback, useEffect, useState } from 'react';
import { Mountains, Divider } from '../components/Decor.jsx';
import { fetchGallery } from '../lib/api.js';
import { isSupabaseConfigured } from '../lib/supabase.js';
import { NpLine, useI18n } from '../i18n/I18nContext.jsx';

export default function Gallery() {
  const { t } = useI18n();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        setError('config');
        return;
      }
      try {
        const data = await fetchGallery();
        if (alive) setImages(data);
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

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) => {
      if (!images.length) return;
      setActive((index) => (index + dir + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  const current = active === null ? null : images[active];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>{t('gallery.title')}</h1>
          <NpLine k="gallery.np" />
          <p>{t('gallery.lead')}</p>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('gallery.kicker')}</span>
            <h2>{t('gallery.heading')}</h2>
            <p>{t('gallery.text')}</p>
            <Divider />
          </div>

          {loading && <div className="dash-empty">{t('gallery.loading')}</div>}
          {!loading && error && (
            <div className="dash-alert">{error === 'config' ? t('gallery.unconfigured') : error}</div>
          )}
          {!loading && !error && images.length === 0 && (
            <div className="dash-empty">{t('gallery.empty')}</div>
          )}

          <div className="gallery-grid">
            {images.map((image, index) => (
              <button
                type="button"
                className="gallery-item"
                key={image.id}
                onClick={() => setActive(index)}
                aria-label={image.caption || t('gallery.photo', { n: index + 1 })}
              >
                <img src={image.image_url} alt="" loading="lazy" />
                {image.caption && <span className="caption">{image.caption}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-btn lb-close" onClick={close} aria-label={t('gallery.close')}>
            ×
          </button>
          <button
            className="lb-btn lb-prev"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label={t('gallery.previous')}
          >
            ‹
          </button>
          <img
            src={current.image_url}
            alt={current.caption || t('gallery.photo', { n: active + 1 })}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="lb-btn lb-next"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label={t('gallery.next')}
          >
            ›
          </button>
          <div className="lb-count">
            {active + 1} / {images.length}
            {current.caption ? ` — ${current.caption}` : ''}
          </div>
        </div>
      )}
    </main>
  );
}
