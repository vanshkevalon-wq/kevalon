import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SVC_CARDS = [
  { icon: 'bi-code-slash',       label: 'Web Apps',    desc: 'React, Next.js, Node.js',        color: '#61BBC5', to: '/services/web-application-development'    },
  { icon: 'bi-phone',            label: 'Mobile',      desc: 'iOS, Android, Flutter',           color: '#0a8fb6', to: '/services/mobile-application-development' },
  { icon: 'bi-controller',       label: 'Games',       desc: 'Unity, 2D & 3D, Cross-platform', color: '#8b5cf6', to: '/services/game-development'               },
  { icon: 'bi-cart3',            label: 'E-Commerce',  desc: 'Shopify, WooCommerce, Custom',    color: '#f97316', to: '/services/e-commerce-development'         },
  { icon: 'bi-kanban',           label: 'ERP',         desc: 'Enterprise, Integrations',        color: '#034665', to: '/services/web-erp-development'            },
  { icon: 'bi-graph-up-arrow',   label: 'SEO',         desc: 'SEO, Social, Growth',             color: '#10b981', to: '/services/seo-digital-marketing'          },
  { icon: 'bi-people-fill',      label: 'CRM',         desc: 'Custom CRM, Automation',          color: '#61BBC5', to: '/services/crm-development'                },
  { icon: 'bi-plug',             label: 'APIs',        desc: 'RESTful, GraphQL, Microservices', color: '#0a8fb6', to: '/services/api-development'                },
  { icon: 'bi-geo-alt-fill',     label: 'Field Force', desc: 'Mobile-first field apps',         color: '#f97316', to: '/services/field-force-management'         },
  { icon: 'bi-mortarboard-fill', label: 'Training',    desc: 'Workshops, Live Projects',        color: '#8b5cf6', to: '/services/internship-training'            },
];

