import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import portfolioItems from '../data/portfolioData';

const CAT_STYLE = {
  Web:    { icon: 'bi-code-slash',  color: '#61BBC5', bg: 'rgba(97,187,197,0.12)'  },
  Mobile: { icon: 'bi-phone-fill',  color: '#0a8fb6', bg: 'rgba(10,143,182,0.12)'  },
  Game:   { icon: 'bi-controller',  color: '#034665', bg: 'rgba(3,70,101,0.10)'    },
};

/* ── Eyebrow pill — matches site-wide pattern ── */
function Eyebrow({ label }) {
  return (
    <div className="inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.14em] uppercase text-[#034665] bg-[rgba(97,187,197,0.10)] border-[1.5px] border-[rgba(97,187,197,0.30)] rounded-full px-4 py-[6px]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#61BBC5] flex-shrink-0"
        style={{ animation: 'wcuDotPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(97,187,197,0.5)' }} />
      {label}
    </div>
  );
}

/* ── Section heading — matches Playfair Display gradient pattern ── */
function SectionHeading({ children, sub }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.12] tracking-[-0.03em] m-0"
        style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)' }}>
        {children}
      </h2>
      {sub && <p className="text-[0.95rem] text-[#5a7a8a] leading-[1.75] m-0 max-w-[520px]">{sub}</p>}
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const item   = portfolioItems.find(p => p.slug === slug);
  const others = portfolioItems.filter(p => p.slug !== slug).slice(0, 3);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!item) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center py-10 px-5 font-['Inter','Nunito_Sans',sans-serif]">
      <i className="bi bi-folder2-open text-[3.5rem] text-[#cbd5e1]" />
      <h2 className="text-[#0d3d5a] m-0 text-[1.6rem] font-['Playfair_Display',Georgia,serif]">Case study not found</h2>
      <Link to="/portfolio"
        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-[0.9rem] font-bold no-underline text-white hover:-translate-y-0.5 transition-all duration-200"
        style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 8px 28px rgba(97,187,197,0.35)' }}>
        <i className="bi bi-arrow-left" /> Back to Portfolio
      </Link>
    </div>
  );

  const cat = CAT_STYLE[item.category] || CAT_STYLE.Web;

  return (
    <div className="bg-white font-['Inter','Nunito_Sans',sans-serif] text-[#0d3d5a]">

      {/* ══ HERO ══ */}
      <header className="relative overflow-hidden bg-[#04121f]" style={{ minHeight: '100vh' }}>

        {/* full bg image with parallax feel */}
        <div className="absolute inset-0">
          <img src={item.image} alt={item.title}
            className="w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.06)', filter: 'saturate(0.85) brightness(0.55)' }} />
        </div>

        {/* layered overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(4,18,31,0.96) 0%,rgba(4,18,31,0.75) 45%,rgba(4,18,31,0.25) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(4,18,31,1) 0%,transparent 50%)' }} />

        {/* teal accent glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 70% at 0% 60%,rgba(97,187,197,0.18) 0%,transparent 60%)' }} />

        {/* noise */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />

        {/* content — left aligned, vertically centered */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col justify-center"
          style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>

          {/* breadcrumb */}
          <div className="flex items-center gap-1.5 text-[0.70rem] font-medium mb-8 flex-wrap">
            {[['Home','/'],['Portfolio','/portfolio'],[item.title,null]].map(([label,to],i,arr) => (
              <span key={i} className="flex items-center gap-1.5">
                {to
                  ? <Link to={to} className="text-[rgba(255,255,255,0.38)] hover:text-[#61BBC5] transition-colors no-underline">{label}</Link>
                  : <span className="text-[rgba(255,255,255,0.65)]">{label}</span>
                }
                {i < arr.length - 1 && <i className="bi bi-chevron-right text-[0.52rem] text-[rgba(255,255,255,0.25)]" />}
              </span>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16 max-w-[1100px]">

            {/* LEFT — title block */}
            <div className="flex flex-col gap-5 flex-1">
              {/* category pill */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.70rem] font-extrabold tracking-[0.1em] uppercase w-fit"
                style={{ color: cat.color, background: cat.bg, border: `1.5px solid ${cat.color}40`, backdropFilter: 'blur(10px)' }}>
                <i className={`bi ${cat.icon}`} /> {item.category}
              </span>

              {/* main title */}
              <h1 className="font-['Playfair_Display',Georgia,serif] font-black text-white leading-[1.03] tracking-[-0.04em] m-0 max-w-[700px]"
                style={{ fontSize: 'clamp(2.4rem,5.5vw,5rem)' }}>
                {item.title}
              </h1>

              {/* overview */}
              <p className="text-[0.95rem] sm:text-[1rem] text-[rgba(200,232,240,0.60)] leading-[1.85] max-w-[540px] m-0">
                {item.overview}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mt-1">
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-[0.88rem] font-bold no-underline text-white transition-all duration-200 hover:-translate-y-0.5 hover:text-white group relative overflow-hidden"
                  style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 8px 28px rgba(97,187,197,0.38)' }}>
                  <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Start a Project <i className="bi bi-arrow-right" />
                </Link>
                <Link to="/portfolio"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-[0.88rem] font-bold no-underline text-[rgba(255,255,255,0.80)] transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(12px)' }}>
                  <i className="bi bi-arrow-left" /> Back to Portfolio
                </Link>
              </div>
            </div>

            {/* RIGHT — meta card */}
            <div className="flex-shrink-0 w-full lg:w-[300px]">
              <div className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)' }}>
                {/* card header */}
                <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.08)]"
                  style={{ background: 'rgba(97,187,197,0.08)' }}>
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[rgba(97,187,197,0.8)]">Project Details</span>
                </div>
                {/* meta rows */}
                {[
                  { icon: 'bi-person-fill',    label: 'Client',   val: item.client   },
                  { icon: 'bi-clock-fill',     label: 'Duration', val: item.duration },
                  { icon: 'bi-calendar3',      label: 'Year',     val: item.year     },
                  { icon: 'bi-tag-fill',       label: 'Category', val: item.category },
                ].filter(m => m.val).map((m, i, arr) => (
                  <div key={m.label}
                    className={`flex items-center gap-3 px-5 py-3.5 ${i < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.07)]' : ''}`}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[0.72rem]"
                      style={{ background: 'rgba(97,187,197,0.12)', color: '#61BBC5' }}>
                      <i className={`bi ${m.icon}`} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.60rem] font-extrabold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.35)] m-0">{m.label}</p>
                      <p className="text-[0.82rem] font-semibold text-white m-0 truncate">{m.val}</p>
                    </div>
                  </div>
                ))}
                {/* tech tags */}
                {item.tech?.length > 0 && (
                  <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.07)]">
                    <p className="text-[0.60rem] font-extrabold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.35)] m-0 mb-2.5">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 5).map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold text-[#61BBC5]"
                          style={{ background: 'rgba(97,187,197,0.10)', border: '1px solid rgba(97,187,197,0.25)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-[11] leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 sm:h-12 block">
            <path fill="#ffffff" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60Z" />
          </svg>
        </div>
      </header>

      {/* ══ RESULTS ══ */}
      {item.results?.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 90% 0%,rgba(97,187,197,0.08) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 10% 100%,rgba(3,70,101,0.05) 0%,transparent 60%)' }} />

          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">

            {/* header */}
            <div className="flex flex-col items-center gap-4 text-center mb-12 sm:mb-16">
              <Eyebrow label="Impact" />
              <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.12] tracking-[-0.03em] m-0"
                style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)' }}>
                Numbers that{' '}
                <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                  matter
                </span>
              </h2>
              <p className="text-[0.92rem] text-[#5a7a8a] leading-[1.75] m-0 max-w-[480px]">
                Real outcomes delivered for a real client — measured from day one.
              </p>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[18px]">
              {item.results.map((r, i) => (
                <div key={i}
                  className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 bg-white border-[1.5px] border-[#e4eff5] overflow-hidden flex flex-col items-center text-center gap-1 sm:gap-1.5 cursor-default transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-[rgba(97,187,197,0.50)] hover:shadow-[0_24px_56px_rgba(3,70,101,0.14)]"
                  style={{ boxShadow: '0 4px 20px rgba(3,70,101,0.07)', animation: `wcuStatIn 0.5s ease ${i * 0.1}s both` }}>
                  {/* bg glow */}
                  <div aria-hidden className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full top-[-50px] right-[-30px] pointer-events-none z-0"
                    style={{ background: 'radial-gradient(circle,rgba(97,187,197,0.12) 0%,transparent 70%)' }} />
                  {/* top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl sm:rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg,#61BBC5,#034665)' }} />
                  {/* number */}
                  <div className="relative z-10 font-[900] leading-none tracking-[-0.05em] text-[1.9rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3rem] mt-2"
                    style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {r.metric}
                  </div>
                  {/* label */}
                  <div className="relative z-10 text-[0.72rem] sm:text-[0.82rem] font-bold text-[#0d3d5a] leading-[1.3] text-center">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CHALLENGE + SOLUTION ══ */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f8fbfc] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 90% 0%,rgba(97,187,197,0.08) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 10% 100%,rgba(3,70,101,0.05) 0%,transparent 60%)' }} />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
          <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
            <Eyebrow label="Deep Dive" />
            <SectionHeading sub="Understanding the problem is half the solution. Here's how we approached this project.">
              Problem &amp;{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                Solution
              </span>
            </SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Challenge */}
            <div className="relative bg-white border-[1.5px] border-[rgba(239,68,68,0.14)] rounded-[24px] p-7 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(239,68,68,0.10)]"
              style={{ boxShadow: '0 4px 24px rgba(239,68,68,0.05)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
                style={{ background: 'linear-gradient(90deg,#ef4444,#fca5a5)' }} />
              <div className="absolute bottom-[-40px] right-[-40px] w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(239,68,68,0.06),transparent 70%)' }} />
              <div className="w-12 h-12 rounded-[14px] bg-[rgba(239,68,68,0.1)] flex items-center justify-center text-[#ef4444] text-[1.3rem] mb-5">
                <i className="bi bi-exclamation-triangle-fill" />
              </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.3rem] font-extrabold text-[#0d3d5a] m-0 mb-3 tracking-[-0.02em]">The Challenge</h3>
              <p className="text-[0.90rem] text-[#5a7a8a] leading-[1.85] m-0 mb-5">{item.problem}</p>
              <div className="flex flex-col gap-2">
                {['Outdated technology & processes','Poor performance & user experience','Limited scalability for growth'].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[0.80rem] text-[#5a7a8a]">
                    <i className="bi bi-x-circle-fill text-[#ef4444] text-[0.82rem] flex-shrink-0" />{pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[24px] p-7 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(97,187,197,0.12)]"
              style={{ boxShadow: '0 4px 24px rgba(97,187,197,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
                style={{ background: 'linear-gradient(90deg,#61BBC5,#034665)' }} />
              <div className="absolute bottom-[-40px] right-[-40px] w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(97,187,197,0.10),transparent 70%)' }} />
              <div className="w-12 h-12 rounded-[14px] bg-[rgba(97,187,197,0.12)] flex items-center justify-center text-[#034665] text-[1.3rem] mb-5">
                <i className="bi bi-lightbulb-fill" />
              </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.3rem] font-extrabold text-[#0d3d5a] m-0 mb-3 tracking-[-0.02em]">Our Approach</h3>
              <p className="text-[0.90rem] text-[#5a7a8a] leading-[1.85] m-0 mb-5">{item.solution}</p>
              <div className="flex flex-col gap-2">
                {['Modern, scalable architecture','User-first design & experience','Agile delivery with full transparency'].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[0.80rem] text-[#5a7a8a]">
                    <i className="bi bi-check-circle-fill text-[#61BBC5] text-[0.82rem] flex-shrink-0" />{pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      {item.process?.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 10% 0%,rgba(97,187,197,0.07) 0%,transparent 60%)' }} />
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
            <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
              <Eyebrow label="How We Built It" />
              <SectionHeading sub="A structured, transparent workflow that keeps you in control at every step.">
                Our proven{' '}
                <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                  process
                </span>
              </SectionHeading>
            </div>

            {/* timeline */}
            <div className="relative w-full max-w-[900px] mx-auto">
              {/* spine */}
              <div className="absolute top-6 bottom-6 w-[3px] bg-[rgba(97,187,197,0.15)] rounded-full overflow-hidden z-0 left-6 sm:left-1/2 sm:-translate-x-1/2">
                <div className="w-full h-full rounded-full"
                  style={{ background: 'linear-gradient(180deg,#61BBC5 0%,#0a8fb6 50%,#034665 100%)' }} />
              </div>
              <div className="flex flex-col gap-0">
                {item.process.map((p, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className="relative z-10 min-h-[100px] sm:min-h-[110px]">
                      {/* mobile */}
                      <div className="flex items-start gap-4 sm:hidden pl-0">
                        <div className="flex-shrink-0 w-12 flex justify-center pt-4">
                          <div className="relative w-5 h-5 rounded-full"
                            style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', boxShadow: '0 0 0 4px #fff,0 0 0 6px #61BBC5,0 4px 14px rgba(3,70,101,0.25)' }} />
                        </div>
                        <div className="flex-1 min-w-0 bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[16px] p-4 mb-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)]"
                          style={{ boxShadow: '0 4px 18px rgba(3,70,101,0.07)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center text-[0.9rem] text-white flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', boxShadow: '0 4px 12px rgba(97,187,197,0.4)' }}>
                              <i className={`bi ${['bi-lightbulb-fill','bi-pencil-square','bi-code-slash','bi-rocket-takeoff-fill','bi-arrow-repeat'][i] || 'bi-check-circle'}`} />
                            </div>
                            <span className="text-[2rem] font-[900] leading-none tracking-[-0.06em]"
                              style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25),rgba(3,70,101,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                              {p.step}
                            </span>
                          </div>
                          <h4 className="text-[0.90rem] font-extrabold text-[#0d3d5a] m-0 mb-1">{p.title}</h4>
                          <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.6] m-0">{p.desc}</p>
                        </div>
                      </div>
                      {/* desktop zigzag */}
                      <div className="hidden sm:grid items-center" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>
                        {isLeft ? (
                          <div className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[20px] p-6 overflow-hidden max-w-[380px] w-full mr-7 justify-self-end group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[rgba(97,187,197,0.40)]"
                            style={{ boxShadow: '0 6px 24px rgba(3,70,101,0.07)' }}>
                            <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: 'linear-gradient(180deg,#61BBC5,#034665)' }} />
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[1.05rem] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                                style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', boxShadow: '0 6px 16px rgba(97,187,197,0.4)' }}>
                                <i className={`bi ${['bi-lightbulb-fill','bi-pencil-square','bi-code-slash','bi-rocket-takeoff-fill','bi-arrow-repeat'][i] || 'bi-check-circle'}`} />
                              </div>
                              <span className="text-[2.2rem] font-[900] leading-none tracking-[-0.06em]"
                                style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25),rgba(3,70,101,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                {p.step}
                              </span>
                            </div>
                            <h4 className="text-[1rem] font-extrabold text-[#0d3d5a] m-0 mb-1.5">{p.title}</h4>
                            <p className="text-[0.83rem] text-[#5a7a8a] leading-[1.65] m-0">{p.desc}</p>
                          </div>
                        ) : <div />}
                        {/* dot */}
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center z-20 justify-self-center">
                          <div className="w-5 h-5 rounded-full"
                            style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', boxShadow: '0 0 0 4px #fff,0 0 0 6px #61BBC5,0 4px 14px rgba(3,70,101,0.25)' }} />
                        </div>
                        {!isLeft ? (
                          <div className="relative bg-white border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-[20px] p-6 overflow-hidden max-w-[380px] w-full ml-7 justify-self-start group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(3,70,101,0.12)] hover:border-[rgba(97,187,197,0.40)]"
                            style={{ boxShadow: '0 6px 24px rgba(3,70,101,0.07)' }}>
                            <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: 'linear-gradient(180deg,#61BBC5,#034665)' }} />
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[1.05rem] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                                style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', boxShadow: '0 6px 16px rgba(97,187,197,0.4)' }}>
                                <i className={`bi ${['bi-lightbulb-fill','bi-pencil-square','bi-code-slash','bi-rocket-takeoff-fill','bi-arrow-repeat'][i] || 'bi-check-circle'}`} />
                              </div>
                              <span className="text-[2.2rem] font-[900] leading-none tracking-[-0.06em]"
                                style={{ background: 'linear-gradient(135deg,rgba(97,187,197,0.25),rgba(3,70,101,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                {p.step}
                              </span>
                            </div>
                            <h4 className="text-[1rem] font-extrabold text-[#0d3d5a] m-0 mb-1.5">{p.title}</h4>
                            <p className="text-[0.83rem] text-[#5a7a8a] leading-[1.65] m-0">{p.desc}</p>
                          </div>
                        ) : <div />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ TECH + FEATURES ══ */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f8fbfc] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 90% 100%,rgba(3,70,101,0.06) 0%,transparent 60%)' }} />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
          <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
            <Eyebrow label="What We Delivered" />
            <SectionHeading sub="The technologies we chose and the features we shipped — built for performance and scale.">
              Technology &amp;{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                Features
              </span>
            </SectionHeading>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Tech */}
            <div className="bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[22px] p-7 md:p-9 shadow-[0_4px_20px_rgba(3,70,101,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(3,70,101,0.10)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-[14px] bg-[rgba(97,187,197,0.10)] border border-[rgba(97,187,197,0.22)] flex items-center justify-center text-[#034665] text-[1.1rem]">
                  <i className="bi bi-cpu-fill" />
                </div>
                <div>
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#61BBC5] m-0">Stack</p>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] font-extrabold text-[#0d3d5a] m-0">Technologies Used</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {item.tech.map(t => (
                  <span key={t}
                    className="px-4 py-2 rounded-full text-[0.82rem] font-bold text-[#034665] cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
                    style={{ background: 'rgba(97,187,197,0.08)', border: '1.5px solid rgba(97,187,197,0.22)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(138deg,#61BBC5,#034665)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(97,187,197,0.32)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(97,187,197,0.08)'; e.currentTarget.style.borderColor = 'rgba(97,187,197,0.22)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >{t}</span>
                ))}
              </div>
            </div>
            {/* Features */}
            <div className="bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[22px] p-7 md:p-9 shadow-[0_4px_20px_rgba(3,70,101,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(3,70,101,0.10)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-[14px] bg-[rgba(97,187,197,0.10)] border border-[rgba(97,187,197,0.22)] flex items-center justify-center text-[#034665] text-[1.1rem]">
                  <i className="bi bi-check2-all" />
                </div>
                <div>
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#61BBC5] m-0">Delivered</p>
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] font-extrabold text-[#0d3d5a] m-0">Key Features</h3>
                </div>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {item.features.map(f => (
                  <li key={f}
                    className="flex items-center gap-3 text-[0.88rem] text-[#334155] font-medium px-4 py-3 bg-[rgba(97,187,197,0.04)] border border-[rgba(97,187,197,0.10)] rounded-xl transition-all duration-200 hover:bg-[rgba(97,187,197,0.09)] hover:border-[rgba(97,187,197,0.22)] hover:translate-x-1">
                    <i className="bi bi-check2-circle text-[#61BBC5] text-[1rem] flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY IT WORKED ══ */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 90% 50%,rgba(97,187,197,0.07) 0%,transparent 60%)' }} />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
          <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
            <Eyebrow label="Our Edge" />
            <SectionHeading sub="A combination of sharp technical execution and a client-first mindset — every time.">
              Why this project{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerAccent 4s linear infinite' }}>
                succeeded
              </span>
            </SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              { icon: 'bi-people-fill',       title: 'Client Collaboration',   desc: 'Weekly syncs, live demos, and a shared project board kept everyone aligned from day one.' },
              { icon: 'bi-shield-fill-check',  title: 'Security First',          desc: 'Every feature was reviewed for security implications before a single line hit production.' },
              { icon: 'bi-speedometer2',      title: 'Performance Budget',      desc: 'We set strict performance budgets and measured against them on every deployment.' },
              { icon: 'bi-phone-fill',        title: 'Mobile-First Design',     desc: 'All UI decisions started from the smallest screen and scaled up — never the other way.' },
              { icon: 'bi-arrow-repeat',      title: 'Agile Iterations',        desc: 'Short sprints with real deliverables. No big reveals — just continuous improvement.' },
              { icon: 'bi-graph-up-arrow',    title: 'Data-Driven Decisions',   desc: 'Analytics were wired up from day one so every design choice had measurable evidence.' },
            ].map((c, i) => (
              <div key={i}
                className="group relative bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[18px] md:rounded-[22px] p-5 md:p-7 overflow-hidden transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default hover:-translate-y-2 hover:shadow-[0_20px_52px_rgba(3,70,101,0.12)]"
                style={{ boxShadow: '0 4px 20px rgba(3,70,101,0.06)', animation: `wcuFadeUp 0.5s ease ${i * 0.08}s both` }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[18px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]"
                  style={{ background: 'linear-gradient(90deg,#61BBC5,#034665)' }} />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-[1rem] sm:text-[1.1rem] mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  style={{ background: 'rgba(97,187,197,0.10)', border: '1.5px solid rgba(97,187,197,0.22)', color: '#61BBC5', boxShadow: '0 4px 14px rgba(3,70,101,0.07)' }}>
                  <i className={`bi ${c.icon}`} />
                </div>
                <h4 className="text-[0.90rem] sm:text-[1rem] font-extrabold text-[#0d3d5a] m-0 mb-1.5 tracking-[-0.01em]">{c.title}</h4>
                <p className="text-[0.78rem] sm:text-[0.82rem] text-[#5a7a8a] leading-[1.65] m-0">{c.desc}</p>
                <div className="absolute bottom-[-40px] right-[-40px] w-[120px] h-[120px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle,rgba(97,187,197,0.10),transparent 70%)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      {item.images?.length > 1 && (
        <section className="py-16 sm:py-20 md:py-24 bg-[#f8fbfc]">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
            <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-14">
              <Eyebrow label="Visuals" />
              <SectionHeading>Project gallery</SectionHeading>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {item.images.map((src, i) => (
                <div key={i}
                  className="rounded-[20px] overflow-hidden relative transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(3,70,101,0.16)]"
                  style={{ height: 280, boxShadow: '0 6px 28px rgba(3,70,101,0.10)' }}>
                  <img src={src} alt={`${item.title} screen ${i + 1}`}
                    className="w-full h-full object-cover block transition-transform duration-700 hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(97,187,197,0.06)] to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.62rem] font-bold text-[#034665]"
                    style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)' }}>
                    Screen {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ TESTIMONIAL ══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 text-center">
          <div className="font-['Playfair_Display',Georgia,serif] text-[5rem] text-[rgba(97,187,197,0.22)] leading-none mb-2 select-none">"</div>
          <blockquote className="font-['Playfair_Display',Georgia,serif] text-[1.1rem] md:text-[1.25rem] text-[#0d3d5a] font-medium leading-[1.8] m-0 mb-6 italic">
            Kevalon Technology didn't just deliver a product — they became a strategic partner who understood our business deeply and built something that truly moves the needle.
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[0.9rem] font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 4px 14px rgba(97,187,197,0.35)' }}>
              {item.client?.charAt(0) || 'C'}
            </div>
            <div className="text-left">
              <div className="text-[0.85rem] font-bold text-[#0d3d5a]">{item.client || 'Client'}</div>
              <div className="text-[0.72rem] text-[#5a7a8a]">{item.title}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 0% 50%,rgba(97,187,197,0.18) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 100% 50%,rgba(3,70,101,0.35) 0%,transparent 55%),linear-gradient(135deg,#020c18 0%,#031a2e 50%,#041f38 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-[50%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(97,187,197,0.10),transparent 70%)' }} />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 flex-wrap text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.14em] uppercase text-[#61BBC5] bg-[rgba(97,187,197,0.12)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-4 py-[6px] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#61BBC5]"
                style={{ animation: 'wcuDotPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(97,187,197,0.5)' }} />
              Let's Work Together
            </div>
            <h2 className="font-['Playfair_Display',Georgia,serif] font-black text-white m-0 mb-3 tracking-[-0.04em] leading-[1.1]"
              style={{ fontSize: 'clamp(1.9rem,3.2vw,2.8rem)' }}>
              Ready to build something like this?
            </h2>
            <p className="text-[rgba(200,232,240,0.55)] m-0 text-[1rem] max-w-[420px] leading-[1.75]">
              Let's turn your idea into a product that scales globally. We've done it — we can do it for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[0.92rem] font-bold no-underline text-white transition-all duration-200 hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white group relative overflow-hidden"
              style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 8px 28px rgba(97,187,197,0.4)' }}>
              <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Start Your Project <i className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link to="/portfolio"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[0.92rem] font-bold no-underline text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.16)] hover:-translate-y-[3px] hover:text-white"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(8px)' }}>
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MORE PROJECTS ══ */}
      {others.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-[#f8fbfc] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 10% 0%,rgba(97,187,197,0.08) 0%,transparent 60%)' }} />
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10">
            <div className="flex items-end justify-between flex-wrap gap-5 mb-10 sm:mb-12">
              <div className="flex flex-col gap-3">
                <Eyebrow label="Explore More" />
                <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] tracking-[-0.03em] m-0"
                  style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)' }}>
                  More case studies
                </h2>
              </div>
              <Link to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.82rem] font-bold text-[#034665] no-underline transition-all duration-200 hover:bg-[rgba(97,187,197,0.08)] hover:-translate-y-0.5 group"
                style={{ border: '1.5px solid rgba(97,187,197,0.28)' }}>
                All Projects <i className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {others.map((o, idx) => {
                const oc = CAT_STYLE[o.category] || CAT_STYLE.Web;
                return (
                  <Link key={o.slug} to={`/case-study/${o.slug}`}
                    className="bg-white border-[1.5px] border-[rgba(97,187,197,0.15)] rounded-[18px] overflow-hidden no-underline text-inherit flex flex-col transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:shadow-[0_28px_64px_rgba(3,70,101,0.14)] hover:border-[rgba(97,187,197,0.35)] group"
                    style={{ boxShadow: '0 4px 20px rgba(3,70,101,0.06)', animation: `wcuFadeUp 0.5s ease ${idx * 0.1}s both` }}>
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <img src={o.image} alt={o.title}
                        className="w-full h-full object-cover block transition-transform duration-[550ms] group-hover:scale-[1.08]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,20,35,0.72)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.75rem] font-bold text-white"
                          style={{ background: 'rgba(97,187,197,0.22)', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(8px)' }}>
                          View Case Study <i className="bi bi-arrow-right" />
                        </span>
                      </div>
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[0.62rem] font-extrabold uppercase"
                        style={{ color: oc.color, background: oc.bg, backdropFilter: 'blur(8px)' }}>
                        <i className={`bi ${oc.icon}`} /> {o.category}
                      </span>
                    </div>
                    <div className="px-5 py-5 flex flex-col gap-1.5 flex-1">
                      <div className="inline-flex items-center gap-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.12em]" style={{ color: oc.color }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: oc.color }} />
                        {o.category}
                      </div>
                      <h4 className="font-['Playfair_Display',Georgia,serif] text-[1rem] font-extrabold text-[#0d3d5a] m-0 tracking-[-0.02em]">{o.title}</h4>
                      <p className="text-[0.80rem] text-[#5a7a8a] leading-[1.65] m-0 flex-1 line-clamp-2">{o.desc}</p>
                      {o.results?.length > 0 && (
                        <div className="flex gap-4 mt-2.5 pt-3 border-t border-[rgba(97,187,197,0.10)]">
                          {o.results.slice(0, 2).map((r, i) => (
                            <div key={i}>
                              <div className="text-[0.88rem] font-[900] text-[#61BBC5] leading-none">{r.metric}</div>
                              <div className="text-[0.62rem] text-[#7a9aaa] font-medium mt-0.5">{r.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes shimmerAccent {
          0%   { background-position: 0%   center; }
          100% { background-position: 250% center; }
        }
      `}</style>
    </div>
  );
}
