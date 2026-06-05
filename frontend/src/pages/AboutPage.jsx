import React, { useEffect, useRef, useState, useCallback } from 'react';
import './AboutPage.css';

/* ── Animated count-up hook ── */
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return { ref, val };
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Floating dot canvas ── */
function FloatingDots() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: 0.25 + Math.random() * 0.45,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(97,187,197,${d.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="ab-canvas" aria-hidden="true" />;
}

/* ── STATS ITEM ── */
function StatItem({ icon, target, suffix, label, sub }) {
  const { ref, val } = useCountUp(target);
  return (
    <div className="ab-stat" ref={ref}>
      <div className="ab-stat__icon"><i className={`bi ${icon}`} /></div>
      <div className="ab-stat__num">{val}{suffix}</div>
      <div className="ab-stat__label">{label}</div>
      <div className="ab-stat__sub">{sub}</div>
    </div>
  );
}

/* ── WHY-US CARD ── */
const WHY = [
  { icon: 'bi-rocket-takeoff-fill', color: '#f97316', bg: '#fff7ed', title: 'Result-Driven',      text: 'Every project is built around measurable outcomes — traffic, conversions, and growth.' },
  { icon: 'bi-shield-lock-fill',    color: '#3b82f6', bg: '#eff6ff', title: 'Secure & Scalable',  text: 'Industry best-practices for security so your product grows without breaking.' },
  { icon: 'bi-chat-heart-fill',     color: '#eab308', bg: '#fefce8', title: 'Transparent',        text: 'Regular updates, clear timelines, and honest communication at every stage.' },
  { icon: 'bi-lightning-charge-fill', color: '#f97316', bg: '#fff7ed', title: 'Fast Turnaround', text: 'Agile workflows and a dedicated team mean faster delivery without compromising quality.' },
  { icon: 'bi-code-slash',          color: '#61BBC5', bg: '#f0fdff', title: 'Full-Stack Team',    text: 'Frontend, backend, APIs and cloud deployment — one team handles everything.' },
  { icon: 'bi-graph-up-arrow',      color: '#8b5cf6', bg: '#f5f3ff', title: 'Long-Term Partner', text: 'Ongoing support, maintenance, and growth consulting well after launch.' },
];

/* ══════════════════════════════════════════════ */
export default function AboutPage() {
  const hero   = useReveal(0.08);
  const stats  = useReveal(0.08);
  const mv     = useReveal(0.08);
  const why    = useReveal(0.08);

  return (
    <div className="ab-page">

      {/* ══ HERO ══ */}
      <section className="ab-hero">
        <FloatingDots />
        <div className="ab-hero__dots" aria-hidden="true" />
        <div className="ab-hero__blob ab-hero__blob--a" aria-hidden="true" />
        <div className="ab-hero__blob ab-hero__blob--b" aria-hidden="true" />

        <div className={`ab-hero__inner ${hero.visible ? 'ab--in' : ''}`} ref={hero.ref}>

          {/* left */}
          <div className="ab-hero__left">

            <h1 className="ab-hero__title">
              Driving Digital<span className="ab-hero__title-grad"> Success</span>
            </h1>

            <p className="ab-hero__lead">
              A trusted IT company delivering reliable and
              result-driven digital solutions — from web apps and mobile to SEO
              and custom software — built for businesses of every size.
            </p>

            <blockquote className="ab-hero__quote">
              "We don't just build software — we create scalable digital growth."
            </blockquote>

            <div className="ab-hero__ctas">
              <a href="/contact" className="ab-btn ab-btn--fill">
                Start Your Project <i className="bi bi-arrow-right" />
              </a>
              <a href="/services" className="ab-btn ab-btn--outline">
                <i className="bi bi-grid-1x2" /> Our Services
              </a>
            </div>

            {/* mini badges */}
            {/* <div className="ab-hero__badges">
              {['Web Dev', 'Mobile Apps', 'SEO', 'UI/UX', 'APIs', 'ERP'].map(b => (
                <span key={b} className="ab-hero__badge">{b}</span>
              ))}
            </div> */}
          </div>

          {/* right — animated card stack */}
          <div className="ab-hero__right">
            <div className="ab-card-stack">

              {/* top card */}
              <div className="ab-card-stack__card ab-card-stack__card--top">
                <div className="ab-card-stack__card-header">
                  <div className="ab-card-stack__icon"><i className="bi bi-building" /></div>
                  <span className="ab-card-stack__tag">About Us</span>
                </div>
                <h3 className="ab-card-stack__title">Who We Are</h3>
                <p className="ab-card-stack__text">
                  A passionate team of engineers, designers and strategists
                  building enterprise-grade digital products.
                </p>
                {/* <div className="ab-card-stack__chips">
                  {['React', 'Node.js', 'Flutter', 'AWS'].map(t => (
                    <span key={t} className="ab-card-stack__chip">{t}</span>
                  ))}
                </div> */}
              </div>

              {/* floating stat chips */}
              <div className="ab-float ab-float--a">
                <i className="bi bi-star-fill" />
                <span>4.9 Rating</span>
              </div>
              <div className="ab-float ab-float--b">
                <i className="bi bi-check-circle-fill" />
                <span>50+ Projects</span>
              </div>
              <div className="ab-float ab-float--c">
                <i className="bi bi-people-fill" />
                <span>20+ Experts</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="ab-stats-section">
        <div className={`ab-stats-wrap ${stats.visible ? 'ab--in' : ''}`} ref={stats.ref}>
          <div className="ab-stats-grid">
            <StatItem icon="bi-calendar-check"     target={2}  suffix="+" label="Years in Business"  sub="Trusted experience"     />
            <StatItem icon="bi-people-fill"         target={20} suffix="+" label="Dedicated Experts"  sub="Skilled professionals"  />
            <StatItem icon="bi-box-seam"            target={50} suffix="+" label="Projects Delivered" sub="Across industries"      />
            <StatItem icon="bi-globe2"              target={10} suffix="+" label="Global Clients"     sub="Long-term partnerships" />
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="ab-mv-section">
        <div className={`ab-mv-wrap ${mv.visible ? 'ab--in' : ''}`} ref={mv.ref}>

          <div className="ab-section-head">
            <span className="ab-eyebrow"><span className="ab-eyebrow__dot" />Our Purpose</span>
            <h2 className="ab-section-title">Mission &amp; <span className="ab-grad">Vision</span></h2>
            <p className="ab-section-sub">The principles that guide everything we build.</p>
          </div>

          <div className="ab-mv-grid">

            {/* Mission */}
            <div className="ab-mv-card">
              <div className="ab-mv-card__stripe" />
              <div className="ab-mv-card__icon">
                <i className="bi bi-bullseye" />
              </div>
              <h3 className="ab-mv-card__title">Our Mission</h3>
              <p className="ab-mv-card__text">
                To empower businesses with innovative, secure, and high-performance
                digital solutions. We deliver customised website development, mobile
                apps, custom software, and SEO services that help businesses grow and
                stay competitive — turning ideas into impactful digital experiences
                for startups and enterprises across India and beyond.
              </p>
              <div className="ab-mv-card__tags">
                {['Innovation', 'Quality', 'Reliability'].map(t => (
                  <span key={t} className="ab-mv-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="ab-mv-card ab-mv-card--vision">
              <div className="ab-mv-card__stripe ab-mv-card__stripe--v" />
              <div className="ab-mv-card__icon ab-mv-card__icon--v">
                <i className="bi bi-eye" />
              </div>
              <h3 className="ab-mv-card__title">Our Vision</h3>
              <p className="ab-mv-card__text">
                To become the leading digital agency — delivering
                solutions that drive sustainable business growth. We aim to simplify
                life through technology, enhance productivity, and create lasting
                value by setting new standards in web development, mobile apps, SEO,
                and digital transformation across Gujarat, India, and beyond.
              </p>
              <div className="ab-mv-card__tags">
                {['Growth', 'Leadership', 'Impact'].map(t => (
                  <span key={t} className="ab-mv-tag ab-mv-tag--v">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="ab-why-section">
        <div className="ab-why__bg-dots" aria-hidden="true" />
        <div className={`ab-why-wrap ${why.visible ? 'ab--in' : ''}`} ref={why.ref}>

          <div className="ab-section-head">
            <span className="ab-eyebrow"><span className="ab-eyebrow__dot" />Why Kevalon</span>
            <h2 className="ab-section-title">Why Work <span className="ab-grad">With Us</span></h2>
            <p className="ab-section-sub">
              We combine technical depth with a client-first mindset to deliver
              solutions that actually move the needle.
            </p>
          </div>

          <div className="ab-why-grid">
            {WHY.map((c, i) => (
              <div className="ab-why-card" key={c.title} style={{ '--delay': `${i * 0.08}s` }}>
                <div className="ab-why-card__top-bar" />
                <div className="ab-why-card__icon-wrap" style={{ background: c.bg }}>
                  <i className={`bi ${c.icon}`} style={{ color: c.color }} />
                </div>
                <h4 className="ab-why-card__title">{c.title}</h4>
                <p className="ab-why-card__text">{c.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>



    </div>
  );
}
