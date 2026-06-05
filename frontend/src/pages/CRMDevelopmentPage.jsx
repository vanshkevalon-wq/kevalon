import React from "react";
import { Link } from "react-router-dom";
import "./CRMDevelopmentPage.css";

import aboutImage from "../Images/game-dev-user.jpg.jpg";

const crmCards = [
  {
    title: "Lead Management & Intelligent Tracking",
    icon: "bi-person-badge",
    desc: "Our CRM platforms capture, qualify, manage, and nurture leads across the sales lifecycle with intelligent automation and real-time tracking.",
    bullets: [
      "Multi-channel lead capture from web, mobile, campaigns, and integrations",
      "AI-assisted lead scoring, segmentation, and qualification workflows",
      "Automated lead assignment based on rules, territory, and team structure",
      "Complete lead activity tracking with engagement history and touchpoints",
      "Conversion analytics, performance reporting, and sales funnel insights",
    ],
    footnote: "Designed by Kevalon Technology to deliver structured, scalable, and high-conversion lead management systems.",
    tone: "soft",
  },
  {
    title: "Sales Pipeline Management",
    icon: "bi-graph-up-arrow",
    desc: "CRM systems that structure, monitor, and optimize your sales journey from first interaction to successful conversion.",
    bullets: [
      "Customizable pipeline stages aligned with your sales strategy",
      "Real-time deal tracking, forecasting, and revenue projections",
      "Interactive pipeline visualization with performance analytics",
      "Automated stage transitions and workflow orchestration",
      "Sales team performance metrics and productivity dashboards",
    ],
    footnote: "Built by Kevalon Technology to drive predictable revenue, operational transparency, and scalable sales growth.",
    tone: "white",
  },
  {
    title: "Intelligent Workflow Automation",
    icon: "bi-gear-fill",
    desc: "Workflow automation frameworks designed to eliminate repetitive tasks and streamline business processes through smart rules and integrations.",
    bullets: [
      "Automated multi-channel email campaigns and communication flows",
      "Smart task automation, scheduling, and follow-up management",
      "Rule-based workflow orchestration with triggers and conditions",
      "Real-time data synchronization across integrated platforms",
      "Intelligent notifications, alerts, and system monitoring",
    ],
    footnote: "Engineered to deliver scalable, secure, and future-ready automation ecosystems.",
    tone: "soft",
  },
  {
    title: "Reporting & Business Intelligence",
    icon: "bi-bar-chart-line",
    desc: "Analytics platforms that transform raw data into actionable business intelligence with real-time dashboards and performance insights.",
    bullets: [
      "Custom dashboards and executive-level reporting systems",
      "Sales performance analytics with KPI tracking",
      "Customer behavior insights and engagement analysis",
      "Revenue forecasting and predictive analytics",
      "Advanced data visualization, export, and integration tools",
    ],
    footnote: "Powered by Kevalon Technology to deliver intelligent analytics, strategic insights, and measurable impact.",
    tone: "white",
  },
];

const crmCapabilities = [
  "Intelligent lead management with real-time tracking and prioritization",
  "End-to-end sales automation and pipeline optimization",
  "Centralized customer database with secure data governance",
  "Advanced analytics, reporting, and business intelligence dashboards",
  "Secure mobile and cloud access for remote teams",
];

const heroBars = [
  { h: 52, c: "#f0cf42" },
  { h: 79, c: "#f0cf42" },
  { h: 36, c: "#f0cf42" },
  { h: 68, c: "#f0cf42" },
  { h: 28, c: "#0fb0b8" },
  { h: 64, c: "#0fb0b8" },
  { h: 88, c: "#3b82f6" },
  { h: 60, c: "#8b5cf6" },
  { h: 74, c: "#ef4444" },
  { h: 42, c: "#0fb0b8" },
  { h: 86, c: "#f0cf42" },
  { h: 54, c: "#f0cf42" },
  { h: 40, c: "#0fb0b8" },
  { h: 72, c: "#0fb0b8" },
];

const tools = [
  { name: "React", kind: "react" },
  { name: "Node.js", kind: "node" },
  { name: "PostgreSQL", kind: "postgres" },
  { name: "MongoDB", kind: "mongodb" },
  { name: "MySQL", kind: "mysql" },
  { name: "Redis", kind: "redis" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
  { name: "Mobile Apps", kind: "mobile" },
  { name: "Databases", kind: "database" },
];

function ToolIcon({ kind, label }) {
  switch (kind) {
    case "react":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <g fill="none" stroke="#61dafb" strokeWidth="3.2" strokeLinecap="round">
            <ellipse cx="32" cy="32" rx="22" ry="9" />
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(120 32 32)" />
          </g>
          <circle cx="32" cy="32" r="4.5" fill="#61dafb" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 7 50 17v20L32 57 14 37V17z" fill="#4f9d45" />
          <path d="M24 24h5v16h-5zM31 24h5l4 9v-9h5v16h-5l-4-9v9h-5z" fill="#fff" />
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
    case "mysql":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M17 40c8-6 21-8 33-6-7-5-15-8-22-8-8 0-14 3-18 8 2 3 4 5 7 6z" fill="#00546b" />
          <path d="M34 17c2 6 1 10-2 15 5-2 8-6 9-11 2 3 2 6 1 9 4-2 7-4 10-8-1 8-5 14-11 17-6 4-13 5-19 4-3-1-6-2-8-4 1-8 4-15 12-22 3-2 6-2 8 0z" fill="#f29111" opacity="0.95" />
          <path d="M40 14c3 2 5 4 7 7" fill="none" stroke="#2f6f93" strokeWidth="3" strokeLinecap="round" />
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
    case "mobile":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="18" y="10" width="28" height="44" rx="6" fill="#1f2937" />
          <rect x="22" y="16" width="20" height="30" rx="2" fill="#eef6fb" />
          <circle cx="32" cy="46" r="2.5" fill="#cbd5e1" />
          <path d="M26 24h12l2 8H24z" fill="#3aa0c7" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="16" rx="16" ry="7" fill="#4e83a5" />
          <path d="M16 16v14c0 4 7 7 16 7s16-3 16-7V16" fill="#6aa3c1" />
          <path d="M16 30v14c0 4 7 7 16 7s16-3 16-7V30" fill="#8ec1d6" />
          <ellipse cx="32" cy="30" rx="16" ry="7" fill="#5c98b7" opacity="0.65" />
          <ellipse cx="32" cy="44" rx="16" ry="7" fill="#9ed0e3" opacity="0.95" />
        </svg>
      );
    default:
      return <span className="crm-tool-fallback">{label}</span>;
  }
}

