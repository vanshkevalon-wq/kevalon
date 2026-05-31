import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WebAppDevelopmentPage.css';

/* ─── DATA ─────────────────────────────────────────────── */

const techStack = [
  { name: 'HTML5',     icon: 'bi-filetype-html', color: '#e34f26', bg: '#fff3ef' },
  { name: 'CSS 3',     icon: 'bi-filetype-css',  color: '#1572b6', bg: '#eff6ff' },
  { name: 'Bootstrap', icon: 'bi-bootstrap',     color: '#7952b3', bg: '#f5f0ff' },
  { name: 'Tailwind',  icon: 'bi-wind',          color: '#0ea5e9', bg: '#f0f9ff' },
  { name: 'Flask',     icon: 'bi-cup-hot',       color: '#1a1a1a', bg: '#f5f5f5' },
  { name: 'Django',    icon: 'bi-layers',        color: '#0c4b33', bg: '#ecfdf5' },
  { name: 'PHP',       icon: 'bi-filetype-php',  color: '#777bb4', bg: '#f5f0ff' },
  { name: 'WordPress', icon: 'bi-wordpress',     color: '#21759b', bg: '#eff6ff' },
];

const websiteTypes = [
  {
    id: 'static',
    number: '01',
    title: 'Static Website Development',
    tagline: 'Fast · Secure · Lightweight',
    icon: 'bi-lightning-charge-fill',
    color: '#61BBC5',
    desc: 'Static websites are the perfect solution for businesses that require a fast, reliable, and professional online presence. We design high-quality static websites that deliver speed, simplicity, and strong brand visibility.',
    extra: 'Ideal for companies that want a strong digital footprint without frequent content updates. Lightweight, secure, SEO-friendly, and optimized for performance across all devices.',
    bullets: [
      'Ultra fast-loading & high-performance pages',
      'Mobile-first and fully responsive design',
      'SEO-optimized structure and clean code',
      'Low maintenance and cost-effective solution',
      'High security with minimal vulnerabilities',
      'Perfect for portfolios, brochures & brand sites',
    ],
  },
  {
    id: 'semi',
    number: '02',
    title: 'Semi-Dynamic Website Development',
    tagline: 'Flexible · Manageable · Scalable',
    icon: 'bi-sliders',
    color: '#034665',
    desc: 'Semi-dynamic websites offer the perfect balance between static and fully dynamic platforms. They allow businesses to manage content easily while maintaining high performance, security, and scalability.',
    extra: 'Ideal for businesses needing content updates — blogs, portfolios, galleries, testimonials — without complex backend systems. SEO-friendly, mobile-responsive, and designed to grow.',
    bullets: [
      'Easy content updates with admin panel or CMS',
      'High performance and fast-loading pages',
      'SEO-optimized structure and clean code',
      'Mobile-first and responsive design',
      'Cost-effective compared to fully dynamic systems',
      'Ideal for startups and service providers',
    ],
  },
  {
    id: 'dynamic',
    number: '03',
    title: 'Dynamic Website Development',
    tagline: 'Powerful · Real-time · Automated',
    icon: 'bi-cpu-fill',
    color: '#0a8fb6',
    desc: 'Dynamic websites empower businesses with complete control over content, users, and data. We build secure, scalable, and high-performance dynamic websites that enable real-time content updates and advanced integrations.',
    extra: 'Ideal for organizations requiring user authentication, dashboards, CRM/ERP integration, e-commerce functionality, and database-driven operations for business growth and automation.',
    bullets: [
      'Powerful admin panel for content management',
      'Secure user authentication & role-based access',
      'Database integration & real-time data processing',
      'Third-party API integration & payment gateways',
      'High security with minimal vulnerabilities',
      'SEO-friendly structure & performance optimization',
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Discovery & Strategy',   icon: 'bi-search',          desc: 'We analyze your business goals, target audience, and technical requirements to craft a winning strategy.' },
  { step: '02', title: 'UI/UX Design',            icon: 'bi-palette2',        desc: 'Our designers create wireframes and pixel-perfect mockups that balance aesthetics with usability.' },
  { step: '03', title: 'Development',             icon: 'bi-code-slash',      desc: 'Clean, scalable code built with modern frameworks, following best practices and security standards.' },
  { step: '04', title: 'Testing & QA',            icon: 'bi-shield-check',    desc: 'Rigorous testing across devices, browsers, and load conditions to ensure flawless performance.' },
  { step: '05', title: 'Deployment',              icon: 'bi-cloud-upload',    desc: 'Smooth launch with CI/CD pipelines, server configuration, and zero-downtime deployment.' },
  { step: '06', title: 'Support & Growth',        icon: 'bi-graph-up-arrow',  desc: 'Ongoing maintenance, performance monitoring, and feature enhancements to keep you ahead.' },
];

const capabilities = [
  { icon: 'bi-check2-circle', label: 'Custom Web Application Development in Ahmedabad' },
  { icon: 'bi-check2-circle', label: 'Enterprise Web Solutions' },
  { icon: 'bi-check2-circle', label: 'SaaS Application Development' },
  { icon: 'bi-check2-circle', label: 'E-commerce Web Development' },
  { icon: 'bi-check2-circle', label: 'Secure Web Portals & Dashboards' },
  { icon: 'bi-check2-circle', label: 'SEO-friendly & Performance Optimized Web Apps' },
];

/* ─── COMPONENT ─────────────────────────────────────────── */

const WebAppDevelopmentPage = () => {
  const [activeType, setActiveType] = useState('static');
  const active = websiteTypes.find((t) => t.id === activeType);

  return (
    <div className="wad-page">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="wad-hero">
        {/* animated grid bg */}
        <div className="wad-hero__grid-bg" aria-hidden="true" />
        {/* glow orbs */}
        <div className="wad-hero__orb wad-hero__orb--1" aria-hidden="true" />
        <div className="wad-hero__orb wad-hero__orb--2" aria-hidden="true" />

        <div className="wad-hero__inner">
          {/* breadcrumb */}
          <div className="wad-hero__breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right" />
            <Link to="/services">Services</Link>
            <i className="bi bi-chevron-right" />
            <span>Web Application Development</span>
          </div>

          {/* badge */}
          <div className="wad-hero__badge">
            <span className="wad-hero__badge-dot" />
            Full-Stack Web Development
          </div>

          <h1 className="wad-hero__title">
            Web Application<br />
            <span className="wad-hero__title-grad">Development</span>
          </h1>

          <p className="wad-hero__subtitle">
            We craft high-performance, scalable web applications tailored to your business —
            from sleek landing pages to complex enterprise platforms.
          </p>

          <div className="wad-hero__actions">
            <Link to="/contact" className="wad-btn wad-btn--primary">
              Start Your Project <i className="bi bi-arrow-right ms-2" />
            </Link>
            <Link to="/portfolio" className="wad-btn wad-btn--ghost">
              View Our Work
            </Link>
          </div>

          {/* floating stat chips */}
          <div className="wad-hero__stats">
            {[
              { val: '50+', label: 'Projects Delivered' },
              { val: '3+',  label: 'Years Experience'   },
              { val: '100%',label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="wad-stat-chip">
                <span className="wad-stat-chip__val">{s.val}</span>
                <span className="wad-stat-chip__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right: code window mockup */}
        <div className="wad-hero__visual" aria-hidden="true">
          <div className="wad-code-window">
            <div className="wad-code-window__bar">
              <span /><span /><span />
              <p>app.jsx</p>
            </div>
            <div className="wad-code-window__body">
              <div className="wad-code-line"><em className="wad-kw">import</em> React <em className="wad-kw">from</em> <em className="wad-str">'react'</em>;</div>
              <div className="wad-code-line wad-code-line--blank" />
              <div className="wad-code-line"><em className="wad-kw">const</em> <em className="wad-fn">App</em> = () =&gt; {'{'}</div>
              <div className="wad-code-line wad-code-indent"><em className="wad-kw">return</em> (</div>
              <div className="wad-code-line wad-code-indent2"><em className="wad-tag">&lt;div</em> <em className="wad-attr">className</em>=<em className="wad-str">"app"</em><em className="wad-tag">&gt;</em></div>
              <div className="wad-code-line wad-code-indent3"><em className="wad-tag">&lt;h1&gt;</em><em className="wad-str">Kevalon</em><em className="wad-tag">&lt;/h1&gt;</em></div>
              <div className="wad-code-line wad-code-indent2"><em className="wad-tag">&lt;/div&gt;</em></div>
              <div className="wad-code-line wad-code-indent">);</div>
              <div className="wad-code-line">{'}'}</div>
              <div className="wad-code-line wad-code-line--blank" />
              <div className="wad-code-line"><em className="wad-kw">export default</em> <em className="wad-fn">App</em>;</div>
            </div>
            {/* floating badges */}
            <div className="wad-code-badge wad-code-badge--1"><i className="bi bi-lightning-charge-fill" /> Fast</div>
            <div className="wad-code-badge wad-code-badge--2"><i className="bi bi-shield-fill-check" /> Secure</div>
            <div className="wad-code-badge wad-code-badge--3"><i className="bi bi-phone" /> Responsive</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO — what is web dev
      ══════════════════════════════════════════ */}
      <section className="wad-intro">
        <div className="wad-container">
          <div className="wad-intro__grid">

            {/* left: visual card stack */}
            <div className="wad-intro__visual">
              <div className="wad-card-stack">
                <div className="wad-stack-card wad-stack-card--back" />
                <div className="wad-stack-card wad-stack-card--mid" />
                <div className="wad-stack-card wad-stack-card--front">
                  <div className="wad-stack-card__header">
                    <span className="wad-stack-card__dot" /><span className="wad-stack-card__dot" /><span className="wad-stack-card__dot" />
                  </div>
                  <div className="wad-stack-card__icon"><i className="bi bi-code-slash" /></div>
                  <p className="wad-stack-card__label">Web Application</p>
                  <div className="wad-stack-card__bars">
                    <div className="wad-bar" style={{ width: '85%' }}><span>Performance</span><b>85%</b></div>
                    <div className="wad-bar" style={{ width: '92%' }}><span>Security</span><b>92%</b></div>
                    <div className="wad-bar" style={{ width: '78%' }}><span>SEO Score</span><b>78%</b></div>
                  </div>
                </div>
              </div>
            </div>

            {/* right: text */}
            <div className="wad-intro__text">
              <div className="wad-label">What We Do</div>
              <h2 className="wad-h2">
                Building the Web,<br />
                <span>One Pixel at a Time</span>
              </h2>
              <p>
                Web application development refers to the process of creating web pages and deploying
                them to a server — encompassing web design, content development, client/server-side
                scripting, and network security configuration.
              </p>
              <p>
                At <strong>Kevalon Technology</strong>, we specialize in developing both static and
                dynamic websites tailored to your business needs. Our team uses modern technologies
                and best practices to ensure your website is fast, secure, and scalable.
              </p>
              <div className="wad-intro__caps">
                {capabilities.map((c) => (
                  <div key={c.label} className="wad-cap-item">
                    <i className={`bi ${c.icon}`} />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WEBSITE TYPES — tabbed
      ══════════════════════════════════════════ */}
      <section className="wad-types">
        <div className="wad-container">
          <div className="wad-section-head">
            <div className="wad-label">Our Offerings</div>
            <h2 className="wad-h2">Types of Websites We Build</h2>
            <p className="wad-section-sub">
              From lightweight static pages to complex dynamic platforms — we have the right solution for every business need.
            </p>
          </div>

          {/* tab pills */}
          <div className="wad-tabs">
            {websiteTypes.map((t) => (
              <button
                key={t.id}
                className={`wad-tab ${activeType === t.id ? 'wad-tab--active' : ''}`}
                onClick={() => setActiveType(t.id)}
              >
                <i className={`bi ${t.icon}`} />
                {t.title.replace(' Development', '')}
              </button>
            ))}
          </div>

          {/* tab content */}
          <div className="wad-tab-content" key={active.id}>
            <div className="wad-tab-content__left">
              <div className="wad-type-number">{active.number}</div>
              <h3 className="wad-type-title">{active.title}</h3>
              <div className="wad-type-tagline">
                {active.tagline.split(' · ').map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p className="wad-type-desc">{active.desc}</p>
              <p className="wad-type-extra">{active.extra}</p>
            </div>

            <div className="wad-tab-content__right">
              <div className="wad-bullets-grid">
                {active.bullets.map((b) => (
                  <div key={b} className="wad-bullet-item">
                    <div className="wad-bullet-icon" style={{ '--bcolor': active.color }}>
                      <i className="bi bi-check-lg" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS TIMELINE
      ══════════════════════════════════════════ */}
      <section className="wad-process">
        <div className="wad-container">
          <div className="wad-section-head">
            <div className="wad-label">How We Work</div>
            <h2 className="wad-h2">Our Development Process</h2>
            <p className="wad-section-sub">
              A structured, transparent workflow that keeps you in control at every stage.
            </p>
          </div>

          <div className="wad-process__grid">
            {processSteps.map((s, i) => (
              <div key={s.step} className="wad-process-card">
                <div className="wad-process-card__num">{s.step}</div>
                <div className="wad-process-card__icon">
                  <i className={`bi ${s.icon}`} />
                </div>
                <h4 className="wad-process-card__title">{s.title}</h4>
                <p className="wad-process-card__desc">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="wad-process-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-right" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TECHNOLOGIES
      ══════════════════════════════════════════ */}
      <section className="wad-tech">
        <div className="wad-container">
          <div className="wad-section-head">
            <div className="wad-label">Tech Stack</div>
            <h2 className="wad-h2">Technologies We Use</h2>
            <p className="wad-section-sub">
              Modern, industry-standard tools chosen for speed, reliability, and long-term scalability.
            </p>
          </div>

          <div className="wad-tech__grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="wad-tech-card" style={{ '--tc': tech.color, '--tb': tech.bg }}>
                <div className="wad-tech-card__icon-wrap">
                  <i className={`bi ${tech.icon}`} />
                </div>
                <span className="wad-tech-card__name">{tech.name}</span>
                <div className="wad-tech-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="wad-cta">
        <div className="wad-container">
          <div className="wad-cta__inner">
            {/* bg decoration */}
            <div className="wad-cta__orb wad-cta__orb--1" aria-hidden="true" />
            <div className="wad-cta__orb wad-cta__orb--2" aria-hidden="true" />
            <div className="wad-cta__grid-bg" aria-hidden="true" />

            <div className="wad-cta__content">
              <div className="wad-label wad-label--light">Ready to Build?</div>
              <h2 className="wad-cta__title">
                Transform Your Vision<br />into a Digital Reality
              </h2>
              <p className="wad-cta__sub">
                Let Kevalon Technology help you create a stunning, high-performance web application
                that grows your business online.
              </p>
              <div className="wad-cta__actions">
                <Link to="/contact" className="wad-btn wad-btn--white">
                  Get In Touch <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to="/portfolio" className="wad-btn wad-btn--outline-white">
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WebAppDevelopmentPage;
