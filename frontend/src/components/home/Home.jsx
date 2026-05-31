import React from "react";
import Services from "../Services";
import WhyChooseUs from "../WhyChooseUs";
import Portfolio from "../Portfolio";
import Team from "../Team";
import Testimonials from "../Testimonials";
import Contact from "../Contact";
import "./Home.css";

/* Bubble data — position, size, animation delay/duration */
const BUBBLES = [
  { size: 180, left:  6, bottom: 38, delay: 0,   dur: 7   },
  { size: 120, left: 18, bottom: 55, delay: 1.5, dur: 9   },
  { size: 240, left: 32, bottom: 30, delay: 0.8, dur: 11  },
  { size:  90, left: 48, bottom: 60, delay: 2.2, dur: 8   },
  { size: 200, left: 62, bottom: 42, delay: 0.4, dur: 10  },
  { size: 140, left: 75, bottom: 50, delay: 1.8, dur: 7.5 },
  { size: 260, left: 86, bottom: 28, delay: 1.1, dur: 12  },
  { size: 100, left: 94, bottom: 58, delay: 2.8, dur: 9   },
];

const Home = () => {
  return (
    <div className="bg-white font-sans">

      <section className="home-hero">

        {/* ── Floating bubbles (scattered across full hero) ── */}
        <div className="home-hero__bubbles" aria-hidden="true">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                width:  b.size,
                height: b.size,
                left:   `${b.left}%`,
                bottom: `${b.bottom}%`,
                animationDelay:    `${b.delay}s`,
                animationDuration: `${b.dur}s`,
              }}
            />
          ))}
        </div>

        {/* ── TOP ZONE: badge + headings + tagline (above wave crest) ── */}
        <div className="home-hero__top">
          <div className="home-hero__inner">

            <div className="home-hero__badge">
              <span className="home-hero__badge-dot" />
              Trusted IT Partner · Ahmedabad, Gujarat, India
            </div>

            <h1 className="home-hero__title">
              Engineering digital products
            </h1>
            <h2 className="home-hero__subtitle">
              that <span className="home-hero__highlight">scale businesses</span> globally
            </h2>

            {/* Tagline sits right at the wave crest */}
            <p className="home-hero__tagline">
              Don't Learn Tools. Learn How To Build Features.
            </p>

          </div>
        </div>

        {/* ── WAVE DIVIDER: crest sits right below the tagline ── */}
        <div className="home-hero__wave-divider" aria-hidden="true">
          {/* Wave 1 — slowest, lightest */}
          <svg className="wave-svg wave-svg--1" viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path fill="rgba(97,187,197,0.20)"
              d="M0,45 C180,80 360,10 540,45 C720,80 900,10 1080,45 C1260,80 1380,20 1440,45 L1440,90 L0,90Z" />
          </svg>
          {/* Wave 2 — medium speed, reversed */}
          <svg className="wave-svg wave-svg--2" viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path fill="rgba(97,187,197,0.14)"
              d="M0,30 C240,70 480,5 720,35 C960,65 1200,10 1440,30 L1440,90 L0,90Z" />
          </svg>
          {/* Wave 3 — fastest, deepest colour, fills the bottom solid */}
          <svg className="wave-svg wave-svg--3" viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path fill="rgba(4,54,79,0.95)"
              d="M0,60 C200,20 400,80 600,55 C800,30 1100,75 1440,50 L1440,90 L0,90Z" />
          </svg>
        </div>

        {/* ── BOTTOM ZONE: desc + buttons + stats (below wave, on dark fill) ── */}
        <div className="home-hero__bottom">
          <div className="home-hero__inner">

            <p className="home-hero__desc">
              Kevalon Technology delivers enterprise-grade software solutions —
              Web Apps, Mobile Apps (Android, iOS, Flutter), Custom Platforms,
              API Integrations, and SEO-driven digital growth systems.
            </p>

            <div className="home-hero__actions">
              <button className="btn-primary-custom hero-cta-custom rounded-pill px-4 py-2 font-semibold">
                Start Your Project &nbsp;<i className="bi bi-arrow-right" />
              </button>
              <button className="btn-outline-custom rounded-pill px-4 py-2 font-semibold">
                Explore Services &nbsp;<i className="bi bi-rocket" />
              </button>
            </div>

            <div className="home-hero__stats">
              {[
                { value: '100+', label: 'Projects Delivered' },
                { value: '50+',  label: 'Global Clients'     },
                { value: '95%',  label: 'Client Satisfaction'},
              ].map((s) => (
                <div key={s.label} className="home-hero__stat rounded-4 p-3 text-center">
                  <h3 className="font-bold mb-1">{s.value}</h3>
                  <p className="mb-0 text-sm">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>

      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Team />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