function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1000, start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick); else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function ServicesPage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden" style={{ fontFamily: "Inter, 'Nunito Sans', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section className="relative bg-white overflow-hidden min-h-screen flex flex-col"
        style={{ paddingTop: 'clamp(90px, 12vw, 130px)', paddingLeft: 'clamp(16px, 4vw, 60px)', paddingRight: 'clamp(16px, 4vw, 60px)', paddingBottom: 0 }}>

        <div className={`relative z-10 max-w-[1300px] mx-auto w-full flex flex-col flex-1 pb-16 transition-opacity duration-200 ${entered ? 'opacity-100' : 'opacity-0'}`}
          style={{ gap: 'clamp(28px, 4vw, 52px)' }}>

          {/* ── HEADLINE + CTAs ── */}
          <div className="flex flex-col gap-4">

            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full py-[7px] px-[18px] w-fit"
              style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#034665' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0"
                style={{ animation: 'svPulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(97,187,197,0.7)' }} />
              What We Offer
            </div>

            {/* title */}
            <h1 className="font-black text-[#0d3d5a] m-0 leading-[1.1] tracking-[-0.03em]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.9rem, 5vw, 4rem)' }}>
              Our Core IT
              <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)', backgroundSize: '250% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'svShimmer 4s linear infinite' }}> Services</span>
            </h1>

            <p className="text-[#5a7a8a] leading-[1.85] m-0 max-w-[500px]"
              style={{ fontSize: 'clamp(0.88rem, 2vw, 1.05rem)' }}>
              Scalable, secure, and high-performance digital solutions — custom-built for your business needs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-1">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-full text-[0.92rem] font-bold no-underline text-white transition-all duration-[280ms] hover:-translate-y-[3px] hover:scale-[1.03]"
                style={{ padding: 'clamp(10px,2vw,14px) clamp(20px,3vw,30px)', background: 'linear-gradient(138deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 10px 28px rgba(3,70,101,0.24)' }}>
                Start a Project <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/portfolio"
                className="inline-flex items-center justify-center gap-2.5 rounded-full text-[0.92rem] font-bold no-underline text-[#034665] bg-white transition-all duration-[280ms] hover:-translate-y-0.5"
                style={{ padding: 'clamp(10px,2vw,14px) clamp(20px,3vw,30px)', border: '1.5px solid rgba(97,187,197,0.30)', boxShadow: '0 4px 14px rgba(3,70,101,0.06)' }}>
                View Our Work
              </Link>
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-[20px] overflow-hidden"
            style={{ border: '1.5px solid rgba(97,187,197,0.16)', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
            {[
              { icon: 'bi-layers-fill',        val: 10, suffix: '+', lbl: 'Services'     },
              { icon: 'bi-rocket-takeoff-fill', val: 50, suffix: '+', lbl: 'Projects'     },
              { icon: 'bi-clock-history',       val: 3,  suffix: '+', lbl: 'Yrs Exp'      },
              { icon: 'bi-emoji-smile-fill',    val: 98, suffix: '%', lbl: 'Satisfaction' },
            ].map((s, i) => (
              <div key={s.lbl}
                className="flex items-center gap-3 px-4 sm:px-7 py-4 sm:py-6 transition-colors duration-200 hover:bg-[rgba(97,187,197,0.05)]"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(97,187,197,0.13)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(97,187,197,0.13)' : 'none',
                  animation: `svFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.08}s both`,
                }}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-[13px] flex-shrink-0 flex items-center justify-center text-[1rem] sm:text-[1.2rem] text-[#034665]"
                  style={{ background: 'linear-gradient(138deg,rgba(97,187,197,0.14),rgba(3,70,101,0.07))', border: '1.5px solid rgba(97,187,197,0.18)' }}>
                  <i className={`bi ${s.icon}`} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[1.3rem] sm:text-[1.6rem] font-black leading-none"
                    style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <CountUp target={s.val} suffix={s.suffix} />
                  </span>
                  <span className="text-[0.62rem] sm:text-[0.68rem] font-bold text-[#7a9aaa] uppercase tracking-[0.08em]">{s.lbl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── SERVICE TILES GRID ── */}
          <div className="grid gap-2.5 sm:gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(140px, 100%), 1fr))' }}>
            {SVC_CARDS.map((svc, i) => (
              <Link
                key={svc.label}
                to={svc.to}
                className="relative flex flex-col items-start gap-2.5 sm:gap-3 bg-white rounded-[16px] sm:rounded-[20px] no-underline overflow-hidden cursor-pointer transition-[transform,box-shadow,border-color] duration-[320ms] hover:-translate-y-2 hover:scale-[1.02]"
                style={{
                  padding: 'clamp(14px, 2.5vw, 24px) clamp(12px, 2vw, 20px)',
                  border: '1.5px solid rgba(97,187,197,0.14)',
                  boxShadow: '0 4px 18px rgba(3,70,101,0.06)',
                  animation: `svFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.05}s both`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = svc.color; e.currentTarget.style.boxShadow = '0 20px 48px rgba(3,70,101,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(97,187,197,0.14)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(3,70,101,0.06)'; }}
              >
                {/* accent corner */}
                <div className="absolute top-0 right-0 w-10 h-10 rounded-[0_16px_0_0] pointer-events-none"
                  style={{ background: `linear-gradient(225deg, ${svc.color}22 0%, transparent 60%)` }} />

                {/* icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex-shrink-0 flex items-center justify-center text-[1rem] sm:text-[1.2rem] text-white"
                  style={{ background: `linear-gradient(138deg,${svc.color} 0%,#034665 100%)`, boxShadow: `0 6px 18px ${svc.color}59` }}>
                  <i className={`bi ${svc.icon}`} />
                </div>

                {/* text */}
                <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
                  <span className="font-extrabold text-[#0d3d5a] leading-[1.2]"
                    style={{ fontSize: 'clamp(0.75rem, 2vw, 0.92rem)' }}>{svc.label}</span>
                  <span className="font-semibold text-[#7a9aaa] tracking-[0.03em] leading-[1.4]"
                    style={{ fontSize: 'clamp(0.60rem, 1.5vw, 0.68rem)' }}>{svc.desc}</span>
                </div>

                {/* arrow */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[#61BBC5] text-[0.65rem] sm:text-[0.75rem] self-end transition-all duration-200"
                  style={{ background: 'rgba(97,187,197,0.08)', border: '1px solid rgba(97,187,197,0.20)' }}>
                  <i className="bi bi-arrow-up-right" />
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* wave */}
        <div className="relative z-10 leading-none mt-auto" aria-hidden="true">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block w-full" style={{ height: 'clamp(28px, 4vw, 56px)' }}>
            <path fill="#f8f9fb" d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64Z" />
          </svg>
        </div>
      </section>

    </div>
  );
}
