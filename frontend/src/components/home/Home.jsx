import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../Services";
import WhyChooseUs from "../WhyChooseUs";
import Portfolio from "../Portfolio";
import Team from "../Team";
import Testimonials from "../Testimonials";
import Contact from "../Contact";
import "./Home.css";

/* ── Two-phase Typewriter ── */
const useTwoPhaseTypewriter = (prefix, words, speed = 65, pause = 2400) => {
  const [phase, setPhase]       = useState("prefix");   // "prefix" | "word" | "delword" | "pause"
  const [prefixText, setPrefixText] = useState("");
  const [wordText, setWordText]   = useState("");
  const [wi, setWi]             = useState(0);

  useEffect(() => {
    let t;
    if (phase === "prefix") {
      if (prefixText.length < prefix.length) {
        t = setTimeout(() => setPrefixText(prefix.slice(0, prefixText.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase("word"), 300);
      }
    } else if (phase === "word") {
      const w = words[wi];
      if (wordText.length < w.length) {
        t = setTimeout(() => setWordText(w.slice(0, wordText.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase("delword"), pause);
      }
    } else if (phase === "delword") {
      if (wordText.length > 0) {
        t = setTimeout(() => setWordText(w => w.slice(0, w.length - 1)), speed / 2);
      } else {
        setWi(i => (i + 1) % words.length);
        setPhase("word");
      }
    }
    return () => clearTimeout(t);
  }, [phase, prefixText, wordText, wi, prefix, words, speed, pause]);

  return { prefixText, wordText };
};

const TYPEPREFIX = "Building technology that turns";
const TYPEWORDS = [
  "ideas into products.",
  "startups into brands.",
  "ambition into growth.",
  "vision into reality.",
];


const SERVICES = [
  { icon: "bi-code-slash",      label: "Web Apps",           color: "#61BBC5", link: "/services/web-application-development" },
  { icon: "bi-phone",           label: "Mobile",             color: "#7eb7ff", link: "/services/mobile-application-development" },
  { icon: "bi-kanban",          label: "ERP",                color: "#9cf0b9", link: "/services/web-erp-development" },
  { icon: "bi-plug",            label: "API",                color: "#f0c96e", link: "/services/api-development" },
  { icon: "bi-controller",      label: "Games",              color: "#f07eb7", link: "/services/game-development" },
  { icon: "bi-graph-up-arrow",  label: "SEO",                color: "#b07ef0", link: "/services/seo-digital-marketing" },
  { icon: "bi-cart3",           label: "E-Commerce",         color: "#61BBC5", link: "/services/e-commerce-development" },
  { icon: "bi-people-fill",     label: "CRM",                color: "#7eb7ff", link: "/services/crm-development" },
  { icon: "bi-geo-alt-fill",    label: "Field Force",        color: "#9cf0b9", link: "/services/field-force-management" },
  { icon: "bi-mortarboard-fill",label: "Internship/Training",color: "#f0c96e", link: "/services/internship-training" },
];

export default function Home() {
  const [entered, setEntered]    = useState(false);
  const { prefixText, wordText } = useTwoPhaseTypewriter(TYPEPREFIX, TYPEWORDS);
  const videoRef                 = useRef(null);
  const tickerRef                = useRef(null);
  const [hovering, setHovering]  = useState(false);
  const navigate                 = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-root">

      {/* ══════════════════════════════════════
          HERO — innovative video background
      ══════════════════════════════════════ */}
      <section className="hero">

        {/* VIDEO BACKGROUND */}
        <div className="hero__video-bg" aria-hidden="true">
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/136268-764387688_medium.mp4"
              type="video/mp4"
            />
            {/* fallback */}
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
          <div className="hero__video-overlay" />
          <div className="hero__scanline" aria-hidden="true" />
        </div>

        {/* NOISE TEXTURE */}
        <div className="hero__noise" aria-hidden="true" />

        {/* FLOATING GRID LINES */}
        <div className="hero__grid" aria-hidden="true" />

        {/* MAIN CONTENT */}
        <div className={`hero__content ${entered ? "hero__content--in" : ""}`}>

          {/* ── CENTER COLUMN ── */}
          <div className="hero__left">

            {/* headline with full two-phase typewriter */}
            <div className="hero__headline">
              <div className="hero__typed-row hero__typed-row--pre">
                <span className="hero__typed-pre">{prefixText}</span>
                {prefixText.length < TYPEPREFIX.length && (
                  <span className="hero__cursor">|</span>
                )}
              </div>
              {prefixText.length === TYPEPREFIX.length && (
                <div className="hero__typed-row">
                  <span className="hero__typed-big">{wordText}</span>
                  <span className="hero__cursor">|</span>
                </div>
              )}
            </div>

            {/* desc */}
            <p className="hero__desc">
              A passionate team of engineers, designers and strategists
              building enterprise Web Apps, Mobile Apps, ERP, APIs and
              growth systems — crafted by our expert team.
            </p>

            {/* CTAs */}
            <div className="hero__ctas">
              <a href="/contact" className="hero__cta hero__cta--fill">
                Start Your Project
                <span className="hero__cta-arrow">
                  <i className="bi bi-arrow-right" />
                </span>
              </a>
              <a href="/services" className="hero__cta hero__cta--outline">
                <i className="bi bi-play-circle-fill" />
                Explore Services
              </a>
            </div>

          </div>

        </div>

        {/* ── FREELY FLOATING CHIPS — roam the whole hero ── */}
        <div className="hero__chip hero__chip--a" aria-hidden="true">
          <i className="bi bi-lightning-charge-fill" /> Fast Delivery
        </div>
        <div className="hero__chip hero__chip--b" aria-hidden="true">
          <i className="bi bi-shield-check" /> Secure &amp; Scalable
        </div>
        <div className="hero__chip hero__chip--c" aria-hidden="true">
          <i className="bi bi-code-slash" /> Clean Code
        </div>

        {/* wave to white */}
        <div className="hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" />
          </svg>
        </div>

      </section>

      {/* ── sections below hero use white/light background ── */}
      <div className="below-hero">

        {/* SERVICES TICKER */}
        <div className="services-ticker" ref={tickerRef}>
          <div className="services-ticker__clip">
            <div
              className={`services-ticker__track${hovering ? " services-ticker__track--paused" : ""}`}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {[...SERVICES, ...SERVICES].map((s, i) => (
                <button
                  key={i}
                  className="services-ticker__item"
                  style={{ "--c": s.color }}
                  onClick={() => navigate(s.link)}
                  type="button"
                >
                  <i className={`bi ${s.icon}`} />
                  <span className="services-ticker__label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>


        <div className="services-page">
          <Services />
        </div>
        <div className="sec-divider" />
        <WhyChooseUs />
        <div className="sec-divider" />
        <div className="portfolio-page">
          <Portfolio />
        </div>
        <div className="sec-divider" />
        <Team />
        <div className="sec-divider" />
        <Testimonials />
        <div className="sec-divider" />
        <Contact />
      </div>

    </div>
  );
}
