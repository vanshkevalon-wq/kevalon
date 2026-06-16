import React, { useState, useRef, useEffect, useCallback } from 'react';
import ProjectModal from './ProjectModal';
import portfolioItems from '../data/portfolioData';

const TABS = ['All', 'Web', 'Mobile', 'Game'];
const CAT = {
  Web:    { icon: 'bi-code-slash', color: '#61BBC5', bg: 'rgba(97,187,197,0.12)', label: 'Web'    },
  Mobile: { icon: 'bi-phone-fill', color: '#0a8fb6', bg: 'rgba(10,143,182,0.12)', label: 'Mobile' },
  Game:   { icon: 'bi-controller', color: '#034665', bg: 'rgba(3,70,101,0.10)',   label: 'Game'   },
};

function useReveal() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { setOn(e.isIntersecting); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

/* ── Mobile slider card ── */
function MobileSliderCard({ item, onOpen }) {
  const c = CAT[item.category] || CAT.Web;
  return (
    <div className="flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(3,70,101,0.12)] border border-[rgba(97,187,197,0.15)] bg-white snap-center">
      {/* image */}
      <div
        className="relative h-[200px] overflow-hidden cursor-pointer"
        onClick={() => onOpen(item)} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onOpen(item)}
        aria-label={`Open ${item.title}`}
      >
        <img
          src={item.image} alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(160deg,rgba(3,70,101,0.45) 0%,rgba(97,187,197,0.25) 100%)' }} />
        <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[0.62rem] font-extrabold text-[#034665] tracking-[0.08em]">
          {item.year}
        </span>
        <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.60rem] font-extrabold text-white uppercase tracking-[0.06em]"
          style={{ background: c.bg, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.30)' }}>
          <i className={`bi ${c.icon}`} /> {c.label}
        </span>
      </div>

      {/* content */}
      <div className="px-4 py-4">
        <div className="inline-flex items-center gap-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] mb-1.5" style={{ color: c.color }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.color }} />
          <i className={`bi ${c.icon}`} /> {c.label}
        </div>
        <h3 className="font-['Playfair_Display',Georgia,serif] font-[900] text-[#0d3d5a] tracking-[-0.02em] leading-[1.2] mb-1.5 text-[1rem]">
          {item.title}
        </h3>
        <p className="text-[0.78rem] text-[#5a7a8a] leading-[1.6] mb-3 line-clamp-2">{item.desc}</p>

        {item.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tech.slice(0, 3).map(t => (
              <span key={t} className="px-2.5 py-0.5 bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.18)] rounded-full text-[0.62rem] font-bold text-[#034665]">{t}</span>
            ))}
          </div>
        )}

        <button
          onClick={() => onOpen(item)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[rgba(97,187,197,0.25)] rounded-full text-[0.72rem] font-bold text-[#034665] cursor-pointer transition-all duration-200 active:scale-95"
        >
          Open Case Study
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.62rem] flex-shrink-0" style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
            <i className="bi bi-arrow-up-right" />
          </div>
        </button>
      </div>
    </div>
  );
}

