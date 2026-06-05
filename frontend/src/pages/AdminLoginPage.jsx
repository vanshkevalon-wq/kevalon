import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import './AdminDashboardPage.css';
import './AdminLoginPage.css';

const FEATURES = [
  { icon: 'bi-shield-lock-fill',    title: 'Secure Access',       desc: 'JWT-protected sessions with auto-expiry and token refresh.' },
  { icon: 'bi-speedometer2',        title: 'Real-time Dashboard',  desc: 'Live stats, application tracking, and contact management.' },
  { icon: 'bi-people-fill',         title: 'Team Management',      desc: 'Manage job positions, applications, and portfolio leads.' },
  { icon: 'bi-graph-up-arrow',      title: 'Analytics & Reports',  desc: 'Track growth metrics, client satisfaction, and delivery stats.' },
  { icon: 'bi-file-earmark-code',   title: 'Content Control',      desc: 'Edit pages, manage blog posts, and update service content.' },
  { icon: 'bi-bell-fill',           title: 'Smart Notifications',  desc: 'Instant alerts for new applications, contacts, and leads.' },
];

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [status, setStatus]           = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass]        = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('kevalon-admin-token');
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(c => ({ ...c, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Signing in…' });
    try {
      const res = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      localStorage.setItem('kevalon-admin-token', res.token);
      setStatus({ type: 'success', message: 'Welcome back!' });
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Invalid credentials.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="alp">

      {/* ── Background ── */}
      <div className="alp__bg" aria-hidden="true">
        <div className="alp__glow alp__glow--1" />
        <div className="alp__glow alp__glow--2" />
        <div className="alp__grid" />
      </div>

      <div className="alp__shell">

        {/* ══ LEFT — brand + features ══ */}
        <div className="alp__left">

          {/* logo */}
          <div className="alp__logo">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Pyj6mPiWW/p4s798c4_expires_30_days.png"
              alt="Kevalon Technology"
              className="alp__logo-img"
            />
          </div>
          <h1 className="alp__headline">
            Your command<br/>
            <span className="alp__headline-accent">centre awaits.</span>
          </h1>
          <p className="alp__subline">
            One secure workspace to manage your entire digital operation —
            from client leads to content, all in real time.
          </p>

          {/* feature grid */}
          <div className="alp__features">
            {FEATURES.map((f) => (
              <div key={f.title} className="alp__feat">
                <div className="alp__feat-icon">
                  <i className={`bi ${f.icon}`} />
                </div>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* trust strip */}
          <div className="alp__trust">
            <span className="alp__trust-dot" />
            <span>Secured with industry-standard JWT authentication</span>
          </div>

        </div>

        {/* ══ RIGHT — login card ══ */}
        <div className="alp__right">
          <div className="alp__card">

            {/* card header */}
            <div className="alp__card-header">
              <div className="alp__card-icon"><i className="bi bi-lock-fill" /></div>
              <h2>Welcome back</h2>
              <p>Sign in to your admin dashboard</p>
            </div>

            {/* form */}
            <form className="alp__form" onSubmit={handleSubmit} noValidate>

              <div className="alp__field">
                <label htmlFor="alp-email">Email address</label>
                <div className="alp__input-wrap">
                  <i className="bi bi-envelope alp__input-icon" />
                  <input
                    id="alp-email"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="admin@kevalontechnology.in"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="alp__field">
                <label htmlFor="alp-pass">Password</label>
                <div className="alp__input-wrap">
                  <i className="bi bi-key alp__input-icon" />
                  <input
                    id="alp-pass"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="alp__eye"
                    onClick={() => setShowPass(s => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                </div>
              </div>

              {status.message && (
                <div className={`alp__status alp__status--${status.type}`}>
                  <i className={`bi ${status.type === 'error' ? 'bi-exclamation-circle' : status.type === 'success' ? 'bi-check-circle' : 'bi-arrow-repeat'}`} />
                  {status.message}
                </div>
              )}

              <button type="submit" className="alp__submit" disabled={isSubmitting}>
                {isSubmitting
                  ? <><i className="bi bi-arrow-repeat alp__spin" /> Signing in…</>
                  : <><i className="bi bi-box-arrow-in-right" /> Sign In to Dashboard</>
                }
              </button>

            </form>

            {/* card footer */}
            <div className="alp__card-footer">
              <button type="button" className="alp__back-btn" onClick={() => navigate('/')}>
                <i className="bi bi-arrow-left" /> Back to website
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
