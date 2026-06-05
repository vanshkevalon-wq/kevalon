import React from "react";
import { Link } from "react-router-dom";
import "./ApiDevelopmentPage.css";

import aboutImage from "../Images/game-dev-user.jpg.jpg";

const introParagraphs = [
  "API (Application Programming Interface) development is the process of creating interfaces that allow different software applications to communicate with each other. APIs enable seamless data exchange, integration, and functionality between systems, making them essential for modern web and mobile applications.",
  "At Kevalon Technology, we specialize in developing secure, scalable, and high-performance APIs that power your applications. Our expert developers create robust API solutions using the latest technologies and best practices to ensure reliability, security, and optimal performance.",
];

const restfulBulletsLeft = [
  "Standard HTTP methods (GET, POST, PUT, PATCH, DELETE)",
  "JSON-based structured data exchange",
  "Stateless and scalable system architecture",
  "Clean, consistent and intuitive endpoint design",
  "Version control and backward compatibility",
];

const restfulBulletsRight = [
  "Enterprise-level authentication & authorization (JWT, OAuth2, API Keys)",
  "Secure data transmission with encryption (HTTPS, TLS)",
  "Comprehensive API documentation (Swagger, OpenAPI)",
  "High-performance caching & optimization",
  "Monitoring, logging & analytics integration",
];

const graphqlBulletsLeft = [
  "Flexible and precise data querying",
  "Single unified endpoint architecture",
  "Reduced network overhead and optimized payloads",
  "Strong typing with schema-driven development",
  "Built-in introspection and developer tooling",
];

const graphqlBulletsRight = [
  "Real-time subscriptions and live data updates",
  "Microservices and distributed systems support",
  "Enterprise authentication & authorization",
  "Performance optimization and caching layers",
  "Secure API gateway integration",
];

const securityBulletsLeft = [
  "JWT (JSON Web Tokens) authentication",
  "OAuth 2.0 / OAuth 1.0 secure authorization",
  "API key management & access control",
  "Role-based access control (RBAC)",
  "Secure session and token life-cycle management",
];

const securityBulletsRight = [
  "Rate limiting, throttling & abuse prevention",
  "HTTPS / SSL / TLS encryption",
  "Input validation, sanitization & data protection",
  "API firewall & gateway security layers",
  "Logging, monitoring & threat detection",
];

const featureBulletsLeft = [
  "RESTful and GraphQL API development",
  "Comprehensive API documentation (Swagger / OpenAPI)",
  "API versioning and migration strategies",
  "Microservices and modular architecture support",
  "Real-time data synchronization and streaming",
];

const featureBulletsRight = [
  "Secure third-party API integrations",
  "Webhook architecture and event-driven systems",
  "API testing, monitoring, and analytics",
  "Performance optimization, caching, and load balancing",
  "Centralized error handling, logging, and observability",
];

const serviceList = [
  {
    title: "Custom API Development",
    desc: "Business-specific, scalable, secure APIs tailored to enterprise workflows and digital platforms.",
  },
  {
    title: "API Integration",
    desc: "Seamless integration with web apps, mobile apps, cloud platforms, IoT systems, and third-party services.",
  },
  {
    title: "Secure API Architecture",
    desc: "Authentication, authorization, encryption, and access control built for enterprise-grade security layers.",
  },
  {
    title: "API Documentation",
    desc: "Developer-friendly documentation for easy onboarding, integration, and long-term maintainability.",
  },
  {
    title: "API Testing & Monitoring",
    desc: "Performance testing, load testing, monitoring, and real-time performance analytics.",
  },
  {
    title: "Microservices & Cloud APIs",
    desc: "Cloud-native, microservices-based APIs for high scalability and enterprise deployment.",
  },
];

const apiPills = ["REST APIs", "GraphQL", "Microservices", "Secure integrations"];

