import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    slug:  'web-application-development',
    title: 'Web Application Development',
    desc:  'Custom, scalable web applications built with modern frameworks for enterprise-grade performance.',
    icon:  'bi-code-slash',
    tags:  ['React', 'Next.js', 'Node.js'],
    link:  '/services/web-application-development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=85',
    color: '#61BBC5',
    num:   '01',
  },
  {
    slug:  'mobile-application-development',
    title: 'Mobile App Development',
    desc:  'High-performance native and cross-platform apps for every device and every user.',
    icon:  'bi-phone',
    tags:  ['Flutter', 'React Native', 'iOS & Android'],
    link:  '/services/mobile-application-development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&q=85',
    color: '#034665',
    num:   '02',
  },
  {
    slug:  'game-development',
    title: 'Game Development',
    desc:  'Engaging 2D/3D games built for mobile, web and cross-platform publishing.',
    icon:  'bi-controller',
    tags:  ['Unity', '2D & 3D', 'Multiplayer'],
    link:  '/services/game-development',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop&q=85',
    color: '#0a8fb6',
    num:   '03',
  },
  {
    slug:  'e-commerce-development',
    title: 'E-Commerce Development',
    desc:  'Secure and scalable stores with powerful checkout and inventory management.',
    icon:  'bi-cart3',
    tags:  ['Shopify', 'WooCommerce', 'Custom'],
    link:  '/services/e-commerce-development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&q=85',
    color: '#61BBC5',
    num:   '04',
  },
  {
    slug:  'web-erp-development',
    title: 'Web ERP Development',
    desc:  'End-to-end ERP systems connecting finance, HR, inventory and operations.',
    icon:  'bi-kanban',
    tags:  ['ERP Modules', 'Analytics', 'Automation'],
    link:  '/services/web-erp-development',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop&q=85',
    color: '#034665',
    num:   '05',
  },
  {
    slug:  'api-development',
    title: 'API Development',
    desc:  'Secure RESTful and GraphQL APIs built for modern web, mobile and cloud.',
    icon:  'bi-plug',
    tags:  ['REST APIs', 'GraphQL', 'Microservices'],
    link:  '/services/api-development',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&q=85',
    color: '#0a8fb6',
    num:   '06',
  },
  {
    slug:  'crm-development',
    title: 'CRM Development',
    desc:  'Custom CRM platforms with automation and integration for business growth.',
    icon:  'bi-people-fill',
    tags:  ['Lead Mgmt', 'Pipeline', 'Automation'],
    link:  '/services/crm-development',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop&q=85',
    color: '#61BBC5',
    num:   '07',
  },
  {
    slug:  'seo-digital-marketing',
    title: 'SEO & Digital Marketing',
    desc:  'Data-driven SEO and growth marketing that boosts rankings and conversions.',
    icon:  'bi-graph-up-arrow',
    tags:  ['SEO', 'Google Ads', 'Analytics'],
    link:  '/services/seo-digital-marketing',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop&q=85',
    color: '#034665',
    num:   '08',
  },
  {
    slug:  'internship-training',
    title: 'Internship & Training',
    desc:  'Hands-on internships, live projects with mentorship and career support.',
    icon:  'bi-mortarboard-fill',
    tags:  ['Live Projects', 'Mentorship', 'Certification'],
    link:  '/services/internship-training',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=85',
    color: '#0a8fb6',
    num:   '09',
  },
];

