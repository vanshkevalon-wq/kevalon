import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { API_BASE_URL } from '../utils/api';
import 'swiper/css';
import 'swiper/css/navigation';

function LeadModal({ item, onClose, onSuccess }) {
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) { setError('Please enter your email or phone number.'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API_BASE_URL}/api/portfolio-leads`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ projectTitle:item.title, projectSlug:item.slug, email:email.trim(), phone:phone.trim() }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit.');
      onSuccess();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return createPortal(
    <div className="fixed inset-0 bg-[rgba(2,10,22,0.80)] z-[9999] flex items-center justify-center p-5" style={{ backdropFilter:'blur(8px)',animation:'pmFadeIn 0.2s ease both' }} onClick={onClose}>
      <div className="relative bg-white rounded-3xl w-full max-w-[460px] p-[40px_36px_36px] cursor-auto" style={{ boxShadow:'0 32px 80px rgba(0,0,0,0.35)',animation:'pmSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both' }} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-3.5 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[1.2rem] text-[#5a7a8a] cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.08)] hover:border-[rgba(239,68,68,0.25)] hover:text-[#dc2626]" style={{ background:'rgba(97,187,197,0.08)',border:'1px solid rgba(97,187,197,0.22)' }}>×</button>

        <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl text-white mx-auto mb-4" style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 100%)',boxShadow:'0 8px 24px rgba(97,187,197,0.38)' }}>
          <i className="bi bi-eye" />
        </div>
        <h3 className="text-[1.3rem] font-[900] text-[#0d3d5a] font-['Playfair_Display',Georgia,serif] text-center m-0 mb-2">Unlock Live Preview</h3>
        <p className="text-[0.88rem] text-[#5a7a8a] text-center leading-[1.75] mb-6">Enter your email or phone to access the live preview of <strong className="text-[#0d3d5a]">{item.title}</strong>.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="lead-email" className="text-[0.78rem] font-bold text-[#334155] tracking-[0.02em]">Email address</label>
            <input id="lead-email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"
              className="w-full px-3.5 py-[11px] border-[1.5px] border-[rgba(97,187,197,0.25)] rounded-[10px] bg-[#f8fbfc] text-[#0d1f35] text-[0.88rem] outline-none transition-all duration-200 box-border focus:border-[#61BBC5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(97,187,197,0.12)]" />
          </div>
          <div className="flex items-center gap-2.5 text-[#94a3b8] text-[0.78rem] font-semibold before:flex-1 before:h-px before:bg-[rgba(97,187,197,0.18)] after:flex-1 after:h-px after:bg-[rgba(97,187,197,0.18)]"><span>or</span></div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="lead-phone" className="text-[0.78rem] font-bold text-[#334155] tracking-[0.02em]">Phone number</label>
            <input id="lead-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel"
              className="w-full px-3.5 py-[11px] border-[1.5px] border-[rgba(97,187,197,0.25)] rounded-[10px] bg-[#f8fbfc] text-[#0d1f35] text-[0.88rem] outline-none transition-all duration-200 box-border focus:border-[#61BBC5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(97,187,197,0.12)]" />
          </div>
          {error && <p className="text-[0.8rem] text-[#dc2626] bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.18)] rounded-[8px] px-3 py-2 m-0">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3.5 border-0 rounded-full text-white text-[0.92rem] font-bold cursor-pointer transition-all duration-200 disabled:opacity-65 disabled:cursor-not-allowed hover:not(:disabled):-translate-y-0.5" style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 100%)',boxShadow:'0 6px 20px rgba(3,70,101,0.25)' }}>
            {loading ? 'Submitting…' : 'Continue to Preview →'}
          </button>
        </form>
        <p className="text-[0.76rem] text-[#94a3b8] text-center mt-3 mb-0"><i className="bi bi-shield-check text-[#61BBC5] mr-1" /> We never share your details with third parties.</p>
      </div>
    </div>,
    document.body
  );
}

export default function ProjectModal({ item, onClose }) {
  const navigate = useNavigate();
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
    };
  }, []);

  if (!item) return null;
  const slides = item.images && item.images.length ? item.images : [item.image];

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(2,10,22,0.72)] z-[1000] flex items-center justify-center p-5" style={{ backdropFilter:'blur(6px)',animation:'pmFadeIn 0.2s ease both' }} onClick={onClose}>
        <div className="bg-white rounded-3xl w-full max-w-[900px] flex flex-col" style={{ boxShadow:'0 32px 80px rgba(0,0,0,0.35)',animation:'pmSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both' }} onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">

          {/* Back bar */}
          <div className="flex items-center px-6 py-3 border-b border-[rgba(97,187,197,0.14)] flex-shrink-0">
            <button onClick={onClose} aria-label="Back to portfolio" className="inline-flex items-center gap-1.5 bg-none border border-[rgba(97,187,197,0.28)] rounded-full px-4 py-1.5 text-[0.82rem] font-bold text-[#034665] cursor-pointer transition-all duration-200 hover:bg-[rgba(97,187,197,0.08)] hover:border-[rgba(97,187,197,0.55)] hover:-translate-x-0.5">
              <i className="bi bi-arrow-left" /> Back to Portfolio
            </button>
          </div>

          {/* Media + Body — no scroll, everything fits */}
          <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', height: 420 }}>
            {/* image slider */}
            <div className="relative bg-[#0d1f35] rounded-bl-3xl overflow-hidden" style={{ height: 420 }}>
              <Swiper modules={[Navigation,Autoplay]} navigation autoplay={{ delay:2200,disableOnInteraction:false }} loop={slides.length>1} spaceBetween={0} slidesPerView={1} className="modal-swiper" style={{ width:'100%', height:'100%' }}>
                {slides.map((src,i) => (
                  <SwiperSlide key={i} style={{ height:'100%' }}>
                    <img src={src} alt={`${item.title} ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* content — no scroll, compact spacing */}
            <div className="p-5 flex flex-col" style={{ height: 420 }}>
              <h3 className="text-[1.2rem] font-[900] text-[#0d3d5a] font-['Playfair_Display',Georgia,serif] m-0 mb-0.5 tracking-[-0.02em] leading-[1.2]">{item.title}</h3>
              <p className="text-[0.70rem] font-extrabold text-[#61BBC5] uppercase tracking-[0.12em] m-0 mb-2">{item.category}</p>
              <p className="text-[0.82rem] text-[#5a7a8a] leading-[1.6] m-0 mb-3 line-clamp-2">{item.desc}</p>

              <div className="flex flex-col gap-3 mb-3">
                {item.features?.length > 0 && (
                  <div>
                    <h4 className="text-[0.70rem] font-extrabold text-[#0d3d5a] uppercase tracking-[0.1em] m-0 mb-1.5">Key Features</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-1">
                      {item.features.slice(0, 3).map((f,i) => (
                        <li key={i} className="flex items-center gap-2 text-[0.78rem] text-[#4a6a7a] leading-[1.4]">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'linear-gradient(135deg,#61BBC5,#034665)' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.tech?.length > 0 && (
                  <div>
                    <h4 className="text-[0.70rem] font-extrabold text-[#0d3d5a] uppercase tracking-[0.1em] m-0 mb-1.5">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((t,i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-[rgba(97,187,197,0.09)] border border-[rgba(97,187,197,0.22)] rounded-full text-[0.68rem] font-bold text-[#034665] tracking-[0.03em]">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 flex-wrap mt-auto">
                <button onClick={e=>{e.stopPropagation();setShowLead(true);}} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[0.82rem] font-bold text-white cursor-pointer transition-all duration-200 border-0 hover:-translate-y-0.5" style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 100%)',boxShadow:'0 6px 20px rgba(3,70,101,0.25)' }}>
                  <i className="bi bi-eye" /> Live Preview
                </button>
                <Link to={`/case-study/${item.slug}`} onClick={onClose} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[0.82rem] font-bold text-[#034665] cursor-pointer transition-all duration-200 no-underline bg-white border-2 border-[rgba(97,187,197,0.35)] hover:border-[#61BBC5] hover:bg-[rgba(97,187,197,0.06)] hover:-translate-y-0.5">
                  View Case Study
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLead && <LeadModal item={item} onClose={()=>setShowLead(false)} onSuccess={()=>{setShowLead(false);onClose();navigate(`/project-preview/${item.slug}`);}} />}
    </>
  );
}