const heroFeatureCards = [
  {
    value: "99.9%",
    label: "reliability focus",
    note: "Built for uptime, monitoring, and scale",
  },
  {
    value: "Secure",
    label: "by default",
    note: "Authentication, access control, and encryption baked in",
  },
  {
    value: "Fast",
    label: "delivery cycles",
    note: "Modern APIs delivered with clean contracts and speed",
  },
];

const apiStats = [
  { value: "24/7", label: "availability mindset", note: "Always-on systems and support flows" },
  { value: "99.9%", label: "reliability focus", note: "Built for stability, monitoring, and scale" },
  { value: "Fast", label: "delivery cycles", note: "Modern APIs shipped with clear contracts" },
];

const apiHighlights = [
  {
    title: "Clean architecture",
    text: "Readable endpoints, predictable contracts, and maintainable service boundaries.",
  },
  {
    title: "Production ready",
    text: "Security, monitoring, and performance considerations built into the delivery flow.",
  },
  {
    title: "Business aligned",
    text: "API designs that support operations, integrations, and long-term product growth.",
  },
];

const tools = [
  { name: "Node.js", kind: "node" },
  { name: "GraphQL", kind: "graphql" },
  { name: "PostgreSQL", kind: "postgres" },
  { name: "MongoDB", kind: "mongodb" },
  { name: "Redis", kind: "redis" },
  { name: "Swagger", kind: "swagger" },
  { name: "Postman", kind: "postman" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
  { name: "Express.js", kind: "express" },
];

function ToolIcon({ kind, label }) {
  switch (kind) {
    case "node":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 7 50 17v20L32 57 14 37V17z" fill="#4f9d45" />
          <path d="M24 24h5v16h-5zM31 24h5l4 9v-9h5v16h-5l-4-9v9h-5z" fill="#fff" />
        </svg>
      );
    case "graphql":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <g fill="none" stroke="#e535ab" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 22 32 12l16 10-3 20-13 10-13-10z" />
            <path d="M16 22h32" />
            <path d="M23 19 32 52" />
            <path d="M41 19 32 52" />
            <path d="M13 25 32 12 51 25" />
          </g>
          <circle cx="32" cy="12" r="2.6" fill="#e535ab" />
          <circle cx="32" cy="52" r="2.6" fill="#e535ab" />
          <circle cx="16" cy="22" r="2.6" fill="#e535ab" />
          <circle cx="48" cy="22" r="2.6" fill="#e535ab" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M41 9c8 0 14 6 14 14 0 7-3 13-8 17l2 8-8-4c-3 1-6 2-9 2-11 0-20-8-20-19S22 9 32 9c3 0 6 1 9 2 0 0 0 0 0-2z" fill="#336791" />
          <path d="M24 24c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9z" fill="#fff" opacity="0.92" />
          <path d="M32 18c-3 2-4 4-4 7 0 4 3 7 7 7 1 0 2 0 3-1-3-1-5-4-5-7 0-2 0-4-1-6z" fill="#336791" opacity="0.8" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 6c7 8 12 16 12 25 0 13-5 19-12 27-7-8-12-14-12-27 0-9 5-17 12-25z" fill="#6cac48" />
          <path d="M32 18v28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M29 32c3-3 4-6 3-10 4 5 4 10 0 16-1-3-2-4-3-6z" fill="#fff" opacity="0.9" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 18 31 10l21 8-21 8-19-8z" fill="#dc382d" />
          <path d="m12 26 19 8 21-8v18l-21 8-19-8z" fill="#c92b23" />
          <path d="m12 18 19 8v18l-19-8z" fill="#ef4b3f" />
          <path d="m31 26 21-8v18l-21 8z" fill="#f05d50" />
        </svg>
      );
    case "swagger":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 8 48 16v18L32 56 16 34V16z" fill="#85ea2d" />
          <path d="M24 28c3-4 13-5 17-1 3 3 3 7-1 10-3 3-8 4-11 6-4 2-6 5-2 8 4 3 12 2 15-1" fill="none" stroke="#fff" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="#ff6c37" />
          <path d="M25 39 39 25l4 14-14 4z" fill="#fff" opacity="0.95" />
          <path d="M29 20c5-1 10 1 13 5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <text x="32" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#232f3e" fontFamily="Arial, sans-serif">aws</text>
          <path d="M16 42c11-8 23-8 32-4" fill="none" stroke="#ff9900" strokeWidth="3" strokeLinecap="round" />
          <path d="M41 42c2 1 5 2 7 2 2 0 4-1 5-2" fill="none" stroke="#ff9900" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 30h8v-7h8v7h8v-7h8v7c4 0 8 2 10 5-1 5-4 11-10 15H20c-4 0-8-2-10-5 0-7 2-11 4-15z" fill="#2496ed" />
          <path d="M13 36c3 3 7 4 12 4h21c4 0 6-1 8-2-1 5-4 9-8 12H20c-4 0-8-2-10-5 0-4 1-7 3-9z" fill="#0d77c7" />
          <rect x="18" y="26" width="6" height="4" rx="1" fill="#fff" />
          <rect x="27" y="26" width="6" height="4" rx="1" fill="#fff" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="10" y="10" width="44" height="44" rx="4" fill="#111111" />
          <path d="M18 24h28M18 32h28M18 40h28" stroke="#fff" strokeWidth="2.7" strokeLinecap="round" opacity="0.86" />
          <path d="M22 18h20" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.72" />
          <path d="M24 46h16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.72" />
        </svg>
      );
    default:
      return <span>{label}</span>;
  }
}

