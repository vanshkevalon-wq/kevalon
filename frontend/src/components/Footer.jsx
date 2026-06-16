import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/Logo.png';

function useReveal() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, on };
}

const SERVICES = [
  { label: 'Web Development',             to: '/services/web-application-development'    },
  { label: 'Mobile Application Development', to: '/services/mobile-application-development' },
  { label: 'Game Development',            to: '/services/game-development'               },
  { label: 'Web ERP Development',         to: '/services/web-erp-development'            },
  { label: 'CRM Development',             to: '/services/crm-development'                },
  { label: 'SEO & Digital Marketing',     to: '/services/seo-digital-marketing'          },
  { label: 'Internship & Training',       to: '/services/internship-training'            },
];
const LINKS = [
  { label: 'Home',      to: '/'         },
  { label: 'About',     to: '/about'    },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio'},
  { label: 'Blog',      to: '/blog'     },
  { label: 'Careers',   to: '/careers'  },
  { label: 'Contact',   to: '/contact'  },
];
const SOCIALS = [
  { icon: 'bi-linkedin',  href: 'https://www.linkedin.com/company/kevalon-technology', label: 'LinkedIn',  color: '#0A66C2' },
  { icon: 'bi-twitter-x', href: 'https://x.com/KevalonT',                             label: 'X',         color: '#000000' },
  { icon: 'bi-instagram', href: 'https://www.instagram.com/kevalon_technology',       label: 'Instagram', color: '#E1306C' },
  { icon: 'bi-whatsapp',  href: 'https://wa.link/a02fdn',                              label: 'WhatsApp',  color: '#25D366' },
];

