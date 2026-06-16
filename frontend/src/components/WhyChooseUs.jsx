import React, { useEffect, useRef, useState } from 'react';

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
  { icon: 'bi-lightning-charge-fill', title: 'Fast Delivery',        desc: 'Agile workflows and a dedicated team mean faster delivery without compromising on quality.',         color: '#61BBC5', bg: 'rgba(97,187,197,0.12)' },
  { icon: 'bi-shield-check',          title: 'Secure & Scalable',    desc: 'We follow industry best practices for security so your product grows without breaking.',           color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)' },
  { icon: 'bi-headset',               title: 'Dedicated Support',    desc: "We don't disappear after launch. Ongoing support, maintenance, and growth consulting included.",    color: '#034665', bg: 'rgba(3,70,101,0.10)'   },
  { icon: 'bi-graph-up-arrow',        title: 'Result-Driven',        desc: 'Every project is built around measurable outcomes — traffic, conversions, and growth.',            color: '#61BBC5', bg: 'rgba(97,187,197,0.12)' },
  { icon: 'bi-code-slash',            title: 'Full-Stack Expertise', desc: 'From frontend design to backend APIs and cloud deployment — one team handles it all.',             color: '#0a8fb6', bg: 'rgba(10,143,182,0.10)' },
  { icon: 'bi-eye',                   title: 'Transparent Process',  desc: 'Regular updates, clear timelines, and honest communication at every stage.',                       color: '#034665', bg: 'rgba(3,70,101,0.10)'   },
];

