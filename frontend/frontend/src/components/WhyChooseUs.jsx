import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/* ── Feature Detail Modal — rendered via portal into document.body ── */
function FeatureModal({ feature, onClose }) {
  const f = feature;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    // Measure scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    // Lock scroll without moving the page — just hide overflow on <html>
    html.style.overflowY = 'hidden';
    // Compensate for scrollbar disappearing so content doesn't shift
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      html.style.overflowY = '';
      body.style.paddingRight = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!f) return null;

  const modal = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        animation: 'modalOverlayIn 0.22s ease both',
      }}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(2,20,36,0.72)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* panel */}
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 640,
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(3,70,101,0.30), 0 0 0 1px rgba(10,143,182,0.12)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'modalPanelIn 0.32s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* top colour bar */}
        <div style={{
          height: 4,
          borderRadius: '24px 24px 0 0',
          flexShrink: 0,
          background: `linear-gradient(90deg,${f.color},#034665)`,
        }} />

        {/* sticky header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '20px 24px 16px',
          flexShrink: 0,
          borderBottom: '1px solid rgba(10,143,182,0.12)',
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 2,
          borderRadius: '24px 24px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* icon */}
            <div style={{
              width: 52, height: 52,
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg,${f.color} 0%,#034665 100%)`,
              boxShadow: `0 6px 20px ${f.color}55`,
              color: '#fff',
              fontSize: '1.3rem',
              flexShrink: 0,
            }}>
              <i className={`bi ${f.icon}`} />
            </div>
            <div>
              <p style={{
                margin: 0, marginBottom: 2,
                fontSize: '0.62rem', fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: f.color,
                fontFamily: 'Inter,sans-serif',
              }}>Why Choose Kevalon</p>
              <h2 style={{
                margin: 0,
                fontFamily: "'Playfair Display',Georgia,serif",
                fontWeight: 900,
                color: '#0d3d5a',
                fontSize: 'clamp(1.25rem,3vw,1.6rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>{f.title}</h2>
            </div>
          </div>
          {/* close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0,
              width: 36, height: 36,
              borderRadius: '50%',
              border: '1.5px solid rgba(10,143,182,0.25)',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#7a9aaa',
              fontSize: '1rem',
              marginLeft: 12,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,143,182,0.10)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* scrollable body */}
        <div style={{ padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* description */}
          <p style={{
            margin: 0,
            fontSize: '0.92rem', color: '#4a6a7a',
            lineHeight: 1.82,
            fontFamily: 'Inter,sans-serif',
          }}>{f.desc}</p>

          {/* highlights */}
          <div>
            <p style={{
              margin: '0 0 10px',
              fontSize: '0.64rem', fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: f.color, fontFamily: 'Inter,sans-serif',
            }}>What this means for you</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {f.highlights.map((hl, hi) => (
                <div key={hi} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: `${f.color}08`,
                  border: `1px solid ${f.color}22`,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                    background: `${f.color}18`,
                    border: `1.5px solid ${f.color}45`,
                  }}>
                    <i className="bi bi-check2" style={{ fontSize: '0.6rem', color: f.color }} />
                  </div>
                  <span style={{
                    fontSize: '0.84rem', color: '#2d4a5a',
                    lineHeight: 1.6, fontWeight: 500,
                    fontFamily: 'Inter,sans-serif',
                  }}>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div>
            <p style={{
              margin: '0 0 10px',
              fontSize: '0.64rem', fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: f.color, fontFamily: 'Inter,sans-serif',
            }}>By the numbers</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {f.stats.map((st, si) => (
                <div key={si} style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 8,
                  padding: '16px 10px',
                  borderRadius: 14, textAlign: 'center',
                  background: `linear-gradient(145deg,${f.color}10 0%,rgba(3,70,101,0.05) 100%)`,
                  border: `1.5px solid ${f.color}25`,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg,${f.color},#034665)`,
                    color: '#fff', fontSize: '0.8rem',
                  }}>
                    <i className={`bi ${st.icon}`} />
                  </div>
                  <span style={{
                    fontWeight: 900, fontSize: '1.45rem',
                    lineHeight: 1, letterSpacing: '-0.04em',
                    background: `linear-gradient(135deg,${f.color},#034665)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{st.value}</span>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 600,
                    color: '#7a9aaa', lineHeight: 1.3,
                    fontFamily: 'Inter,sans-serif',
                  }}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              padding: '13px 28px',
              borderRadius: 999,
              background: `linear-gradient(135deg,${f.color} 0%,#034665 100%)`,
              color: '#fff',
              fontSize: '0.86rem', fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'Inter,sans-serif',
              boxShadow: `0 8px 24px ${f.color}45`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${f.color}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}45`; }}
          >
            Let's talk about your project
            <i className="bi bi-arrow-right" style={{ fontSize: '0.86rem' }} />
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}


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
  {
    icon: 'bi-lightning-charge-fill', title: 'Fast Delivery',
    desc: 'Agile workflows and a dedicated team mean faster delivery without compromising on quality.',
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.12)',
    highlights: ['Sprint-based development cycles', 'Weekly progress demos', 'On-time delivery guarantee'],
    stats: [
      { icon: 'bi-clock-history',    value: '2×',   label: 'Faster than average' },
      { icon: 'bi-check-circle',     value: '98%',  label: 'On-time delivery' },
      { icon: 'bi-arrow-repeat',     value: '7d',   label: 'Avg sprint length' },
    ],
  },
  {
    icon: 'bi-shield-check', title: 'Secure & Scalable',
    desc: 'We follow industry best practices for security so your product grows without breaking.',
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)',
    highlights: ['OWASP security standards', 'Auto-scaling cloud infrastructure', 'Regular security audits'],
    stats: [
      { icon: 'bi-shield-lock',      value: 'A+',   label: 'Security rating' },
      { icon: 'bi-graph-up',         value: '99.9%',label: 'Uptime SLA' },
      { icon: 'bi-cloud-check',      value: '∞',    label: 'Scalable by design' },
    ],
  },
  {
    icon: 'bi-headset', title: 'Dedicated Support',
    desc: "We don't disappear after launch. Ongoing support, maintenance, and growth consulting included.",
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)',
    highlights: ['Priority support channel', 'Proactive monitoring & alerts', 'Monthly growth reviews'],
    stats: [
      { icon: 'bi-chat-dots',        value: '<2h',  label: 'Response time' },
      { icon: 'bi-people',           value: '24/7', label: 'Support coverage' },
      { icon: 'bi-patch-check',      value: '100%', label: 'Issue resolution' },
    ],
  },
  {
    icon: 'bi-graph-up-arrow', title: 'Result-Driven',
    desc: 'Every project is built around measurable outcomes — traffic, conversions, and growth.',
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.12)',
    highlights: ['KPI-first project planning', 'Analytics & conversion tracking', 'Iterative growth sprints'],
    stats: [
      { icon: 'bi-bar-chart-line',   value: '3×',   label: 'Avg ROI delivered' },
      { icon: 'bi-cursor-fill',      value: '+40%', label: 'Conversion lift' },
      { icon: 'bi-trophy',           value: '50+',  label: 'Goals achieved' },
    ],
  },
  {
    icon: 'bi-code-slash', title: 'Full-Stack Expertise',
    desc: 'From frontend design to backend APIs and cloud deployment — one team handles it all.',
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)',
    highlights: ['React, Node, Python & more', 'Cloud-native deployments (AWS/GCP)', 'End-to-end ownership'],
    stats: [
      { icon: 'bi-layers',           value: '15+',  label: 'Technologies' },
      { icon: 'bi-cloud-upload',     value: '50+',  label: 'Apps deployed' },
      { icon: 'bi-stars',            value: '4.9★', label: 'Client rating' },
    ],
  },
  {
    icon: 'bi-eye', title: 'Transparent Process',
    desc: 'Regular updates, clear timelines, and honest communication at every stage.',
    color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)',
    highlights: ['Live project dashboard access', 'Bi-weekly stakeholder updates', 'No hidden costs, ever'],
    stats: [
      { icon: 'bi-kanban',           value: '100%', label: 'Visibility' },
      { icon: 'bi-calendar-check',   value: '2/wk', label: 'Status updates' },
      { icon: 'bi-emoji-smile',      value: '97%',  label: 'Client satisfaction' },
    ],
  },
];

const STATS = [
  { to: 2,  suffix: '+', label: 'Years in Business',  sub: 'Trusted experience',    icon: 'bi-calendar3'            },
  { to: 20, suffix: '+', label: 'Dedicated Experts',  sub: 'Skilled professionals',  icon: 'bi-people-fill'          },
  { to: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across industries',      icon: 'bi-file-earmark-check'   },
  { to: 10, suffix: '+', label: 'Global Clients',     sub: 'Long-term partnerships', icon: 'bi-globe2'               },
];

const processSteps = [
  { num: '01', icon: 'bi-lightbulb-fill',     title: 'Discovery',   desc: 'We dig into your goals, audience and competition to define a clear product vision.',       color: '#0a8fb6' },
  { num: '02', icon: 'bi-pencil-square',       title: 'Design',      desc: 'Wireframes, UI mockups and prototypes reviewed and approved by you first.',               color: '#0a8fb6' },
  { num: '03', icon: 'bi-code-slash',          title: 'Development', desc: 'Agile sprints with weekly demos. Clean, scalable code backed by automated testing.',      color: '#034665' },
  { num: '04', icon: 'bi-rocket-takeoff-fill', title: 'Launch',      desc: 'CI/CD deployment, performance tuning and go-live support for a smooth rollout.',          color: '#0a8fb6' },
  { num: '05', icon: 'bi-arrow-repeat',        title: 'Growth',      desc: 'Post-launch analytics, SEO, feature iterations and ongoing support.',                     color: '#0a8fb6' },
];

/* ── shared eyebrow pill ── */
function Eyebrow({ label }) {
  return (
    <div className="inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.14em] uppercase text-[#034665] bg-[rgba(10,143,182,0.10)] border-[1.5px] border-[rgba(10,143,182,0.30)] rounded-full px-4 py-[6px]">
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#0a8fb6] flex-shrink-0"
        style={{ animation: 'wcuDotPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(10,143,182,0.5)' }}
      />
      {label}
    </div>
  );
}

/* ── Mobile circle carousel ── */
function FeatureCarousel({ onFeatureClick }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const next = () => setActive(p => (p + 1) % features.length);
  const prev = () => setActive(p => (p - 1 + features.length) % features.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 2800);
    return () => clearInterval(timerRef.current);
  }, [paused, active]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 40) next();
      else if (diff < -40) prev();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="sm:hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── all circles row (center-active) ── */}
      <div className="relative flex items-center justify-center gap-4 py-6 px-4">

        {/* side ghost circles */}
        {[
          (active - 1 + features.length) % features.length,
          active,
          (active + 1) % features.length,
        ].map((fi, pos) => {
          const f = features[fi];
          const isCenter = pos === 1;
          return (
            <div
              key={`${fi}-${pos}`}
              onClick={() => {
                if (pos === 0) prev();
                else if (pos === 2) next();
                else if (pos === 1 && onFeatureClick) onFeatureClick(f);
              }}
              className="flex-shrink-0 flex flex-col items-center justify-center text-center transition-all duration-500"
              style={{
                width:  isCenter ? 200 : 110,
                height: isCenter ? 200 : 110,
                borderRadius: isCenter ? '32px' : '20px',
                background: isCenter
                  ? `radial-gradient(circle at 35% 30%, ${f.color}30 0%, transparent 65%), radial-gradient(circle at 65% 70%, #034665 0%, #0d3d5a 100%)`
                  : 'rgba(245,250,252,1)',
                border: isCenter
                  ? `2.5px solid ${f.color}`
                  : '1.5px solid rgba(10,143,182,0.20)',
                boxShadow: isCenter
                  ? `0 0 0 6px ${f.color}18, 0 16px 48px ${f.color}35, 0 4px 20px rgba(3,70,101,0.25)`
                  : '0 2px 10px rgba(3,70,101,0.07)',
                opacity: isCenter ? 1 : 0.55,
                cursor: isCenter ? 'default' : 'pointer',
                padding: isCenter ? '0 18px' : '0 10px',
                transform: isCenter ? 'scale(1)' : 'scale(0.88)',
              }}
            >
              {/* icon */}
              <div
                style={{
                  width:  isCenter ? 52 : 32,
                  height: isCenter ? 52 : 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: isCenter ? 'rgba(10,143,182,0.15)' : `${f.color}15`,
                  border: `1.5px solid ${isCenter ? 'rgba(10,143,182,0.3)' : f.color + '55'}`,
                  marginBottom: isCenter ? 10 : 6,
                  fontSize: isCenter ? '1.25rem' : '0.8rem',
                  color: isCenter ? '#0a8fb6' : f.color,
                }}
              >
                <i className={`bi ${f.icon}`} />
              </div>

              {/* title */}
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 800,
                  fontSize: isCenter ? '0.82rem' : '0.58rem',
                  color: isCenter ? '#fff' : '#0d3d5a',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: isCenter ? 6 : 0,
                }}
              >
                {f.title}
              </span>

              {/* desc + tap hint — only on center */}
              {isCenter && (
                <>
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '0.65rem',
                      color: 'rgba(200,230,235,0.85)',
                      lineHeight: 1.55,
                      textAlign: 'center',
                    }}
                  >
                    {f.desc}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: '0.56rem',
                      color: 'rgba(200,230,235,0.55)',
                      textAlign: 'center',
                      marginTop: 6,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Tap to learn more ↗
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── progress arc indicator ── */}
      <div className="flex items-center justify-center gap-2 mt-1">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to ${features[i].title}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width:  i === active ? 24 : 7,
              height: 7,
              background: i === active
                ? `linear-gradient(90deg,${features[i].color},#034665)`
                : 'rgba(10,143,182,0.22)',
            }}
          />
        ))}
      </div>

      {/* swipe hint */}
      <p className="text-center text-[0.58rem] text-[rgba(10,143,182,0.45)] tracking-[0.12em] uppercase mt-3 mb-0">
        Swipe to explore
      </p>
    </div>
  );
}

