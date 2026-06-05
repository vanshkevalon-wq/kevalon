import { useState } from 'react';
import './CareersPage.css';
import { positions as staticPositions } from '../data/positionsData';

/* ─── Static data ─────────────────────────────────────── */
const values = [
  { icon: 'bi-lightbulb-fill',    title: 'Innovation',    desc: 'We encourage creative thinking and new ideas.' },
  { icon: 'bi-people-fill',       title: 'Collaboration', desc: 'Teamwork makes the dream work.' },
  { icon: 'bi-award-fill',        title: 'Excellence',    desc: 'We strive for quality in everything.' },
  { icon: 'bi-shield-fill-check', title: 'Integrity',     desc: 'Honest and transparent in all dealings.' },
];

const perks = [
  { icon: 'bi-graph-up-arrow',    title: 'Career Growth',          desc: 'Clear growth path with mentorship.' },
  { icon: 'bi-mortarboard-fill',  title: 'Learning & Development', desc: 'Training, upskilling, certifications.' },
  { icon: 'bi-heart-pulse-fill',  title: 'Health Insurance',       desc: 'Comprehensive health coverage.' },
  { icon: 'bi-clock-fill',        title: 'Flexible Hours',         desc: 'Work-life balance we actually mean.' },
  { icon: 'bi-cash-coin',         title: 'Performance Bonus',      desc: 'Rewarded for your impact.' },
  { icon: 'bi-tools',             title: 'Latest Tools',           desc: 'Best hardware and software.' },
];

const ALL_CATEGORIES = 'All';

