import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { API_BASE_URL } from '../utils/api';
import 'swiper/css';
import 'swiper/css/navigation';

/* ── Lead capture modal — rendered via portal to escape all stacking contexts ── */
function LeadModal({ item, onClose, onSuccess }) {
  const [email, setEmail]   = useState('');
  const [phone, setPhone]   = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      setError('Please enter your email or phone number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/portfolio-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: item.title,
          projectSlug:  item.slug,
          email:  email.trim(),
          phone:  phone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit.');
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="lead-modal__backdrop"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div className="lead-modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="lead-modal__close" onClick={onClose} aria-label="Close">×</button>

        <div className="lead-modal__icon">
          <i className="bi bi-eye" />
        </div>
        <h3 className="lead-modal__title">Unlock Live Preview</h3>
        <p className="lead-modal__sub">
          Enter your email or phone to access the live preview of <strong>{item.title}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="lead-modal__form">
          <div className="lead-modal__field">
            <label htmlFor="lead-email">Email address</label>
            <input
              id="lead-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="lead-modal__divider">
            <span>or</span>
          </div>

          <div className="lead-modal__field">
            <label htmlFor="lead-phone">Phone number</label>
            <input
              id="lead-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          {error && <p className="lead-modal__error">{error}</p>}

          <button type="submit" className="lead-modal__submit" disabled={loading}>
            {loading ? 'Submitting…' : 'Continue to Preview →'}
          </button>
        </form>

        <p className="lead-modal__note">
          <i className="bi bi-shield-check" /> We never share your details with third parties.
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ── Main project modal ── */
export default function ProjectModal({ item, onClose }) {
  const navigate = useNavigate();
  const [showLead, setShowLead] = useState(false);

  /* Lock body scroll when modal is open, restore on close */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!item) return null;

  const slides = item.images && item.images.length ? item.images : [item.image];

  const handleLivePreviewClick = (e) => {
    e.preventDefault();
    setShowLead(true);
  };

  const handleLeadSuccess = () => {
    setShowLead(false);
    onClose();
    navigate(`/project-preview/${item.slug}`);
  };

  return (
    <>
      <div className="project-modal__backdrop" onClick={onClose}>
        <div className="project-modal__card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">

          {/* ── Back bar ── */}
          <div className="project-modal__back-bar">
            <button className="project-modal__back" onClick={onClose} aria-label="Back to portfolio">
              <i className="bi bi-arrow-left" /> Back to Portfolio
            </button>
          </div>

          {/* ── Media + Body ── */}
          <div className="project-modal__content-row">
            <div className="project-modal__media">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 2200, disableOnInteraction: false }}
                loop={slides.length > 1}
                spaceBetween={10}
                slidesPerView={1}
              >
                {slides.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img src={src} alt={`${item.title} ${i + 1}`} className="project-modal__img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="project-modal__body">
              <h3 className="project-modal__title">{item.title}</h3>
              <p className="project-modal__category">{item.category}</p>
              <p className="project-modal__desc">{item.desc}</p>

              <div className="project-modal__meta">
                <div>
                  <h4>Key Features</h4>
                  <ul>
                    {item.features && item.features.map((f, idx) => <li key={idx}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4>Tech Stack</h4>
                  <div className="project-modal__tech">
                    {item.tech && item.tech.map((t, idx) => (
                      <span key={idx} className="project-modal__tech-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-modal__actions">
                <button
                  className="btn btn-primary"
                  onClick={(e) => { e.stopPropagation(); handleLivePreviewClick(e); }}
                >
                  <i className="bi bi-eye me-1" /> Live Preview
                </button>
                <Link to={`/case-study/${item.slug}`} onClick={onClose} className="btn btn-outline">
                  View Case Study
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showLead && (
        <LeadModal
          item={item}
          onClose={() => setShowLead(false)}
          onSuccess={handleLeadSuccess}
        />
      )}
    </>
  );
}
