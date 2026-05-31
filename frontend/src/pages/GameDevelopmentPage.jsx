import React from "react";
import { Link } from "react-router-dom";
import "./GameDevelopmentPage.css";

import heroMeetImage from "../Images/a56b665d0645c5d0a1447ad8550a1be71e46c184.jpg";
import aboutMeetImage from "../Images/game-dev-user.jpg.jpg";

const gameSections = [
  {
    title: "2D Game Development",
    icon: "bi-controller",
    desc: "Create engaging 2D games for mobile, web, and desktop platforms with strong gameplay loops and polished visuals.",
    bullets: [
      "Sprite-based 2D graphics",
      "2D animation and physics",
      "Tile-based level design",
      "Puzzle and arcade games",
      "Platformer game mechanics",
      "Casual mobile games",
    ],
  },
  {
    title: "About Game Development",
    icon: "bi-people-fill",
    desc: "At Kevalon Technology, we create high-quality immersive games using modern game engines, strong UI/UX, and production-ready workflows.",
    bullets: [
      "Game idea planning and prototyping",
      "Game design and level balancing",
      "Performance tuning and optimization",
      "Publishing support and testing",
    ],
  },
  {
    title: "Mobile Game Development",
    icon: "bi-phone",
    desc: "Develop mobile games for iOS and Android with responsive controls, efficient memory usage, and smooth cross-device performance.",
    bullets: [
      "iOS and Android game builds",
      "Touch controls and gestures",
      "Mobile-optimized graphics",
      "In-app purchase integration",
      "Push notification support",
      "Social sharing integration",
    ],
  },
  {
    title: "3D Game Development",
    icon: "bi-cpu-fill",
    desc: "Build immersive 3D games with realistic graphics, advanced physics, and dynamic environments for modern players.",
    bullets: [
      "3D modeling and animation",
      "Real-time rendering",
      "Physics simulation",
      "Action and adventure games",
      "Racing games",
      "Simulation games",
    ],
  },
  {
    title: "Game Types We Develop",
    icon: "bi-grid-3x3-gap-fill",
    bullets: [
      "Casual Games",
      "Puzzle Games",
      "RPG Games",
      "Racing Games",
      "Simulation Games",
      "Sports Games",
      "Arcade Games",
      "Metaverse Games",
    ],
  },
  {
    title: "Game Design & Art",
    icon: "bi-palette2",
    desc: "Comprehensive game design services including concept art, character design, environment art, and UI/UX for games.",
    bullets: [
      "Game concept and storyboarding",
      "Character design and animation",
      "Level design and environment art",
      "UI/UX design for games",
      "Sound design and music",
      "Game testing and QA",
    ],
  },
  {
    title: "Multiplayer Games",
    icon: "bi-people",
    desc: "Create multiplayer games that connect players worldwide with real-time gameplay, matchmaking, and social features.",
    bullets: [
      "Real-time multiplayer gameplay",
      "Matchmaking and lobbies",
      "Leaderboards and rankings",
      "Chat and social features",
      "Server infrastructure",
      "Anti-cheat systems",
    ],
  },
  {
    title: "Game Development Features",
    icon: "bi-stars",
    bullets: [
      "2D & 3D Game Development",
      "Mobile Game Development (Android & iOS platforms)",
      "Multiplayer & Online Gaming",
      "Professional Game Design UI/UX",
      "Unity & Unreal Engine Development",
      "Cross-Platform Games",
      "Cloud-Based Gaming Support",
      "Game Optimization & Performance Tuning",
    ],
  },
];

