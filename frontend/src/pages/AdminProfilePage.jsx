import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

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
    <main className="min-h-screen p-[28px_18px] text-white"
      style={{
        background: 'radial-gradient(circle at top left, rgba(97,187,197,0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(3,70,101,0.35), transparent 28%), linear-gradient(180deg, #031018 0%, #07131d 100%)',
      }}>
      <section className="w-full max-w-[1120px] mx-auto grid gap-4">

        {/* header */}
        <header className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[20px] px-[22px] py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4 flex-wrap max-[900px]:flex-col max-[900px]:items-start text-[#1a1f36]">
          <div>
            <p className="m-0 mb-2 uppercase tracking-[0.16em] text-[#7c5cfc] text-[0.78rem] font-bold">Profile</p>
            <h1 className="m-0 text-[clamp(2rem,3vw,3rem)]">Logged-in Admin Profile</h1>
            <p className="mt-2.5 mb-0 text-[#8898aa] leading-[1.6]">
              This page shows the account you are currently signed in with.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <button type="button"
              className="border border-[rgba(0,0,0,0.1)] rounded-full px-4 py-[11px] font-bold bg-[#f5f6fa] text-[#1a1f36] transition-transform duration-200 hover:-translate-y-px cursor-pointer"
              onClick={() => navigate('/admin/dashboard')}>
              Back to dashboard
            </button>
            <button type="button"
              className="border-none rounded-full px-4 py-[11px] font-bold bg-gradient-to-br from-[#7c5cfc] to-[#5a3fd4] text-white shadow-[0_4px_14px_rgba(124,92,252,0.35)] transition-transform duration-200 hover:-translate-y-px cursor-pointer"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {status.message ? (
          <p className={`m-0 px-3.5 py-2.5 rounded-[14px] text-[0.92rem] ${
            status.type === 'error'   ? 'bg-[rgba(239,68,68,0.08)] text-[#dc2626]' :
            status.type === 'success' ? 'bg-[rgba(34,197,94,0.08)] text-[#16a34a]' :
            'bg-[rgba(124,92,252,0.08)] text-[#7c5cfc]'
          }`}>{status.message}</p>
        ) : null}

        {/* grid */}
        <section className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-4 max-[900px]:grid-cols-1">

          {/* avatar + summary */}
          <article className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[16px] px-[22px] py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-[#1a1f36] flex items-center gap-[18px]">
            <div className="w-24 h-24 rounded-[28px] grid place-items-center bg-gradient-to-br from-[#42c2ff] to-[#7d57ff] text-white font-black text-[2.2rem] flex-shrink-0">
              A
            </div>
            <div>
              <p className="m-0 mb-2 uppercase tracking-[0.16em] text-[#7c5cfc] text-[0.78rem] font-bold">Authenticated account</p>
              <h2 className="m-0 text-[1.8rem]">{user?.email || 'admin@example.com'}</h2>
              <p className="mt-2.5 mb-0 text-[#8898aa] leading-[1.6]">Role: {user?.role || 'admin'}</p>
            </div>
          </article>

          {/* details */}
          <article className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[16px] px-[22px] py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-[#1a1f36]">
            <div className="flex justify-between items-center gap-3.5 mb-4">
              <h3 className="m-0 text-base font-bold text-[#1a1f36]">Account Details</h3>
              <span className="text-[#8898aa] text-[0.82rem]">Live session</span>
            </div>

            <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
              {[
                { label: 'Email',      value: user?.email      || 'admin@example.com' },
                { label: 'Role',       value: user?.role       || 'admin'             },
                { label: 'Account ID', value: user?.accountId  || user?.id || 'Not available' },
                { label: 'Session',    value: 'Active'         },
              ].map(({ label, value }) => (
                <div key={label} className="border border-[rgba(0,0,0,0.06)] bg-[#f8f9fc] rounded-[18px] p-4">
                  <span className="block text-[#8898aa] text-[0.82rem] uppercase tracking-[0.08em]">{label}</span>
                  <strong className="block mt-2 text-[0.98rem] break-words text-[#1a1f36]">{value}</strong>
                </div>
              ))}
            </div>
          </article>

        </section>
      </section>
    </main>
  );
}
