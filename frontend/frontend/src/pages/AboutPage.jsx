import React, { useEffect, useRef, useState } from 'react';

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

/* ── STATS ITEM ── */
function StatItem({ icon, target, suffix, label, sub }) {
  const { ref, val } = useCountUp(target);
  return (
    <div className="flex flex-col items-center px-6 py-10 gap-1.5 text-center border-r border-[rgba(97,187,197,0.15)] last:border-r-0 transition-colors duration-200 hover:bg-[rgba(97,187,197,0.06)] max-[960px]:[&:nth-child(2)]:border-r-0 max-[960px]:[&:nth-child(1)]:border-b max-[960px]:[&:nth-child(2)]:border-b"
      ref={ref}>
      <div className="w-[46px] h-[46px] rounded-[14px] bg-gradient-to-br from-[rgba(97,187,197,0.15)] to-[rgba(3,70,101,0.08)] border-[1.5px] border-[rgba(97,187,197,0.22)] flex items-center justify-center text-[1.1rem] text-navy mb-2 transition-all duration-200 hover:bg-gradient-to-br hover:from-teal hover:to-navy hover:text-white hover:scale-110 hover:rotate-[-5deg] hover:border-transparent hover:shadow-[0_6px_18px_rgba(97,187,197,0.35)]">
        <i className={`bi ${icon}`} />
      </div>
      <div className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-black bg-gradient-to-br from-teal to-navy bg-clip-text text-transparent leading-[1.2]">{val}{suffix}</div>
      <div className="text-[0.88rem] font-bold text-navy-dark">{label}</div>
      <div className="text-[0.72rem] font-semibold text-[#7a9aaa] tracking-[0.04em] uppercase">{sub}</div>
    </div>
  );
}

/* ── WHY-US CARD DATA ── */
const WHY = [
  { icon: 'bi-rocket-takeoff-fill', color: '#61BBC5', bg: '#f0fdff', title: 'Result-Driven',      text: 'Every project is built around measurable outcomes — traffic, conversions, and growth.' },
  { icon: 'bi-shield-lock-fill',    color: '#3b82f6', bg: '#eff6ff', title: 'Secure & Scalable',  text: 'Industry best-practices for security so your product grows without breaking.' },
  { icon: 'bi-chat-heart-fill',     color: '#eab308', bg: '#fefce8', title: 'Transparent',        text: 'Regular updates, clear timelines, and honest communication at every stage.' },
  { icon: 'bi-lightning-charge-fill', color: '#0a8fb6', bg: '#f0f9ff', title: 'Fast Turnaround', text: 'Agile workflows and a dedicated team mean faster delivery without compromising quality.' },
  { icon: 'bi-code-slash',          color: '#61BBC5', bg: '#f0fdff', title: 'Full-Stack Team',    text: 'Frontend, backend, APIs and cloud deployment — one team handles everything.' },
  { icon: 'bi-graph-up-arrow',      color: '#8b5cf6', bg: '#f5f3ff', title: 'Long-Term Partner', text: 'Ongoing support, maintenance, and growth consulting well after launch.' },
];

/* ── Shared gradient text ── */
const shimmerGrad = { background:'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmerAccent 4s linear infinite' };

