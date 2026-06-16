import React, { useEffect, useRef, useState } from 'react';
import Portfolio from '../components/Portfolio';

function Typewriter({ words, speed=75, pause=2000 }) {
  const [text, setText] = useState('');
  const [wi, setWi]     = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const word = words[wi]; let t;
    if (!del && text.length < word.length) t = setTimeout(()=>setText(word.slice(0,text.length+1)),speed);
    else if (!del && text.length === word.length) t = setTimeout(()=>setDel(true),pause);
    else if (del && text.length > 0) t = setTimeout(()=>setText(text.slice(0,-1)),speed/2);
    else { setDel(false); setWi(i=>(i+1)%words.length); }
    return () => clearTimeout(t);
  }, [text,wi,del,words,speed,pause]);
  return (
    <span>
      <span style={{ background:'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)',backgroundSize:'250% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmerAccent 4s linear infinite' }}>{text}</span>
      <span className="inline-block text-[#61BBC5] font-[100] ml-0.5" style={{ WebkitTextFillColor:'#61BBC5',animation:'cursorBlink 0.85s step-end infinite' }}>|</span>
    </span>
  );
}

function Counter({ end, suffix }) {
  const [val, setVal] = useState(0);
  const ref           = useRef(null);
  const started       = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0; const step = end/55;
        const id = setInterval(()=>{ n+=step; if(n>=end){setVal(end);clearInterval(id);}else setVal(Math.floor(n)); },25);
      }
    },{ threshold:0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  },[end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function useReveal(threshold=0.08) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const io = new IntersectionObserver(([e])=>{if(e.isIntersecting)setOn(true);},{threshold});
    if(ref.current)io.observe(ref.current);
    return ()=>io.disconnect();
  },[threshold]);
  return {ref,on};
}

const STATS = [
  { end:50,  suffix:'+',   label:'Projects Delivered', icon:'bi-rocket-takeoff-fill' },
  { end:98,  suffix:'%',   label:'Client Satisfaction', icon:'bi-emoji-smile-fill' },
  { end:12,  suffix:'+',   label:'Industries Served',   icon:'bi-globe2' },
  { end:4,   suffix:'.8★', label:'Average Rating',      icon:'bi-star-fill' },
];
const CATS = [
  { icon:'bi-code-slash', label:'Web Apps',   count:'15+', accent:'#61BBC5' },
  { icon:'bi-phone-fill', label:'Mobile',     count:'12+', accent:'#0a8fb6' },
  { icon:'bi-controller', label:'Games',      count:'8+',  accent:'#034665' },
  { icon:'bi-cart3',      label:'E-Commerce', count:'10+', accent:'#61BBC5' },
];

