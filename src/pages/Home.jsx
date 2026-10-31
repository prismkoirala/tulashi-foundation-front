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
              Honouring a life of <em>learning</em> and folk heritage
            </h1>
            <div className="np-tagline">शिक्षा, लोक साहित्य र सेवा — स्मृति नै प्रेरणा हो</div>
            <p className="lead">
              In loving memory of Late Tulasiman Shrestha — educator and folk-literature scholar —
              our society promotes education, folk literature and music, scholarships for needy
              students, and programmes that inspire the next generation.
            </p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => go('contact')}>
                Support Our Mission
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
              <h2>A promise kept since 2073 B.S.</h2>
              <Divider />
            </div>
            <h3 style={{ display: 'none' }}>About</h3>
            <p>
              The Tulasiman Shrestha Memorial Society is a non-profit social organisation founded in
              the name of Late Tulasiman Shrestha — a teacher and folk-literature scholar from
              Chyangli, Gorkha, who devoted his life to education and Nepali lore.
            </p>
            <p>
              Registered with the District Administration Office, Kathmandu and the Social Welfare
              Council, the society has more than 80 lifetime members across Nepal and abroad. We
              honour his memory through folk-literature recognition, scholarships in Palungtar, and
              cultural and educational programmes.
            </p>
            <ul className="about-values">
              <li>
                <span className="lotus">
                  <Icon name="heart" size={22} />
                </span>
                <div>
                  <strong>Smriti — Remembrance</strong>
                  <span>Keeping alive Late Tulasiman Shrestha’s ideas and contributions.</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="book" size={22} />
                </span>
                <div>
                  <strong>Shiksha — Education & Scholarship</strong>
                  <span>Supporting meritorious students from economically humble homes.</span>
                </div>
              </li>
              <li>
                <span className="lotus">
                  <Icon name="users" size={22} />
                </span>
                <div>
                  <strong>Lok Sahitya — Folk Heritage</strong>
                  <span>Uplifting Nepali folk literature and music through honour and programmes.</span>
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
            <h2>A legacy carried forward</h2>
            <p>Numbers tell only part of the story — but they are a beginning.</p>
            <Divider />
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div className="num">80+</div>
              <div className="label">Lifetime Members</div>
              <div className="np-sub">आजीवन सदस्यहरू</div>
            </div>
            <div className="stat">
              <div className="num">8</div>
              <div className="label">Folk Literature Honourees</div>
              <div className="np-sub">लोकसाहित्य सम्मान</div>
            </div>
            <div className="stat">
              <div className="num">2</div>
              <div className="label">Partner Schools, Palungtar</div>
              <div className="np-sub">साझेदार विद्यालयहरू</div>
            </div>
            <div className="stat">
              <div className="num">9+</div>
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
            <h2>Programmes rooted in his ideals</h2>
            <p>
              Each programme carries forward Late Tulasiman Shrestha’s commitment to education,
              folk literature and service to society.
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
            "Late Tulasiman Shrestha lit classrooms across Gorkha and beyond, and gave voice to
            Nepali folk literature. This society is our way of keeping that lamp burning."
          </blockquote>
          <cite>— TULASIMAN SHRESTHA MEMORIAL SOCIETY</cite>
        </div>
      </section>

      <section className="section crimson-band cta-band">
        <div className="container">
          <h2>Carry the lamp forward with us</h2>
          <p>
            Become a member, support a scholarship, or join a cultural programme — every gesture
            honours a life devoted to education and folk heritage.
          </p>
          <button className="btn btn-gold" onClick={() => go('contact')}>
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