/* ─── Apply Modal ─────────────────────────────────────── */
function ApplyModal({ position, onClose }) {
  const [form, setForm]     = useState({ firstName: '', lastName: '', email: '', phone: '', linkedInProfile: '', portfolioUrl: '' });
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [drag, setDrag]     = useState(false);

  const handleFile = (file) => { if (file) { setResume(file); setResumeName(file.name); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: '' });
    setStatus({ type: 'success', msg: 'Application captured in static mode. We\'ll be in touch soon.' });
    setTimeout(onClose, 1800);
  };

  const field = (id, label, name, type, placeholder, required = false, icon = 'bi-pencil') => (
    <div className="car-modal-field">
      <label htmlFor={id}>{label}{required && <span> *</span>}</label>
      <div className="car-modal-field__wrap">
        <i className={`bi ${icon}`} />
        <input id={id} name={name} type={type} placeholder={placeholder} required={required}
          value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} />
      </div>
    </div>
  );

  return (
    <div className="car-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="car-modal">
        {/* header */}
        <div className="car-modal__head">
          <div>
            <span className={`car-pos-badge ${position.type === 'Intern' ? 'car-pos-badge--intern' : 'car-pos-badge--full'}`}>{position.type}</span>
            <h2 className="car-modal__title">{position.title}</h2>
            <p className="car-modal__sub">
              <i className="bi bi-geo-alt" /> {position.location}
              {position.exp ? <>&nbsp;·&nbsp;<i className="bi bi-briefcase" /> {position.exp}</> : null}
            </p>
          </div>
          <button className="car-modal__close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg" /></button>
        </div>

        {/* locked role chip */}
        <div className="car-modal__role-chip">
          <i className="bi bi-lock-fill" />
          Applying for: <strong>{position.title}</strong>
        </div>

        <form className="car-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="car-modal__row">
            {field('cm-fn', 'First name', 'firstName', 'text', 'Alex', true, 'bi-person')}
            {field('cm-ln', 'Last name',  'lastName',  'text', 'Chen', true, 'bi-person')}
          </div>
          <div className="car-modal__row">
            {field('cm-em', 'Email address', 'email', 'email', 'alex@example.com', true, 'bi-envelope')}
            {field('cm-ph', 'Phone number',  'phone', 'tel',   '+91 98765 43210',  true, 'bi-telephone')}
          </div>
          <div className="car-modal__row">
            {field('cm-li', 'LinkedIn Profile', 'linkedInProfile', 'url', 'linkedin.com/in/yourname', false, 'bi-linkedin')}
            {field('cm-po', 'Portfolio URL',    'portfolioUrl',    'url', 'yoursite.com',             false, 'bi-globe')}
          </div>

          {/* resume upload */}
          <div className="car-modal-field">
            <label>Resume / CV <span>*</span></label>
            <label htmlFor="cm-resume"
              className={`car-upload ${drag ? 'car-upload--drag' : ''} ${resumeName ? 'car-upload--filled' : ''}`}
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
            >
              <div className="car-upload__icon">
                <i className={`bi ${resumeName ? 'bi-file-earmark-check-fill' : 'bi-cloud-upload'}`} />
              </div>
              <div className="car-upload__text">
                {resumeName
                  ? <><strong>{resumeName}</strong><span>Click to replace</span></>
                  : <><strong>Drag & drop or click to upload</strong><span>PDF, DOC, DOCX — max 10 MB</span></>}
              </div>
            </label>
            <input id="cm-resume" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files?.[0])} />
          </div>

          {status.msg && (
            <div className={`car-modal-status car-modal-status--${status.type}`}>
              <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
              {status.msg}
            </div>
          )}

          <button type="submit" className="car-modal__submit" disabled={status.type === 'loading'}>
            {status.type === 'loading'
              ? <><span className="car-spinner" /> Submitting…</>
              : <>Submit Application <i className="bi bi-send-fill" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function CareersPage() {
  const [activeFilter,  setFilter]        = useState(ALL_CATEGORIES);
  const [applyPosition, setApplyPosition] = useState(null);

  const positions = staticPositions;

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(positions.map(p => p.category)))];
  const filtered   = activeFilter === ALL_CATEGORIES ? positions : positions.filter(p => p.category === activeFilter);

  return (
    <div className="car-page">

      {/* ── HERO ── */}
      <section className="car-hero">
        <div className="car-hero__orb car-hero__orb--1" aria-hidden="true" />
        <div className="car-hero__orb car-hero__orb--2" aria-hidden="true" />
        <div className="car-hero__dots"                 aria-hidden="true" />
        <div className="car-hero__inner">
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'0.82rem', fontWeight:600, color:'rgba(255,255,255,0.5)', marginBottom:'20px' }}>
            <a href="/" style={{ color:'#61BBC5', textDecoration:'none' }}>Home</a>
            <span>›</span>
            <span style={{ color:'#fff' }}>Careers</span>
          </div>
          <h1 className="car-hero__title">
            Build Your Career With<br />
            <span>Kevalon Technology</span>
          </h1>
          <p className="car-hero__sub">
            Explore exciting internship and full-time opportunities in web development,
            mobile apps, UI/UX design, DevOps, and analytics.
          </p>
          <a href="#positions" className="car-hero__btn">
            View Open Positions <i className="bi bi-arrow-right-circle" />
          </a>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="car-values">
        <div className="car-container">
          <div className="car-values__grid">
            {values.map(v => (
              <div key={v.title} className="car-value-card">
                <div className="car-value-card__icon"><i className={`bi ${v.icon}`} /></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="car-perks">
        <div className="car-container">
          <div className="car-section-head">
            <h2 className="car-h2">Perks &amp; Benefits</h2>
            <p className="car-section-sub">We offer a supportive environment with excellent perks and tools.</p>
          </div>
          <div className="car-perks__grid">
            {perks.map(p => (
              <div key={p.title} className="car-perk-card">
                <div className="car-perk-card__icon"><i className={`bi ${p.icon}`} /></div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="car-positions" id="positions">
        <div className="car-container">
          <div className="car-section-head">
            <h2 className="car-h2">Open Positions</h2>
            <p className="car-section-sub">Internships are listed first for easy access.</p>
          </div>

          <div className="car-filters">
            {categories.map(tab => (
              <button key={tab}
                className={`car-filter-btn ${activeFilter === tab ? 'car-filter-btn--active' : ''}`}
                onClick={() => setFilter(tab)}
              >{tab}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="car-empty">
              <i className="bi bi-briefcase" />
              <p>No open positions in this category right now.</p>
            </div>
          ) : (
            <div className="car-positions__grid">
              {filtered.map(pos => (
                <div key={pos.id} className="car-pos-card">
                  <div className="car-pos-card__head">
                    <span className={`car-pos-badge ${pos.type === 'Intern' ? 'car-pos-badge--intern' : 'car-pos-badge--full'}`}>{pos.type}</span>
                    <span className="car-pos-cat">{pos.category}</span>
                  </div>
                  <h3 className="car-pos-card__title">{pos.title}</h3>
                  <p className="car-pos-card__desc">{pos.desc}</p>
                  <div className="car-pos-card__meta">
                    <span><i className="bi bi-briefcase" /> {pos.exp}</span>
                    <span><i className="bi bi-geo-alt" /> {pos.location}</span>
                  </div>
                  {pos.skills?.length > 0 && (
                    <div className="car-pos-card__section">
                      <p className="car-pos-card__label">Key Skills:</p>
                      <div className="car-pos-card__skills">
                        {pos.skills.map(s => <span key={s} className="car-skill-tag">{s}</span>)}
                      </div>
                    </div>
                  )}
                  {pos.responsibilities?.length > 0 && (
                    <div className="car-pos-card__section">
                      <p className="car-pos-card__label">Responsibilities:</p>
                      <ul className="car-pos-card__resp">
                        {pos.responsibilities.map(r => (
                          <li key={r}><span className="car-resp-dot" />{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button className="car-apply-btn" onClick={() => setApplyPosition(pos)}>
                    Apply Now <i className="bi bi-arrow-right" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── KNOW MORE (Internship / Training) ── */}
      <section className="car-cta">
        <div className="car-container">
          <div className="car-cta__inner car-training">
            <div className="car-cta__orb" aria-hidden="true" />

            <div className="car-training-grid">
              <div className="car-training-info">
                <h2 className="car-cta__title">Know More About Internship / Training</h2>
                <p className="car-cta__sub">Hands-on internships and training programs designed to help you build real-world skills with mentorship from our engineering team.</p>

                <ul className="car-training-list">
                  <li><strong>Duration:</strong> 3–6 months practical training</li>
                  <li><strong>Mentorship:</strong> One-to-one guidance from senior engineers</li>
                  <li><strong>Outcomes:</strong> Stipend, certificate, and real project experience</li>
                </ul>

                <div className="car-cta-actions">
                  <button className="car-cta__btn" onClick={() => setApplyPosition({ title: 'Internship / Training', type: 'Intern', location: 'Ahmedabad', exp: '3-6 months' })}>
                    Apply Now <i className="bi bi-arrow-right" />
                  </button>
                  <a href="#positions" className="car-cta__btn car-cta__btn--ghost">View Open Positions</a>
                </div>
              </div>

              <div className="car-training-media" aria-hidden="true">
                <div className="car-training-illustration">
                  <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="0" y="0" width="220" height="160" rx="18" fill="rgba(255,255,255,0.08)" />
                    <g transform="translate(18,18)" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2">
                      <rect x="0" y="0" width="184" height="124" rx="10" />
                      <path d="M10 26h164" strokeOpacity="0.12" />
                      <circle cx="26" cy="14" r="6" fill="rgba(255,255,255,0.18)" stroke="none" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {applyPosition && <ApplyModal position={applyPosition} onClose={() => setApplyPosition(null)} />}

    </div>
  );
}
