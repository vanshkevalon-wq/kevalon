import React, { useEffect, useRef, useState } from 'react';
import Portfolio from '../components/Portfolio';
import './PortfolioPage.css';

/* ── Animated floating orbs ── */
function FloatingOrbs() {
  return (
    <div className="pp-orbs" aria-hidden="true">
      <div className="pp-orb pp-orb--1" />
      <div className="pp-orb pp-orb--2" />
      <div className="pp-orb pp-orb--3" />
      <div className="pp-orb pp-orb--4" />
    </div>
  );
}

/* ── SVG geometric pattern overlay ── */
function GeometricPattern() {
  return (
    <svg className="pp-geo" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#61BBC5" stopOpacity=".12"/>
          <stop offset="100%" stopColor="#034665" stopOpacity=".06"/>
        </linearGradient>
        <linearGradient id="pg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#034665" stopOpacity=".08"/>
          <stop offset="100%" stopColor="#61BBC5" stopOpacity=".04"/>
        </linearGradient>
      </defs>
      {/* large hexagon outlines */}
      <polygon className="pp-hex pp-hex--1" points="900,60 960,95 960,165 900,200 840,165 840,95"
        fill="none" stroke="rgba(97,187,197,0.15)" strokeWidth="1.5"/>
      <polygon className="pp-hex pp-hex--2" points="1080,180 1130,208 1130,264 1080,292 1030,264 1030,208"
        fill="none" stroke="rgba(3,70,101,0.10)" strokeWidth="1"/>
      <polygon className="pp-hex pp-hex--3" points="120,420 180,455 180,525 120,560 60,525 60,455"
        fill="none" stroke="rgba(97,187,197,0.12)" strokeWidth="1"/>
      <polygon className="pp-hex pp-hex--4" points="300,80 345,106 345,158 300,184 255,158 255,106"
        fill="none" stroke="rgba(3,70,101,0.08)" strokeWidth="1"/>
      {/* diagonal accent lines */}
      <line className="pp-line pp-line--1" x1="0" y1="0" x2="400" y2="700"
        stroke="rgba(97,187,197,0.07)" strokeWidth="1"/>
      <line className="pp-line pp-line--2" x1="200" y1="0" x2="600" y2="700"
        stroke="rgba(97,187,197,0.05)" strokeWidth="1"/>
      <line className="pp-line pp-line--3" x1="1200" y1="0" x2="800" y2="700"
        stroke="rgba(3,70,101,0.05)" strokeWidth="1"/>
      {/* corner arcs */}
      <path className="pp-arc pp-arc--tl" d="M0,0 Q250,0 250,250"
        fill="none" stroke="rgba(97,187,197,0.10)" strokeWidth="1.5"/>
      <path className="pp-arc pp-arc--br" d="M1200,700 Q950,700 950,450"
        fill="none" stroke="rgba(3,70,101,0.08)" strokeWidth="1.5"/>
      {/* scattered dots */}
      <circle cx="500" cy="80"  r="3" fill="rgba(97,187,197,0.25)"/>
      <circle cx="740" cy="180" r="2" fill="rgba(3,70,101,0.20)"/>
      <circle cx="1050" cy="350" r="3.5" fill="rgba(97,187,197,0.18)"/>
      <circle cx="80"  cy="200" r="2.5" fill="rgba(3,70,101,0.15)"/>
      <circle cx="620" cy="580" r="2" fill="rgba(97,187,197,0.20)"/>
    </svg>
  );
}

