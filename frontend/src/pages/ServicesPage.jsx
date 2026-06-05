import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

/* ── service data ── */
const SVC_CARDS = [
  { icon: 'bi-code-slash',       label: 'Web Apps',    desc: 'React, Next.js, Node.js',          color: '#61BBC5', to: '/services/web-application-development'    },
  { icon: 'bi-phone',            label: 'Mobile',      desc: 'iOS, Android, Flutter',             color: '#0a8fb6', to: '/services/mobile-application-development' },
  { icon: 'bi-controller',       label: 'Games',       desc: 'Unity, 2D & 3D, Cross-platform',   color: '#8b5cf6', to: '/services/game-development'               },
  { icon: 'bi-cart3',            label: 'E-Commerce',  desc: 'Shopify, WooCommerce, Custom',      color: '#f97316', to: '/services/e-commerce-development'         },
  { icon: 'bi-kanban',           label: 'ERP',         desc: 'Enterprise, Integrations',          color: '#034665', to: '/services/web-erp-development'            },
  { icon: 'bi-graph-up-arrow',   label: 'SEO',         desc: 'SEO, Social, Growth',               color: '#10b981', to: '/services/seo-digital-marketing'          },
  { icon: 'bi-people-fill',      label: 'CRM',         desc: 'Custom CRM, Automation',            color: '#61BBC5', to: '/services/crm-development'                },
  { icon: 'bi-plug',             label: 'APIs',        desc: 'RESTful, GraphQL, Microservices',   color: '#0a8fb6', to: '/services/api-development'                },
  { icon: 'bi-geo-alt-fill',     label: 'Field Force', desc: 'Mobile-first field apps',          color: '#f97316', to: '/services/field-force-management'         },
  { icon: 'bi-mortarboard-fill', label: 'Training',    desc: 'Workshops, Live Projects',          color: '#8b5cf6', to: '/services/internship-training'            },
];

/* ── number counter ── */
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

/* ── scroll reveal (bidirectional) ── */
function useReveal(threshold = 0.08) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setOn(e.isIntersecting),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

export default function ServicesPage() {
  const hero = useReveal(0.05);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sp-page">

      {/* ══ HERO ══ */}
      <section className="sp-hero">

        {/* ── layered background ── */}
        <div className="sp-bg" aria-hidden="true">
          <div className="sp-bg__gradient" />
          <div className="sp-bg__dots" />
          <div className="sp-bg__grid" />
          <div className="sp-bg__orb sp-bg__orb--1" />
          <div className="sp-bg__orb sp-bg__orb--2" />
          <div className="sp-bg__orb sp-bg__orb--3" />
          {/* decorative large arc */}
          <svg className="sp-bg__arc" viewBox="0 0 900 900" aria-hidden="true">
            <circle cx="450" cy="450" r="380" fill="none"
              stroke="rgba(97,187,197,0.07)" strokeWidth="1" strokeDasharray="14 10"/>
            <circle cx="450" cy="450" r="300" fill="none"
              stroke="rgba(97,187,197,0.05)" strokeWidth="1"/>
            <circle cx="450" cy="450" r="200" fill="none"
              stroke="rgba(3,70,101,0.05)" strokeWidth="1" strokeDasharray="6 8"/>
          </svg>
        </div>

        <div className={`sp-hero__inner${entered ? ' sp-entered' : ''}`} ref={hero.ref}>

          {/* ── TOP: headline band ── */}
          <div className="sp-headline">
            <div className="sp-eyebrow">
              <span className="sp-eyebrow__dot" />
              What We Offer
            </div>

            <h1 className="sp-title">
              Our Core IT
              <span className="sp-title__grad"> Services</span>
            </h1>

            <p className="sp-subtitle">
              Scalable, secure, and high-performance digital solutions —
              custom-built for your business needs.
            </p>

            <div className="sp-ctas">
              <Link to="/contact" className="sp-btn sp-btn--fill">
                Start a Project <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/portfolio" className="sp-btn sp-btn--ghost">
                View Our Work
              </Link>
            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div className="sp-stats">
            {[
              { icon: 'bi-layers-fill',         val: 10, suffix: '+', lbl: 'Services' },
              { icon: 'bi-rocket-takeoff-fill',  val: 50, suffix: '+', lbl: 'Projects' },
              { icon: 'bi-clock-history',        val: 3,  suffix: '+', lbl: 'Yrs Exp'  },
              { icon: 'bi-emoji-smile-fill',     val: 98, suffix: '%', lbl: 'Satisfaction' },
            ].map((s, i) => (
              <div className="sp-stat" key={s.lbl} style={{ '--si': i }}>
                <div className="sp-stat__icon"><i className={`bi ${s.icon}`} /></div>
                <div className="sp-stat__body">
                  <span className="sp-stat__val"><CountUp target={s.val} suffix={s.suffix} /></span>
                  <span className="sp-stat__lbl">{s.lbl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── SERVICE TILES GRID ── */}
          <div className="sp-tiles">
            {SVC_CARDS.map((svc, i) => (
              <Link
                key={svc.label}
                to={svc.to}
                className="sp-tile"
                style={{ '--tc': svc.color, '--ti': i }}
              >
                {/* accent corner */}
                <div className="sp-tile__corner" />

                {/* icon */}
                <div className="sp-tile__icon">
                  <i className={`bi ${svc.icon}`} />
                </div>

                {/* text */}
                <div className="sp-tile__body">
                  <span className="sp-tile__label">{svc.label}</span>
                  <span className="sp-tile__desc">{svc.desc}</span>
                </div>

                {/* arrow */}
                <div className="sp-tile__arrow">
                  <i className="bi bi-arrow-up-right" />
                </div>

                {/* hover glow bar */}
                <div className="sp-tile__bar" />
              </Link>
            ))}
          </div>

        </div>

        {/* wave */}
        <div className="sp-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path fill="#f8f9fb"
              d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64Z" />
          </svg>
        </div>
      </section>

    </div>
  );
}