export default function PortfolioPage() {
  const hero  = useReveal(0.05);
  const stats = useReveal(0.1);

  return (
    <div className="bg-white font-['Inter','Nunito_Sans',sans-serif] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[94vh] flex items-center bg-white overflow-hidden px-6 sm:px-10 md:px-12 pt-[90px] sm:pt-[110px] md:pt-[120px] pb-16 md:pb-24">
        <div
          ref={hero.ref}
          className={`relative z-20 max-w-[1260px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center transition-opacity duration-300 ${hero.on?'opacity-100':'opacity-0'}`}
        >
          {/* LEFT */}
          <div className={`flex flex-col gap-0 ${hero.on?'animate-[pfFadeLeft_0.9s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]':''}`}>
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 px-[18px] pl-[10px] py-2 bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.25)] rounded-full text-[0.72rem] font-extrabold tracking-[0.13em] uppercase text-[#034665] mb-6 w-fit">
              <span className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-white text-[0.65rem] flex-shrink-0" style={{ background:'linear-gradient(138deg,#61BBC5,#034665)' }}>
                <i className="bi bi-collection-fill" />
              </span>
              <span>Our Portfolio</span>
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] flex-shrink-0 shadow-[0_0_0_2px_rgba(34,197,94,0.25)]" style={{ animation:'dotPulse 2s ease-in-out infinite' }} />
            </div>

            <h1 className="font-['Playfair_Display',Georgia,serif] font-[900] text-[#0d3d5a] tracking-[-0.03em] leading-[1.1] m-0 mb-1.5" style={{ fontSize:'clamp(2.5rem,4.6vw,4rem)' }}>
              Work that <Typewriter words={['inspires.','scales.','converts.','delivers.']} />
              <br />
              <span className="text-[#7aabb9] font-semibold font-['Inter',sans-serif] tracking-[-0.01em]" style={{ fontSize:'clamp(1.3rem,2.2vw,1.9rem)' }}>Built with purpose.</span>
            </h1>

            <p className="text-[1.05rem] text-[#5a7a8a] leading-[1.85] mt-5 mb-8 max-w-[490px]">From ambitious startups to global enterprises — explore the digital products we've designed, engineered, and launched across industries.</p>

            <div className="flex gap-3.5 flex-wrap mb-8">
              <a href="#portfolio" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[0.9rem] font-bold text-white no-underline transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white" style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 100%)',boxShadow:'0 8px 28px rgba(3,70,101,0.22)',letterSpacing:'0.02em' }}>
                <span>View All Work</span> <i className="bi bi-arrow-down-circle-fill" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[0.9rem] font-bold text-[#034665] no-underline bg-white border-2 border-[rgba(97,187,197,0.30)] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#61BBC5] hover:shadow-[0_10px_28px_rgba(97,187,197,0.20)]" style={{ boxShadow:'0 4px 18px rgba(3,70,101,0.07)' }}>
                Start a Project <i className="bi bi-arrow-right" />
              </a>
            </div>

          </div>

          {/* RIGHT — shown below text on mobile, beside text on desktop */}
          <div className={`relative ${hero.on?'animate-[pfFadeRight_0.9s_cubic-bezier(0.22,1,0.36,1)_0.25s_both]':''}`}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              {CATS.map((cat,i) => (
                <div key={cat.label}
                  className="relative flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-[18px] py-4 sm:py-5 bg-white border-[1.5px] border-[rgba(97,187,197,0.14)] rounded-[16px] sm:rounded-[20px] overflow-hidden cursor-default transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[rgba(97,187,197,0.38)] hover:shadow-[0_16px_40px_rgba(3,70,101,0.12)] group"
                  style={{ boxShadow:'0 4px 20px rgba(3,70,101,0.06)',animation:`pp-tile-in 0.6s cubic-bezier(0.22,1,0.36,1) ${0.4+i*0.1}s both` }}>
                  {/* icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex-shrink-0 flex items-center justify-center text-[1rem] sm:text-[1.2rem] text-white transition-transform duration-[280ms] group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{ background:`linear-gradient(138deg,${cat.accent},#034665)`,boxShadow:`0 6px 18px ${cat.accent}45` }}>
                    <i className={`bi ${cat.icon}`} />
                  </div>
                  {/* text — allow wrapping on mobile */}
                  <div className="flex-1 flex flex-col gap-[2px] min-w-0">
                    <span className="text-[0.82rem] sm:text-[0.9rem] font-bold text-[#0d3d5a] leading-tight">{cat.label}</span>
                    <span className="text-[0.68rem] sm:text-[0.72rem] font-semibold text-[#7a9aaa] tracking-[0.03em]">{cat.count} projects</span>
                  </div>
                  {/* arrow — hidden on xs, visible sm+ */}
                  <div className="hidden sm:flex w-[30px] h-[30px] rounded-full items-center justify-center text-[0.8rem] flex-shrink-0 transition-all duration-200 group-hover:rotate-45 group-hover:text-white"
                    style={{ background:'rgba(97,187,197,0.09)',border:'1px solid rgba(97,187,197,0.22)',color:'#61BBC5' }}
                    onMouseEnter={e=>{e.currentTarget.style.background=`linear-gradient(138deg,${cat.accent},#034665)`;e.currentTarget.style.borderColor='transparent';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(97,187,197,0.09)';e.currentTarget.style.borderColor='rgba(97,187,197,0.22)';}}>
                    <i className="bi bi-arrow-up-right" />
                  </div>
                  {/* bottom glow bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background:`linear-gradient(90deg,${cat.accent},#034665)` }} />
                </div>
              ))}
              {/* floating badge */}
              <div className="col-span-2 inline-flex items-center gap-2 px-[18px] sm:px-[22px] py-2.5 sm:py-3 bg-white border-[1.5px] border-[rgba(97,187,197,0.25)] rounded-full text-[0.75rem] sm:text-[0.8rem] font-extrabold text-[#034665] w-fit justify-self-center tracking-[0.04em]"
                style={{ boxShadow:'0 8px 28px rgba(3,70,101,0.12)',animation:'pp-badge-bob 5s ease-in-out 0.8s infinite' }}>
                <i className="bi bi-patch-check-fill text-[#61BBC5] text-[0.9rem] sm:text-[1rem]" style={{ animation:'dotPulse 3s ease-in-out infinite' }} />
                <span>Kevalon Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20 block" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f4f8fa"/>
          </svg>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section ref={stats.ref} className="relative bg-white border-t border-[rgba(97,187,197,0.15)] px-4 sm:px-8 md:px-12 overflow-hidden">
        {/* left stripe */}
        <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1" style={{ background:'linear-gradient(180deg,#61BBC5,#034665,#61BBC5)' }} />
        <div className="max-w-[1260px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-0">
          {STATS.map((s,i) => (
            <React.Fragment key={s.label}>
              <div className={`relative flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-7 sm:py-10 transition-colors duration-200 hover:bg-[rgba(97,187,197,0.04)] group border-b sm:border-b-0 border-[rgba(97,187,197,0.12)] ${i % 2 === 0 ? 'border-r border-[rgba(97,187,197,0.12)]' : ''} sm:border-r-0 ${stats.on?'':'opacity-0'}`}
                style={stats.on?{ animation:`wcuStatIn 0.7s cubic-bezier(0.22,1,0.36,1) ${i*0.12}s both` }:{}}>
                <div className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-[12px] sm:rounded-[16px] flex-shrink-0 flex items-center justify-center text-[1.1rem] sm:text-[1.3rem] text-[#034665] transition-transform duration-200 group-hover:scale-[1.08] group-hover:rotate-[-5deg]" style={{ background:'linear-gradient(138deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))',border:'1.5px solid rgba(97,187,197,0.20)' }}>
                  <i className={`bi ${s.icon}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-[900] leading-none" style={{ fontSize:'clamp(1.5rem,2.5vw,2.4rem)',background:'linear-gradient(138deg,#61BBC5,#034665)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </span>
                  <span className="text-[0.68rem] sm:text-[0.75rem] font-bold text-[#7a9aaa] uppercase tracking-[0.07em] leading-tight">{s.label}</span>
                </div>
              </div>
              {i < STATS.length-1 && (
                <div className="hidden sm:block w-px self-stretch flex-shrink-0" style={{ background:'linear-gradient(180deg,transparent,rgba(97,187,197,0.25),transparent)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO GRID ── */}
      <Portfolio />

      <style>{`
        @keyframes pp-tile-in { from{opacity:0;transform:translateY(24px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pp-badge-bob { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
        @media(max-width:900px){.pp-inner{grid-template-columns:1fr !important;gap:52px !important;}.pp-right{order:-1;}}
        @media(max-width:640px){.pp-actions{flex-direction:column !important;}.pp-stats-inner{flex-direction:column !important;}}
      `}</style>
    </div>
  );
}
