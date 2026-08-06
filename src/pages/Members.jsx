import { MEMBER_TIERS } from '../data.js';
import { Mountains, Divider } from '../components/Decor.jsx';

const initials = (name) =>
  name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function MemberCard({ member }) {
  return (
    <article className="member-card">
      <div className="member-photo" aria-hidden="true">
        <span className="member-initials">{initials(member.name)}</span>
      </div>
      <h3>{member.name}</h3>
      <span className="member-role">{member.role}</span>
      <span className="member-np devanagari">{member.np}</span>
    </article>
  );
}

export default function Members({ go }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Our Members</h1>
          <div className="np-sub">हाम्रा सदस्यहरू</div>
          <p>
            The hands and hearts behind the society — a volunteer family bound together by the
            memory of Late Tulasiman Shrestha and the promise of service.
          </p>
        </div>
        <Mountains />
      </section>

      {MEMBER_TIERS.map((tier, i) => (
        <section className={`section ${i % 2 === 1 ? 'tinted' : ''}`} key={tier.tier}>
          <div className="container">
            <div className="section-head">
              <span className="kicker">{tier.np}</span>
              <h2>{tier.tier}</h2>
              <Divider />
            </div>
            <div className="member-grid">
              {tier.members.map((m) => (
                <MemberCard member={m} key={m.name} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>Become part of the family</h2>
          <p>
            Membership is open to anyone who believes in our cause. Join us as a general member or
            volunteer, and help keep the lamp burning.
          </p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            Join the Society
          </button>
        </div>
      </section>
    </main>
  );
}