export default function Services() {
  const sliderRef    = useRef(null);
  const autoTimer    = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile,  setIsMobile]  = useState(false);
  const [isPaused,  setIsPaused]  = useState(false);
  const total = services.length;

  /* ── detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 540);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── scroll to a card index ── */
  const goTo = (idx, animate = true) => {
    if (!sliderRef.current) return;
    const el        = sliderRef.current;
    const cardWidth = el.offsetWidth;           // 100vw card = full slider width
    el.scrollTo({ left: idx * cardWidth, behavior: animate ? 'smooth' : 'auto' });
    setActiveIdx(idx);
  };

  /* ── auto-play: loop forever, pause longer on last card before going back to 1 ── */
  useEffect(() => {
    if (!isMobile) return;
    if (isPaused) return;

    // If on the last card, wait 6 s before looping back; otherwise 3.5 s
    const delay = activeIdx === total - 1 ? 6000 : 3500;

    autoTimer.current = setTimeout(() => {
      const next = activeIdx === total - 1 ? 0 : activeIdx + 1;
      if (sliderRef.current) {
        const cardWidth = sliderRef.current.offsetWidth;
        sliderRef.current.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
      }
      setActiveIdx(next);
    }, delay);

    return () => clearTimeout(autoTimer.current);
  }, [isMobile, isPaused, activeIdx, total]);

  /* ── sync dot when user swipes manually ── */
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth;
    const idx       = Math.round(sliderRef.current.scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, total - 1));
  };

  const handleDotClick = (i) => {
    clearInterval(autoTimer.current);
    goTo(i);
    setIsPaused(false);         // restart auto after manual nav
  };

  const handlePrev = () => { clearInterval(autoTimer.current); goTo(Math.max(0, activeIdx - 1)); setIsPaused(false); };
  const handleNext = () => { clearInterval(autoTimer.current); goTo(Math.min(total - 1, activeIdx + 1)); setIsPaused(false); };
  return (
    <section className="sv-section">
      {services.map(s => (
        <span key={s.slug} id={`expertise-${s.slug}`} style={{ position: 'absolute' }} />
      ))}

      {/* ── Ambient colour blobs ── */}
      <div className="sv-blob sv-blob--tl" aria-hidden="true" />
      <div className="sv-blob sv-blob--br" aria-hidden="true" />
      <div className="sv-blob sv-blob--c"  aria-hidden="true" />

      {/* ── Aurora strip ── */}
      <div className="sv-aurora" aria-hidden="true" />

      {/* ── Floating geometric shapes ── */}
      <svg className="sv-shape sv-shape--hex1" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,2 95,26 95,74 50,98 5,74 5,26" fill="none" stroke="rgba(97,187,197,1)" strokeWidth="2"/>
        <polygon points="50,14 84,32 84,68 50,86 16,68 16,32" fill="none" stroke="rgba(97,187,197,0.5)" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="6" fill="rgba(97,187,197,0.25)"/>
      </svg>
      <svg className="sv-shape sv-shape--hex2" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,2 95,26 95,74 50,98 5,74 5,26" fill="none" stroke="rgba(10,143,182,1)" strokeWidth="2"/>
      </svg>
      <svg className="sv-shape sv-shape--hex3" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,2 95,26 95,74 50,98 5,74 5,26" fill="none" stroke="rgba(97,187,197,1)" strokeWidth="2"/>
        <polygon points="50,16 82,34 82,66 50,84 18,66 18,34" fill="none" stroke="rgba(97,187,197,0.45)" strokeWidth="1"/>
      </svg>
      <svg className="sv-shape sv-shape--hex4" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,2 95,26 95,74 50,98 5,74 5,26" fill="none" stroke="rgba(3,70,101,1)" strokeWidth="2.5"/>
      </svg>
      <svg className="sv-shape sv-shape--tri" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,5 95,90 5,90" fill="none" stroke="rgba(97,187,197,0.8)" strokeWidth="2"/>
        <polygon points="50,20 82,80 18,80" fill="none" stroke="rgba(97,187,197,0.4)" strokeWidth="1"/>
      </svg>

      {/* ════ CONTENT ════ */}
      <div className="sv-wrap">

        {/* HEADER */}
        <div className="sv-header">
          <div className="sv-header__left">
            <span className="sv-badge">
              <span className="sv-badge__dot" />
              WHAT WE DO
            </span>
            <h2 className="sv-heading">
              Capabilities across{' '}
              <span className="sv-heading__grad">design, code &amp; growth.</span>
            </h2>
            <p className="sv-sub">
              End-to-end digital solutions — from product design and MVP launches
              to full-scale deployment and growth marketing.
            </p>
          </div>
          <div className="sv-header__right">
            <Link to="/services" className="sv-btn">
              View all services <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        {/* CARDS GRID / MOBILE SLIDER */}
        <div
          className="sv-grid"
          ref={sliderRef}
          onScroll={isMobile ? handleScroll : undefined}
          onTouchStart={isMobile ? () => setIsPaused(true)  : undefined}
          onTouchEnd  ={isMobile ? () => setIsPaused(false) : undefined}
        >
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to={s.link}
              className="sv-card"
              style={{ '--c': s.color, '--delay': `${i * 0.05}s` }}
            >
              {/* background image */}
              <img src={s.image} alt={s.title} className="sv-card__img" />

              {/* always-visible layer: number + icon + title */}
              <div className="sv-card__front">
                <span className="sv-card__num">{s.num}</span>
                <div className="sv-card__icon">
                  <i className={`bi ${s.icon}`} />
                </div>
                <h4 className="sv-card__title">{s.title}</h4>
              </div>

              {/* hover overlay: full details */}
              <div className="sv-card__overlay">
                <div className="sv-card__ov-icon">
                  <i className={`bi ${s.icon}`} />
                </div>
                <h4 className="sv-card__ov-title">{s.title}</h4>
                <p className="sv-card__ov-desc">{s.desc}</p>
                <div className="sv-card__ov-tags">
                  {s.tags.map((t, ti) => (
                    <span key={ti} className="sv-card__ov-tag">{t}</span>
                  ))}
                </div>
                <span className="sv-card__ov-cta">
                  Learn more <i className="bi bi-arrow-up-right" />
                </span>
              </div>

              {/* top accent line */}
              <div className="sv-card__topbar" />
            </Link>
          ))}
        </div>

        {/* Mobile slider controls */}
        {isMobile && (
          <div className="sv-slider-controls">
            {/* progress dots */}
            <div className="sv-slider-dots">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`sv-dot ${i === activeIdx ? 'sv-dot--active' : ''}`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>

            {/* prev / next arrows */}
            <div className="sv-slider-arrows">
              <button
                className="sv-arrow"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous"
              >
                <i className="bi bi-chevron-left" />
              </button>
              <span className="sv-slider-count">{activeIdx + 1} / {total}</span>
              <button
                className="sv-arrow"
                onClick={handleNext}
                disabled={activeIdx === total - 1}
                aria-label="Next"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
