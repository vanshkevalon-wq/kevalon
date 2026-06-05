import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../Images/Logo.png';

/* ── Scroll reveal hook ── */
function useReveal() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, on };
}

const SERVICES = [
  { label: 'Web Development',    to: '/services/web-application-development'    },
  { label: 'Mobile Application Development', to: '/services/mobile-application-development' },
  { label: 'Game Development',               to: '/services/game-development'               },
  { label: 'Web ERP Development',            to: '/services/web-erp-development'            },
  { label: 'CRM Development',                to: '/services/crm-development'                },
  { label: 'SEO & Digital Marketing',        to: '/services/seo-digital-marketing'          },
  { label: 'Internship & Training',          to: '/services/internship-training'            },
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
  { icon: 'bi-linkedin',   href: 'https://www.linkedin.com/company/kevalon-technology', label: 'LinkedIn',  color: '#0A66C2' },
  { icon: 'bi-twitter-x',  href: 'https://x.com/KevalonT',                              label: 'X',         color: '#000000' },
  { icon: 'bi-instagram',  href: 'https://www.instagram.com/kevalon_technology',        label: 'Instagram', color: '#E1306C' },
  { icon: 'bi-whatsapp',   href: 'https://wa.link/a02fdn',                               label: 'WhatsApp',  color: '#25D366' },
];

export default function Footer() {
  const top     = useReveal();
  const mid     = useReveal();
  const bottom  = useReveal();

  return (
    <footer className="ft-footer">

      {/* ── background decorations ── */}
      <div className="ft-bg" aria-hidden="true">
        <div className="ft-bg__dots" />
        <div className="ft-bg__blob ft-bg__blob--tl" />
        <div className="ft-bg__blob ft-bg__blob--br" />
      </div>

      {/* ══ TOP CTA BAND ══ */}
      <div className="ft-cta-band" ref={top.ref}>
        <div className={`ft-cta-band__inner ${top.on ? 'ft-in' : ''}`}>
          <div className="ft-cta-band__left">
            <span className="ft-cta-band__eyebrow">
              <span className="ft-cta-band__dot" />
              Ready to build?
            </span>
            <h2 className="ft-cta-band__title">
              Let's create something
              <span className="ft-cta-band__grad"> extraordinary</span>
            </h2>
          </div>
          <div className="ft-cta-band__right">
            <Link to="/contact" className="ft-cta-btn ft-cta-btn--fill">
              Start a Project <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/portfolio" className="ft-cta-btn ft-cta-btn--outline">
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* ══ MAIN FOOTER GRID ══ */}
      <div className="ft-main" ref={mid.ref}>
        <div className={`ft-grid ${mid.on ? 'ft-in' : ''}`}>

          {/* ── Brand col ── */}
          <div className="ft-col ft-col--brand">
            <div className="ft-logo">
              <img src={logo} alt="Kevalon Technology" />
            </div>
            <p className="ft-desc">
              Leading IT company in India. Expert in web
              development, mobile apps, ERP, SEO, and digital marketing.
            </p>

            {/* social icons */}
            <div className="ft-socials">
              {SOCIALS.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ft-social"
                  aria-label={s.label}
                  style={{ '--si': i, '--sc': s.color }}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="ft-col">
            <h5 className="ft-heading">Quick Links</h5>
            <ul className="ft-links">
              {LINKS.map((l, i) => (
                <li key={l.label} style={{ '--li': i }}>
                  <Link to={l.to}>
                    <span className="ft-links__arrow"><i className="bi bi-arrow-right-short" /></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="ft-col ft-col--services">
            <h5 className="ft-heading">Our Services</h5>
            <ul className="ft-links">
              {SERVICES.map((s, i) => (
                <li key={s.label} style={{ '--li': i }}>
                  <Link to={s.to}>
                    <span className="ft-links__arrow"><i className="bi bi-arrow-right-short" /></span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="ft-col">
            <h5 className="ft-heading">Get in Touch</h5>
            <div className="ft-contact">

              <a href="mailto:career@kevalontechnology.in" className="ft-contact-item">
                <div className="ft-contact-item__icon">
                  <i className="bi bi-envelope-fill" />
                </div>
                <div className="ft-contact-item__info">
                  <span>career@kevalontechnology.in</span>
                  <span>ceo@kevalontechnology.in</span>
                </div>
              </a>

              <a href="tel:+919081012218" className="ft-contact-item">
                <div className="ft-contact-item__icon">
                  <i className="bi bi-telephone-fill" />
                </div>
                <div className="ft-contact-item__info">
                  <span>+91 9081012218</span>
                  <span>+91 9104012218</span>
                </div>
              </a>

              <div className="ft-contact-item ft-contact-item--addr">
                <div className="ft-contact-item__icon">
                  <i className="bi bi-geo-alt-fill" />
                </div>
                <div className="ft-contact-item__info">
                  <span>913, Solaris Business Hub</span>
                  <span>Parshwanath Jain BRTS, Bhuyangdev</span>
                  <span>India</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="ft-bottom" ref={bottom.ref}>
        <div className={`ft-bottom__inner ${bottom.on ? 'ft-in' : ''}`}>
          <p className="ft-bottom__copy">
            © 2026 <strong>Kevalon Technology</strong> — All rights reserved.
          </p>
          <div className="ft-bottom__links">
            <Link to="/privacy-policy" className="ft-bottom__link">Privacy Policy</Link>
            <span className="ft-bottom__sep" />
            <Link to="/terms-of-use" className="ft-bottom__link">Terms of Use</Link>
            <span className="ft-bottom__sep" />
            <Link to="/sitemap" className="ft-bottom__link">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
