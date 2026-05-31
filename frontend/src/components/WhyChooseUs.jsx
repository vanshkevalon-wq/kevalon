import React from 'react';
import { Container } from 'react-bootstrap';
import './WhyChooseUs.css';

const stats = [
  { icon: 'bi-calendar3',          number: '2+',  label: 'Years in Business',  sub: 'Trusted experience'      },
  { icon: 'bi-people-fill',        number: '20+', label: 'Dedicated Experts',  sub: 'Skilled professionals'   },
  { icon: 'bi-file-earmark-check', number: '15+', label: 'Projects Delivered', sub: 'Across industries'       },
  { icon: 'bi-globe2',             number: '5+',  label: 'Global Clients',     sub: 'Long-term partnerships'  },
];

const reasons = [
  { icon: 'bi-lightning-charge-fill', text: 'Fast delivery without compromising quality' },
  { icon: 'bi-shield-check',          text: 'Secure, scalable & future-proof solutions'  },
  { icon: 'bi-headset',               text: 'Dedicated support at every stage'           },
  { icon: 'bi-graph-up-arrow',        text: 'Data-driven strategies for real growth'     },
];

const WhyChooseUs = () => {
  return (
    <section className="wcu-section">
      {/* Decorative blobs */}
      <div className="wcu-blob wcu-blob--1" />
      <div className="wcu-blob wcu-blob--2" />

      <Container fluid className="wcu-container px-4 px-md-5">

        {/* ── Header ── */}
        <div className="wcu-header">
          <div className="wcu-badge">
            <span className="wcu-badge__dot" />
            A partner committed to your success
          </div>
          <h2 className="wcu-title">Why Choose Kevalon Technology</h2>
          <p className="wcu-subtitle">
            Trusted IT partner for startups and enterprises across Ahmedabad, Gujarat, and India.
          </p>
        </div>

        {/* ── Main card ── */}
        <div className="wcu-card">

          {/* Left column */}
          <div className="wcu-left">
            <h3 className="wcu-card__title">Driving Digital Success</h3>
            <p className="wcu-card__desc">
              Kevalon Technology is a trusted IT company in Ahmedabad, delivering reliable and
              result-driven digital solutions for businesses of all sizes. We build scalable,
              secure, and high-performance solutions tailored to your needs.
            </p>

            {/* Reasons list */}
            <ul className="wcu-reasons">
              {reasons.map((r, i) => (
                <li key={i} className="wcu-reason">
                  <span className="wcu-reason__icon">
                    <i className={`bi ${r.icon}`} />
                  </span>
                  <span className="wcu-reason__text">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — stats */}
          <div className="wcu-right">
            <p className="wcu-stats__heading">Our Latest Stats</p>
            <div className="wcu-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="wcu-stat">
                  <div className="wcu-stat__icon-wrap">
                    <i className={`bi ${s.icon}`} />
                  </div>
                  <div className="wcu-stat__number">{s.number}</div>
                  <div className="wcu-stat__label">{s.label}</div>
                  <div className="wcu-stat__sub">{s.sub}</div>
                </div>
              ))}
            </div>

            <p className="wcu-footer-note">
              We don't just build software — we create scalable digital growth.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