export default function Footer() {
  const top    = useReveal();
  const mid    = useReveal();
  const bottom = useReveal();

  const linkCls = 'inline-flex items-center gap-1 text-[0.875rem] font-medium !text-[#0f172a] no-underline transition-[color,transform] duration-200 hover:!text-[#034665] hover:translate-x-1.5';

  return (
    <footer className="relative bg-white font-['Inter','Nunito_Sans',sans-serif] overflow-hidden border-t border-[rgba(97,187,197,0.18)]">

      {/* Background dots + blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage:'radial-gradient(circle,#61BBC5 1.5px,transparent 1.5px)',backgroundSize:'32px 32px' }} />
        <div className="absolute rounded-full" style={{ width:480,height:480,top:-160,left:-130,background:'radial-gradient(circle,rgba(97,187,197,0.12) 0%,transparent 65%)',filter:'blur(100px)',animation:'ftBlob 18s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width:420,height:420,bottom:-120,right:-110,background:'radial-gradient(circle,rgba(3,70,101,0.08) 0%,transparent 65%)',filter:'blur(100px)',animation:'ftBlob 18s ease-in-out 7s infinite' }} />
      </div>

      {/* ── TOP CTA BAND ── */}
      <div
        ref={top.ref}
        className="relative z-10 border-b border-[rgba(97,187,197,0.18)] px-4 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12"
        style={{ background:'linear-gradient(135deg,#f4fbfc 0%,#edf7f9 50%,#e8f5f8 100%)' }}
      >
        <div className={`max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 flex-wrap transition-opacity duration-300 ${top.on ? 'opacity-100' : 'opacity-0'}`}>
          <div className={top.on ? 'animate-[ftLeft_0.8s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-[#034665] mb-2.5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation:'ftDot 2.2s ease-in-out infinite' }} />
              Ready to build?
            </span>
            <h2
              className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] tracking-[-0.02em] leading-[1.2] m-0"
              style={{ fontSize:'clamp(1.5rem,2.8vw,2.2rem)' }}
            >
              Let's create something
              <span style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 80%)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'ftShimmer 5s linear infinite' }}> extraordinary</span>
            </h2>
          </div>
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-3.5 flex-wrap sm:flex-shrink-0 w-full sm:w-auto ${top.on ? 'animate-[ftRight_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]' : ''}`}>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-[0.9rem] font-bold text-white no-underline whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03]" style={{ background:'linear-gradient(138deg,#61BBC5 0%,#034665 100%)',boxShadow:'0 8px 24px rgba(97,187,197,0.32)' }}>
              Start a Project <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-[0.9rem] font-bold text-[#034665] no-underline whitespace-nowrap bg-white border border-[rgba(97,187,197,0.35)] transition-all duration-200 hover:border-[rgba(97,187,197,0.65)] hover:bg-[rgba(97,187,197,0.06)] hover:-translate-y-0.5" style={{ boxShadow:'0 4px 14px rgba(3,70,101,0.06)' }}>
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div ref={mid.ref} className="relative z-10 px-4 sm:px-8 md:px-12 py-10 sm:py-12 md:py-16 pb-8 sm:pb-10 md:pb-12">
        <div className={`max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10 transition-opacity duration-500 ${mid.on ? 'opacity-100' : 'opacity-0'}`}>

          {/* Brand */}
          <div className={mid.on ? 'animate-[ftUp_0.7s_cubic-bezier(0.22,1,0.36,1)_both]' : ''}>
            <div className="mb-4.5">
              <img src={logo} alt="Kevalon Technology" className="max-w-[170px] h-auto block" />
            </div>
            <p className="text-[0.86rem] text-[#0f172a] leading-[1.8] mb-5 max-w-[280px]">
              Leading IT company in India. Expert in web development, mobile apps, ERP, SEO, and digital marketing.
            </p>
            <div className="flex gap-2.5 mb-5 flex-wrap">
              {SOCIALS.map((s, i) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center text-[1rem] no-underline transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:text-white"
                  style={{ border:'1.5px solid rgba(97,187,197,0.20)',background:'rgba(255,255,255,0.6)',color:s.color,'--hover-bg':s.color,animation:`ftSocialPop 0.5s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.borderColor = 'transparent'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(97,187,197,0.20)'; }}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={mid.on ? 'animate-[ftUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.08s_both]' : ''}>
            <h5 className="relative text-[0.78rem] font-extrabold text-[#0d3d5a] tracking-[0.12em] uppercase mb-5 pb-3 block after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:rounded-sm" style={{ '--after-bg':'linear-gradient(90deg,#61BBC5,#034665)' }}>
              <span className="relative">
                Quick Links
                <span className="absolute bottom-[-12px] left-0 h-[2.5px] rounded-sm" style={{ background:'linear-gradient(90deg,#61BBC5,#034665)',animation:'ftStripe 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both',width:36 }} />
              </span>
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {LINKS.map((l, i) => (
                <li key={l.label} style={{ animation:`ftLinkIn 0.5s cubic-bezier(0.22,1,0.36,1) ${i*0.04}s both` }}>
                  <Link to={l.to} className={linkCls}>
                    <span className="text-[1rem] text-[rgba(97,187,197,0.5)] leading-none transition-[color,transform] duration-200 group-hover:text-[#61BBC5]"><i className="bi bi-arrow-right-short" /></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={mid.on ? 'animate-[ftUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.16s_both]' : ''}>
            <h5 className="relative text-[0.78rem] font-extrabold text-[#0d3d5a] tracking-[0.12em] uppercase mb-5 pb-3 block">
              <span className="relative">
                Our Services
                <span className="absolute bottom-[-12px] left-0 h-[2.5px] rounded-sm" style={{ background:'linear-gradient(90deg,#61BBC5,#034665)',animation:'ftStripe 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both',width:36 }} />
              </span>
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {SERVICES.map((s, i) => (
                <li key={s.label} style={{ animation:`ftLinkIn 0.5s cubic-bezier(0.22,1,0.36,1) ${i*0.04}s both` }}>
                  <Link to={s.to} className={linkCls}>
                    <span className="text-[1rem] text-[rgba(97,187,197,0.5)] leading-none"><i className="bi bi-arrow-right-short" /></span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={mid.on ? 'animate-[ftUp_0.7s_cubic-bezier(0.22,1,0.36,1)_0.24s_both]' : ''}>
            <h5 className="relative text-[0.78rem] font-extrabold text-[#0d3d5a] tracking-[0.12em] uppercase mb-5 pb-3 block">
              <span className="relative">
                Get in Touch
                <span className="absolute bottom-[-12px] left-0 h-[2.5px] rounded-sm" style={{ background:'linear-gradient(90deg,#61BBC5,#034665)',animation:'ftStripe 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both',width:36 }} />
              </span>
            </h5>
            <div className="flex flex-col gap-4">
              {[
                { href:'mailto:career@kevalontechnology.in', icon:'bi-envelope-fill', lines:['career@kevalontechnology.in','ceo@kevalontechnology.in'] },
                { href:'tel:+919081012218', icon:'bi-telephone-fill', lines:['+91 9081012218','+91 9104012218'] },
                { href:null, icon:'bi-geo-alt-fill', lines:['913, Solaris Business Hub','Parshwanath Jain BRTS, Bhuyangdev','India'] },
              ].map((item, i) => {
                const inner = (
                  <>
                    <div className="w-[38px] h-[38px] rounded-[11px] flex-shrink-0 flex items-center justify-center text-[#034665] text-[0.95rem] transition-all duration-200 group-hover:scale-[1.08] group-hover:rotate-[-5deg]" style={{ background:'linear-gradient(138deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))',border:'1px solid rgba(97,187,197,0.22)' }}>
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {item.lines.map((l, j) => <span key={j} className="text-[0.82rem] text-[#0f172a] leading-[1.55] font-medium">{l}</span>)}
                    </div>
                  </>
                );
                return item.href ? (
                  <a key={i} href={item.href} className="group flex items-start gap-3.5 no-underline px-3.5 py-3 rounded-[14px] border border-transparent transition-all duration-200 hover:bg-[rgba(97,187,197,0.06)] hover:border-[rgba(97,187,197,0.22)] hover:translate-x-1">{inner}</a>
                ) : (
                  <div key={i} className="group flex items-start gap-3.5 px-3.5 py-3 rounded-[14px] border border-transparent">{inner}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div ref={bottom.ref} className="relative z-10 border-t border-[rgba(97,187,197,0.15)] px-4 sm:px-8 md:px-12 py-4 sm:py-5">
        <div className={`max-w-[1280px] mx-auto flex items-center justify-between gap-4 flex-wrap transition-opacity duration-500 ${bottom.on ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[0.82rem] text-[#7a9aaa] m-0">
            © 2026 <strong className="text-[#0d3d5a] font-bold">Kevalon Technology</strong> — All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { to:'/privacy-policy', label:'Privacy Policy' },
              { to:'/terms-of-use',   label:'Terms of Use'   },
              { to:'/sitemap',        label:'Sitemap'        },
            ].map((l, i) => (
              <React.Fragment key={l.to}>
                {i > 0 && <span className="w-1 h-1 rounded-full bg-[rgba(97,187,197,0.4)]" />}
                <Link to={l.to} className="text-[0.8rem] font-semibold text-[#7a9aaa] no-underline transition-colors duration-200 hover:text-[#61BBC5]">{l.label}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* responsive overrides */}
      <style>{`
        @media (max-width:1100px) { .ft-grid-inner { grid-template-columns:1fr 1fr !important; } }
        @media (max-width:860px)  { .ft-grid-inner { grid-template-columns:1fr !important; } .ft-cta-inner { flex-direction:column; text-align:center; } }
        @media (max-width:600px)  { .ft-grid-inner { grid-template-columns:1fr !important; } }
      `}</style>
    </footer>
  );
}
