import { useEffect } from 'react';
import { LOGO_URL } from '../data.js';
import { useAuth } from '../context/AuthContext.jsx';
import MembersAdmin from './MembersAdmin.jsx';
import TestimonialsAdmin from './TestimonialsAdmin.jsx';

export default function Dashboard({ tab = 'members', go }) {
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) go('login');
  }, [loading, user, go]);

  if (loading || !user) {
    return (
      <main className="dash-shell">
        <div className="dash-empty">Checking session…</div>
      </main>
    );
  }

  const onSignOut = async () => {
    await signOut();
    go('home');
  };

  return (
    <main className="dash-shell">
      <aside className="dash-side">
        <div className="dash-brand" onClick={() => go('home')} role="button" tabIndex={0}>
          <img src={LOGO_URL} alt="" />
          <div>
            <strong>TSMS Admin</strong>
            <span>Dashboard</span>
          </div>
        </div>
        <nav className="dash-nav">
          <button
            type="button"
            className={tab === 'members' ? 'active' : ''}
            onClick={() => go('dashboard')}
          >
            Members
          </button>
          <button
            type="button"
            className={tab === 'testimonials' ? 'active' : ''}
            onClick={() => go('dashboard/testimonials')}
          >
            Events &amp; Memories
          </button>
        </nav>
        <div className="dash-side-foot">
          <div className="dash-user">{user.email}</div>
          <button type="button" className="btn btn-outline-ink" onClick={onSignOut}>
            Sign out
          </button>
          <button type="button" className="dash-link" onClick={() => go('home')}>
            ← View website
          </button>
        </div>
      </aside>
      <section className="dash-main">
        {tab === 'testimonials' ? <TestimonialsAdmin /> : <MembersAdmin />}
      </section>
    </main>
  );
}
