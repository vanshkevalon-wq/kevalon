import React, { useRef, useEffect, useState, useCallback } from 'react';
import TestimonialImg1 from '../Images/bc05e3d81d431660394a35aab11c47fe399ea367.jpg';
import TestimonialImg2 from '../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg';

const REVIEWS = [
  { id:1, name:'Sara Williams',  role:'CEO, TechVentures',  tag:'Web Development', tagIcon:'bi-code-slash', rating:5, text:'Kevalon transformed our entire digital presence. They delivered a world-class web application on time and exceeded every single expectation we set. Truly a partner, not just a vendor.', image:TestimonialImg1, metric:{value:'3×',label:'Faster Load Time'}, color:'#61BBC5' },
  { id:2, name:'Michael Chen',   role:'Founder, RetailPro', tag:'E-Commerce',       tagIcon:'bi-cart3',      rating:5, text:'The e-commerce platform they built cut our transaction costs by 30% and tripled our conversion rate. The attention to detail in both design and performance is simply unmatched.', image:TestimonialImg2, metric:{value:'30%',label:'Cost Reduction'}, color:'#0a8fb6' },
  { id:3, name:'Priya Sharma',   role:'CTO, FinEdge',       tag:'Mobile App',       tagIcon:'bi-phone',      rating:5, text:'Our mobile banking app hit a 4.8-star rating thanks to the exceptional work Kevalon delivered. Security, speed, and UX — they nailed all three without compromise.', image:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', metric:{value:'4.8★',label:'App Store Rating'}, color:'#034665' },
  { id:4, name:'Arjun Mehta',    role:'Director, SkyERP',   tag:'ERP System',       tagIcon:'bi-kanban',     rating:5, text:'Our ERP rollout was seamless. Kevalon mapped our workflows precisely, delivered on every milestone, and trained our team thoroughly. The system runs like clockwork.', image:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', metric:{value:'60%',label:'Ops Efficiency'}, color:'#61BBC5' },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mt-[3px]">
      {[1,2,3,4,5].map(i => <i key={i} className={`bi bi-star${i<=count?'-fill':''} text-[0.68rem] text-[#f5a623]`} />)}
    </div>
  );
}

function TestimonialCard({ r }) {
  return (
    <div
      className="relative bg-white border border-[rgba(97,187,197,0.16)] rounded-3xl p-8 pb-6 overflow-hidden flex flex-col gap-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[7px] hover:shadow-[0_20px_52px_rgba(3,70,101,0.12),0_0_0_1px_rgba(97,187,197,0.12)] group"
      style={{ '--accent':r.color, boxShadow:'0 4px 24px rgba(3,70,101,0.07)' }}
    >
      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms] ease-[ease]" style={{ background:`linear-gradient(90deg,${r.color},#034665)` }} />

      {/* quote */}
      <div className="text-[2.2rem] leading-none mb-4.5 opacity-50" aria-hidden="true" style={{ background:`linear-gradient(135deg,${r.color},#034665)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
        <i className="bi bi-quote" />
      </div>

      <p className="text-[0.92rem] text-[#2d4f68] leading-[1.85] italic m-0 mb-5 flex-1">"{r.text}"</p>

      {/* metric */}
      <div className="inline-flex items-baseline gap-2 border border-[rgba(97,187,197,0.18)] rounded-[12px] px-4 py-2.5 mb-5 self-start" style={{ background:'linear-gradient(135deg,rgba(97,187,197,0.07) 0%,rgba(3,70,101,0.04) 100%)' }}>
        <span className="text-[1.4rem] font-[900] leading-none" style={{ background:`linear-gradient(120deg,${r.color} 0%,#034665 100%)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>{r.metric.value}</span>
        <span className="text-[0.70rem] font-bold text-[#5a7a8a] tracking-[0.06em] uppercase">{r.metric.label}</span>
      </div>

      {/* divider */}
      <div className="h-px mb-5" style={{ background:'linear-gradient(90deg,rgba(97,187,197,0.20),transparent)' }} />

      {/* footer */}
      <div className="flex items-center gap-3.5">
        <div className="relative flex-shrink-0">
          <img src={r.image} alt={r.name} className="w-[52px] h-[52px] rounded-full object-cover object-top border-[3px] border-white block" style={{ boxShadow:'0 4px 14px rgba(3,70,101,0.14)' }} />
          <span className="absolute inset-[-4px] rounded-full border-2 border-dashed opacity-60" style={{ borderColor:r.color, animation:'tmrRing 14s linear infinite' }} />
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="text-[0.93rem] font-extrabold text-[#0d3d5a]">{r.name}</span>
          <span className="text-[0.74rem] text-[#7a9aaa] font-medium">{r.role}</span>
          <Stars count={r.rating} />
        </div>
        <span className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-full bg-[rgba(97,187,197,0.08)] border border-[rgba(97,187,197,0.22)] text-[0.66rem] font-extrabold tracking-[0.05em] uppercase whitespace-nowrap flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(97,187,197,0.14)]" style={{ color:r.color }}>
          <i className={`bi ${r.tagIcon} text-[0.72rem]`} /> {r.tag}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [visible,  setVisible]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [animDir,  setAnimDir]  = useState('next');
  const [animKey,  setAnimKey]  = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref      = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width:700px)');
    const h = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const perSlide = isMobile ? 1 : 2;
  const total    = Math.ceil(REVIEWS.length / perSlide);

  const goTo = useCallback((idx, dir='next') => {
    setAnimDir(dir); setAnimKey(k=>k+1);
    setCurrent(((idx%total)+total)%total);
  }, [total]);

  const next = useCallback(() => goTo(current+1,'next'), [current,goTo]);
  const prev = useCallback(() => goTo(current-1,'prev'), [current,goTo]);

  useEffect(() => { setCurrent(0); }, [perSlide]);

  const nextRef = useRef(next);
  useEffect(() => { nextRef.current = next; }, [next]);
  useEffect(() => { timerRef.current = setInterval(()=>nextRef.current(), 8000); return ()=>clearInterval(timerRef.current); }, []);

  const pause  = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(()=>nextRef.current(), 8000); };

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{ threshold:0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const startIdx = current * perSlide;
  const pair = isMobile
    ? [REVIEWS[startIdx % REVIEWS.length]]
    : [REVIEWS[startIdx % REVIEWS.length], REVIEWS[(startIdx+1) % REVIEWS.length]];

  const slideAnim = animDir==='next' ? 'tmrSlideNext 0.80s cubic-bezier(0.22,1,0.36,1) both' : 'tmrSlidePrev 0.80s cubic-bezier(0.22,1,0.36,1) both';

  const NavBtn = ({ onClick, label, children }) => (
    <button onClick={onClick} aria-label={label} className="flex-shrink-0 w-[50px] h-[50px] border border-[rgba(97,187,197,0.28)] bg-white text-[#034665] text-[1rem] flex items-center justify-center cursor-pointer transition-all duration-200 hover:text-white hover:border-transparent hover:scale-[1.08] hover:shadow-[0_10px_28px_rgba(97,187,197,0.35)]" style={{ borderRadius:'50%', boxShadow:'0 4px 16px rgba(3,70,101,0.08)' }}
      onMouseEnter={e=>{e.currentTarget.style.background='linear-gradient(137deg,#61BBC5 0%,#034665 100%)'; e.currentTarget.style.borderRadius='50%';}}
      onMouseLeave={e=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.borderRadius='50%';}}
    >
      {children}
    </button>
  );

  return (
    <section className="relative bg-white py-20 pb-22 font-['Inter','Nunito_Sans',sans-serif] overflow-visible isolate" ref={ref}>
      {/* bg glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width:560,height:560,top:-200,left:-160,background:'radial-gradient(circle,rgba(97,187,197,0.11) 0%,transparent 65%)',filter:'blur(120px)',animation:'tmrBlob 20s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width:460,height:460,bottom:-160,right:-130,background:'radial-gradient(circle,rgba(3,70,101,0.07) 0%,transparent 65%)',filter:'blur(120px)',animation:'tmrBlob 20s ease-in-out 8s infinite' }} />
      </div>

      <div className={`relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 md:px-12 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* header */}
        <div className="text-center mb-14" style={{ animation:'tmrUp 0.7s cubic-bezier(0.22,1,0.36,1) both' }}>
          <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-[18px] py-[6px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-[#034665] mb-4.5">
            <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5]" style={{ animation:'tmDot 2.2s ease-in-out infinite' }} />
            Client Testimonials
          </span>
          <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] tracking-[-0.025em] leading-[1.18] mb-3.5" style={{ fontSize:'clamp(2rem,3.6vw,2.9rem)' }}>
            What our clients{' '}
            <span style={{ background:'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)',backgroundSize:'250% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'shimmerAccent 4s linear infinite' }}>say about us</span>
          </h2>
          <p className="text-[1rem] text-[#5a7a8a] max-w-[420px] mx-auto leading-[1.8]">Real results, real feedback — from teams who built with Kevalon.</p>
        </div>

        {/* slider */}
        <div className="flex items-center gap-5 mb-8" onMouseEnter={pause} onMouseLeave={resume}>
          {!isMobile && <NavBtn onClick={prev} label="Previous"><i className="bi bi-arrow-left" /></NavBtn>}

          <div key={animKey} className={`flex-1 grid gap-6 min-w-0 ${isMobile?'grid-cols-1':'grid-cols-2'}`} style={{ animation:slideAnim }}>
            {pair.map(r => <TestimonialCard key={r.id} r={r} />)}
          </div>

          {!isMobile && <NavBtn onClick={next} label="Next"><i className="bi bi-arrow-right" /></NavBtn>}
        </div>

        {/* mobile nav */}
        {isMobile && (
          <div className="flex justify-center gap-4 mb-4">
            <NavBtn onClick={prev} label="Previous"><i className="bi bi-arrow-left" /></NavBtn>
            <NavBtn onClick={next} label="Next"><i className="bi bi-arrow-right" /></NavBtn>
          </div>
        )}

        {/* dots */}
        <div className="flex justify-center gap-2.5 mt-2">
          {Array.from({length:total}).map((_,i) => (
            <button key={i} aria-label={`Slide ${i+1}`}
              onClick={() => goTo(i, i>current?'next':'prev')}
              className={`h-2.5 rounded-full border-0 p-0 cursor-pointer transition-all duration-200 ${i===current?'w-[30px] rounded-full':'w-2.5 bg-[rgba(97,187,197,0.25)]'}`}
              style={i===current?{background:'linear-gradient(90deg,#61BBC5,#034665)'}:{}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
