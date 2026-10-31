import { useState } from 'react';
import { LOGO_URL } from '../data.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login({ go }) {
  const { signIn, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      go('dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <img src={LOGO_URL} alt="" className="login-logo" />
        <h1>Admin Login</h1>
        <p className="login-sub">Tulasiman Shrestha Memorial Society</p>

        {!configured && (
          <div className="dash-alert">
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to{' '}
            <code>.env</code>, then restart the dev server.
          </div>
        )}

        <form onSubmit={onSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!configured || busy}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!configured || busy}
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-crimson" disabled={!configured || busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <button type="button" className="login-back" onClick={() => go('home')}>
          ← Back to website
        </button>
      </div>
    </main>
  );
}