/* ══════════════════════════════════════════════ */
export default function AboutPage() {
  const hero  = useReveal(0.08);
  const stats = useReveal(0.08);
  const mv    = useReveal(0.08);
  const why   = useReveal(0.08);

  return (
    <div className="bg-white font-[Inter,'Nunito_Sans',sans-serif] text-[#0f172a] overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative bg-white pt-[120px] pb-20 px-12 overflow-hidden min-h-[92vh] flex items-center max-md:pt-[100px] max-md:pb-16 max-md:px-6 max-sm:pt-24 max-sm:pb-14 max-sm:px-4">

        <div
          className={`relative z-10 max-w-[1240px] mx-auto w-full grid grid-cols-[1.1fr_0.9fr] gap-[72px] items-center transition-opacity duration-300 max-[960px]:grid-cols-1 max-[960px]:gap-12 ${hero.visible ? 'opacity-100' : 'opacity-0'}`}
          ref={hero.ref}>

          {/* left */}
          <div className={`flex flex-col gap-0 ${hero.visible ? 'animate-[ab-left_0.8s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}`}>

            <h1 className="text-[clamp(1.9rem,3.6vw,3rem)] font-black text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.03em] leading-[1.1] whitespace-nowrap m-0 mb-5 max-sm:text-[1.8rem] max-sm:whitespace-normal">
              Driving Digital<span style={shimmerGrad}> Success</span>
            </h1>

            <p className="text-[1.05rem] text-[#4a6a7a] leading-[1.85] m-0 mb-[22px] max-w-[520px]">
              A trusted IT company delivering reliable and
              result-driven digital solutions — from web apps and mobile to SEO
              and custom software — built for businesses of every size.
            </p>

            <blockquote className="text-[0.97rem] text-navy italic font-semibold leading-[1.75] m-0 mb-7 px-5 py-3.5 border-l-[3px] border-teal bg-[rgba(97,187,197,0.06)] rounded-[0_12px_12px_0]">
              "We don't just build software — we create scalable digital growth."
            </blockquote>

            <div className="flex gap-3.5 flex-wrap mb-7">
              <a href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[13px] text-[0.92rem] font-bold no-underline bg-gradient-to-br from-teal to-navy text-white shadow-[0_8px_24px_rgba(97,187,197,0.35)] transition-all duration-200 hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_16px_36px_rgba(97,187,197,0.5)] hover:text-white">
                Start Your Project <i className="bi bi-arrow-right" />
              </a>
              <a href="/services"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[13px] text-[0.92rem] font-bold no-underline bg-white border-[1.5px] border-[rgba(97,187,197,0.35)] text-navy shadow-[0_4px_14px_rgba(3,70,101,0.07)] transition-all duration-200 hover:border-[rgba(97,187,197,0.65)] hover:bg-[rgba(97,187,197,0.06)] hover:-translate-y-0.5 hover:text-navy">
                <i className="bi bi-grid-1x2" /> Our Services
              </a>
            </div>
          </div>

          {/* right — animated card stack */}
          <div className={`relative ${hero.visible ? 'animate-[ab-right_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]' : ''}`}>
            <div className="relative h-[380px] max-[960px]:h-[320px]">

              {/* top card */}
              <div className="bg-white rounded-3xl border-[1.5px] border-[rgba(97,187,197,0.18)] shadow-[0_12px_40px_rgba(3,70,101,0.10)] p-[30px_28px] absolute top-0 left-0 right-0 z-10 transition-all duration-[350ms] hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(3,70,101,0.14)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-[13px] bg-gradient-to-br from-teal to-navy flex items-center justify-center text-white text-[1.1rem] shadow-[0_6px_18px_rgba(97,187,197,0.35)]">
                    <i className="bi bi-building" />
                  </div>
                  <span className="text-[0.7rem] font-extrabold tracking-[0.1em] uppercase text-teal bg-[rgba(97,187,197,0.09)] border border-[rgba(97,187,197,0.25)] px-[11px] py-[3px] rounded-full">About Us</span>
                </div>
                <h3 className="text-[1.15rem] font-extrabold text-navy-dark m-0 mb-2.5">Who We Are</h3>
                <p className="text-[0.88rem] text-[#5a7a8a] leading-[1.75] m-0">
                  A passionate team of engineers, designers and strategists
                  building enterprise-grade digital products.
                </p>
              </div>

              {/* floating chips */}
              <div className="absolute z-[4] inline-flex items-center gap-1.5 px-4 py-[9px] rounded-full bg-white border-[1.5px] border-[rgba(97,187,197,0.28)] shadow-[0_6px_22px_rgba(3,70,101,0.12)] text-[0.78rem] font-extrabold text-navy whitespace-nowrap bottom-[55px] right-[-30px] animate-[ab-float-a_5s_ease-in-out_infinite] max-sm:hidden">
                <i className="bi bi-star-fill text-teal text-[0.9rem]" />
                <span>4.9 Rating</span>
              </div>
              <div className="absolute z-[4] inline-flex items-center gap-1.5 px-4 py-[9px] rounded-full bg-white border-[1.5px] border-[rgba(97,187,197,0.28)] shadow-[0_6px_22px_rgba(3,70,101,0.12)] text-[0.78rem] font-extrabold text-navy whitespace-nowrap bottom-[-10px] left-[-20px] animate-[ab-float-b_6s_ease-in-out_1s_infinite] max-sm:hidden">
                <i className="bi bi-check-circle-fill text-teal text-[0.9rem]" />
                <span>50+ Projects</span>
              </div>
              <div className="absolute z-[20] inline-flex items-center gap-1.5 px-4 py-[9px] rounded-full bg-white border-[1.5px] border-[rgba(97,187,197,0.28)] shadow-[0_6px_22px_rgba(3,70,101,0.12)] text-[0.78rem] font-extrabold text-navy whitespace-nowrap top-[-10px] right-[20px] animate-[ab-float-c_4.5s_ease-in-out_0.5s_infinite] max-sm:hidden">
                <i className="bi bi-people-fill text-teal text-[0.9rem]" />
                <span>20+ Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="bg-white border-t-[1.5px] border-[rgba(97,187,197,0.15)] border-b-[1.5px]">
        <div
          className={`max-w-[1240px] mx-auto px-12 transition-opacity duration-300 max-md:px-6 ${stats.visible ? 'opacity-100' : 'opacity-0'}`}
          ref={stats.ref}>
          <div className={`grid grid-cols-4 max-[960px]:grid-cols-2 ${stats.visible ? 'animate-[ab-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}`}>
            <StatItem icon="bi-calendar-check"     target={2}  suffix="+" label="Years in Business"  sub="Trusted experience"     />
            <StatItem icon="bi-people-fill"         target={20} suffix="+" label="Dedicated Experts"  sub="Skilled professionals"  />
            <StatItem icon="bi-box-seam"            target={50} suffix="+" label="Projects Delivered" sub="Across industries"      />
            <StatItem icon="bi-globe2"              target={10} suffix="+" label="Global Clients"     sub="Long-term partnerships" />
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="bg-white py-14 sm:py-16 md:py-20 px-12 max-md:px-6">
        <div
          className={`max-w-[1240px] mx-auto transition-opacity duration-300 ${mv.visible ? 'opacity-100' : 'opacity-0'}`}
          ref={mv.ref}>

          <div className={`text-center mb-14 ${mv.visible ? 'animate-[ab-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}`}>
            <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full py-[6px] px-[18px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-navy mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-teal flex-shrink-0 animate-[ab-dot_2.2s_ease-in-out_infinite]" />
              Our Purpose
            </span>
            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.025em] leading-[1.15] m-0 mb-3">
              Mission &amp; <span style={shimmerGrad}>Vision</span>
            </h2>
            <p className="text-base text-[#5a7a8a] max-w-[480px] mx-auto m-0 leading-[1.8]">The principles that guide everything we build.</p>
          </div>

          <div className={`grid grid-cols-2 gap-7 max-[960px]:grid-cols-1 ${mv.visible ? 'animate-[ab-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]' : ''}`}>

            {/* Mission */}
            <div className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[28px] p-[44px_40px] shadow-[0_4px_24px_rgba(3,70,101,0.06)] overflow-hidden transition-all duration-[320ms] hover:-translate-y-2 hover:border-[rgba(97,187,197,0.38)] hover:shadow-[0_24px_56px_rgba(3,70,101,0.12)] after:content-[''] after:absolute after:bottom-[-60px] after:right-[-60px] after:w-[200px] after:h-[200px] after:rounded-full after:bg-[radial-gradient(circle,rgba(97,187,197,0.10),transparent_65%)] after:pointer-events-none max-sm:p-[28px_22px]">
              {/* stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-navy rounded-[28px_28px_0_0] animate-[ab-stripe_1.2s_cubic-bezier(0.22,1,0.36,1)_0.4s_both]" />
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-teal to-navy flex items-center justify-center text-[1.4rem] text-white mb-[22px] shadow-[0_8px_24px_rgba(97,187,197,0.38)] transition-transform duration-300 hover:scale-110 hover:rotate-[-6deg]">
                <i className="bi bi-bullseye" />
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.02em] m-0 mb-4">Our Mission</h3>
              <p className="text-[0.95rem] text-[#4a6a7a] leading-[1.85] m-0 mb-6">
                To empower businesses with innovative, secure, and high-performance
                digital solutions. We deliver customised website development, mobile
                apps, custom software, and SEO services that help businesses grow and
                stay competitive — turning ideas into impactful digital experiences
                for startups and enterprises across India and beyond.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Innovation', 'Quality', 'Reliability'].map(t => (
                  <span key={t} className="px-3.5 py-[5px] rounded-full text-[0.72rem] font-extrabold tracking-[0.06em] uppercase bg-[rgba(97,187,197,0.10)] border border-[rgba(97,187,197,0.25)] text-navy">{t}</span>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[28px] p-[44px_40px] shadow-[0_4px_24px_rgba(3,70,101,0.06)] overflow-hidden transition-all duration-[320ms] hover:-translate-y-2 hover:border-[rgba(97,187,197,0.38)] hover:shadow-[0_24px_56px_rgba(3,70,101,0.12)] after:content-[''] after:absolute after:bottom-[-60px] after:right-[-60px] after:w-[200px] after:h-[200px] after:rounded-full after:bg-[radial-gradient(circle,rgba(97,187,197,0.10),transparent_65%)] after:pointer-events-none max-sm:p-[28px_22px]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy to-teal rounded-[28px_28px_0_0] animate-[ab-stripe_1.2s_cubic-bezier(0.22,1,0.36,1)_0.4s_both]" />
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-navy to-teal flex items-center justify-center text-[1.4rem] text-white mb-[22px] shadow-[0_8px_24px_rgba(97,187,197,0.38)] transition-transform duration-300 hover:scale-110 hover:rotate-[-6deg]">
                <i className="bi bi-eye" />
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.02em] m-0 mb-4">Our Vision</h3>
              <p className="text-[0.95rem] text-[#4a6a7a] leading-[1.85] m-0 mb-6">
                To become the leading digital agency — delivering
                solutions that drive sustainable business growth. We aim to simplify
                life through technology, enhance productivity, and create lasting
                value by setting new standards in web development, mobile apps, SEO,
                and digital transformation across Gujarat, India, and beyond.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Growth', 'Leadership', 'Impact'].map(t => (
                  <span key={t} className="px-3.5 py-[5px] rounded-full text-[0.72rem] font-extrabold tracking-[0.06em] uppercase bg-[rgba(3,70,101,0.08)] border border-[rgba(3,70,101,0.18)] text-navy">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="relative bg-white border-t-[1.5px] border-[rgba(97,187,197,0.12)] py-14 sm:py-16 md:py-20 px-12 overflow-hidden max-md:px-6">
        <div
          className={`max-w-[1240px] mx-auto relative z-10 transition-opacity duration-300 ${why.visible ? 'opacity-100' : 'opacity-0'}`}
          ref={why.ref}>

          <div className={`text-center mb-14 ${why.visible ? 'animate-[ab-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}`}>
            <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full py-[6px] px-[18px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-navy mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-teal flex-shrink-0 animate-[ab-dot_2.2s_ease-in-out_infinite]" />
              Why Kevalon
            </span>
            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.025em] leading-[1.15] m-0 mb-3">
              Why Work <span style={shimmerGrad}>With Us</span>
            </h2>
            <p className="text-base text-[#5a7a8a] max-w-[480px] mx-auto m-0 leading-[1.8]">
              We combine technical depth with a client-first mindset to deliver
              solutions that actually move the needle.
            </p>
          </div>

          <div className={`grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-4 ${why.visible ? 'animate-[ab-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.08s_both]' : ''}`}>
            {WHY.map((c, i) => (
              <div key={c.title}
                className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.14)] rounded-[22px] px-7 py-8 shadow-[0_4px_20px_rgba(3,70,101,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[rgba(97,187,197,0.38)] hover:shadow-[0_20px_48px_rgba(3,70,101,0.12)] group animate-[ab-up_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${i * 0.08}s` }}>
                {/* top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal to-navy rounded-[22px_22px_0_0] scale-x-0 origin-left transition-transform duration-[350ms] group-hover:scale-x-100" />
                <div className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center text-[1.3rem] mb-[18px] transition-transform duration-[280ms] group-hover:scale-110 group-hover:rotate-[-5deg]"
                  style={{ background: c.bg }}>
                  <i className={`bi ${c.icon}`} style={{ color: c.color }} />
                </div>
                <h4 className="text-base font-extrabold text-navy-dark m-0 mb-2.5 tracking-[-0.01em] transition-colors duration-200 group-hover:text-navy">{c.title}</h4>
                <p className="text-[0.88rem] text-[#5a7a8a] leading-[1.8] m-0">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ab-up    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ab-left  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ab-right { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes ab-dot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.8)} }
        @keyframes ab-float-a { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
        @keyframes ab-float-b { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-16px) rotate(-1deg)} }
        @keyframes ab-float-c { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes ab-stripe  { from{width:0} to{width:100%} }
      `}</style>
    </div>
  );
}
