import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../Services";
import WhyChooseUs from "../WhyChooseUs";
import Portfolio from "../Portfolio";
import Team from "../Team";
import Testimonials from "../Testimonials";
import Contact from "../Contact";

/* ── Two-phase typewriter ── */
const useTwoPhaseTypewriter = (prefix, words, speed = 65, pause = 2400) => {
  const [phase, setPhase]           = useState("prefix");
  const [prefixText, setPrefixText] = useState("");
  const [wordText, setWordText]     = useState("");
  const [wi, setWi]                 = useState(0);

  useEffect(() => {
    let t;
    if (phase === "prefix") {
      if (prefixText.length < prefix.length)
        t = setTimeout(() => setPrefixText(prefix.slice(0, prefixText.length + 1)), speed);
      else t = setTimeout(() => setPhase("word"), 300);
    } else if (phase === "word") {
      const w = words[wi];
      if (wordText.length < w.length)
        t = setTimeout(() => setWordText(w.slice(0, wordText.length + 1)), speed);
      else t = setTimeout(() => setPhase("delword"), pause);
    } else if (phase === "delword") {
      if (wordText.length > 0)
        t = setTimeout(() => setWordText(w => w.slice(0, w.length - 1)), speed / 2);
      else { setWi(i => (i + 1) % words.length); setPhase("word"); }
    }
    return () => clearTimeout(t);
  }, [phase, prefixText, wordText, wi, prefix, words, speed, pause]);

  return { prefixText, wordText };
};

const TYPEPREFIX = "Building technology that turns";
const TYPEWORDS  = ["ideas into products.", "startups into brands.", "ambition into growth.", "vision into reality."];

const TICKER_ITEMS = [
  { icon: "bi-code-slash",       label: "Web Apps",            color: "#61BBC5", link: "/services/web-application-development"    },
  { icon: "bi-phone",            label: "Mobile",              color: "#7eb7ff", link: "/services/mobile-application-development" },
  { icon: "bi-kanban",           label: "ERP",                 color: "#9cf0b9", link: "/services/web-erp-development"            },
  { icon: "bi-plug",             label: "API",                 color: "#f0c96e", link: "/services/api-development"                },
  { icon: "bi-controller",       label: "Games",               color: "#f07eb7", link: "/services/game-development"               },
  { icon: "bi-graph-up-arrow",   label: "SEO",                 color: "#b07ef0", link: "/services/seo-digital-marketing"          },
  { icon: "bi-cart3",            label: "E-Commerce",          color: "#61BBC5", link: "/services/e-commerce-development"         },
  { icon: "bi-people-fill",      label: "CRM",                 color: "#7eb7ff", link: "/services/crm-development"                },
  { icon: "bi-geo-alt-fill",     label: "Field Force",         color: "#9cf0b9", link: "/services/field-force-management"         },
  { icon: "bi-mortarboard-fill", label: "Internship/Training", color: "#f0c96e", link: "/services/internship-training"            },
];

const divider = (
  <div
    className="h-px"
    style={{ background: 'linear-gradient(to right,transparent,rgba(97,187,197,0.25) 20%,rgba(97,187,197,0.25) 80%,transparent)' }}
  />
);

