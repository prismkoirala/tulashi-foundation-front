import { LOGO_URL, PROGRAMS, GALLERY } from '../data.js';
import { Mountains, Divider, Icon } from '../components/Decor.jsx';

export default function Home({ go }) {
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-eyebrow">A memorial of service · Kathmandu, Nepal</div>
            <h1>
              Lighting the lamp of <em>education</em> for every child
            </h1>
            <div className="np-tagline">शिक्षा नै सेवा हो — स्मृति नै प्रेरणा हो</div>
            <p className="lead">
              In loving memory of Late Tulasiman Shrestha, our society walks beside children from
              humble homes — providing free education, healthcare, scholarships and the quiet
              assurance that someone believes in them.
            </p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => go('contact')}>
                Support a Student
              </button>
              <button className="btn btn-outline" onClick={() => go('testimonials')}>
                See Our Work
              </button>
            </div>
          </div>
          <div className="hero-seal">
            <img src={LOGO_URL} alt="Tulasiman Shrestha Memorial Society seal" />
          </div>
        </div>
        <Mountains />
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-photo-frame">
            <img src={GALLERY[0].src} alt="Students supported by the society" loading="lazy" />
          </div>
          <div className="about-copy">
            <div className="section-head" style={{ textAlign: 'left', margin: '0 0 24px' }}>
              <span className="kicker">Who we are</span>
              <h2>A promise kept since 2017</h2>
              <Divider />
            </div>
            <h3 style={{ display: 'none' }}>About</h3>
            <p>
              The Tulasiman Shrestha Memorial Society was founded by family, friends and former
              students of Late Tulasiman Shrestha — a teacher who believed that no child in Nepal
              should ever be turned away from a classroom for want of money.
            </p>
            <p>
              What began as a small scholarship fund has grown into a community of donors,
              volunteers and well-wishers united by one conviction: education is the most
              dignified gift one generation can hand to the next.
            </p>
            <ul className="about-values">
              <li>
                <span className="lotus">
                  <Icon name="heart" size={22} />
                </span>
                <div>
                  <strong>Seva — Selfless Service</strong>
                  <span>Every volunteer serves without pay; every rupee reaches a child.</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="book" size={22} />
                </span>
                <div>
                  <strong>Shiksha — Education First</strong>
                  <span>Fees, books, uniforms and mentorship, from Grade 1 to Grade 12.</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="users" size={22} />
                </span>
                <div>
                  <strong>Samaj — Community</strong>
                  <span>We work with schools, guardians and local wards, never around them.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section crimson-band">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Our impact</span>
            <h2>Small hands, great journeys</h2>
            <p>Numbers tell only part of the story — but they are a beginning.</p>
            <Divider />
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div className="num">350+</div>
              <div className="label">Students Supported</div>
              <div className="np-sub">विद्यार्थीहरू</div>
            </div>
            <div className="stat">
              <div className="num">27</div>
              <div className="label">Partner Schools</div>
              <div className="np-sub">विद्यालयहरू</div>
            </div>
            <div className="stat">
              <div className="num">14</div>
              <div className="label">Health Camps Held</div>
              <div className="np-sub">स्वास्थ्य शिविर</div>
            </div>
            <div className="stat">
              <div className="num">9</div>
              <div className="label">Years of Service</div>
              <div className="np-sub">सेवाका वर्षहरू</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-head">
            <span className="kicker">What we do</span>
            <h2>Programmes rooted in compassion</h2>
            <p>
              Each programme is designed to remove one more barrier between a poor child and a
              classroom.
            </p>
            <Divider />
          </div>
          <div className="program-grid">
            {PROGRAMS.map((p) => (
              <article className="program-card" key={p.title}>
                <div className="program-icon">
                  <Icon name={p.icon} />
                </div>
                <span className="np-label">{p.np}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-banner">
          <p className="np-quote">"विद्या ददाति विनयम् — Knowledge bestows humility."</p>
          <blockquote>
            "My father used to say that a single pencil, placed in the right hand, can rewrite a
            family's future. This society is our way of keeping his pencil moving."
          </blockquote>
          <cite>— THE SHRESTHA FAMILY, FOUNDERS</cite>
        </div>
      </section>

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>One child's future begins with you</h2>
          <p>
            Sponsor a student, volunteer your skills, or simply spread the word — every gesture
            becomes part of a story a child will tell one day.
          </p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