const tools = [
  { name: "Unity", kind: "unity" },
  { name: "Unreal Engine", kind: "unreal" },
  { name: "C++", kind: "cplusplus" },
  { name: "C#", kind: "csharp" },
  { name: "JavaScript", kind: "javascript" },
  { name: "Android", kind: "android" },
  { name: "iOS", kind: "ios" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
  { name: "Custom Engines", kind: "custom" },
];

function ToolIcon({ kind, label }) {
  switch (kind) {
    case "unity":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.4 4.8 7.5v8.9L12 20.6l7.2-4.2V7.5L12 3.4Zm0 2.4 5 2.9v5.8l-5 2.9-5-2.9V8.7l5-2.9Z" fill="currentColor" />
          <path d="M10.2 8.1h3.6L12 12.1 10.2 8.1Zm0 7.8h3.6L12 11.9l-1.8 4Z" fill="#fff" opacity="0.95" />
        </svg>
      );
    case "unreal":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#111827" />
          <path d="M7.4 8.5h3.3v7H8.8v-4.8l-1.4 1V8.5Zm5.7 0h3.5v1.7h-1.3v5.3h-2.2v-5.3h-1.4V8.5Z" fill="#fff" />
        </svg>
      );
    case "cplusplus":
      return <span className="gdp-tool-fallback">C++</span>;
    case "csharp":
      return <span className="gdp-tool-fallback">C#</span>;
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#f7df1e" />
          <path d="M10.3 16.5c.4.8 1 1.2 2 1.2.8 0 1.4-.4 1.4-1.1 0-.8-.5-1-1.6-1.5l-.6-.2c-1.6-.8-2.5-1.6-2.5-3.5 0-1.8 1.3-3 3.3-3 1.5 0 2.5.5 3.2 1.8l-1.7 1c-.3-.6-.7-.9-1.4-.9-.7 0-1.1.4-1.1 1 0 .7.4 1 1.2 1.4l.6.3c1.8.8 2.7 1.7 2.7 3.7 0 2-1.6 3.2-3.8 3.2-2.1 0-3.4-1-4.1-2.3l1.5-1.1Z" fill="#1f2937" />
        </svg>
      );
    case "android":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.7 7.1 6.5 5.1M16.3 7.1l1.2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 8.2c0-1.6 1.8-2.8 4-2.8s4 1.2 4 2.8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="6.1" y="8.6" width="11.8" height="9.2" rx="2.2" fill="currentColor" />
          <circle cx="10" cy="12" r="0.7" fill="#fff" />
          <circle cx="14" cy="12" r="0.7" fill="#fff" />
          <path d="M10 15.4h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "ios":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.9 3.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.8-2.6.6-.8 1.5-1.3 2.5-1.4.2 1-.2 1.9-.9 2.9Z" fill="currentColor" />
          <path d="M19.1 14.8c-.5 1.2-.8 1.8-1.5 2.8-1 .8-1.8 1.7-3.2 1.7-1.1 0-1.5-.6-2.8-.6s-1.7.6-2.9.6c-1.4 0-2.4-1-3.3-2-2.2-2.8-2.5-8.4-.6-11 1-1.4 2.6-2.3 4.2-2.3 1.2 0 2.3.8 2.9.8.7 0 2-.9 3.5-.8.6 0 2.4.2 3.5 1.8-.1.1-2.1 1.2-2.1 4 0 3.3 2.8 4.5 2.3 7Z" fill="currentColor" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.8 14.6c2.5-1.6 5.4-2.5 8.7-2.5 2.1 0 4 .3 5.8.8" fill="none" stroke="#232f3e" strokeWidth="2" strokeLinecap="round" />
          <path d="M16.7 16.9c.7.4 1.4.6 2.3.6.7 0 1.4-.2 1.8-.5" fill="none" stroke="#ff9900" strokeWidth="1.7" strokeLinecap="round" />
          <text x="4.3" y="12.5" fill="#232f3e" fontSize="7.6" fontWeight="700" fontFamily="Arial, sans-serif">aws</text>
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.4 13.2h2.3v-2.1H4.4v2.1Zm2.5 0h2.3v-2.1H6.9v2.1Zm2.5 0h2.3v-2.1H9.4v2.1Zm2.5 0h2.3v-2.1h-2.3v2.1Zm2.5 0h2.3v-2.1h-2.3v2.1Z" fill="#2496ed" />
          <path d="M8.2 7.2h5.3l2 1.9v2.2h-7.3V7.2Z" fill="#2496ed" opacity="0.9" />
          <path d="M4.8 13.5c0 2.8 1.8 4.8 5.8 4.8 4.4 0 7.2-2.4 7.2-5.8 0-.4 0-.8-.1-1-1.7 0-2.9-.5-3.8-1.3-.8-.8-1.2-1.8-1.2-3H8.4c-.1 1.3-.7 2.2-1.7 2.8-.8.5-1.8.8-2.9.8H4c.3.7.5 1.5.8 2.1Z" fill="#2496ed" opacity="0.96" />
        </svg>
      );
    default:
      return <span className="gdp-tool-fallback">{label}</span>;
  }
}