/* ── Typewriter component ── */
function Typewriter({ words, speed = 75, pause = 2000 }) {
  const [text, setText] = useState('');
  const [wi, setWi]     = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const word = words[wi];
    let t;
    if (!del && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
    } else if (!del && text.length === word.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
    } else {
      setDel(false);
      setWi(i => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [text, wi, del, words, speed, pause]);
  return (
    <span className="pp-tw">
      {text}<span className="pp-tw-cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ── Animated counter ── */
function Counter({ end, suffix }) {
  const [val, setVal]   = useState(0);
  const ref             = useRef(null);
  const started         = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = end / 55;
        const id = setInterval(() => {
          n += step;
          if (n >= end) { setVal(end); clearInterval(id); }
          else setVal(Math.floor(n));
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.08) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── Stats data ── */
const STATS = [
  { end: 50,   suffix: '+',    label: 'Projects Delivered', icon: 'bi-rocket-takeoff-fill' },
  { end: 98,   suffix: '%',    label: 'Client Satisfaction', icon: 'bi-emoji-smile-fill' },
  { end: 12,   suffix: '+',    label: 'Industries Served',   icon: 'bi-globe2' },
  { end: 4,    suffix: '.8★',  label: 'Average Rating',      icon: 'bi-star-fill' },
];

/* ── Category tiles ── */
const CATS = [
  { icon: 'bi-code-slash',    label: 'Web Apps',    count: '15+',  accent: '#61BBC5' },
  { icon: 'bi-phone-fill',    label: 'Mobile',      count: '12+',  accent: '#0a8fb6' },
  { icon: 'bi-controller',    label: 'Games',       count: '8+',   accent: '#034665' },
  { icon: 'bi-cart3',         label: 'E-Commerce',  count: '10+',  accent: '#61BBC5' },
];

export default function PortfolioPage() {
  const hero = useReveal(0.05);
  const stats = useReveal(0.1);

  return (
    <div className="pp-page">

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="pp-hero" ref={hero.ref}>
        <FloatingOrbs />
        <GeometricPattern />

        {/* diagonal split accent */}
        <div className="pp-hero__split" aria-hidden="true" />

        {/* dot grid overlay */}
        <div className="pp-hero__dots" aria-hidden="true" />

        <div className={`pp-hero__inner${hero.on ? ' pp-hero--in' : ''}`}>

          {/* ── LEFT copy ── */}
          <div className="pp-hero__left">

            {/* eyebrow pill */}
            <div className="pp-eyebrow">
              <span className="pp-eyebrow__icon">
                <i className="bi bi-collection-fill" />
              </span>
              <span>Our Portfolio</span>
              <span className="pp-eyebrow__live" />
            </div>

            <h1 className="pp-hero__title">
              Work that{' '}
              <Typewriter words={['inspires.', 'scales.', 'converts.', 'delivers.']} />
              <br />
              <span className="pp-hero__title-sub">Built with purpose.</span>
            </h1>

            <p className="pp-hero__desc">
              From ambitious startups to global enterprises — explore the digital products
              we've designed, engineered, and launched across industries.
            </p>

            {/* CTA buttons */}
            <div className="pp-hero__actions">
              <a href="#portfolio" className="pp-btn pp-btn--primary">
                <span>View All Work</span>
                <i className="bi bi-arrow-down-circle-fill" />
              </a>
              <a href="/contact" className="pp-btn pp-btn--ghost">
                Start a Project
                <i className="bi bi-arrow-right" />
              </a>
            </div>

            {/* inline stat chips */}
            <div className="pp-hero__chips">
              {[
                { v: '50+', l: 'Projects' },
                { v: '4.8★', l: 'Rating' },
                { v: '98%', l: 'Happy Clients' },
              ].map(c => (
                <div className="pp-chip" key={c.l}>
                  <strong>{c.v}</strong>
                  <span>{c.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: category tiles ── */}
          <div className="pp-hero__right">

            {/* glowing card backdrop */}
            <div className="pp-tile-grid">
              {CATS.map((cat, i) => (
                <div
                  className="pp-tile"
                  key={cat.label}
                  style={{ '--ti': i, '--ta': cat.accent }}
                >
                  <div className="pp-tile__icon-wrap">
                    <i className={`bi ${cat.icon}`} />
                  </div>
                  <div className="pp-tile__body">
                    <span className="pp-tile__label">{cat.label}</span>
                    <span className="pp-tile__count">{cat.count} projects</span>
                  </div>
                  <div className="pp-tile__arrow">
                    <i className="bi bi-arrow-up-right" />
                  </div>
                  <div className="pp-tile__glow" />
                </div>
              ))}

              {/* floating badge */}
              <div className="pp-hero__badge">
                <i className="bi bi-patch-check-fill" />
                <span>Kevalon Certified</span>
              </div>

              {/* decorative orbit ring */}
              <div className="pp-orbit" aria-hidden="true">
                <div className="pp-orbit__ring" />
                <div className="pp-orbit__dot" />
              </div>
            </div>
          </div>
        </div>

        {/* wave divider */}
        <div className="pp-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f4f8fa"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS BAND
      ══════════════════════════════ */}
      <section className="pp-stats" ref={stats.ref}>
        {/* decorative left stripe */}
        <div className="pp-stats__stripe" aria-hidden="true" />

        <div className="pp-stats__inner">
          {STATS.map((s, i) => (
            <div className={`pp-stat-card${stats.on ? ' pp-stat-card--in' : ''}`}
              key={s.label} style={{ '--si': i }}>
              <div className="pp-stat-card__icon">
                <i className={`bi ${s.icon}`} />
              </div>
              <div className="pp-stat-card__body">
                <span className="pp-stat-card__val">
                  <Counter end={s.end} suffix={s.suffix} />
                </span>
                <span className="pp-stat-card__label">{s.label}</span>
              </div>
              {i < STATS.length - 1 && <div className="pp-stat-divider" />}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PORTFOLIO GRID
      ══════════════════════════════ */}
      <Portfolio />

    </div>
  );
}
