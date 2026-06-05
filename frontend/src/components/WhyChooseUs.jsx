import React, { useEffect, useRef, useState } from 'react';
import './WhyChooseUs.css';

/* ── Animated counter hook ── */
const useEaseCount = (visible, setter, to, duration = 1200) => {
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (t) => {
      const pct = Math.min((t - start) / duration, 1);
      setter(Math.floor(to * (1 - Math.pow(1 - pct, 3))));
      if (pct < 1) requestAnimationFrame(step);
      else setter(to);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration, setter]);
};

const features = [
  { icon: 'bi-lightning-charge-fill', title: 'Fast Delivery',        desc: 'Agile workflows and a dedicated team mean faster delivery without compromising on quality.', color: '#61BBC5', bg: 'rgba(97,187,197,0.12)' },
  { icon: 'bi-shield-check',          title: 'Secure & Scalable',    desc: 'We follow industry best practices for security so your product grows without breaking.', color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)' },
  { icon: 'bi-headset',               title: 'Dedicated Support',    desc: "We don't disappear after launch. Ongoing support, maintenance, and growth consulting included.", color: '#034665', bg: 'rgba(3,70,101,0.10)' },
  { icon: 'bi-graph-up-arrow',        title: 'Result-Driven',        desc: 'Every project is built around measurable outcomes — traffic, conversions, and growth.', color: '#61BBC5', bg: 'rgba(97,187,197,0.12)' },
  { icon: 'bi-code-slash',            title: 'Full-Stack Expertise', desc: 'From frontend design to backend APIs and cloud deployment — one team handles it all.', color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)' },
  { icon: 'bi-eye',                   title: 'Transparent Process',  desc: 'Regular updates, clear timelines, and honest communication at every stage.', color: '#034665', bg: 'rgba(3,70,101,0.10)' },
];