const STATS = [
  { to: 2,  suffix: '+', label: 'Years in Business',  sub: 'Trusted experience',    icon: 'bi-calendar3'            },
  { to: 20, suffix: '+', label: 'Dedicated Experts',  sub: 'Skilled professionals',  icon: 'bi-people-fill'          },
  { to: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across industries',      icon: 'bi-file-earmark-check'   },
  { to: 10, suffix: '+', label: 'Global Clients',     sub: 'Long-term partnerships', icon: 'bi-globe2'               },
];

const processSteps = [
  { num: '01', icon: 'bi-lightbulb-fill',     title: 'Discovery',   desc: 'We dig into your goals, audience and competition to define a clear product vision.',       color: '#61BBC5' },
  { num: '02', icon: 'bi-pencil-square',       title: 'Design',      desc: 'Wireframes, UI mockups and prototypes reviewed and approved by you first.',               color: '#0a8fb6' },
  { num: '03', icon: 'bi-code-slash',          title: 'Development', desc: 'Agile sprints with weekly demos. Clean, scalable code backed by automated testing.',      color: '#034665' },
  { num: '04', icon: 'bi-rocket-takeoff-fill', title: 'Launch',      desc: 'CI/CD deployment, performance tuning and go-live support for a smooth rollout.',          color: '#61BBC5' },
  { num: '05', icon: 'bi-arrow-repeat',        title: 'Growth',      desc: 'Post-launch analytics, SEO, feature iterations and ongoing support.',                     color: '#0a8fb6' },
];

/* ── shared eyebrow pill ── */
function Eyebrow({ label }) {
  return (
    <div className="inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.14em] uppercase text-[#034665] bg-[rgba(97,187,197,0.10)] border-[1.5px] border-[rgba(97,187,197,0.30)] rounded-full px-4 py-[6px]">
      <span
        className="w-1.5 h-1.5 rounded-full bg-[#61BBC5] flex-shrink-0"
        style={{ animation: 'wcuDotPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(97,187,197,0.5)' }}
      />
      {label}
    </div>
  );
}

/* ── Mobile circle carousel ── */
function FeatureCarousel() {
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
              onClick={() => { if (pos === 0) prev(); else if (pos === 2) next(); }}
              className="flex-shrink-0 rounded-full flex flex-col items-center justify-center text-center transition-all duration-500"
              style={{
                width:  isCenter ? 200 : 110,
                height: isCenter ? 200 : 110,
                background: isCenter
                  ? `radial-gradient(circle at 35% 30%, ${f.color}30 0%, transparent 65%), radial-gradient(circle at 65% 70%, #034665 0%, #0d3d5a 100%)`
                  : 'rgba(245,250,252,1)',
                border: isCenter
                  ? `2.5px solid ${f.color}`
                  : '1.5px solid rgba(97,187,197,0.20)',
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
                  background: isCenter ? 'rgba(255,255,255,0.15)' : `${f.color}15`,
                  border: `1.5px solid ${isCenter ? 'rgba(255,255,255,0.3)' : f.color + '55'}`,
                  marginBottom: isCenter ? 10 : 6,
                  fontSize: isCenter ? '1.25rem' : '0.8rem',
                  color: isCenter ? '#ffffff' : f.color,
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

              {/* desc — only on center */}
              {isCenter && (
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
                : 'rgba(97,187,197,0.22)',
            }}
          />
        ))}
      </div>

      {/* swipe hint */}
      <p className="text-center text-[0.58rem] text-[rgba(97,187,197,0.45)] tracking-[0.12em] uppercase mt-3 mb-0">
        Swipe to explore
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const statsRef = useRef(null);
  const [visible, setVisible] = useState(false);
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
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 font-['Inter','Nunito_Sans',sans-serif] isolate">
      {/* teal gradient bg glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 90% 0%,rgba(97,187,197,0.10) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 10% 100%,rgba(3,70,101,0.07) 0%,transparent 60%)' }} />
      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col gap-14 sm:gap-16 md:gap-20">

        {/* ══ WHY CHOOSE US ══ */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">

          {/* header */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-[680px] mx-auto px-2">
            <Eyebrow label="Why Work With Us" />
            <h2
              className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.12] tracking-[-0.03em] m-0 text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.9rem]"
            >
              Why Choose{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                Kevalon Technology
              </span>
            </h2>
            <p className="text-[0.92rem] sm:text-[1rem] text-[#5a7a8a] leading-[1.75] m-0">
              We combine technical depth with a client-first mindset to deliver solutions that actually move the needle for your business.
            </p>
          </div>

          {/* feature cards — horizontal scroll on mobile, 2-col sm, 3-col lg */}
          {/* Mobile: auto-slide carousel (one card at a time) */}
          <FeatureCarousel />

          {/* Tablet / Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[18px] md:rounded-[22px] p-5 md:p-7 overflow-hidden transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default group hover:-translate-y-2 hover:shadow-[0_20px_52px_rgba(3,70,101,0.12)]"
                style={{ '--fc': f.color, '--fb': f.bg, boxShadow: '0 4px 20px rgba(3,70,101,0.06)', animation: `wcuFadeUp 0.5s ease ${i * 0.08}s both` }}
              >
                {/* top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[18px] sm:rounded-t-[22px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]"
                  style={{ background: `linear-gradient(90deg,${f.color},#034665)` }}
                />
                {/* watermark number — removed */}
                {/* icon */}
                <div
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] flex items-center justify-center text-[1rem] sm:text-[1.1rem] md:text-[1.25rem] mb-2.5 sm:mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  style={{ background: f.bg, border: `1.5px solid ${f.color}50`, color: f.color, boxShadow: '0 4px 14px rgba(3,70,101,0.07)' }}
                >
                  <i className={`bi ${f.icon}`} />
                </div>
                <h4 className="text-[0.82rem] sm:text-[0.95rem] md:text-[1.05rem] font-extrabold text-[#0d3d5a] m-0 mb-1 sm:mb-1.5 md:mb-2 tracking-[-0.01em] leading-[1.25]">
                  {f.title}
                </h4>
                <p className="text-[0.74rem] sm:text-[0.80rem] md:text-[0.86rem] text-[#5a7a8a] leading-[1.6] md:leading-[1.65] m-0">{f.desc}</p>
                {/* corner glow */}
                <div
                  className="absolute bottom-[-40px] right-[-40px] w-[130px] h-[130px] rounded-full pointer-events-none transition-transform duration-[400ms] group-hover:scale-[1.4] group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]"
                  style={{ background: `radial-gradient(circle,${f.bg} 0%,transparent 70%)` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══ STATS ══ */}
        <div className="flex flex-col gap-8 sm:gap-10" ref={statsRef}>
          <div className="flex flex-col items-center gap-2 sm:gap-3 text-center px-2">
            <Eyebrow label="Our Numbers" />
            <h3
              className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] tracking-[-0.03em] m-0 text-[1.3rem] sm:text-[1.6rem] md:text-[2rem]"
            >
              Numbers that speak for themselves
            </h3>
          </div>

          {/* stats grid — 2×2 on mobile, 4 cols on lg */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[18px]">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 bg-white border-[1.5px] border-[#e4eff5] overflow-hidden flex flex-col items-center text-center gap-1 sm:gap-1.5 cursor-default transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[rgba(97,187,197,0.50)] hover:shadow-[0_24px_56px_rgba(3,70,101,0.14)]"
                style={{ boxShadow: '0 4px 20px rgba(3,70,101,0.07)', animation: `wcuStatIn 0.5s ease ${i * 0.1}s both` }}
              >
                <div
                  aria-hidden
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full top-[-50px] right-[-30px] pointer-events-none z-0"
                  style={{ background: 'radial-gradient(circle,rgba(97,187,197,0.12) 0%,transparent 70%)', animation: `wcuGlow 3s ease-in-out ${i * 0.5}s infinite` }}
                />
                <div
                  aria-hidden
                  className="absolute top-0 bottom-0 w-[60px] pointer-events-none left-[-80px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(97,187,197,0.06),transparent)', animation: `wcuShine 5s ease ${i * 0.8 + 1}s infinite` }}
                />
                <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[rgba(97,187,197,0.10)] border border-[rgba(97,187,197,0.22)] flex items-center justify-center text-[0.9rem] sm:text-[1rem] text-[#61BBC5] mb-2 sm:mb-2.5 transition-all duration-300 hover:rotate-[-8deg] hover:scale-110">
                  <i className={`bi ${s.icon}`} />
                </div>
                <div
                  className="relative z-10 font-[900] leading-none tracking-[-0.05em] text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem]"
                  style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {values[i]}<sup className="text-[0.55em] font-extrabold align-super ml-0.5">{s.suffix}</sup>
                </div>
                <div className="relative z-10 text-[0.75rem] sm:text-[0.88rem] font-bold text-[#0d3d5a] leading-[1.25] text-center">{s.label}</div>
                <div className="relative z-10 text-[0.68rem] sm:text-[0.72rem] text-[#7a9aaa] italic text-center">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PROCESS ══ */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3 sm:gap-3.5 text-center px-2">
            <Eyebrow label="How We Work" />
            <h3 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.2] tracking-[-0.03em] m-0 text-[1.3rem] sm:text-[1.6rem] md:text-[2.1rem]">
              From idea to launch —{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                our proven process
              </span>
            </h3>
            <p className="text-[0.88rem] sm:text-[0.95rem] text-[#5a7a8a] leading-[1.7] m-0 max-w-[500px]">
              A structured, transparent workflow that keeps you in control at every step.
            </p>
          </div>

          {/* ── ROADMAP ──
               Desktop: zigzag  3-col (card | dot | card)
               Mobile:  single column (dot | card) stacked  */}
          <div className="relative w-full max-w-[900px] mx-auto">

            {/* vertical spine — desktop: centre, mobile: left-6 */}
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 w-[3px] bg-[rgba(97,187,197,0.15)] rounded-full overflow-hidden z-0
                         left-6 sm:left-1/2 sm:-translate-x-1/2"
            >
              <div
                className="w-full rounded-full"
                style={{ background: 'linear-gradient(180deg,#61BBC5 0%,#0a8fb6 50%,#034665 100%)', animation: 'spineGrow 2s ease-out 0.4s both' }}
              />
            </div>

            <div className="flex flex-col gap-0">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="relative z-10 min-h-[100px] sm:min-h-[120px]"
                    style={{ animation: `wcuStepIn 0.55s ease ${i * 0.12}s both` }}
                  >
                    {/* ── MOBILE layout: dot on left-6, card offset ── */}
                    <div className="flex items-start gap-4 sm:hidden pl-0">
                      {/* dot column */}
                      <div className="flex-shrink-0 w-12 flex justify-center pt-4">
                        <div
                          className="relative w-5 h-5 rounded-full"
                          style={{ background: `linear-gradient(135deg,${step.color},#034665)`, boxShadow: `0 0 0 4px #fff,0 0 0 6px ${step.color},0 4px 14px rgba(3,70,101,0.25)` }}
                        />
                      </div>
                      {/* card */}
                      <div
                        className="flex-1 min-w-0 bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[16px] p-4 mb-4 overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[var(--sc)]"
                        style={{ '--sc': step.color, boxShadow: '0 4px 18px rgba(3,70,101,0.07)' }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <div
                            className="w-9 h-9 rounded-[12px] flex items-center justify-center text-[0.95rem] text-white flex-shrink-0"
                            style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 4px 12px ${step.color}50` }}
                          >
                            <i className={`bi ${step.icon}`} />
                          </div>
                          <span
                            className="text-[2rem] font-[900] leading-none tracking-[-0.06em]"
                            style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25) 0%,rgba(3,70,101,0.15) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                          >
                            {step.num}
                          </span>
                        </div>
                        <h4 className="text-[0.92rem] font-extrabold text-[#0d3d5a] m-0 mb-1 tracking-[-0.01em]">{step.title}</h4>
                        <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.6] m-0 mb-2.5">{step.desc}</p>
                        <div
                          className="inline-flex items-center px-2 py-[2px] rounded-full bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.22)] text-[0.6rem] font-bold tracking-[0.08em] uppercase"
                          style={{ color: step.color }}
                        >
                          Step {step.num}
                        </div>
                      </div>
                    </div>

                    {/* ── DESKTOP layout: zigzag 3-col ── */}
                    <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>
                      {/* left slot */}
                      {isLeft ? (
                        <div
                          className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[20px] p-[22px_24px_20px] overflow-hidden max-w-[380px] w-full mr-7 justify-self-end group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[var(--sc)]"
                          style={{ '--sc': step.color, boxShadow: '0 6px 24px rgba(3,70,101,0.07)' }}
                        >
                          <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg,${step.color},#034665)` }} />
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[1.1rem] text-white flex-shrink-0 transition-transform duration-[280ms] group-hover:scale-110 group-hover:rotate-[-6deg]" style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 6px 16px ${step.color}50` }}>
                              <i className={`bi ${step.icon}`} />
                            </div>
                            <span className="text-[2.4rem] font-[900] leading-none tracking-[-0.06em]" style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25) 0%,rgba(3,70,101,0.15) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{step.num}</span>
                          </div>
                          <h4 className="text-[1.05rem] font-extrabold text-[#0d3d5a] m-0 mb-1.5">{step.title}</h4>
                          <p className="text-[0.84rem] text-[#5a7a8a] leading-[1.65] m-0 mb-3">{step.desc}</p>
                          <div className="inline-flex items-center px-2.5 py-[3px] rounded-full bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.22)] text-[0.65rem] font-bold tracking-[0.08em] uppercase" style={{ color: step.color }}>Step {step.num}</div>
                        </div>
                      ) : (
                        <div />
                      )}

                      {/* centre dot */}
                      <div className="relative w-14 h-14 rounded-full flex items-center justify-center z-20 justify-self-center">
                        <div className="w-5 h-5 rounded-full" style={{ background: `linear-gradient(135deg,${step.color},#034665)`, boxShadow: `0 0 0 4px #fff,0 0 0 6px ${step.color},0 4px 14px rgba(3,70,101,0.25)` }} />
                        <div className="absolute inset-0 rounded-full border-2 opacity-0" style={{ borderColor: step.color, animation: `dotRingPulse 2.5s ease-in-out ${i * 0.4}s infinite` }} />
                      </div>

                      {/* right slot */}
                      {!isLeft ? (
                        <div
                          className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[20px] p-[22px_24px_20px] overflow-hidden max-w-[380px] w-full ml-7 justify-self-start group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[var(--sc)]"
                          style={{ '--sc': step.color, boxShadow: '0 6px 24px rgba(3,70,101,0.07)' }}
                        >
                          <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg,${step.color},#034665)` }} />
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[1.1rem] text-white flex-shrink-0 transition-transform duration-[280ms] group-hover:scale-110 group-hover:rotate-[-6deg]" style={{ background: `linear-gradient(135deg,${step.color} 0%,#034665 100%)`, boxShadow: `0 6px 16px ${step.color}50` }}>
                              <i className={`bi ${step.icon}`} />
                            </div>
                            <span className="text-[2.4rem] font-[900] leading-none tracking-[-0.06em]" style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25) 0%,rgba(3,70,101,0.15) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{step.num}</span>
                          </div>
                          <h4 className="text-[1.05rem] font-extrabold text-[#0d3d5a] m-0 mb-1.5">{step.title}</h4>
                          <p className="text-[0.84rem] text-[#5a7a8a] leading-[1.65] m-0 mb-3">{step.desc}</p>
                          <div className="inline-flex items-center px-2.5 py-[3px] rounded-full bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.22)] text-[0.65rem] font-bold tracking-[0.08em] uppercase" style={{ color: step.color }}>Step {step.num}</div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes wcuDotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:0.4} }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