/* ── Desktop/Tablet: Left icon list + right content panel ── */
function FeatureInteractive({ onFeatureClick }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = useCallback((i) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
    setAnimKey(k => k + 1);
  }, [active]);

  const f = features[active];

  return (
    <div
      className="hidden sm:grid rounded-[20px] overflow-hidden border border-[rgba(10,143,182,0.20)] shadow-[0_6px_32px_rgba(3,70,101,0.10)]"
      style={{ gridTemplateColumns: '210px 1fr', background: '#fff', minHeight: 420 }}
    >
      {/* ══ LEFT: tab list ══ */}
      <div
        className="flex flex-col"
        style={{ background: 'linear-gradient(180deg,#f2fafc 0%,#e6f4f8 100%)', borderRight: '1px solid rgba(10,143,182,0.14)' }}
      >
        <div className="px-4 pt-5 pb-3 border-b border-[rgba(10,143,182,0.12)]">
          <span className="text-[0.58rem] font-[800] tracking-[0.18em] uppercase text-[#0a8fb6]">Our Strengths</span>
        </div>

        {features.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => handleSelect(i)}
              className="relative flex items-center gap-2.5 px-4 py-[11px] text-left outline-none group transition-colors duration-150"
              style={{
                background: isActive ? `linear-gradient(90deg,${item.color}1a,${item.color}08)` : 'transparent',
                borderLeft: `3px solid ${isActive ? item.color : 'transparent'}`,
              }}
            >
              {/* icon bubble */}
              <div
                className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[0.85rem] flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive ? item.color : `${item.color}18`,
                  color: isActive ? '#fff' : item.color,
                  boxShadow: isActive ? `0 3px 10px ${item.color}45` : 'none',
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                <i className={`bi ${item.icon}`} />
              </div>

              <span
                className="text-[0.78rem] font-[700] leading-[1.25] transition-colors duration-150"
                style={{ color: isActive ? '#0d3d5a' : '#6a8a9a' }}
              >
                {item.title}
              </span>

              {isActive && (
                <i
                  className="bi bi-chevron-right absolute right-3 top-1/2 -translate-y-1/2 text-[0.55rem]"
                  style={{ color: item.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ══ RIGHT: content ══ */}
      <div className="relative overflow-hidden flex">
        {/* bg wash */}
        <div
          key={`bg-${active}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 95% 10%, ${f.color}14 0%, transparent 55%),
                         radial-gradient(ellipse 40% 55% at 0% 100%, rgba(3,70,101,0.07) 0%, transparent 50%)`,
            animation: 'featureBgIn 0.5s ease both',
          }}
        />
        {/* top color bar */}
        <div
          key={`bar-${active}`}
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg,${f.color},#034665 60%,transparent)` }}
        />

        {/* inner layout: text left, visual right */}
        <div
          key={animKey}
          className="relative z-10 flex w-full"
          style={{ animation: 'featurePanelIn 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          {/* ── text area ── */}
          <div className="flex flex-col justify-between flex-1 min-w-0 p-6 lg:p-8">
            {/* top */}
            <div className="flex flex-col gap-3">
              {/* title */}
              <h3
                className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.15] tracking-[-0.025em] m-0 text-[1.25rem] lg:text-[1.5rem]"
              >
                {f.title}
              </h3>

              {/* accent line */}
              <div
                className="h-[2.5px] w-10 rounded-full"
                style={{ background: `linear-gradient(90deg,${f.color},transparent)` }}
              />

              {/* description */}
              <p className="text-[0.84rem] lg:text-[0.9rem] text-[#5a7a8a] leading-[1.8] m-0">
                {f.desc}
              </p>

              {/* highlights */}
              <div className="flex flex-col gap-1.5 mt-1">
                {f.highlights.map((hl, hi) => (
                  <div key={hi} className="flex items-center gap-2">
                    <div
                      className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.color}15`, border: `1.5px solid ${f.color}45` }}
                    >
                      <i className="bi bi-check2" style={{ fontSize: '0.6rem', color: f.color }} />
                    </div>
                    <span className="text-[0.78rem] lg:text-[0.82rem] text-[#3d5e70] leading-[1.5]">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom: dots + learn more */}
            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-[rgba(10,143,182,0.10)]">
              <div className="flex items-center gap-1.5">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="rounded-full transition-all duration-300 outline-none"
                    style={{
                      width: i === active ? 18 : 6,
                      height: 6,
                      background: i === active
                        ? `linear-gradient(90deg,${features[i].color},#034665)`
                        : 'rgba(10,143,182,0.22)',
                    }}
                    aria-label={features[i].title}
                  />
                ))}
              </div>
              <button
                onClick={() => onFeatureClick && onFeatureClick(f)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-[700] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(3,70,101,0.25)]"
                style={{ background: `linear-gradient(135deg,${f.color},#034665)` }}
              >
                Learn More <i className="bi bi-arrow-right text-[0.65rem]" />
              </button>
              <span className="text-[0.95rem] font-[800] tracking-[0.06em] text-[#0d3d5a]">
                {active + 1} <span className="text-[#5a7a8a]">/</span> {features.length}
              </span>
            </div>
          </div>

          {/* ── visual panel ── */}
          <div
            className="hidden lg:flex flex-col items-center justify-center gap-4 flex-shrink-0 relative overflow-hidden"
            style={{
              width: 300,
              background: `linear-gradient(155deg,${f.color}1a 0%,rgba(3,70,101,0.10) 100%)`,
              borderLeft: `1px solid ${f.color}20`,
            }}
          >
            {/* subtle corner blobs */}
            <div className="absolute top-[-24px] right-[-24px] w-[110px] h-[110px] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,${f.color}22 0%,transparent 70%)` }} />
            <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,rgba(3,70,101,0.10) 0%,transparent 70%)` }} />

            {/* orbit graphic */}
            <div className="relative w-[120px] h-[120px] flex items-center justify-center flex-shrink-0">
              {/* outer dashed ring */}
              <div
                className="absolute w-[116px] h-[116px] rounded-full"
                style={{ border: `1.5px dashed ${f.color}40`, animation: 'spinSlow 20s linear infinite' }}
              />
              {/* inner ring */}
              <div
                className="absolute w-[84px] h-[84px] rounded-full"
                style={{ border: `1px solid ${f.color}28`, animation: 'spinSlow 14s linear infinite reverse' }}
              />
              {/* icon */}
              <div
                className="relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${f.color} 0%,#034665 100%)`,
                  boxShadow: `0 0 0 7px ${f.color}16, 0 10px 26px ${f.color}50`,
                  fontSize: '1.2rem',
                  color: '#fff',
                }}
              >
                <i className={`bi ${f.icon}`} />
              </div>
            </div>

            {/* stat cards */}
            <div className="flex flex-col gap-2.5 w-full px-5">
              {f.stats.map((st, si) => (
                <div
                  key={si}
                  className="flex items-center gap-3 rounded-[12px] px-4 py-3"
                  style={{
                    background: '#ffffff',
                    border: `1px solid ${f.color}30`,
                    boxShadow: '0 2px 8px rgba(3,70,101,0.07)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{ background: `${f.color}20`, color: f.color, fontSize: '0.85rem' }}
                  >
                    <i className={`bi ${st.icon}`} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[0.95rem] font-[900] leading-none text-[#000000] tracking-[-0.02em]">{st.value}</span>
                    <span className="text-[0.68rem] text-[#000000] leading-[1.4] mt-[3px] font-[500]">{st.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const statsRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [modalFeature, setModalFeature] = useState(null);
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
      { threshold: 0.1 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 px-4 sm:px-6 font-['Inter','Nunito_Sans',sans-serif] isolate">
      {/* teal gradient bg glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 90% 0%,rgba(10,143,182,0.10) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 10% 100%,rgba(3,70,101,0.07) 0%,transparent 60%)' }} />
      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col gap-10 sm:gap-12 md:gap-16">

        {/* ══ WHY CHOOSE US ══ */}
        <div className="flex flex-col gap-5 sm:gap-6">

          {/* header */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-[680px] mx-auto px-2">
            <Eyebrow label="Why Work With Us" />
            <h2
              className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.12] tracking-[-0.03em] m-0 text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.9rem]"
            >
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(130deg,#0a8fb6 0%,#0a8fb6 40%,#034665 80%,#0a8fb6 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                Kevalon Technology
              </span>
            </h2>
            <p className="text-[0.92rem] sm:text-[1rem] text-[#5a7a8a] leading-[1.75] m-0">
              We combine technical depth with a client-first mindset to deliver solutions that actually move the needle for your business.
            </p>
          </div>

          {/* feature cards — horizontal scroll on mobile, 2-col sm, 3-col lg */}
          {/* Mobile: auto-slide carousel (one card at a time) */}
          <FeatureCarousel onFeatureClick={(f) => setModalFeature(f)} />

          {/* Tablet / Desktop: interactive left list + right content panel */}
          <FeatureInteractive onFeatureClick={(f) => setModalFeature(f)} />
        </div>

        {/* ══ STATS ══ */}
        <div className="flex flex-col gap-4 sm:gap-6" ref={statsRef}>
          <div className="flex flex-col items-center gap-2 sm:gap-3 text-center px-2">
            <Eyebrow label="Our Numbers" />
            <h3
              className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] tracking-[-0.03em] m-0 text-[1.3rem] sm:text-[1.6rem] md:text-[2rem]"
            >
              Numbers that speak for themselves
            </h3>
          </div>

          {/* ── Mobile / tablet (<md): original 2×2 grid cards — unchanged ── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white border-[1.5px] border-[#e4eff5] overflow-hidden flex flex-col items-center text-center gap-1 sm:gap-1.5 cursor-default transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[rgba(10,143,182,0.50)] hover:shadow-[0_24px_56px_rgba(3,70,101,0.14)]"
                style={{ boxShadow: '0 4px 20px rgba(3,70,101,0.07)', animation: `wcuStatIn 0.5s ease ${i * 0.1}s both` }}
              >
                <div aria-hidden className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full top-[-50px] right-[-30px] pointer-events-none z-0"
                  style={{ background: 'radial-gradient(circle,rgba(10,143,182,0.12) 0%,transparent 70%)' }} />
                <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[rgba(10,143,182,0.10)] border border-[rgba(10,143,182,0.22)] flex items-center justify-center text-[0.9rem] sm:text-[1rem] text-[#0a8fb6] mb-2 sm:mb-2.5">
                  <i className={`bi ${s.icon}`} />
                </div>
                <div className="relative z-10 font-[900] leading-none tracking-[-0.05em] text-[2rem] sm:text-[2.4rem]"
                  style={{ background: 'linear-gradient(135deg,#0a8fb6,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {values[i]}<sup className="text-[0.55em] font-extrabold align-super ml-0.5">{s.suffix}</sup>
                </div>
                <div className="relative z-10 text-[0.75rem] sm:text-[0.88rem] font-bold text-[#0d3d5a] leading-[1.25] text-center">{s.label}</div>
                <div className="relative z-10 text-[0.68rem] sm:text-[0.72rem] text-[#7a9aaa] italic text-center">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Laptop+ (md+): Circular rotating-text stats ── */}
          <div className="hidden md:grid md:grid-cols-4 gap-3 lg:gap-6 px-2 lg:px-6 py-1">
            {STATS.map((s, i) => {
              const palette = ['#0a8fb6','#0a8fb6','#034665','#0a8fb6'];
              const col     = palette[i];
              const size    = 160;
              const cx      = size / 2;
              const textR   = 66;
              // curved text via textPath on a circle
              const circId  = `textCircle${i}`;
              // build letter-spaced label text
              const label   = s.label.toUpperCase();
              // arc lengths for progress ring
              const pr      = 46;
              const pcts    = [0.75, 0.88, 0.92, 0.68];
              const arc     = 2 * Math.PI * pr * pcts[i];
              const full    = 2 * Math.PI * pr;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 cursor-default group select-none"
                  style={{ animation: `wcuStatIn 0.6s ease ${i * 0.14}s both` }}
                >
                  {/* ── ring system ── */}
                  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

                    {/* layer 1 — outer rotating dashed ring with travelling dot */}
                    <svg
                      width={size} height={size}
                      viewBox={`0 0 ${size} ${size}`}
                      className="absolute inset-0 pointer-events-none"
                      style={{ animation: `spinSlow ${12 + i * 3}s linear infinite reverse` }}
                    >
                      <circle cx={cx} cy={cx} r={textR}
                        fill="none" stroke={col} strokeOpacity="0.18"
                        strokeWidth="1.5" strokeDasharray="5 6" strokeLinecap="round" />
                      <circle cx={cx} cy={cx - textR} r={4}
                        fill={col} fillOpacity="0.9"
                        style={{ filter: `drop-shadow(0 0 6px ${col})` }} />
                    </svg>

                    {/* layer 2 — inner rotating curved label text */}
                    <svg
                      width={size} height={size}
                      viewBox={`0 0 ${size} ${size}`}
                      className="absolute inset-0 pointer-events-none"
                      style={{ animation: `spinSlow ${18 + i * 4}s linear infinite` }}
                    >
                      <defs>
                        <path
                          id={circId}
                          d={`M ${cx},${cx - 52} a 52,52 0 1,1 -0.01,0`}
                        />
                      </defs>
                      {/* curved text — label once */}
                      <text
                        fontSize="7.5"
                        fontWeight="800"
                        letterSpacing="3.5"
                        fill={col}
                        fillOpacity="0.75"
                        fontFamily="Inter,sans-serif"
                        textAnchor="middle"
                      >
                        <textPath href={`#${circId}`} startOffset="50%">
                          {label}
                        </textPath>
                      </text>
                    </svg>

                    {/* centre: icon + number */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                      {/* icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg,${col} 0%,#034665 100%)`,
                          boxShadow: `0 0 0 3px ${col}22, 0 3px 10px ${col}60`,
                          color: '#fff',
                          fontSize: '0.8rem',
                        }}
                      >
                        <i className={`bi ${s.icon}`} />
                      </div>
                      {/* number */}
                      <span
                        className="font-[900] leading-none tracking-[-0.05em] text-[1.8rem] lg:text-[2.1rem]"
                        style={{
                          background: `linear-gradient(135deg,${col} 0%,#034665 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: `drop-shadow(0 1px 4px ${col}40)`,
                        }}
                      >
                        {values[i]}<sup className="text-[0.4em] font-extrabold align-super">{s.suffix}</sup>
                      </span>
                    </div>

                    {/* hover glow */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle,${col}14 30%,transparent 70%)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ══ PROCESS ══ */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3 sm:gap-3.5 text-center px-2">
            <Eyebrow label="How We Work" />
            <h3 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.2] tracking-[-0.03em] m-0 text-[1.3rem] sm:text-[1.6rem] md:text-[2.1rem]">
              From idea to launch —{' '}
              <span style={{ background: 'linear-gradient(130deg,#0a8fb6 0%,#0a8fb6 40%,#034665 80%,#0a8fb6 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                our proven process
              </span>
            </h3>
            <p className="text-[0.88rem] sm:text-[0.95rem] text-[#5a7a8a] leading-[1.7] m-0 max-w-[500px]">
              A structured, transparent workflow that keeps you in control at every step.
            </p>
          </div>

          {/* ── ROADMAP ──
               Desktop (sm+): compact horizontal stepper — hover reveals description
               Mobile: single column stacked — unchanged  */}
          <div className="relative w-full max-w-[960px] mx-auto">

            {/* ── MOBILE layout (unchanged) ── */}
            <div className="sm:hidden">
              {/* vertical spine */}
              <div className="absolute top-6 bottom-6 left-6 w-[3px] bg-[rgba(10,143,182,0.15)] rounded-full overflow-hidden z-0">
                <div className="w-full h-full rounded-full"
                  style={{ background: 'linear-gradient(180deg,#0a8fb6 0%,#0a8fb6 50%,#034665 100%)', animation: 'spineGrow 2s ease-out 0.4s both' }} />
              </div>
              <div className="flex flex-col gap-0">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative z-10 flex items-start gap-4 pl-0"
                    style={{ animation: `wcuStepIn 0.55s ease ${i * 0.12}s both` }}>
                    <div className="flex-shrink-0 w-12 flex justify-center pt-4">
                      <div className="w-5 h-5 rounded-full"
                        style={{ background: `linear-gradient(135deg,${step.color},#034665)`, boxShadow: `0 0 0 4px #fff,0 0 0 6px ${step.color},0 4px 14px rgba(3,70,101,0.25)` }} />
                    </div>
                    <div className="flex-1 min-w-0 bg-white border-[1.5px] border-[rgba(10,143,182,0.18)] rounded-[16px] p-4 mb-4 overflow-hidden"
                      style={{ boxShadow: '0 4px 18px rgba(3,70,101,0.07)' }}>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-9 h-9 rounded-[12px] flex items-center justify-center text-[0.95rem] text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 4px 12px ${step.color}50` }}>
                          <i className={`bi ${step.icon}`} />
                        </div>
                        <span className="text-[2rem] font-[900] leading-none tracking-[-0.06em]"
                          style={{ background: 'linear-gradient(135deg,rgba(10,143,182,0.25) 0%,rgba(3,70,101,0.15) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {step.num}
                        </span>
                      </div>
                      <h4 className="text-[0.92rem] font-extrabold text-[#0d3d5a] m-0 mb-1 tracking-[-0.01em]">{step.title}</h4>
                      <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.6] m-0 mb-2.5">{step.desc}</p>
                      <div className="inline-flex items-center px-2 py-[2px] rounded-full bg-[rgba(10,143,182,0.08)] border border-[rgba(10,143,182,0.22)] text-[0.6rem] font-bold tracking-[0.08em] uppercase"
                        style={{ color: step.color }}>Step {step.num}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DESKTOP layout (sm+): zigzag roadmap — description hidden, revealed on hover ── */}
            <div className="hidden sm:block">
              {/* vertical spine */}
              <div
                aria-hidden="true"
                className="absolute top-6 bottom-6 w-[3px] bg-[rgba(10,143,182,0.15)] rounded-full overflow-hidden z-0 left-1/2 -translate-x-1/2"
              >
                <div className="w-full h-full rounded-full"
                  style={{ background: 'linear-gradient(180deg,#0a8fb6 0%,#0a8fb6 50%,#034665 100%)', animation: 'spineGrow 2s ease-out 0.4s both' }} />
              </div>

              <div className="flex flex-col gap-0">
                {processSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className="relative z-10"
                      style={{ animation: `wcuStepIn 0.55s ease ${i * 0.12}s both` }}
                    >
                      <div className="grid items-center" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>

                        {/* left slot */}
                        {isLeft ? (
                          <div
                            className="relative bg-white border-[1.5px] border-[rgba(10,143,182,0.18)] rounded-[20px] overflow-hidden max-w-[380px] w-full mr-7 justify-self-end group cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[var(--sc)]"
                            style={{ '--sc': step.color, boxShadow: '0 4px 18px rgba(3,70,101,0.06)' }}
                          >
                            {/* left accent bar */}
                            <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: `linear-gradient(180deg,${step.color},#034665)` }} />

                            {/* always-visible: icon + num + title */}
                            <div className="flex items-center justify-between px-5 pt-4 pb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-[13px] flex items-center justify-center text-[1rem] text-white flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                                  style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 4px 14px ${step.color}50` }}
                                >
                                  <i className={`bi ${step.icon}`} />
                                </div>
                                <div>
                                  <div className="inline-flex items-center px-2 py-[2px] rounded-full text-[0.56rem] font-[800] tracking-[0.1em] uppercase border mb-1"
                                    style={{ background: `${step.color}10`, borderColor: `${step.color}40`, color: step.color }}>
                                    Step {step.num}
                                  </div>
                                  <h4 className="text-[0.95rem] font-extrabold text-[#0d3d5a] m-0 leading-[1.2] tracking-[-0.01em]">
                                    {step.title}
                                  </h4>
                                </div>
                              </div>
                              <i className="bi bi-chevron-down text-[0.7rem] opacity-30 group-hover:opacity-0 transition-opacity duration-200 flex-shrink-0"
                                style={{ color: step.color }} />
                            </div>

                            {/* description — hidden, slides down on hover */}
                            <div className="overflow-hidden transition-all duration-350 ease-out"
                              style={{ maxHeight: 0 }}
                              ref={el => {
                                if (!el) return;
                                const card = el.closest('.group');
                                if (!card || el._bound) return;
                                el._bound = true;
                                card.addEventListener('mouseenter', () => { el.style.maxHeight = '80px'; el.style.paddingBottom = '14px'; });
                                card.addEventListener('mouseleave', () => { el.style.maxHeight = '0'; el.style.paddingBottom = '0'; });
                              }}
                            >
                              <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.65] m-0 px-5 border-t border-[rgba(10,143,182,0.12)] pt-2.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        ) : <div />}

                        {/* centre dot */}
                        <div className="relative w-14 h-14 flex items-center justify-center z-20 justify-self-center">
                          <div className="w-5 h-5 rounded-full"
                            style={{ background: `linear-gradient(135deg,${step.color},#034665)`, boxShadow: `0 0 0 4px #fff,0 0 0 6px ${step.color},0 4px 14px rgba(3,70,101,0.25)` }} />
                          <div className="absolute inset-0 rounded-full border-2 opacity-0"
                            style={{ borderColor: step.color, animation: `dotRingPulse 2.5s ease-in-out ${i * 0.4}s infinite` }} />
                        </div>

                        {/* right slot */}
                        {!isLeft ? (
                          <div
                            className="relative bg-white border-[1.5px] border-[rgba(10,143,182,0.18)] rounded-[20px] overflow-hidden max-w-[380px] w-full ml-7 justify-self-start group cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[var(--sc)]"
                            style={{ '--sc': step.color, boxShadow: '0 4px 18px rgba(3,70,101,0.06)' }}
                          >
                            <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: `linear-gradient(180deg,${step.color},#034665)` }} />

                            <div className="flex items-center justify-between px-5 pt-4 pb-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-[13px] flex items-center justify-center text-[1rem] text-white flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                                  style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 4px 14px ${step.color}50` }}
                                >
                                  <i className={`bi ${step.icon}`} />
                                </div>
                                <div>
                                  <div className="inline-flex items-center px-2 py-[2px] rounded-full text-[0.56rem] font-[800] tracking-[0.1em] uppercase border mb-1"
                                    style={{ background: `${step.color}10`, borderColor: `${step.color}40`, color: step.color }}>
                                    Step {step.num}
                                  </div>
                                  <h4 className="text-[0.95rem] font-extrabold text-[#0d3d5a] m-0 leading-[1.2] tracking-[-0.01em]">
                                    {step.title}
                                  </h4>
                                </div>
                              </div>
                              <i className="bi bi-chevron-down text-[0.7rem] opacity-30 group-hover:opacity-0 transition-opacity duration-200 flex-shrink-0"
                                style={{ color: step.color }} />
                            </div>

                            <div className="overflow-hidden transition-all duration-350 ease-out"
                              style={{ maxHeight: 0 }}
                              ref={el => {
                                if (!el) return;
                                const card = el.closest('.group');
                                if (!card || el._bound) return;
                                el._bound = true;
                                card.addEventListener('mouseenter', () => { el.style.maxHeight = '80px'; el.style.paddingBottom = '14px'; });
                                card.addEventListener('mouseleave', () => { el.style.maxHeight = '0'; el.style.paddingBottom = '0'; });
                              }}
                            >
                              <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.65] m-0 px-5 border-t border-[rgba(10,143,182,0.12)] pt-2.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        ) : <div />}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes wcuDotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:0.4} }
        @keyframes featurePanelIn { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:translateX(0)} }
        @keyframes featureBgIn { from{opacity:0} to{opacity:1} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbitPulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.12);opacity:1} }
        @keyframes spineGrow { from{height:0} to{height:100%} }
        @keyframes wcuStepIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dotRingPulse { 0%,100%{transform:scale(1);opacity:0} 50%{transform:scale(1.5);opacity:0.6} }
        @keyframes dialFill0 { from{stroke-dasharray:0 400} to{stroke-dasharray:198 400} }
        @keyframes dialFill1 { from{stroke-dasharray:0 400} to{stroke-dasharray:232 400} }
        @keyframes dialFill2 { from{stroke-dasharray:0 400} to{stroke-dasharray:243 400} }
        @keyframes dialFill3 { from{stroke-dasharray:0 400} to{stroke-dasharray:180 400} }
        @keyframes modalOverlayIn { from{opacity:0} to{opacity:1} }
        @keyframes modalPanelIn { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Feature detail modal */}
      {modalFeature && (
        <FeatureModal feature={modalFeature} onClose={() => setModalFeature(null)} />
      )}
    </section>
  );
}
