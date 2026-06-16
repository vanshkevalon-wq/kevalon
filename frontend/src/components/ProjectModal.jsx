import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { API_BASE_URL } from '../utils/api';
import 'swiper/css';
import 'swiper/css/navigation';

/* ── shared overlay style ── */
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 99999,
  background: 'rgba(2,10,22,0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'pmFadeIn 0.2s ease both',
};

/* ── pill button style ── */
const pillBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  paddingLeft: 10,
  paddingRight: 16,
  borderRadius: 9999,
  background: '#ffffff',
  border: '2px solid rgba(97,187,197,0.38)',
  fontSize: '0.80rem',
  fontWeight: 700,
  color: '#034665',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  transition: 'transform 0.2s',
};

const iconCircle = {
  width: 26, height: 26,
  borderRadius: '50%',
  background: 'rgba(97,187,197,0.12)',
  border: '1.5px solid rgba(97,187,197,0.3)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: '0.70rem',
  color: '#61BBC5',
};

/* ══ Lead gate modal ══ */
function LeadModal({ item, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) { setError('Please enter your email or phone number.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectTitle: item.title, projectSlug: item.slug, email: email.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit.');
      onSuccess();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return createPortal(
    <div style={{ ...overlayStyle, zIndex: 100000 }} onClick={onClose}>
      <div
        style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 460, padding: '40px 32px 32px', position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', animation: 'pmSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both', margin: '0 16px' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close"
          style={{ position: 'absolute', top: 14, right: 16, width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(97,187,197,0.22)', background: 'rgba(97,187,197,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#5a7a8a', cursor: 'pointer' }}>
          ×
        </button>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(138deg,#61BBC5,#034665)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(97,187,197,0.38)' }}>
          <i className="bi bi-eye" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.3rem', fontWeight: 900, color: '#0d3d5a', textAlign: 'center', margin: '0 0 8px' }}>Unlock Live Preview</h3>
        <p style={{ fontSize: '0.88rem', color: '#5a7a8a', textAlign: 'center', lineHeight: 1.75, marginBottom: 24 }}>
          Enter your email or phone to access the live preview of <strong style={{ color: '#0d3d5a' }}>{item.title}</strong>.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label htmlFor="lead-email" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Email address</label>
            <input id="lead-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
              style={{ padding: '11px 14px', border: '1.5px solid rgba(97,187,197,0.25)', borderRadius: 10, background: '#f8fbfc', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(97,187,197,0.18)' }} /><span>or</span><div style={{ flex: 1, height: 1, background: 'rgba(97,187,197,0.18)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label htmlFor="lead-phone" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Phone number</label>
            <input id="lead-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)}
              style={{ padding: '11px 14px', border: '1.5px solid rgba(97,187,197,0.25)', borderRadius: 10, background: '#f8fbfc', fontSize: '0.88rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
          {error && <p style={{ fontSize: '0.8rem', color: '#dc2626', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 8, padding: '8px 12px', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', borderRadius: 9999, border: 'none', background: 'linear-gradient(138deg,#61BBC5,#034665)', color: '#fff', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(3,70,101,0.25)' }}>
            {loading ? 'Submitting…' : 'Continue to Preview →'}
          </button>
        </form>
        <p style={{ fontSize: '0.76rem', color: '#94a3b8', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
          <i className="bi bi-shield-check" style={{ color: '#61BBC5', marginRight: 4 }} /> We never share your details with third parties.
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ══ Main Project Modal ══ */
export default function ProjectModal({ item, onClose }) {
  const navigate = useNavigate();
  const [showLead, setShowLead] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    document.documentElement.classList.add('modal-open');
    const handle = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handle);
    return () => {
      document.documentElement.classList.remove('modal-open');
      window.removeEventListener('resize', handle);
    };
  }, []);

  if (!item) return null;
  const slides = item.images?.length ? item.images : [item.image];

  /* ── Action buttons (shared) ── */
  const ActionButtons = () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <button
        onClick={e => { e.stopPropagation(); setShowLead(true); }}
        style={pillBtn}
      >
        <span style={iconCircle}><i className="bi bi-eye" /></span>
        Live Preview
      </button>
      <Link
        to={`/case-study/${item.slug}`}
        onClick={onClose}
        style={pillBtn}
      >
        <span style={iconCircle}><i className="bi bi-arrow-up-right" /></span>
        View Case Study
      </Link>
    </div>
  );

  return createPortal(
    <>
      {isMobile ? (
        /* ══ MOBILE — centered card ══ */
        <div style={{ ...overlayStyle, padding: '16px', alignItems: 'center' }} onClick={onClose}>
          <div
            style={{ background: '#fff', width: '100%', borderRadius: 20, maxHeight: '88vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.35)', animation: 'pmSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
            onClick={e => e.stopPropagation()}
            role="dialog" aria-modal="true"
          >
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px', flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: '0.60rem', fontWeight: 800, color: '#61BBC5', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{item.category}</p>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '0.95rem', fontWeight: 900, color: '#0d3d5a', margin: 0, lineHeight: 1.2 }}>{item.title}</h3>
              </div>
              <button onClick={onClose} aria-label="Close"
                style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(97,187,197,0.22)', background: 'rgba(97,187,197,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#5a7a8a', cursor: 'pointer', flexShrink: 0 }}>
                ×
              </button>
            </div>

            {/* image */}
            <div style={{ flexShrink: 0, width: '100%', height: 185, background: '#0d1f35' }}>
              <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{ delay: 2500, disableOnInteraction: false }} loop={slides.length > 1} slidesPerView={1} style={{ width: '100%', height: '100%' }}>
                {slides.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img src={src} alt={`${item.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* content */}
            <div style={{ padding: '12px 16px 4px', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              {item.features?.length > 0 && (
                <div>
                  <p style={{ fontSize: '0.60rem', fontWeight: 800, color: '#0d3d5a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Key Features</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {item.features.slice(0, 3).map((f, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.68rem', color: '#4a6a7a' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#61BBC5', flexShrink: 0 }} />{f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.tech?.length > 0 && (
                <div>
                  <p style={{ fontSize: '0.60rem', fontWeight: 800, color: '#0d3d5a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Tech Stack</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {item.tech.slice(0, 5).map((t, i) => (
                      <span key={i} style={{ padding: '2px 10px', background: 'rgba(97,187,197,0.09)', border: '1px solid rgba(97,187,197,0.22)', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700, color: '#034665' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* buttons */}
            <div style={{ padding: '8px 16px 20px', display: 'flex', justifyContent: 'center', gap: 10, flexShrink: 0 }}>
              <ActionButtons />
            </div>
          </div>
        </div>
      ) : (
        /* ══ DESKTOP — side by side ══ */
        <div style={{ ...overlayStyle, padding: '20px' }} onClick={onClose}>
          <div
            style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 900, maxHeight: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', animation: 'pmSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
            onClick={e => e.stopPropagation()}
            role="dialog" aria-modal="true"
          >
            {/* back bar */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid rgba(97,187,197,0.14)', flexShrink: 0 }}>
              <button onClick={onClose}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(97,187,197,0.28)', borderRadius: 9999, padding: '6px 16px', fontSize: '0.82rem', fontWeight: 700, color: '#034665', cursor: 'pointer', background: 'none' }}>
                <i className="bi bi-arrow-left" /> Back to Portfolio
              </button>
            </div>

            {/* image + content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {/* image */}
              <div style={{ background: '#0d1f35', overflow: 'hidden', position: 'relative', minHeight: 380 }}>
                <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{ delay: 2200, disableOnInteraction: false }} loop={slides.length > 1} slidesPerView={1} className="modal-swiper"
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                  {slides.map((src, i) => (
                    <SwiperSlide key={i}>
                      <img src={src} alt={`${item.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* content */}
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0 }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#61BBC5', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>{item.category}</p>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.25rem', fontWeight: 900, color: '#0d3d5a', margin: '0 0 8px', lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#5a7a8a', lineHeight: 1.65, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
                  {item.features?.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0d3d5a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Key Features</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {item.features.slice(0, 4).map((f, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#4a6a7a', lineHeight: 1.4 }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#61BBC5,#034665)' }} />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.tech?.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0d3d5a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Tech Stack</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.tech.map((t, i) => (
                          <span key={i} style={{ padding: '4px 12px', background: 'rgba(97,187,197,0.09)', border: '1px solid rgba(97,187,197,0.22)', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, color: '#034665' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* buttons */}
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(97,187,197,0.10)' }}>
                  <ActionButtons />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLead && (
        <LeadModal item={item} onClose={() => setShowLead(false)}
          onSuccess={() => { setShowLead(false); onClose(); navigate(`/project-preview/${item.slug}`); }} />
      )}
    </>,
    document.body
  );
}
