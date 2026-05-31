import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import './AdminDashboardPage.css';
import './AdminProfilePage.css';

export default function AdminProfilePage() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('kevalon-admin-token') || '');
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    const loadProfile = async () => {
      if (!authToken) return;

      try {
        const response = await apiRequest('/api/auth/me', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setUser(response.user);
      } catch (error) {
        localStorage.removeItem('kevalon-admin-token');
        setAuthToken('');
        setStatus({ type: 'error', message: error.message || 'Could not load profile.' });
      }
    };

    loadProfile();
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem('kevalon-admin-token');
    setAuthToken('');
    navigate('/admin/login', { replace: true });
  };

  if (!authToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <main className="admin-shell admin-shell--profile">
      <section className="admin-profile-page">
        <header className="admin-profile-page__hero admin-panel">
          <div>
            <p className="admin-kicker">Profile</p>
            <h1>Logged-in Admin Profile</h1>
            <p className="admin-copy">
              This page shows the account you are currently signed in with.
            </p>
          </div>

          <div className="admin-profile-page__actions">
            <button type="button" className="admin-button admin-button--ghost" onClick={() => navigate('/admin/dashboard')}>
              Back to dashboard
            </button>
            <button type="button" className="admin-button admin-button--primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {status.message ? <p className={`admin-status admin-status--${status.type}`}>{status.message}</p> : null}

        <section className="admin-profile-grid-layout">
          <article className="admin-panel admin-profile-summary">
            <div className="admin-profile-summary__avatar">A</div>
            <div>
              <p className="admin-kicker">Authenticated account</p>
              <h2>{user?.email || 'admin@example.com'}</h2>
              <p className="admin-copy">Role: {user?.role || 'admin'}</p>
            </div>
          </article>

          <article className="admin-panel admin-profile-details">
            <div className="admin-panel__header">
              <h3>Account Details</h3>
              <span>Live session</span>
            </div>

            <div className="admin-profile-details__grid">
              <div>
                <span>Email</span>
                <strong>{user?.email || 'admin@example.com'}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{user?.role || 'admin'}</strong>
              </div>
              <div>
                <span>Account ID</span>
                <strong>{user?.accountId || user?.id || 'Not available'}</strong>
              </div>
              <div>
                <span>Session</span>
                <strong>Active</strong>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}