export default function CRMDevelopmentPage() {
  return (
    <div className="crm-page">
      <section className="crm-hero">
        {/* White theme decorations */}
        <div className="crm-hero__orb crm-hero__orb--1" aria-hidden="true" />
        <div className="crm-hero__orb crm-hero__orb--2" aria-hidden="true" />
        <div className="crm-hero__beam" aria-hidden="true" />
        <div className="crm-hero__ripple crm-hero__ripple--1" aria-hidden="true" />
        <div className="crm-hero__ripple crm-hero__ripple--2" aria-hidden="true" />
        <div className="crm-hero__ripple crm-hero__ripple--3" aria-hidden="true" />

        <div className="crm-hero__inner">
          <div className="crm-hero__grid">
            <div className="crm-hero__copy">
              <div className="crm-hero__badge">
                <div className="crm-hero__badge-dot" />
                CRM Development
              </div>
              <h1>
                CRM<br />
                <span className="crm-hero__title-accent">Development</span>
              </h1>
              <p>Streamline your customer relationships and boost sales with custom CRM solutions built for growth.</p>

              <div className="crm-hero__actions">
                <Link to="/contact" className="crm-btn-hero crm-btn-hero--primary">
                  Get Started <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to="/portfolio" className="crm-btn-hero crm-btn-hero--ghost">
                  View Work
                </Link>
              </div>

              <div className="crm-hero__stats">
                <div className="crm-hero__stat-chip"><strong>1.2k+</strong><span>Leads tracked</span></div>
                <div className="crm-hero__stat-chip"><strong>32%</strong><span>Better close rate</span></div>
                <div className="crm-hero__stat-chip"><strong>Auto</strong><span>Workflow engine</span></div>
              </div>
            </div>

            <div className="crm-hero__visual" aria-hidden="true">
              <div className="crm-hero__visual-card">
                <div className="crm-hero__visual-top">
                  <div>
                    <span>Customer Growth</span>
                    <strong>CRM Command Center</strong>
                  </div>
                  <i className="bi bi-broadcast" aria-hidden="true" />
                </div>

                <div className="crm-hero__visual-metrics">
                  <div className="crm-hero__metric">
                    <span>Leads</span>
                    <strong>1.2k</strong>
                    <small>+18%</small>
                  </div>
                  <div className="crm-hero__metric">
                    <span>Pipeline</span>
                    <strong>84%</strong>
                    <small>Healthy</small>
                  </div>
                  <div className="crm-hero__metric">
                    <span>Close Rate</span>
                    <strong>32%</strong>
                    <small>+7%</small>
                  </div>
                </div>

                <div className="crm-hero__visual-list">
                  <div>
                    <span>Sales Activity</span>
                    <strong>Real-time tracking</strong>
                  </div>
                  <div>
                    <span>Automation</span>
                    <strong>Workflows running</strong>
                  </div>
                  <div>
                    <span>Reports</span>
                    <strong>Decision-ready dashboards</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="crm-content">
        <div className="crm-container">
          <div className="crm-section-label">
            <i className="bi bi-people-fill" /> CRM Services
          </div>

          <div className="crm-layout">
            <div className="crm-left">
              {crmCards.map((card) => (
                <article key={card.title} className={`crm-card crm-card--${card.tone}`}>
                  <div className="crm-card__title-row">
                    <i className={`bi ${card.icon}`} aria-hidden="true" />
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.desc}</p>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="crm-card__footnote">{card.footnote}</div>
                </article>
              ))}
            </div>

            <div className="crm-right">
              <article className="crm-about-card">
                <h3>CRM Development Solutions</h3>
                <span>Kevalon Technology - Smart CRM Systems for Scalable Business Growth</span>
                <img src={aboutImage} alt="CRM development team planning" />
                <div className="crm-about-card__copy">
                  <p>
                    At Kevalon Technology, we build advanced, scalable, and secure CRM platforms that help organizations transform customer engagement into long-term business value.
                  </p>
                  <p>
                    Our CRM solutions are designed to centralize customer data, streamline operations, and enable intelligent decision-making across sales, marketing, and support teams.
                  </p>
                </div>

                <ul className="crm-capabilities">
                  {crmCapabilities.map((capability) => (
                    <li key={capability}>
                      <i className="bi bi-check2" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <section className="crm-tools">
            <h2>Tools & Platforms</h2>
            <div className="crm-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="crm-tool-card">
                  <div className="crm-tool-card__icon">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="crm-cta">
            <h2>Ready to Transform Your Customer Management?</h2>
            <p>Let Kevalon Technology help you build a custom CRM solution that streamlines your sales process and drives business growth.</p>
            <Link to="/contact" className="crm-btn">Get In Touch</Link>
          </section>
        </div>
      </section>
    </div>
  );
}