function BulletList({ items }) {
  return (
    <ul className="api-bullets">
      {items.map((item) => (
        <li key={item}>
          <i className="bi bi-check-lg" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ApiDevelopmentPage() {
  return (
    <div className="api-page">
      <section className="api-hero">
        {/* White theme decorations */}
        <div className="api-hero__orb api-hero__orb--1" aria-hidden="true" />
        <div className="api-hero__orb api-hero__orb--2" aria-hidden="true" />
        <div className="api-hero__beam" aria-hidden="true" />

        {/* Animated circuit SVG */}
        <svg className="api-hero__circuits" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
          <path className="api-hero__cl api-hero__cl--1" stroke="rgba(97,187,197,0.15)"
            d="M 0,80 L 100,80 L 100,140 L 240,140 L 240,80 L 420,80" />
          <path className="api-hero__cl api-hero__cl--2" stroke="rgba(10,143,182,0.10)"
            d="M 1440,600 L 1320,600 L 1320,540 L 1140,540 L 1140,600 L 980,600" />
          <path className="api-hero__cl api-hero__cl--3" stroke="rgba(97,187,197,0.12)"
            d="M 60,640 L 60,560 L 200,560 L 200,500 L 380,500" />
          <circle className="api-hero__junc api-hero__junc--a" cx="100" cy="80" r="4" fill="rgba(97,187,197,0.7)" />
          <circle className="api-hero__junc api-hero__junc--b" cx="240" cy="140" r="4" fill="rgba(97,187,197,0.7)" />
          <circle className="api-hero__junc api-hero__junc--c" cx="1320" cy="540" r="4" fill="rgba(10,143,182,0.7)" />
        </svg>

        <div className="api-hero__inner">
          <div className="api-hero__layout">
            <div className="api-hero__copy">
              <p className="api-hero__eyebrow">API Development</p>
              <div className="api-hero__badge">
                <div className="api-hero__badge-dot" />
                Modern API engineering
              </div>
              <h1>API <span className="api-hero__title-accent">Development</span></h1>
              <p className="api-hero__subtitle">
                Secure, scalable, and high-performance APIs that connect systems, integrate platforms, and power modern digital ecosystems.
              </p>

              <div className="api-hero__pills" aria-label="API focus areas">
                {apiPills.map((pill) => <span key={pill}>{pill}</span>)}
              </div>

              <div className="api-hero__actions">
                <Link to="/contact" className="api-btn api-btn--primary">
                  Start a Project <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to="/services" className="api-btn api-btn--ghost">
                  Explore Services
                </Link>
              </div>

              <div className="api-hero__metrics" aria-label="API delivery highlights">
                {heroFeatureCards.map((card) => (
                  <article key={card.label} className="api-hero__metric-card">
                    <strong>{card.value}</strong>
                    <span>{card.label}</span>
                    <p>{card.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="api-hero__visual" aria-hidden="true">
              <div className="api-hero__orbit api-hero__orbit--one" />
              <div className="api-hero__orbit api-hero__orbit--two" />

              <div className="api-hero__panel">
                <div className="api-hero__panel-head">
                  <span className="api-hero__panel-label">API Stack</span>
                  <strong>Enterprise-ready architecture</strong>
                </div>

                <div className="api-hero__diagram">
                  <div className="api-hero__node api-hero__node--primary">API</div>
                  <div className="api-hero__node api-hero__node--accent">Auth</div>
                  <div className="api-hero__node api-hero__node--accent">Data</div>
                  <div className="api-hero__node api-hero__node--accent">Cloud</div>
                  <div className="api-hero__connector api-hero__connector--one" />
                  <div className="api-hero__connector api-hero__connector--two" />
                  <div className="api-hero__connector api-hero__connector--three" />
                </div>

                <div className="api-hero__stack-list">
                  <span>REST</span>
                  <span>GraphQL</span>
                  <span>Microservices</span>
                  <span>Secure Integrations</span>
                </div>
              </div>
            </div>{/* end api-hero__visual */}
          </div>{/* end api-hero__layout */}
        </div>{/* end api-hero__inner */}
      </section>

      <section className="api-content api-content--intro">
        <div className="api-container">
          <div className="api-intro">
            <div className="api-intro__copy api-card api-card--intro">
              <p className="api-kicker">Enterprise API Design</p>
              <div className="api-section-title api-section-title--left">
                <h2>API Development</h2>
                <h3>With Kevalon Technology</h3>
              </div>

              <p className="api-intro__lede">
                We design APIs that look polished, integrate smoothly, and stay dependable as your
                platform grows.
              </p>

              <div className="api-pill-row" aria-label="API focus areas">
                {apiPills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>

              <div className="api-intro__stats" aria-label="API delivery highlights">
                {apiStats.map((stat) => (
                  <article key={stat.label} className="api-intro__stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <p>{stat.note}</p>
                  </article>
                ))}
              </div>

              <div className="api-intro__body">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="api-intro__actions">
                <Link to="/contact" className="api-btn api-btn--primary">
                  Start a Project
                </Link>
                <Link to="/services" className="api-btn api-btn--ghost">
                  Explore Services
                </Link>
              </div>
            </div>

            <aside className="api-intro__visual api-card api-card--visual">
              <div className="api-visual__glow" aria-hidden="true" />
              <div className="api-visual__badge">
                <span>Modern API Stack</span>
                <strong>Secure by design</strong>
              </div>
              <div className="api-visual__frame">
                <img src={aboutImage} alt="API development team planning a solution" />
              </div>

              <div className="api-visual__chips" aria-hidden="true">
                <span>REST</span>
                <span>GraphQL</span>
                <span>Auth</span>
              </div>

              <div className="api-visual__highlights">
                {apiHighlights.map((highlight) => (
                  <article key={highlight.title} className="api-visual__highlight">
                    <strong>{highlight.title}</strong>
                    <p>{highlight.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="api-content">
        <div className="api-container">
          <div className="api-grid api-grid--two">
            <article className="api-card api-card--soft">
              <h4>RESTful API Development</h4>
              <p>
                At Kevalon Technology, we build enterprise-grade RESTful APIs that serve as the
                foundation of modern digital platforms. REST (Representational State Transfer)
                APIs enable seamless communication between systems using standardized HTTP
                protocols, making them highly scalable, reliable, and platform-independent.
              </p>
              <p>
                Our REST APIs are designed with a strong focus on performance, security,
                scalability, and long-term maintainability. We follow industry best practices to
                ensure clean architecture, intuitive endpoints, and developer-friendly integration
                across web, mobile, cloud, and enterprise systems.
              </p>

              <div className="api-bullet-columns">
                <BulletList items={restfulBulletsLeft} />
                <BulletList items={restfulBulletsRight} />
              </div>
            </article>

            <article className="api-card api-card--image">
              <h4>About API Development</h4>
              <p>
                At Kevalon Technology, we specialize in building secure, scalable, and high-
                performance APIs that act as the backbone of modern digital systems. Our APIs
                enable seamless communication between web applications, mobile apps, cloud
                platforms, IoT systems, and third-party services.
              </p>
              <p>
                We design APIs using industry-standard architectures such as RESTful APIs,
                GraphQL, and microservices-based systems, ensuring reliability, speed, and
                long-term scalability for growing businesses.
              </p>
            </article>
          </div>

          <div className="api-grid api-grid--two api-grid--stacked">
            <article className="api-card api-card--white">
              <h4>GraphQL API Development</h4>
              <p>
                At Kevalon Technology, we design and develop high-performance GraphQL APIs that
                provide a modern, flexible, and efficient data layer for digital platforms.
                GraphQL enables clients to fetch exactly the data they need in a single request,
                eliminating over-fetching and under-fetching while optimizing performance.
              </p>
              <p>
                Our GraphQL architectures are built for scalability, real-time performance,
                enterprise security, and system interoperability, making them ideal for complex
                applications, microservices ecosystems, and large-scale platforms.
              </p>

              <div className="api-bullet-columns">
                <BulletList items={graphqlBulletsLeft} />
                <BulletList items={graphqlBulletsRight} />
              </div>
            </article>

            <article className="api-card api-card--service">
              <h4>Our API Services</h4>
              <div className="api-services-list">
                {serviceList.map((service) => (
                  <div key={service.title} className="api-service-item">
                    <i className="bi bi-check-lg" aria-hidden="true" />
                    <div>
                      <strong>{service.title}</strong>
                      <p>{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="api-grid api-grid--two api-grid--features">
            <article className="api-card api-card--soft">
              <h4>API Security & Authentication</h4>
              <p>
                At Kevalon Technology, security is not an add-on - it is built into the
                foundation of every API we develop. We implement enterprise-grade security
                architectures to protect digital platforms, sensitive data, and system
                integrations from modern cyber threats.
              </p>
              <p>
                Our security frameworks ensure secure access control, data confidentiality,
                compliance readiness, and operational reliability across all API environments -
                cloud, enterprise, and distributed systems.
              </p>

              <div className="api-bullet-columns">
                <BulletList items={securityBulletsLeft} />
                <BulletList items={securityBulletsRight} />
              </div>
            </article>

            <article className="api-card api-card--feature-list">
              <h4>Key Features & Capabilities</h4>
              <p>
                At Kevalon Technology, our API solutions are engineered to deliver performance,
                security, scalability, and business agility. We build enterprise-grade systems
                that empower organizations to scale operations, integrate platforms, and
                accelerate digital transformation.
              </p>

              <div className="api-bullet-columns api-bullet-columns--features">
                <BulletList items={featureBulletsLeft} />
                <BulletList items={featureBulletsRight} />
              </div>
            </article>
          </div>

          <div className="api-tools">
            <div className="api-section-title api-section-title--tools">
              <h2>Tools &amp; Platforms</h2>
              <p>
                We use industry-leading, enterprise-grade technologies to build secure, scalable,
                high-performance APIs and digital platforms for modern businesses.
              </p>
            </div>

            <div className="api-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="api-tool-card">
                  <div className="api-tool-card__icon">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}