export default function GameDevelopmentPage() {
  return (
    <div className="gdp-page">
      <section className="gdp-hero">
        <div className="gdp-hero__layout">
          <div className="gdp-hero__copy">
            <div className="gdp-hero__breadcrumb">
              <Link to="/">Home</Link>
              <i className="bi bi-chevron-right" />
              <Link to="/services">Services</Link>
              <i className="bi bi-chevron-right" />
              <span>Game Development</span>
            </div>

            <div className="gdp-hero__badge">
              <span />
              Game Development
            </div>

            <h1>Know More About Game Development</h1>
            <p>
              Create engaging and immersive games that captivate players and drive success.
            </p>

            <div className="gdp-hero__actions">
              <Link to="/contact" className="gdp-btn gdp-btn--primary">
                Get Started
              </Link>
              <Link to="/portfolio" className="gdp-btn gdp-btn--ghost">
                View Work
              </Link>
            </div>

            <div className="gdp-hero__stats" aria-hidden="true">
              <div>
                <strong>2D + 3D</strong>
                <span>Game builds</span>
              </div>
              <div>
                <strong>Unity</strong>
                <span>& Unreal workflow</span>
              </div>
              <div>
                <strong>Mobile</strong>
                <span>Web & desktop</span>
              </div>
            </div>
          </div>

          <div className="gdp-hero__visual" aria-hidden="true">
            <div className="gdp-hero__visual-frame">
              <img src={heroMeetImage} alt="Game development team" />
            </div>
            <div className="gdp-hero__visual-card">
              <span>Production Ready</span>
              <strong>Unity, Unreal, Mobile and Web</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="gdp-content">
        <div className="gdp-container">
          <header className="gdp-section-head">
            <h2>Game Development</h2>
            <p>With Kevalon Technology</p>
          </header>

          <div className="gdp-intro">
            <div className="gdp-intro__copy">
              <p>
                Game development is the process of creating video games for mobile, web,
                desktop, and console platforms. It includes game design, programming, art
                creation, sound design, and testing to create engaging and immersive gaming
                experiences.
              </p>
              <p>
                At Kevalon Technology, we develop custom games that captivate players and
                drive engagement. Our game development team creates 2D and 3D games for
                multiple platforms using industry-leading game engines and modern
                technologies.
              </p>
            </div>

            <div className="gdp-intro__image-wrap">
              <div className="gdp-intro__blob" aria-hidden="true" />
              <img src={aboutMeetImage} alt="Game development team planning" />
            </div>
          </div>

          <div className="gdp-grid">
            {gameSections.map((section) => (
              <article key={section.title} className={`gdp-card ${section.image ? "gdp-card--image" : ""}`}>
                <div className="gdp-card__title-row">
                  <i className={`bi ${section.icon}`} aria-hidden="true" />
                  <h3>{section.title}</h3>
                </div>

                {section.image ? (
                  <>
                    <img className="gdp-card__image" src={section.image} alt={section.title} />
                    <p>{section.desc}</p>
                  </>
                ) : (
                  <>
                    {section.desc ? <p>{section.desc}</p> : null}
                    <ul className={section.title === "Game Types We Develop" || section.title === "Game Development Features" ? "gdp-card__list gdp-card__list--two-col" : "gdp-card__list"}>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ))}
          </div>

          <section className="gdp-tools">
            <div className="gdp-tools__head">
              <h2>Tools & Platforms</h2>
            </div>

            <div className="gdp-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="gdp-tool-card">
                  <div className="gdp-tool-card__icon" aria-hidden="true">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="gdp-cta">
            <h2>Ready to Build Your Game?</h2>
            <p>
              We can help you plan, design, develop, test, and launch a game that fits your
              audience and platform goals.
            </p>
            <Link to="/contact" className="gdp-btn gdp-btn--primary">
              Get in Touch
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}