const STATS = [
  { to: 2,  suffix: '+', label: 'Years in Business',  sub: 'Trusted experience',    icon: 'bi-calendar3' },
  { to: 20, suffix: '+', label: 'Dedicated Experts',  sub: 'Skilled professionals',  icon: 'bi-people-fill' },
  { to: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across industries',      icon: 'bi-file-earmark-check' },
  { to: 10, suffix: '+', label: 'Global Clients',     sub: 'Long-term partnerships', icon: 'bi-globe2' },
];

const processSteps = [
  { num: '01', icon: 'bi-lightbulb-fill',     title: 'Discovery',   desc: 'We dig into your goals, audience and competition to define a clear product vision.', color: '#61BBC5' },
  { num: '02', icon: 'bi-pencil-square',       title: 'Design',      desc: 'Wireframes, UI mockups and prototypes reviewed and approved by you first.', color: '#0a8fb6' },
  { num: '03', icon: 'bi-code-slash',          title: 'Development', desc: 'Agile sprints with weekly demos. Clean, scalable code backed by automated testing.', color: '#034665' },
  { num: '04', icon: 'bi-rocket-takeoff-fill', title: 'Launch',      desc: 'CI/CD deployment, performance tuning and go-live support for a smooth rollout.', color: '#61BBC5' },
  { num: '05', icon: 'bi-arrow-repeat',        title: 'Growth',      desc: 'Post-launch analytics, SEO, feature iterations and ongoing support.', color: '#0a8fb6' },
];

export default function WhyChooseUs() {
  const statsRef = useRef(null);
  const [visible, setVisible]       = useState(false);
  const [n0, sn0] = useState(0);
  const [n1, sn1] = useState(0);
  const [n2, sn2] = useState(0);
  const [n3, sn3] = useState(0);
  const values = [n0, n1, n2, n3];

  useEaseCount(visible, sn0, STATS[0].to, 900);
  useEaseCount(visible, sn1, STATS[1].to, 1100);
  useEaseCount(visible, sn2, STATS[2].to, 1200);
  useEaseCount(visible, sn3, STATS[3].to, 900);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="wcu-section">

      {/* ── Animated background ── */}
      <div className="wcu-bg-grid" aria-hidden="true" />
      <div className="wcu-blob wcu-blob--1" aria-hidden="true" />
      <div className="wcu-blob wcu-blob--2" aria-hidden="true" />
      <div className="wcu-blob wcu-blob--3" aria-hidden="true" />

      <div className="wcu-inner">

        {/* ══════════════════════════════════════
            WHY CHOOSE US — header + feature cards
        ══════════════════════════════════════ */}
        <div className="wcu-why-v2">

          {/* Header */}
          <div className="wcu-why-v2__head">
            <div className="wcu-eyebrow">
              <span className="wcu-eyebrow__dot" />
              Why Work With Us
            </div>
            <h2 className="wcu-why-v2__title">
              Why Choose{' '}
              <span className="wcu-why-v2__title-grad">Kevalon Technology</span>
            </h2>
            <p className="wcu-why-v2__sub">
              We combine technical depth with a client-first mindset to deliver
              solutions that actually move the needle for your business.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="wcu-feat-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="wcu-feat-card"
                style={{ '--fc': f.color, '--fb': f.bg, '--fi': i }}
              >
                {/* top accent line */}
                <div className="wcu-feat-card__bar" />

                {/* icon */}
                <div className="wcu-feat-card__icon">
                  <i className={`bi ${f.icon}`} />
                </div>

                <h4 className="wcu-feat-card__title">{f.title}</h4>
                <p className="wcu-feat-card__desc">{f.desc}</p>

                {/* corner glow */}
                <div className="wcu-feat-card__glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <div className="wcu-stats" ref={statsRef}>
          <div className="wcu-stats__head">
            <span className="wcu-eyebrow"><span className="wcu-eyebrow__dot" />Our Numbers</span>
            <h3 className="wcu-stats__title">Numbers that speak for themselves</h3>
          </div>

          <div className="wcu-stats__grid">
            {STATS.map((s, i) => (
              <div key={i} className="wcu-stat-card" style={{ '--si': i }}>
                <div className="wcu-stat-card__glow" />
                <div className="wcu-stat-card__icon">
                  <i className={`bi ${s.icon}`} />
                </div>
                <div className="wcu-stat-card__num">
                  {values[i]}<span className="wcu-stat-card__suf">{s.suffix}</span>
                </div>
                <div className="wcu-stat-card__label">{s.label}</div>
                <div className="wcu-stat-card__sub">{s.sub}</div>
                <div className="wcu-stat-card__shine" />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            PROCESS — Vertical Roadmap
        ══════════════════════════════════════ */}
        <div className="wcu-process">
          <div className="wcu-process__head">
            <span className="wcu-eyebrow"><span className="wcu-eyebrow__dot" />How We Work</span>
            <h3 className="wcu-process__title">
              From idea to launch —{' '}
              <span className="wcu-process__grad">our proven process</span>
            </h3>
            <p className="wcu-process__sub">
              A structured, transparent workflow that keeps you in control at every step.
            </p>
          </div>

          <div className="wcu-roadmap">
            <div className="wcu-roadmap__spine" aria-hidden="true">
              <div className="wcu-roadmap__spine-fill" />
            </div>

            {processSteps.map((step, i) => (
              <div
                key={i}
                className={`wcu-rm-step ${i % 2 === 0 ? 'wcu-rm-step--left' : 'wcu-rm-step--right'}`}
                style={{ '--sc': step.color, '--si': i }}
              >
                <div className="wcu-rm-card">
                  <div className="wcu-rm-card__accent" />
                  <div className="wcu-rm-card__header">
                    <div className="wcu-rm-card__icon-wrap">
                      <i className={`bi ${step.icon}`} />
                    </div>
                    <span className="wcu-rm-card__num">{step.num}</span>
                  </div>
                  <h4 className="wcu-rm-card__title">{step.title}</h4>
                  <p className="wcu-rm-card__desc">{step.desc}</p>
                  <div className="wcu-rm-card__tag">Step {step.num}</div>
                </div>

                <div className="wcu-rm-dot" aria-hidden="true">
                  <div className="wcu-rm-dot__inner" />
                  <div className="wcu-rm-dot__ring" />
                </div>

                <div className="wcu-rm-connector" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
