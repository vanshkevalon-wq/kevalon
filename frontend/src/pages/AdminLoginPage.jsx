import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import './AdminDashboardPage.css';
import './AdminLoginPage.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: 'admin@example.com',
    password: 'change_this_password',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('kevalon-admin-token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Signing in...' });

    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      localStorage.setItem('kevalon-admin-token', response.token);
      setStatus({ type: 'success', message: 'Login successful.' });
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Login failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-page__shell">
        <div className="admin-login-page__brand">
          <p className="admin-kicker">Kevalon Technology</p>
          <h1>Admin Portal</h1>
          <p>
            Manage applications, contacts, pages, and positions from a secure workspace that matches the dark
            dashboard style of your admin panel.
          </p>

          <div className="admin-login-page__stats">
            <article>
              <strong>Secure</strong>
              <span>JWT protected access</span>
            </article>
            <article>
              <strong>Fast</strong>
              <span>Single-screen login flow</span>
            </article>
            <article>
              <strong>Unified</strong>
              <span>Dashboard and content tools</span>
            </article>
          </div>

          <div className="admin-login-page__notes">
            <div>
              <span>Admin endpoint</span>
              <strong>/api/auth/login</strong>
            </div>
            <div>
              <span>Default access</span>
              <strong>admin@example.com</strong>
            </div>
          </div>
        </div>

        <section className="admin-login-card admin-login-card--entry">
          <div className="admin-login-card__actions">
            <button type="button" className="admin-button admin-button--ghost" onClick={() => navigate('/')}>
              Back to site
            </button>
          </div>

          <p className="admin-kicker">Sign in</p>
          <h2 className="admin-title">Admin Dashboard</h2>
          <p className="admin-copy">Use your admin credentials to continue.</p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input name="email" value={credentials.email} onChange={handleChange} type="email" autoComplete="username" />
            </label>
            <label>
              Password
              <input name="password" value={credentials.password} onChange={handleChange} type="password" autoComplete="current-password" />
            </label>
            <button type="submit" className="admin-button admin-button--primary" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
            {status.message ? <p className={`admin-status admin-status--${status.type}`}>{status.message}</p> : null}
          </form>
        </section>
      </section>
    </main>
  );
}