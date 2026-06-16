import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const services = [
  { slug:'web-application-development',      title:'Web Application Development',    desc:'Custom, scalable web applications built with modern frameworks for enterprise-grade performance.', icon:'bi-code-slash',        tags:['React','Next.js','Node.js'],               link:'/services/web-application-development',      image:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&q=85', color:'#61BBC5', num:'01' },
  { slug:'mobile-application-development',   title:'Mobile App Development',         desc:'High-performance native and cross-platform apps for every device and every user.',                  icon:'bi-phone',              tags:['Flutter','React Native','iOS & Android'],  link:'/services/mobile-application-development',   image:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&q=85', color:'#034665', num:'02' },
  { slug:'game-development',                 title:'Game Development',                desc:'Engaging 2D/3D games built for mobile, web and cross-platform publishing.',                         icon:'bi-controller',         tags:['Unity','2D & 3D','Multiplayer'],           link:'/services/game-development',                 image:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop&q=85', color:'#0a8fb6', num:'03' },
  { slug:'e-commerce-development',           title:'E-Commerce Development',         desc:'Secure and scalable stores with powerful checkout and inventory management.',                       icon:'bi-cart3',              tags:['Shopify','WooCommerce','Custom'],           link:'/services/e-commerce-development',           image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&q=85', color:'#61BBC5', num:'04' },
  { slug:'web-erp-development',              title:'Web ERP Development',             desc:'End-to-end ERP systems connecting finance, HR, inventory and operations.',                          icon:'bi-kanban',             tags:['ERP Modules','Analytics','Automation'],    link:'/services/web-erp-development',              image:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop&q=85', color:'#034665', num:'05' },
  { slug:'api-development',                  title:'API Development',                 desc:'Secure RESTful and GraphQL APIs built for modern web, mobile and cloud.',                           icon:'bi-plug',               tags:['REST APIs','GraphQL','Microservices'],     link:'/services/api-development',                  image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&q=85', color:'#0a8fb6', num:'06' },
  { slug:'crm-development',                  title:'CRM Development',                 desc:'Custom CRM platforms with automation and integration for business growth.',                          icon:'bi-people-fill',        tags:['Lead Mgmt','Pipeline','Automation'],       link:'/services/crm-development',                  image:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop&q=85', color:'#61BBC5', num:'07' },
  { slug:'seo-digital-marketing',            title:'SEO & Digital Marketing',         desc:'Data-driven SEO and growth marketing that boosts rankings and conversions.',                        icon:'bi-graph-up-arrow',     tags:['SEO','Google Ads','Analytics'],           link:'/services/seo-digital-marketing',            image:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop&q=85', color:'#034665', num:'08' },
  { slug:'internship-training',              title:'Internship & Training',           desc:'Hands-on internships, live projects with mentorship and career support.',                           icon:'bi-mortarboard-fill',   tags:['Live Projects','Mentorship','Certification'], link:'/services/internship-training',            image:'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=85', color:'#0a8fb6', num:'09' },
];

const total = services.length;

/* ── Mobile-only infinite carousel (fade transition, no scroll) ── */
function MobileCarousel() {
  const [cur, setCur]       = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const timer = useRef(null);

  const goTo = useCallback((next) => {
    setFading(true);
    setTimeout(() => {
      setCur((next + total) % total);
      setFading(false);
    }, 220);
  }, []);

  const next = useCallback(() => goTo(cur + 1), [cur, goTo]);
  const prev = useCallback(() => goTo(cur - 1), [cur, goTo]);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, 3500);
    return () => clearTimeout(timer.current);
  }, [cur, paused, next]);

  const s = services[cur];

  return (
    <div className="sm:hidden flex flex-col gap-4">
      {/* card */}
      <div
        className="relative overflow-hidden rounded-[18px] h-[260px] border border-[rgba(97,187,197,0.15)] cursor-pointer"
        style={{
          boxShadow: '0 3px 16px rgba(3,70,101,0.10)',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.22s ease',
        }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <img
          src={s.image}
          alt={s.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2.5px] z-[5]"
          style={{ background: `linear-gradient(90deg,${s.color},#034665)`, boxShadow: `0 0 8px ${s.color}`, borderRadius: '18px 18px 0 0' }}
        />
        {/* overlay */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center p-4 rounded-[18px]"
          style={{ background: 'linear-gradient(170deg,rgba(3,25,55,0.45) 0%,rgba(3,70,101,0.58) 100%)' }}
        >
          <div
            className="flex items-center justify-center text-white mb-2 flex-shrink-0"
            style={{ width: 38, height: 38, fontSize: '1rem', borderRadius: 11, background: s.color, boxShadow: `0 3px 12px ${s.color}56` }}
          >
            <i className={`bi ${s.icon}`} />
          </div>
          <h4 className="font-extrabold text-white m-0 mb-[5px] leading-[1.3] text-[1rem]">{s.title}</h4>
          <p className="text-[rgba(200,235,240,0.82)] leading-[1.5] m-0 mb-[7px] line-clamp-3 text-[0.74rem]">{s.desc}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {s.tags.map((t, ti) => (
              <span key={ti} className="font-bold rounded-full border text-[0.60rem]" style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.30)', color: '#fff' }}>{t}</span>
            ))}
          </div>
          <Link to={s.link} className="inline-flex items-center gap-1 font-bold no-underline text-[0.78rem]" style={{ color: s.color }}>
            Learn more <i className="bi bi-arrow-up-right text-[0.62rem]" />
          </Link>
        </div>
      </div>

      {/* controls: ← dots → */}
      <div className="flex flex-row items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-[38px] h-[38px] flex-shrink-0 border border-[rgba(97,187,197,0.35)] bg-white flex items-center justify-center text-[15px] text-[#034665] active:scale-90 transition-transform"
          style={{ borderRadius: '50%', boxShadow: '0 3px 14px rgba(3,70,101,0.10)' }}
        >
          <i className="bi bi-chevron-left" />
        </button>

        <div className="flex items-center gap-1.5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to service ${i + 1}`}
              className="h-2 border-0 p-0 cursor-pointer transition-all duration-300"
              style={i === cur
                ? { width: 28, borderRadius: 999, background: 'linear-gradient(90deg,#61BBC5,#034665)', boxShadow: '0 2px 10px rgba(97,187,197,0.45)' }
                : { width: 8,  borderRadius: '50%', background: 'rgba(97,187,197,0.3)' }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="w-[38px] h-[38px] flex-shrink-0 border border-[rgba(97,187,197,0.35)] bg-white flex items-center justify-center text-[15px] text-[#034665] active:scale-90 transition-transform"
          style={{ borderRadius: '50%', boxShadow: '0 3px 14px rgba(3,70,101,0.10)' }}
        >
          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile,   setIsMobile]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 540);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-[90px] px-4 sm:px-6 font-['Inter','Nunito_Sans',sans-serif] overflow-hidden bg-white isolate">
      {services.map(s => <span key={s.slug} id={`expertise-${s.slug}`} className="absolute" />)}
      {/* teal gradient bg glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 10% 0%,rgba(97,187,197,0.10) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 90% 100%,rgba(3,70,101,0.07) 0%,transparent 60%)' }} />

      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col gap-[60px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-8 flex-wrap" style={{ animation: 'svFadeUp 0.7s ease both' }}>
          <div className="flex flex-col items-start gap-3.5 max-w-[620px]">
            <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.10em] uppercase text-[#034665] bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.30)] rounded-full px-[18px] py-[6px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation: 'svPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(97,187,197,0.5)' }} />
              WHAT WE DO
            </span>
            <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.15] tracking-[-0.03em] m-0" style={{ fontSize: 'clamp(1.9rem,3.8vw,2.8rem)' }}>
              Capabilities across{' '}
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'svShimmer 4s linear infinite' }}>design, code &amp; growth.</span>
            </h2>
            <p className="text-[1rem] text-[#5a7a8a] leading-[1.75] m-0">End-to-end digital solutions — from product design and MVP launches to full-scale deployment and growth marketing.</p>
          </div>
          <div className="flex-shrink-0 flex items-center pb-1">
            <Link to="/services" className="inline-flex items-center gap-2.5 px-8 py-3.5 text-[0.95rem] font-bold text-white no-underline rounded-full relative overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:scale-[1.03] group" style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 8px 28px rgba(97,187,197,0.35)' }}>
              <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              View all services <i className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Mobile carousel */}
        <MobileCarousel />

        {/* Desktop / tablet grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
          {services.map((s, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <Link
                key={s.slug}
                to={s.link}
                className="relative block no-underline overflow-hidden cursor-pointer border border-[rgba(97,187,197,0.15)] transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] h-[200px] rounded-[14px]"
                style={{
                  boxShadow: isHovered ? '0 18px 40px rgba(3,70,101,0.18),0 0 18px rgba(97,187,197,0.12)' : '0 3px 16px rgba(3,70,101,0.10)',
                  transform: isHovered ? 'translateY(-7px) scale(1.02)' : 'translateY(0) scale(1)',
                  borderColor: isHovered ? 'rgba(97,187,197,0.50)' : 'rgba(97,187,197,0.15)',
                  animation: `svFadeUp 0.55s ease ${i * 0.05}s both`,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }} />
                <div className="absolute inset-0 z-10 transition-opacity duration-300" style={{ background: 'linear-gradient(to top,rgba(2,15,40,0.82) 0%,rgba(2,15,40,0.42) 55%,rgba(2,15,40,0.08) 100%)', opacity: isHovered ? 0 : 1 }} />
                <div className="absolute top-0 left-0 right-0 h-[2.5px] z-[5] transition-opacity duration-200" style={{ background: `linear-gradient(90deg,${s.color},#034665)`, boxShadow: `0 0 8px ${s.color}`, borderRadius: '14px 14px 0 0', opacity: isHovered ? 1 : 0 }} />
                {/* front layer */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 pb-3.5 transition-all duration-200" style={{ opacity: isHovered ? 0 : 1, transform: isHovered ? 'translateY(6px)' : 'translateY(0)' }}>
                  <span className="absolute top-2.5 left-3 text-[0.58rem] font-extrabold tracking-[0.1em] text-white/65 bg-black/30 backdrop-blur-md rounded-full px-2 py-0.5 font-['Fira_Code',monospace]">{s.num}</span>
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[0.82rem] text-white mb-1.5"><i className={`bi ${s.icon}`} /></div>
                  <h4 className="text-[0.82rem] font-bold text-white m-0 leading-[1.3]" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{s.title}</h4>
                </div>
                {/* hover overlay */}
                <div className="absolute inset-0 z-30 flex flex-col justify-center p-3.5 transition-all duration-[280ms] rounded-[14px]" style={{ background: 'linear-gradient(145deg,rgba(2,15,46,0.96) 0%,rgba(3,70,101,0.94) 100%)', opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(8px)' }}>
                  <div className="flex items-center justify-center text-white mb-2" style={{ width: 30, height: 30, fontSize: '0.80rem', borderRadius: 8, background: s.color, boxShadow: `0 3px 12px ${s.color}56`, marginBottom: 6 }}><i className={`bi ${s.icon}`} /></div>
                  <h4 className="font-extrabold text-white m-0 mb-[5px] leading-[1.3] text-[0.82rem]">{s.title}</h4>
                  <p className="text-[rgba(200,235,240,0.82)] leading-[1.5] m-0 mb-[7px] line-clamp-3 text-[0.68rem]">{s.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {s.tags.map((t, ti) => (
                      <span key={ti} className="font-bold rounded-full border text-[0.55rem]" style={{ padding: '2px 6px', background: 'rgba(97,187,197,0.16)', borderColor: 'rgba(97,187,197,0.30)', color: '#a8e6ec' }}>{t}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-[0.70rem]" style={{ color: s.color }}>Learn more <i className="bi bi-arrow-up-right text-[0.62rem]" /></span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

