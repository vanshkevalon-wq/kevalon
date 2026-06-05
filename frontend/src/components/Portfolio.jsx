import React, { useState, useRef, useEffect } from 'react';
import './Portfolio.css';
import ProjectModal from './ProjectModal';
import portfolioItems from '../data/portfolioData';

const TABS = ['All', 'Web', 'Mobile', 'Game'];

const CAT = {
  Web:    { icon: 'bi-code-slash',  color: '#61BBC5', bg: 'rgba(97,187,197,0.12)',  label: 'Web'    },
  Mobile: { icon: 'bi-phone-fill',  color: '#0a8fb6', bg: 'rgba(10,143,182,0.12)',  label: 'Mobile' },
  Game:   { icon: 'bi-controller',  color: '#034665', bg: 'rgba(3,70,101,0.10)',    label: 'Game'   },
};

/* ── bidirectional scroll-reveal hook ── */
function useReveal() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { setOn(e.isIntersecting); },   // toggle both ways
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

/* ── single showcase row ── */
function ShowcaseRow({ item, index, onOpen }) {
  const { ref, on } = useReveal();
  const c = CAT[item.category] || CAT.Web;
  const flip = index % 2 !== 0; // alternate image left/right

  return (
    <article
      ref={ref}
      className={`pf-row${flip ? ' pf-row--flip' : ''}${on ? ' pf-row--in' : ''}`}
      style={{ '--ri': index }}
    >
      {/* ── Image panel ── */}
      <div className="pf-row__img-panel" onClick={() => onOpen(item)} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onOpen(item)}
        aria-label={`Open ${item.title}`}>

        {/* main image */}
        <img src={item.image} alt={item.title} className="pf-row__img" loading="lazy" />

        {/* overlay */}
        <div className="pf-row__img-overlay" />

        {/* year tag */}
        <span className="pf-row__year">{item.year}</span>

        {/* category badge */}
        <span className="pf-row__cat-badge" style={{ '--cc': c.color, '--cb': c.bg }}>
          <i className={`bi ${c.icon}`} />
          {c.label}
        </span>

        {/* zoom CTA */}
        <div className="pf-row__zoom">
          <i className="bi bi-eye-fill" />
          <span>View Project</span>
        </div>

        {/* corner accents */}
        <div className="pf-row__corner pf-row__corner--tl" aria-hidden="true" />
        <div className="pf-row__corner pf-row__corner--br" aria-hidden="true" />
      </div>

      {/* ── Content panel ── */}
      <div className="pf-row__content">

        {/* index number watermark */}
        <span className="pf-row__num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* category label */}
        <div className="pf-row__cat" style={{ '--cc': c.color }}>
          <span className="pf-row__cat-dot" />
          <i className={`bi ${c.icon}`} />
          {c.label}
        </div>

        <h3 className="pf-row__title">{item.title}</h3>

        <p className="pf-row__desc">{item.desc}</p>

        {/* tech stack pills */}
        {item.tech && item.tech.length > 0 && (
          <div className="pf-row__tech">
            {item.tech.slice(0, 4).map(t => (
              <span key={t} className="pf-row__tech-pill">{t}</span>
            ))}
          </div>
        )}

        {/* result metrics */}
        {item.results && item.results.length > 0 && (
          <div className="pf-row__metrics">
            {item.results.slice(0, 3).map(r => (
              <div key={r.label} className="pf-row__metric">
                <span className="pf-row__metric-val" style={{ color: c.color }}>{r.metric}</span>
                <span className="pf-row__metric-label">{r.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* client + duration */}
        <div className="pf-row__meta">
          {item.client && (
            <div className="pf-row__meta-item">
              <i className="bi bi-building" />
              <span>{item.client}</span>
            </div>
          )}
          {item.duration && (
            <div className="pf-row__meta-item">
              <i className="bi bi-clock" />
              <span>{item.duration}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button className="pf-row__cta" onClick={() => onOpen(item)}
          style={{ '--cc': c.color }}>
          <span>Open Case Study</span>
          <div className="pf-row__cta-icon">
            <i className="bi bi-arrow-up-right" />
          </div>
        </button>
      </div>

      {/* connector line between panels */}
      <div className="pf-row__connector" aria-hidden="true">
        <div className="pf-row__connector-line" style={{ '--cc': c.color }} />
        <div className="pf-row__connector-dot" style={{ '--cc': c.color }} />
      </div>
    </article>
  );
}

/* ── main export ── */
export default function Portfolio() {
  const [tab, setTab]           = useState('All');
  const [selected, setSelected] = useState(null);
  const [visible, setVisible]   = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (secRef.current) io.observe(secRef.current);
    return () => io.disconnect();
  }, []);

  const items = tab === 'All'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === tab);

  return (
    <section className="pf" ref={secRef} id="portfolio">

      {/* ── section background ── */}
      <div className="pf-bg" aria-hidden="true">
        <div className="pf-bg__mesh" />
        <div className="pf-bg__glow pf-bg__glow--a" />
        <div className="pf-bg__glow pf-bg__glow--b" />
        <div className="pf-bg__lines" />
      </div>

      <div className={`pf-inner${visible ? ' pf-inner--in' : ''}`}>

        {/* ══ SECTION HEADER ══ */}
        <header className="pf-head">
          <div className="pf-head__pill">
            <span className="pf-head__pill-dot" />
            Our Work
          </div>
          <h2 className="pf-head__title">
            Projects that <em>speak for themselves</em>
          </h2>
          <p className="pf-head__sub">
            From startups to enterprises — we build things that work, scale, and make an impact.
          </p>
        </header>

        {/* ══ FILTER TABS ══ */}
        <nav className="pf-tabs" role="tablist" aria-label="Filter projects by category">
          {TABS.map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`pf-tab${tab === t ? ' pf-tab--on' : ''}`}
              onClick={() => setTab(t)}
            >
              {t !== 'All' && CAT[t] && <i className={`bi ${CAT[t].icon}`} />}
              {t}
              {tab === t && <span className="pf-tab__bar" />}
            </button>
          ))}

          {/* project count */}
          <span className="pf-tabs__count">
            {items.length} {items.length === 1 ? 'project' : 'projects'}
          </span>
        </nav>

        {/* ══ SHOWCASE ROWS ══ */}
        <div className="pf-showcase">
          {items.map((item, idx) => (
            <ShowcaseRow
              key={item.id}
              item={item}
              index={idx}
              onOpen={setSelected}
            />
          ))}

          {items.length === 0 && (
            <div className="pf-empty">
              <div className="pf-empty__icon">
                <i className="bi bi-collection" />
              </div>
              <p>No projects here yet — check back soon.</p>
            </div>
          )}
        </div>

        {/* ══ BOTTOM CTA ══ */}
        <div className="pf-cta">
          <div className="pf-cta__glow" aria-hidden="true" />
          <div className="pf-cta__content">
            <h3 className="pf-cta__title">Have a project in mind?</h3>
            <p className="pf-cta__sub">
              Let's turn your idea into a product that makes an impact.
            </p>
          </div>
          <div className="pf-cta__actions">
            <a href="/contact" className="pf-cta__btn">
              Start a Project <i className="bi bi-arrow-right" />
            </a>
            <a href="/contact" className="pf-cta__ghost">
              Get a Free Quote
            </a>
          </div>
        </div>

      </div>

      {selected && (
        <ProjectModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