export default function Home() {
  const [entered,  setEntered]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const { prefixText, wordText } = useTwoPhaseTypewriter(TYPEPREFIX, TYPEWORDS);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { const t = setTimeout(() => setEntered(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="font-['Inter','Nunito_Sans',sans-serif]">

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#04121f]">

        {/* video background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ filter: 'saturate(0.9) brightness(0.58)' }}
            autoPlay loop muted playsInline
          >
            <source src="/136268-764387688_medium.mp4" type="video/mp4" />
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom,rgba(4,18,31,0.65) 0%,rgba(4,18,31,0.10) 35%,rgba(4,18,31,0.30) 65%,rgba(4,18,31,0.90) 100%),linear-gradient(to right,rgba(4,18,31,0.75) 0%,rgba(4,18,31,0.15) 55%,transparent 100%)' }}
          />

        </div>

        {/* noise texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }}
        />

        {/* ── hero content ──
             flex-1 so it fills the space above the wave
             pt-28 on mobile (navbar height), pt-40 on desktop */}
        <div
          className={`
            relative z-10 flex-1 flex items-center justify-center w-full
            px-4 sm:px-8 md:px-12 lg:px-20
            pt-28 sm:pt-32 md:pt-36 lg:pt-40
            pb-4 sm:pb-6
            transition-opacity duration-200
            ${entered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="flex flex-col items-center text-center w-full max-w-[860px] mx-auto">

            {/* headline */}
            <div className="mb-6 sm:mb-8 flex flex-col gap-1 sm:gap-1.5 w-full">
              <div className="text-center min-h-[1.15em]">
                <span
                  className="font-['Playfair_Display',Georgia,serif] font-bold text-white tracking-[-0.02em] leading-[1.15] text-[1.5rem] xs:text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.8rem]"
                >
                  {prefixText}
                </span>
                {prefixText.length < TYPEPREFIX.length && (
                  <span
                    className="inline-block text-[#61BBC5] font-[200] leading-none ml-0.5 text-[1.2rem] xs:text-[1.5rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem]"
                    style={{ animation: 'cursorBlink 0.9s step-end infinite', fontFamily: "'Playfair Display',Georgia,serif" }}
                  >|</span>
                )}
              </div>
              {prefixText.length === TYPEPREFIX.length && (
                <div className="text-center">
                  <span
                    className="font-['Playfair_Display',Georgia,serif] font-[900] tracking-[-0.04em] leading-[1.05] text-[1.5rem] xs:text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.8rem]"
                    style={{ background: 'linear-gradient(110deg,#61BBC5 0%,#a8dde4 40%,#ffffff 65%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerSlide 5s linear 0s infinite' }}
                  >
                    {wordText}
                  </span>
                  <span
                    className="inline-block text-[#61BBC5] font-[200] leading-none ml-0.5 text-[1.2rem] xs:text-[1.5rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem]"
                    style={{ animation: 'cursorBlink 0.9s step-end infinite', fontFamily: "'Playfair Display',Georgia,serif", WebkitTextFillColor: '#61BBC5' }}
                  >|</span>
                </div>
              )}
            </div>

            {/* description */}
            <p
              className="text-[0.88rem] sm:text-[0.95rem] md:text-[1rem] leading-[1.75] sm:leading-[1.85] text-[rgba(200,232,240,0.65)] max-w-[520px] mb-6 sm:mb-8 font-['Inter',sans-serif] px-2 sm:px-0"
              style={{ animation: 'heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}
            >
              A passionate team of engineers, designers and strategists building enterprise Web Apps, Mobile Apps, ERP, APIs and growth systems — crafted by our expert team.
            </p>

            {/* CTA buttons — stacked on mobile, row on sm+ */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-7 justify-center w-full px-4 sm:px-0"
              style={{ animation: 'heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s both' }}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[0.88rem] sm:text-[0.95rem] font-bold text-white cursor-pointer relative overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white group w-full sm:w-auto"
                style={{ background: 'linear-gradient(137deg,#61BBC5 0%,#034665 100%)', boxShadow: '0 8px 28px rgba(97,187,197,0.4)', letterSpacing: '0.02em' }}
              >
                <span className="absolute inset-0 bg-white/[0.18] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                Start Your Project
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 inline-flex items-center justify-center text-[0.8rem] sm:text-[0.85rem] transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0">
                  <i className="bi bi-arrow-right" />
                </span>
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[0.88rem] sm:text-[0.95rem] font-bold text-[#e8f7fa] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:text-white w-full sm:w-auto"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.30)', backdropFilter: 'blur(12px)' }}
              >
                <i className="bi bi-play-circle-fill" /> Explore Services
              </a>
            </div>

          </div>
        </div>

        {/* floating chips — hidden on mobile, show lg+ */}
        {[
          { cls: 'top-[45%] left-[5%]',  anim: 'roamA 14s ease-in-out 0.5s infinite',  icon: 'bi-lightning-charge-fill', label: 'Fast Delivery'    },
          { cls: 'top-[35%] right-[6%]', anim: 'roamB 17s ease-in-out 1.5s infinite', icon: 'bi-shield-check',          label: 'Secure & Scalable' },
          { cls: 'top-[62%] right-[8%]', anim: 'roamC 12s ease-in-out 0.8s infinite', icon: 'bi-code-slash',            label: 'Clean Code'        },
        ].map((chip, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`absolute z-[8] hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.82rem] font-bold tracking-[0.04em] text-[#c8e8f0] pointer-events-none whitespace-nowrap ${chip.cls}`}
            style={{ backdropFilter: 'blur(14px)', border: '1px solid rgba(97,187,197,0.30)', background: 'rgba(4,18,31,0.55)', boxShadow: '0 4px 20px rgba(0,0,0,0.3),0 0 0 1px rgba(97,187,197,0.08)', animation: chip.anim }}
          >
            <i className={`bi ${chip.icon} text-[#61BBC5] text-[1rem]`} /> {chip.label}
          </div>
        ))}

        {/* wave to white */}
        <div className="relative z-[11] leading-none flex-shrink-0" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-10 sm:h-14 block">
            <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" />
          </svg>
        </div>
      </section>

      {/* ── below-hero sections ── */}
      <div className="bg-white">

        {/* services ticker */}
        <div className="w-full bg-white border-t border-b border-[rgba(97,187,197,0.20)] relative overflow-hidden">
          <div className="overflow-hidden w-full py-1.5 sm:py-2 relative">
            {/* fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,#ffffff,transparent)' }} />
            <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,#ffffff,transparent)' }} />
            <div
              className="flex items-center w-max"
              style={{ animation: 'tickerScroll 30s linear infinite', animationPlayState: hovering ? 'paused' : 'running' }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(s.link)}
                  className="inline-flex flex-row items-center gap-[6px] sm:gap-[7px] px-5 sm:px-9 cursor-pointer bg-transparent border-0 outline-none transition-transform duration-200 hover:-translate-y-0.5 group"
                >
                  <i className="text-[0.85rem] sm:text-[1rem] text-[#61BBC5] transition-all duration-200 group-hover:scale-[1.15]" style={{ fontFamily: 'bootstrap-icons', display: 'inline-block' }}>
                    <i className={`bi ${s.icon}`} />
                  </i>
                  <span className="text-[0.65rem] sm:text-[0.75rem] font-extrabold tracking-[0.1em] uppercase text-[#4a6a7a] whitespace-nowrap transition-colors duration-200 group-hover:text-[#034665]">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Services />
        {divider}
        <WhyChooseUs />
        {divider}
        <Portfolio />
        {divider}
        <Team />
        {divider}
        <Testimonials />
        {divider}
        <Contact />
      </div>

      <style>{`
        @keyframes shimmerSlide { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>
    </div>
  );
}