/* ── Mobile slider (shown only on < md screens) ── */
function MobileSlider({ items, onOpen }) {
  const [current, setCurrent] = useState(0);
  const trackRef    = useRef(null);
  const paused      = useRef(false);   // true while user is touching / hovering
  const currentRef  = useRef(0);       // mirror of current for use inside interval

  /* keep ref in sync with state */
  useEffect(() => { currentRef.current = current; }, [current]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    setCurrent(clamped);
    currentRef.current = clamped;
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped];
    if (card) {
      // Use scrollTo on the track element itself to avoid page-level vertical scroll jumps on mobile
      const cardLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: cardLeft, behavior: 'smooth' });
    }
  }, [items.length]);

  /* ── auto-slide every 3.5 s, wraps around, pauses on touch/hover ── */
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      if (paused.current) return;
      const next = (currentRef.current + 1) % items.length;
      goTo(next);
    }, 3500);
    return () => clearInterval(id);
  }, [items.length, goTo]);

  /* sync dot indicator when user scrolls freely */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children);
      const trackMid = track.scrollLeft + track.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs((card.offsetLeft + card.offsetWidth / 2) - trackMid);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setCurrent(closest);
      currentRef.current = closest;
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [items]);

  /* reset to first card when items change (tab switch) */
  useEffect(() => {
    setCurrent(0);
    currentRef.current = 0;
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [items]);

  return (
    <div
      className="md:hidden relative mb-10"
      /* pause on hover (desktop-mobile emulators) */
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      /* pause while finger is on screen */
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={() => {
        /* resume after a short delay so snap finishes first */
        setTimeout(() => { paused.current = false; }, 1200);
      }}
    >
      {/* scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[10vw] pb-2 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <MobileSliderCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>

      {/* prev / next arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => { paused.current = true; goTo(current - 1); setTimeout(() => { paused.current = false; }, 4000); }}
            disabled={current === 0}
            aria-label="Previous project"
            className="absolute left-1 top-[42%] -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#034665] bg-white/90 shadow-md border border-[rgba(97,187,197,0.25)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 z-10"
          >
            <i className="bi bi-chevron-left text-[0.85rem]" />
          </button>
          <button
            onClick={() => { paused.current = true; goTo(current + 1); setTimeout(() => { paused.current = false; }, 4000); }}
            disabled={current === items.length - 1}
            aria-label="Next project"
            className="absolute right-1 top-[42%] -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#034665] bg-white/90 shadow-md border border-[rgba(97,187,197,0.25)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 z-10"
          >
            <i className="bi bi-chevron-right text-[0.85rem]" />
          </button>
        </>
      )}

      {/* dot indicators */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { paused.current = true; goTo(i); setTimeout(() => { paused.current = false; }, 4000); }}
              aria-label={`Go to project ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === current ? 20 : 8,
                height:     8,
                background: i === current ? 'linear-gradient(90deg,#61BBC5,#034665)' : 'rgba(97,187,197,0.30)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── single showcase row ── */
function ShowcaseRow({ item, index, onOpen }) {
  const { ref, on } = useReveal();
  const c    = CAT[item.category] || CAT.Web;
  const flip = index % 2 !== 0;
  const [btnHovered, setBtnHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <article ref={ref} className="relative overflow-hidden border-b border-[rgba(97,187,197,0.10)]">

      {/* ── MOBILE: handled by MobileSlider above — hide this on mobile ── */}
      <div className="hidden sm:flex flex-col md:hidden">
        {/* image */}
        <div
          className="relative h-[220px] sm:h-[260px] overflow-hidden cursor-pointer"
          onClick={() => onOpen(item)} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onOpen(item)}
          aria-label={`Open ${item.title}`}
        >
          <img
            src={item.image} alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-top block"
            loading="lazy"
          />
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(160deg,rgba(3,70,101,0.55) 0%,rgba(97,187,197,0.35) 100%)' }} />
          <span
            className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[0.65rem] font-extrabold text-[#034665] tracking-[0.08em]"
          >{item.year}</span>
          <span
            className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.62rem] font-extrabold text-white uppercase tracking-[0.06em]"
            style={{ background: c.bg, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.30)' }}
          >
            <i className={`bi ${c.icon}`} /> {c.label}
          </span>
          {/* tap-to-view overlay */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 text-white text-[0.82rem] font-bold opacity-0 active:opacity-100 transition-opacity duration-200">
            <i className="bi bi-eye-fill text-[1.8rem]" />
            <span>View Project</span>
          </div>
        </div>

        {/* content */}
        <div className="bg-white px-4 py-5">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] mb-1.5" style={{ color: c.color }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.color }} />
            <i className={`bi ${c.icon}`} /> {c.label}
          </div>
          <h3 className="font-['Playfair_Display',Georgia,serif] font-[900] text-[#0d3d5a] tracking-[-0.02em] leading-[1.2] mb-1.5 text-[1.05rem] sm:text-[1.15rem]">{item.title}</h3>
          <p className="text-[0.8rem] text-[#5a7a8a] leading-[1.6] mb-3 line-clamp-2">{item.desc}</p>

          {item.tech?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tech.slice(0, 3).map(t => (
                <span key={t} className="px-2.5 py-0.5 bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.18)] rounded-full text-[0.65rem] font-bold text-[#034665]">{t}</span>
              ))}
            </div>
          )}

          <button
            onClick={() => onOpen(item)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[rgba(97,187,197,0.25)] rounded-full text-[0.75rem] font-bold text-[#034665] cursor-pointer transition-all duration-200 active:scale-95"
          >
            Open Case Study
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.65rem] flex-shrink-0" style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
              <i className="bi bi-arrow-up-right" />
            </div>
          </button>
        </div>
      </div>

      {/* ── DESKTOP: side-by-side alternating layout ── */}
      <div
        className={`hidden md:grid transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}
        style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 320 }}
      >
        {/* image panel */}
        <div
          className={`relative overflow-hidden cursor-pointer transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${flip ? 'order-2' : 'order-1'}
            ${on ? 'translate-x-0 opacity-100' : (flip ? 'translate-x-14 opacity-0' : '-translate-x-14 opacity-0')}`}
          onClick={() => onOpen(item)}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onOpen(item)}
          aria-label={`Open ${item.title}`}
        >
          <img
            src={item.image} alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-top block transition-transform duration-[800ms]"
            style={{ transform: imgHovered ? 'scale(1.04)' : 'scale(1)' }}
            loading="lazy"
          />
          {/* tinted overlay on hover */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-[400ms]"
            style={{
              background: 'linear-gradient(160deg,rgba(3,70,101,0.7) 0%,rgba(97,187,197,0.5) 100%)',
              opacity: imgHovered ? 1 : 0,
            }}
          />
          <span className="absolute top-4 left-4 z-20 bg-white/[0.92] backdrop-blur-md rounded-full px-3.5 py-[5px] text-[0.70rem] font-extrabold text-[#034665] tracking-[0.08em]" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>{item.year}</span>
          <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-[0.68rem] font-extrabold text-white uppercase tracking-[0.06em]" style={{ background: c.bg, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.30)' }}>
            <i className={`bi ${c.icon}`} /> {c.label}
          </span>
          {/* eye overlay on hover */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-white text-[0.88rem] font-bold tracking-[0.06em] transition-all duration-[400ms] z-30"
            style={{
              opacity: imgHovered ? 1 : 0,
              transform: imgHovered ? 'scale(1)' : 'scale(0.85)',
            }}
          >
            <i className="bi bi-eye-fill text-[2rem] block" />
            <span>View Project</span>
          </div>
        </div>

        {/* content panel */}
        <div
          className={`relative flex flex-col justify-center overflow-hidden transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] px-8 lg:px-10
            ${flip ? 'order-1 bg-[#f8fbfc]' : 'order-2 bg-white'}
            ${on ? 'translate-x-0 opacity-100' : (flip ? '-translate-x-14 opacity-0' : 'translate-x-14 opacity-0')}`}
        >
          <span aria-hidden="true" className="absolute top-[-10px] right-5 text-[7rem] font-[900] text-[rgba(97,187,197,0.06)] font-['Playfair_Display',Georgia,serif] leading-none pointer-events-none select-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] mb-1.5" style={{ color: c.color }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.color, animation: 'pfDotPulse 2s ease-in-out infinite' }} />
            <i className={`bi ${c.icon}`} /> {c.label}
          </div>

          <h3 className="font-['Playfair_Display',Georgia,serif] font-[900] text-[#0d3d5a] tracking-[-0.02em] leading-[1.2] mb-2 text-[1rem] lg:text-[1.25rem]">{item.title}</h3>
          <p className="text-[0.82rem] text-[#5a7a8a] leading-[1.65] mb-2.5 max-w-[400px] line-clamp-2">{item.desc}</p>

          {item.tech?.length > 0 && (
            <div className="flex flex-wrap gap-[5px] mb-2.5">
              {item.tech.slice(0, 4).map(t => (
                <span key={t} className="px-3 py-1 bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.18)] rounded-full text-[0.68rem] font-bold text-[#034665]">{t}</span>
              ))}
            </div>
          )}

          {item.results?.length > 0 && (
            <div className="flex mb-2.5 border border-[rgba(97,187,197,0.14)] rounded-[10px] overflow-hidden bg-[rgba(248,251,252,0.8)]">
              {item.results.slice(0, 3).map((r, i) => (
                <div key={r.label} className={`flex-1 flex flex-col items-center py-[7px] px-[6px] gap-0.5 ${i < 2 ? 'border-r border-[rgba(97,187,197,0.12)]' : ''}`}>
                  <span className="text-[0.88rem] font-[900] leading-none" style={{ color: c.color }}>{r.metric}</span>
                  <span className="text-[0.6rem] font-bold text-[#7a9aaa] uppercase tracking-[0.06em] text-center">{r.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 flex-wrap mb-2.5">
            {item.client   && <div className="flex items-center gap-1 text-[0.74rem] font-semibold text-[#7a9aaa]"><i className="bi bi-building text-[#61BBC5]" />{item.client}</div>}
            {item.duration && <div className="flex items-center gap-1 text-[0.74rem] font-semibold text-[#7a9aaa]"><i className="bi bi-clock text-[#61BBC5]" />{item.duration}</div>}
          </div>

          <button
            onClick={() => onOpen(item)}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="relative inline-flex items-center gap-2.5 px-5 py-[9px] rounded-full text-[0.78rem] font-bold cursor-pointer w-fit overflow-hidden transition-all duration-300"
            style={{
              background: btnHovered ? 'linear-gradient(138deg,#61BBC5,#034665)' : '#ffffff',
              border: btnHovered ? '2px solid transparent' : '2px solid rgba(97,187,197,0.25)',
              color: btnHovered ? '#ffffff' : '#034665',
              transform: btnHovered ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: btnHovered ? '0 12px 32px rgba(3,70,101,0.22)' : 'none',
            }}
          >
            <span>Open Case Study</span>
            <div
              className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-white text-[0.72rem] flex-shrink-0 transition-transform duration-300"
              style={{
                background: btnHovered ? 'rgba(255,255,255,0.25)' : 'linear-gradient(138deg,#61BBC5,#034665)',
                transform: btnHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
              }}
            >
              <i className="bi bi-arrow-up-right" />
            </div>
          </button>

          {/* connector dot */}
          <div aria-hidden="true" className="hidden lg:block absolute top-0 bottom-0 pointer-events-none" style={{ left: flip ? 'unset' : 'calc(0px - 1px)', right: flip ? 'calc(0px - 1px)' : 'unset', width: 2 }}>
            <div className="w-px h-full mx-auto transition-[height,opacity] duration-[1100ms] delay-500" style={{ height: on ? '100%' : 0, opacity: on ? 1 : 0, background: `linear-gradient(180deg,transparent,${c.color},transparent)` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white transition-transform duration-[350ms] delay-[900ms]" style={{ background: c.color, transform: on ? 'scale(1) translateX(-50%) translateY(-50%)' : 'scale(0) translateX(-50%) translateY(-50%)', boxShadow: `0 0 0 3px rgba(97,187,197,0.25)` }} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [tab,      setTab]      = useState('All');
  const [selected, setSelected] = useState(null);
  const [visible,  setVisible]  = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.04 });
    if (secRef.current) io.observe(secRef.current);
    return () => io.disconnect();
  }, []);

  const items = tab === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === tab);

  return (
    <section
      className="relative bg-white py-14 sm:py-16 md:py-20 font-['Inter','Nunito_Sans',sans-serif] overflow-hidden isolate"
      ref={secRef}
      id="portfolio"
    >
      {/* bg decoration — overflow-hidden on section already clips these */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 15% 20%,rgba(97,187,197,0.06) 0%,transparent 50%),radial-gradient(circle at 85% 80%,rgba(3,70,101,0.05) 0%,transparent 50%)' }} />
        <div className="absolute rounded-full" style={{ width: 600, height: 500, top: -150, left: -150, background: 'radial-gradient(circle,rgba(97,187,197,0.08) 0%,transparent 60%)', filter: 'blur(60px)', animation: 'pfOrbDrift 20s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: -80, right: -80, background: 'radial-gradient(circle,rgba(3,70,101,0.06) 0%,transparent 60%)', filter: 'blur(60px)', animation: 'pfOrbDrift 24s ease-in-out 4s infinite reverse' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(97,187,197,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(97,187,197,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className={`relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

        {/* section header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16" style={{ animation: 'pfFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
          <div className="inline-flex items-center gap-2.5 bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[0.72rem] sm:text-[0.73rem] font-extrabold tracking-[0.13em] uppercase text-[#034665] mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#61BBC5]" style={{ animation: 'pfDotPulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(97,187,197,0.7)' }} />
            Our Work
          </div>
          <h2 className="font-['Playfair_Display',Georgia,serif] font-[900] text-[#0d3d5a] tracking-[-0.03em] leading-[1.15] mb-3 sm:mb-4 text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem]">
            Projects that{' '}
            <em className="not-italic" style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 50%,#034665 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'pfGradientMove 5s ease infinite' }}>
              speak for themselves
            </em>
          </h2>
          <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.05rem] text-[#64748b] max-w-[540px] mx-auto leading-[1.75] px-2 sm:px-0">
            From startups to enterprises — we build things that work, scale, and make an impact.
          </p>
        </header>

        {/* filter tabs */}
        <nav
          className="flex items-center justify-center flex-wrap gap-2 mb-10 sm:mb-14 md:mb-20"
          role="tablist"
          aria-label="Filter projects by category"
          style={{ animation: 'pfFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
        >
          {TABS.map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative inline-flex items-center gap-1.5 px-4 sm:px-[26px] py-2 sm:py-3 rounded-full text-[0.82rem] sm:text-[0.88rem] font-bold overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${tab === t
                  ? 'text-white shadow-[0_8px_28px_rgba(3,70,101,0.25)]'
                  : 'text-[#5a7a8a] bg-transparent border-2 border-[rgba(97,187,197,0.18)] hover:border-[rgba(97,187,197,0.45)] hover:text-[#034665] hover:bg-[rgba(97,187,197,0.05)]'
                }`}
              style={tab === t ? { background: 'linear-gradient(138deg,#61BBC5 0%,#034665 100%)' } : {}}
            >
              {t !== 'All' && CAT[t] && <i className={`bi ${CAT[t].icon}`} />}
              {t}
            </button>
          ))}
          <span className="text-[0.72rem] sm:text-[0.75rem] font-bold text-[#7a9aaa] bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.15)] rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 tracking-[0.04em] ml-1 sm:ml-2">
            {items.length} {items.length === 1 ? 'project' : 'projects'}
          </span>
        </nav>

        {/* mobile slider — visible only on < md */}
        <MobileSlider items={items} onOpen={setSelected} />

        {/* showcase rows — desktop (md+) only */}
        <div className="hidden md:flex flex-col mb-10 sm:mb-16 md:mb-24">
          {items.map((item, idx) => (
            <ShowcaseRow key={item.id} item={item} index={idx} onOpen={setSelected} />
          ))}
          {items.length === 0 && (
            <div className="text-center py-16 sm:py-24 px-5 text-[#94a3b8]">
              <div className="w-[72px] h-[72px] rounded-full bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.20)] flex items-center justify-center text-[2rem] text-[#61BBC5] mx-auto mb-5">
                <i className="bi bi-collection" />
              </div>
              <p className="text-[1rem] font-semibold m-0">No projects here yet — check back soon.</p>
            </div>
          )}
        </div>

        {/* empty state for mobile slider */}
        {items.length === 0 && (
          <div className="md:hidden text-center py-16 px-5 text-[#94a3b8]">
            <div className="w-[72px] h-[72px] rounded-full bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.20)] flex items-center justify-center text-[2rem] text-[#61BBC5] mx-auto mb-5">
              <i className="bi bi-collection" />
            </div>
            <p className="text-[1rem] font-semibold m-0">No projects here yet — check back soon.</p>
          </div>
        )}
      </div>

      {selected && <ProjectModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
