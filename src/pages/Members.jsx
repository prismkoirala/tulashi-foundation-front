import { useEffect, useState } from 'react';
import { Mountains, Divider } from '../components/Decor.jsx';
import { fetchPublicMembers } from '../lib/api.js';
import { bioIsEmpty, sanitizeBio } from '../lib/bio.js';
import { isSupabaseConfigured } from '../lib/supabase.js';
import { NpLine, useI18n } from '../i18n/I18nContext.jsx';

const initials = (name = '') =>
  name
    .replace(/^(Prof\.\s*)?(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
    .replace(/^(Prof\.)\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

function MemberCard({ member, open, onToggle }) {
  const { t } = useI18n();
  const bio = sanitizeBio(member.bio);
  const hasBio = !bioIsEmpty(bio);

  return (
    <article className={`member-card${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="member-card-toggle"
        aria-expanded={open}
        onClick={onToggle}
      >
        <div className="member-photo" aria-hidden="true">
          {member.image_url ? (
            <img src={member.image_url} alt="" className="member-photo-img" />
          ) : (
            <span className="member-initials">{initials(member.name)}</span>
          )}
        </div>
        <div className="member-card-copy">
          <h3>{member.name}</h3>
          {member.designation && <span className="member-role">{member.designation}</span>}
          {(member.address || member.permanent_address) && (
            <span className="member-meta">
              {member.address || member.permanent_address}
            </span>
          )}
          <span className="member-expand">{open ? t('members.hideBiography') : t('members.biography')}</span>
        </div>
      </button>
      {open && (
        <div className="member-bio">
          {hasBio ? (
            <div dangerouslySetInnerHTML={{ __html: bio }} />
          ) : (
            <p className="member-bio-empty">{t('members.noBiography')}</p>
          )}
        </div>
      )}
    </article>
  );
}

export default function Members({ go }) {
  const { t } = useI18n();
  const [members, setMembers] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        setError('config');
        return;
      }
      try {
        const data = await fetchPublicMembers();
        if (alive) setMembers(data);
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

  const executive = members.filter((m) => m.member_type === 'executive');
  const withRole = executive.filter((m) => m.designation);
  const others = executive.filter((m) => !m.designation);
  const life = members.filter((m) => m.member_type === 'life');
  const lifeTinted = (withRole.length > 0 || others.length > 0) && !(withRole.length > 0 && others.length > 0);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>{t('members.title')}</h1>
          <NpLine k="members.np" />
          <p>{t('members.lead')}</p>
        </div>
        <Mountains />
      </section>

      {loading && (
        <section className="section">
          <div className="container dash-empty">{t('members.loading')}</div>
        </section>
      )}

      {!loading && error && (
        <section className="section">
          <div className="container dash-alert">
            {error === 'config' ? t('members.unconfigured') : error}
          </div>
        </section>
      )}

      {!loading && !error && executive.length === 0 && life.length === 0 && (
        <section className="section">
          <div className="container dash-empty">
            {t('members.empty')}
          </div>
        </section>
      )}

      {!loading && withRole.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="kicker">{t('members.committeeKicker')}</span>
              <h2>{t('members.committeeTitle')}</h2>
              <Divider />
            </div>
            <div className="member-grid">
              {withRole.map((m) => (
                <MemberCard
                  member={m}
                  key={m.id}
                  open={openId === m.id}
                  onToggle={() => setOpenId((current) => (current === m.id ? null : m.id))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && others.length > 0 && (
        <section className={`section ${withRole.length ? 'tinted' : ''}`}>
          <div className="container">
            <div className="section-head">
              <span className="kicker">{t('members.executiveKicker')}</span>
              <h2>{t('members.executiveTitle')}</h2>
              <Divider />
            </div>
            <div className="member-grid">
              {others.map((m) => (
                <MemberCard
                  member={m}
                  key={m.id}
                  open={openId === m.id}
                  onToggle={() => setOpenId((current) => (current === m.id ? null : m.id))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && life.length > 0 && (
        <section className={`section ${lifeTinted ? 'tinted' : ''}`}>
          <div className="container">
            <div className="section-head">
              <span className="kicker">{t('members.lifeKicker')}</span>
              <h2>{t('members.lifeTitle')}</h2>
              <Divider />
            </div>
            <div className="life-bulletin">
              <ol className="life-bulletin-list">
                {life.map((member, index) => (
                  <li key={member.id}>
                    <span className="life-bulletin-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="life-bulletin-name">{member.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>{t('members.ctaTitle')}</h2>
          <p>{t('members.ctaText')}</p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            {t('members.ctaButton')}
          </button>
        </div>
      </section>
    </main>
  );
}
