import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import logo from '../Images/Logo.png';

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
    <main className="relative min-h-screen overflow-hidden font-[Inter,'Nunito_Sans',sans-serif] flex items-center justify-center px-5 py-8">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 bg-[#f4f7f9]" aria-hidden="true">
        {/* glow 1 */}
        <div className="absolute rounded-full pointer-events-none animate-[alpGlow_8s_ease-in-out_infinite]"
          style={{ width:600, height:600, top:-150, left:-100, filter:'blur(80px)',
            background:'radial-gradient(circle, rgba(97,187,197,0.15), transparent 70%)' }} />
        {/* glow 2 */}
        <div className="absolute rounded-full pointer-events-none animate-[alpGlow_8s_ease-in-out_infinite]"
          style={{ width:400, height:400, bottom:-80, right:-60, filter:'blur(80px)', animationDelay:'4s',
            background:'radial-gradient(circle, rgba(124,92,252,0.1), transparent 70%)' }} />
        {/* dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize:'44px 44px',
            maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }} />
      </div>

      <div className="relative z-10 w-full max-w-[1160px] grid grid-cols-[1fr_420px] gap-14 items-center max-lg:grid-cols-1 max-lg:max-w-[520px] max-lg:gap-10">

        {/* ══ LEFT — brand + features ══ */}
        <div className="flex flex-col gap-7 max-lg:text-center max-lg:items-center">

          {/* logo */}
          <div>
            <img
              src={logo}
              alt="Kevalon Technology"
              className="h-10 w-auto"
            />
          </div>

          <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] font-black text-[#0f172a] leading-[1.06] tracking-[-0.05em] m-0 max-sm:text-[2.2rem]">
            Your command<br />
            <span className="bg-gradient-to-br from-navy to-teal bg-clip-text text-transparent">centre awaits.</span>
          </h1>

          <p className="text-base text-[#475569] leading-[1.78] m-0 max-w-[480px] max-lg:max-w-full">
            One secure workspace to manage your entire digital operation —
            from client leads to content, all in real time.
          </p>

          {/* feature grid */}
          <div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">
            {FEATURES.map((f) => (
              <div key={f.title}
                className="flex items-start gap-3 bg-white border border-[#e2e8f0] rounded-[14px] p-[14px_16px] transition-colors duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:bg-[#f8fafc] hover:border-[rgba(97,187,197,0.3)]">
                <div className="w-9 h-9 min-w-[36px] rounded-[10px] bg-[rgba(97,187,197,0.12)] flex items-center justify-center text-[0.95rem] text-navy">
                  <i className={`bi ${f.icon}`} />
                </div>
                <div>
                  <strong className="block text-[0.85rem] font-bold text-[#1e293b] mb-[3px]">{f.title}</strong>
                  <span className="block text-[0.76rem] text-[#64748b] leading-[1.5]">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* trust strip */}
          <div className="inline-flex items-center gap-2.5 text-[0.78rem] font-semibold text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.2)] flex-shrink-0 animate-[alpDot_2s_ease-in-out_infinite]" />
            <span>Secured with industry-standard JWT authentication</span>
          </div>

        </div>

        {/* ══ RIGHT — login card ══ */}
        <div className="flex items-center justify-center">
          <div className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-3xl p-[36px_32px] shadow-[0_32px_80px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(97,187,197,0.5)] before:to-transparent max-sm:p-[28px_22px]">

            {/* card header */}
            <div className="text-center mb-7">
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[rgba(97,187,197,0.1)] to-[rgba(97,187,197,0.2)] border border-[rgba(97,187,197,0.25)] flex items-center justify-content-center mx-auto mb-4 text-[1.4rem] text-navy">
                <i className="bi bi-lock-fill" />
              </div>
              <h2 className="text-[1.6rem] font-extrabold text-[#1e293b] m-0 mb-1.5 tracking-[-0.03em]">Welcome back</h2>
              <p className="text-[0.88rem] text-[#64748b] m-0">Sign in to your admin dashboard</p>
            </div>

            {/* form */}
            <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>

              <div className="flex flex-col gap-[7px]">
                <label htmlFor="alp-email" className="text-[0.78rem] font-bold text-[#475569] uppercase tracking-[0.1em]">Email address</label>
                <div className="relative flex items-center">
                  <i className="bi bi-envelope absolute left-3.5 text-[0.9rem] text-[#94a3b8] pointer-events-none" />
                  <input
                    id="alp-email" name="email" type="email"
                    value={credentials.email} onChange={handleChange}
                    placeholder="admin@kevalontechnology.in"
                    autoComplete="username" required
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl py-[13px] pl-10 pr-11 text-[0.92rem] text-[#0f172a] outline-none transition-all duration-200 placeholder-[#94a3b8] focus:border-[rgba(97,187,197,0.55)] focus:shadow-[0_0_0_3px_rgba(97,187,197,0.12)] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[7px]">
                <label htmlFor="alp-pass" className="text-[0.78rem] font-bold text-[#475569] uppercase tracking-[0.1em]">Password</label>
                <div className="relative flex items-center">
                  <i className="bi bi-key absolute left-3.5 text-[0.9rem] text-[#94a3b8] pointer-events-none" />
                  <input
                    id="alp-pass" name="password"
                    type={showPass ? 'text' : 'password'}
                    value={credentials.password} onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password" required
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl py-[13px] pl-10 pr-11 text-[0.92rem] text-[#0f172a] outline-none transition-all duration-200 placeholder-[#94a3b8] focus:border-[rgba(97,187,197,0.55)] focus:shadow-[0_0_0_3px_rgba(97,187,197,0.12)] focus:bg-white"
                  />
                  <button
                    type="button"
                    className="absolute right-3 bg-none border-none text-[#94a3b8] text-[0.9rem] cursor-pointer p-1 transition-colors duration-200 hover:text-teal"
                    onClick={() => setShowPass(s => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                </div>
              </div>

              {status.message && (
                <div className={`flex items-center gap-2 px-3.5 py-[11px] rounded-[10px] text-[0.85rem] font-semibold border ${
                  status.type === 'error'   ? 'bg-[rgba(239,68,68,0.1)] text-[#b91c1c] border-[rgba(239,68,68,0.2)]' :
                  status.type === 'success' ? 'bg-[rgba(34,197,94,0.1)] text-[#15803d] border-[rgba(34,197,94,0.2)]' :
                  'bg-[rgba(97,187,197,0.1)] text-[#0369a1] border-[rgba(97,187,197,0.2)]'
                }`}>
                  <i className={`bi ${status.type === 'error' ? 'bi-exclamation-circle' : status.type === 'success' ? 'bi-check-circle' : 'bi-arrow-repeat'}`} />
                  {status.message}
                </div>
              )}

              <button type="submit"
                className="w-full bg-gradient-to-br from-teal to-navy border-none rounded-xl py-[14px] text-[0.95rem] font-bold text-white cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_8px_28px_rgba(97,187,197,0.3)] hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_14px_40px_rgba(97,187,197,0.42)] disabled:opacity-65 disabled:cursor-not-allowed"
                disabled={isSubmitting}>
                {isSubmitting
                  ? <><i className="bi bi-arrow-repeat animate-spin" /> Signing in…</>
                  : <><i className="bi bi-box-arrow-in-right" /> Sign In to Dashboard</>
                }
              </button>

            </form>

            {/* card footer */}
            <div className="mt-5 text-center">
              <button type="button"
                className="bg-transparent border-none text-[#64748b] text-[0.82rem] font-semibold cursor-pointer inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#0f172a]"
                onClick={() => navigate('/')}>
                <i className="bi bi-arrow-left" /> Back to website
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes alpGlow { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:0.9} }
        @keyframes alpDot { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.2)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0.1)} }
      `}</style>
    </main>
  );
}
