import React, { useEffect, useRef, useState } from 'react';
import './AboutPage.css';

/* ── Animated counter hook ── */
const useEaseCount = (visible, setter, to, duration = 900) => {
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (t) => {
      const elapsed = t - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = Math.floor(to * (1 - Math.pow(1 - pct, 3)));
      setter(pct === 1 ? to : eased);
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration, setter]);
};

/* ── Inline SVG icons ── */
const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════ */
const AboutPage = () => {
  const statsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [years,    setYears]    = useState(0);
  const [team,     setTeam]     = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients,  setClients]  = useState(0);

  useEaseCount(visible, setYears,    2,  900);
  useEaseCount(visible, setTeam,     20, 1000);
  useEaseCount(visible, setProjects, 15, 1100);
  useEaseCount(visible, setClients,  5,  900);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );
    const el = statsRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); observer.disconnect(); };
  }, []);

  const statsData = [
    { label: 'Years in Business',  value: years,    desc: 'Trusted experience',    icon: <IconCalendar /> },
    { label: 'Dedicated Experts',  value: team,     desc: 'Skilled professionals',  icon: <IconUsers />   },
    { label: 'Projects Delivered', value: projects, desc: 'Across industries',      icon: <IconCode />    },
    { label: 'Global Clients',     value: clients,  desc: 'Long-term partnerships', icon: <IconGlobe />   },
  ];

  return (
    <div className="about-page">

      {/* ── HERO ── */}
      <section className="about-hero">
        {/* Floating bubbles */}
        <div className="bubbles" aria-hidden="true">
          {[...Array(14)].map((_, i) => (
            <span key={i} className="bubble" />
          ))}
        </div>

        <div className="about-hero__container">

          {/* Badge + heading */}
          <div className="about-hero__top">
            <div className="about-hero__badge">
              <span className="about-hero__badge-dot" />
              A partner committed to your success
            </div>

            <h1 className="about-hero__section-title fw-bold">
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Kevalon Technology
              </span>
            </h1>

            <p className="about-hero__subtitle">
              Trusted IT partner for startups and enterprises across Ahmedabad, Gujarat, and India.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="about-hero__inner">

            {/* Left: text */}
            <div className="about-hero__content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ height: '1px', width: '2rem', background: 'linear-gradient(90deg,#61BBC5,#034665)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#64748b', textTransform: 'uppercase' }}>
                  Ahmedabad · Gujarat · India
                </span>
              </div>

              <h2 className="about-hero__title fw-bold">
                Driving Digital Success<br />in Ahmedabad
              </h2>

              <p className="about-hero__text">
                Kevalon Technology is a trusted IT company in Ahmedabad, delivering reliable and
                result-driven digital solutions for businesses of all sizes. With expertise in website
                development, mobile app development, custom software, and SEO services, we build
                scalable, secure, and high-performance solutions tailored to your business needs.
              </p>

              <p className="about-hero__text mt-3"
                style={{ background: '#f1f5f9', borderRadius: '1rem', padding: '1rem 1.25rem', borderLeft: '3px solid #61BBC5' }}>
                Driven by innovation and quality, our team combines technical excellence with a
                customer-first approach to ensure long-term success. From startups to enterprises,
                we help businesses in Ahmedabad grow digitally through smart technology, transparent
                processes, and measurable results.
              </p>

              <div className="about-hero__buttons">
                <a href="/contact" className="about-btn about-btn--primary">
                  Start Your Project &nbsp;→
                </a>
              </div>
            </div>

            {/* Right: service tags */}
            <div className="about-hero__visual">
              <div style={{
                width: '100%', maxWidth: '480px',
                background: 'linear-gradient(135deg,rgba(1,72,103,0.06) 0%,rgba(0,207,255,0.06) 100%)',
                borderRadius: '2rem', padding: '2.5rem',
                border: '1px solid rgba(97,187,197,0.2)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
              }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                  What we do
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['Web Development', 'Mobile Apps', 'Custom Software', 'SEO Services', 'UI / UX Design', 'API Integration'].map((s) => (
                    <span key={s} style={{
                      fontSize: '0.85rem', fontWeight: 600,
                      padding: '0.5rem 1rem', borderRadius: '9999px',
                      background: 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)',
                      color: '#fff'
                    }}>{s}</span>
                  ))}
                </div>
                <blockquote style={{ margin: 0, paddingLeft: '1rem', borderLeft: '3px solid #61BBC5' }}>
                  <p style={{ fontStyle: 'italic', color: '#475569', margin: 0, lineHeight: 1.7 }}>
                    "We don't just build software — we create scalable digital growth."
                  </p>
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="about-stats" ref={statsRef}>
        <div className="about-stats__inner">
          <div className="about-stats__grid">
            {statsData.map((item, i) => (
              <div key={i} className="stat-item rounded-4 p-4 text-center">
                <div className="stat-icon mb-2">{item.icon}</div>
                <div className="status-numbers mb-1">{item.value}+</div>
                <div className="stat-title mb-1">{item.label}</div>
                <div className="stat-desc">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="about-stats__hero">
            <p className="stats-heading text-center">Our Services</p>
            <div className="about-stats__services mt-3">
              {['Website Development', 'Mobile App Development', 'Custom Software', 'SEO Services', 'UI / UX Design', 'API Integration'].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="about-values">
        <div className="about-values__inner">

          <div className="about-value-card">
            <div className="about-value-card__icon"><IconTarget /></div>
            <h3>Our Mission</h3>
            <p>
              At Kevalon Technology, our mission is to empower businesses with innovative, secure,
              and high-performance digital solutions. As a trusted IT company in Ahmedabad, we deliver
              customized website development, mobile app development, custom software solutions, and
              SEO services that help businesses grow and stay competitive. With a strong focus on
              quality, reliability, and scalability, we turn ideas into impactful digital experiences
              for startups and enterprises across Ahmedabad, Gujarat, and India.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-card__icon"><IconEye /></div>
            <h3>Our Vision</h3>
            <p>
              At Kevalon Technology, our vision is to become a leading digital agency and IT company
              in Ahmedabad, delivering innovative digital solutions that drive sustainable business
              growth. We aim to simplify life through technology, enhance productivity, and create
              lasting value by setting new standards in web development, mobile app development, SEO,
              and digital transformation across Gujarat, India, and beyond.
            </p>
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US HIGHLIGHTS ── */}
      <section className="about-highlights">
        <div className="about-highlights__inner">
          <div className="text-center mb-4">
            <p className="stats-heading" style={{ display: 'inline-block' }}>Why Work With Us</p>
            <p className="about-highlights__desc mt-2">
              We combine technical depth with a client-first mindset to deliver solutions that
              actually move the needle for your business.
            </p>
          </div>

          <div className="about-highlight-grid">
            {[
              {
                icon: '🚀',
                title: 'Result-Driven Approach',
                text: 'Every project is built around measurable outcomes — traffic, conversions, and growth — not just deliverables.',
              },
              {
                icon: '🔒',
                title: 'Secure & Scalable',
                text: 'We follow industry best practices for security and architecture so your product grows without breaking.',
              },
              {
                icon: '🤝',
                title: 'Transparent Process',
                text: 'Regular updates, clear timelines, and honest communication at every stage of your project.',
              },
              {
                icon: '⚡',
                title: 'Fast Turnaround',
                text: 'Agile workflows and a dedicated team mean faster delivery without compromising on quality.',
              },
              {
                icon: '🌐',
                title: 'Full-Stack Expertise',
                text: 'From frontend design to backend APIs and cloud deployment — one team handles it all.',
              },
              {
                icon: '📈',
                title: 'Long-Term Partnership',
                text: 'We don\'t disappear after launch. Ongoing support, maintenance, and growth consulting included.',
              },
            ].map((card) => (
              <div key={card.title} className="about-card">
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                <h4 className="about-card__title">{card.title}</h4>
                <p className="about-card__text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
