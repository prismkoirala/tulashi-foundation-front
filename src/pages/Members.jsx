import { useEffect, useState } from 'react';
import { Mountains, Divider } from '../components/Decor.jsx';
import { fetchPublicMembers } from '../lib/api.js';
import { isSupabaseConfigured } from '../lib/supabase.js';

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

function MemberCard({ member }) {
  return (
    <article className="member-card">
      <div className="member-photo" aria-hidden="true">
        {member.image_url ? (
          <img src={member.image_url} alt="" className="member-photo-img" />
        ) : (
          <span className="member-initials">{initials(member.name)}</span>
        )}
      </div>
      <h3>{member.name}</h3>
      {member.designation && <span className="member-role">{member.designation}</span>}
      {(member.address || member.permanent_address) && (
        <span className="member-meta">
          {member.address || member.permanent_address}
        </span>
      )}
    </article>
  );
}

export default function Members({ go }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        setError('Member list will appear once Supabase keys are configured.');
        return;
      }
      try {
        // Executive only — live members are admin-only and never listed here.
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

  // Defence-in-depth: never render a live member even if a stale row slips through.
  const executive = members.filter((m) => m.member_type === 'executive');
  const withRole = executive.filter((m) => m.designation);
  const others = executive.filter((m) => !m.designation);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Our Members</h1>
          <div className="np-sub">हाम्रा सदस्यहरू</div>
          <p>
            Executive members and office-bearers bound together by the memory of Late Tulasiman
            Shrestha and a shared commitment to education and folk heritage.
          </p>
        </div>
        <Mountains />
      </section>

      {loading && (
        <section className="section">
          <div className="container dash-empty">Loading members…</div>
        </section>
      )}

      {!loading && error && (
        <section className="section">
          <div className="container dash-alert">{error}</div>
        </section>
      )}

      {!loading && !error && executive.length === 0 && (
        <section className="section">
          <div className="container dash-empty">
            Members will be listed here once added from the admin dashboard.
          </div>
        </section>
      )}

      {!loading && withRole.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="kicker">कार्यसमिति</span>
              <h2>Committee &amp; designated roles</h2>
              <Divider />
            </div>
            <div className="member-grid">
              {withRole.map((m) => (
                <MemberCard member={m} key={m.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && others.length > 0 && (
        <section className={`section ${withRole.length ? 'tinted' : ''}`}>
          <div className="container">
            <div className="section-head">
              <span className="kicker">कार्यसमिति सदस्यहरू</span>
              <h2>Executive members</h2>
              <Divider />
            </div>
            <div className="member-grid">
              {others.map((m) => (
                <MemberCard member={m} key={m.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>Become part of the family</h2>
          <p>
            Lifetime membership is open to anyone who shares our cause. Join more than 80 members
            across Nepal and abroad, and help keep his lamp burning.
          </p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            Join the Society
          </button>
        </div>
      </section>
    </main>
  );
}
