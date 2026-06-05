import React from "react";
import { Link } from "react-router-dom";
import "./FieldForceManagementPage.css";

import aboutImage from "../Images/game-dev-user.jpg.jpg";

const introParagraphs = [
  "Field Force Management (FFM) is a complete enterprise solution designed to manage, track, and optimize the performance of on-field workforces. Whether it is sales teams, service technicians, delivery personnel, or field agents, our system provides real-time visibility, task allocation, route optimization, and performance analytics.",
  "At Kevalon Technology, we build custom FFM solutions that help businesses improve operational efficiency, reduce costs, and increase accountability. Our platforms are designed to make field operations smarter with accurate data, mobile-first access, and actionable insights.",
];

const trackingLeft = [
  "GPS-based location tracking for every team member on the map",
  "Real-time location updates for live movement visibility",
  "Movement history and route review for past activity analysis",
  "Geofencing and zone alerts for predefined operating areas",
  "Automated attendance tracking based on location and check-ins",
];

const trackingRight = [
  "Check-in / Check-out functionality to record task start and completion",
  "Live notifications for route deviations and operational delays",
  "Field-level accountability with timestamped activity logs",
  "Manager-friendly dashboards for quick status review",
  "Secure location sharing with operational control",
];

const routeLeft = [
  "Multi-stop route planning for teams covering large territories",
  "Distance and time optimization for faster visit completion",
  "Traffic-aware routing to reduce travel delays and fuel costs",
  "Route sharing and navigation support for field staff",
  "Fuel cost estimation and trip planning insights",
];

const routeRight = [
  "Smart destination sequencing for the most efficient daily plan",
  "Live route adjustments for dynamic operational changes",
  "Travel pattern analysis for better territory coverage",
  "Deviation alerts when staff move off planned routes",
  "Manager review tools for route compliance and performance",
];

const analyticsLeft = [
  "Employee performance metrics with team-wise productivity views",
  "Task completion rates and on-time execution tracking",
  "Time and attendance analytics with field presence insights",
  "Productivity dashboards for operational decision-making",
  "Exportable reports for internal review and planning",
];

const analyticsRight = [
  "Custom dashboards and KPI summaries for leadership teams",
  "Attendance and route data combined into one reporting flow",
  "Trend analysis for workforce performance over time",
  "Data-driven forecasting for staffing and operations",
  "Visual charts for quick comparison across teams and regions",
];

const securityBulletsLeft = [
  "GDPR & data privacy-ready workflows for sensitive information",
  "Data encryption for records at rest and in transit",
  "Authentication and access control with secure login flows",
  "Secure cloud storage and backup planning",
  "Role-based access for managers, admins, and field staff",
];

const securityBulletsRight = [
  "Regular audits and compliance checks for enterprise readiness",
  "Offline mobile access with secure synchronization later",
  "Encrypted communication and protected device handling",
  "Audit trails for all critical actions and updates",
  "Policy-driven data governance for operational control",
];

const featureCards = [
  {
    title: "Real-Time GPS Tracking",
    text: "Live location tracking with map visibility, route updates, and zone-based monitoring.",
  },
  {
    title: "Task Assignment & Management",
    text: "Assign work, track status, verify completion, and manage team workload in one place.",
  },
  {
    title: "Route Planning & Optimization",
    text: "Plan the best travel path for each field team with traffic and distance intelligence.",
  },
  {
    title: "Performance Reports & Analytics",
    text: "Track productivity, attendance, route adherence, and team performance trends.",
  },
  {
    title: "Mobile App for Field Staff",
    text: "A mobile-first workflow for on-the-go task updates, check-ins, and reporting.",
  },
  {
    title: "Offline Mode & Data Sync",
    text: "Work without network interruptions and sync securely once connectivity returns.",
  },
];

const tools = [
  { name: "React", kind: "react" },
  { name: "Node.js", kind: "node" },
  { name: "Redis", kind: "redis" },
  { name: "PostgreSQL", kind: "postgres" },
  { name: "MongoDB", kind: "mongodb" },
  { name: "Google Maps", kind: "maps" },
  { name: "Mobile", kind: "mobile" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
  { name: "GPS", kind: "gps" },
];

const heroBars = [
  { h: 54, c: "#f0cf42" },
  { h: 82, c: "#f0cf42" },
  { h: 38, c: "#d36a69" },
  { h: 64, c: "#f0cf42" },
  { h: 30, c: "#16b4b7" },
  { h: 70, c: "#0f9ec7" },
  { h: 88, c: "#0f9ec7" },
  { h: 60, c: "#8c3bb6" },
  { h: 76, c: "#f0cf42" },
  { h: 44, c: "#f0cf42" },
  { h: 86, c: "#f0cf42" },
  { h: 54, c: "#16b4b7" },
  { h: 68, c: "#f0cf42" },
  { h: 48, c: "#16b4b7" },
];

const heroMetrics = [
  { value: "Live", label: "Field visibility" },
  { value: "Smart", label: "Route planning" },
  { value: "Fast", label: "Task updates" },
];

const heroPills = ["GPS Tracking", "Workforce Visibility", "Offline Sync", "Performance Analytics"];

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
    case "redis":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 18 31 10l21 8-21 8-19-8z" fill="#dc382d" />
          <path d="m12 26 19 8 21-8v18l-21 8-19-8z" fill="#c92b23" />
          <path d="m12 18 19 8v18l-19-8z" fill="#ef4b3f" />
          <path d="m31 26 21-8v18l-21 8z" fill="#f05d50" />
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
    case "maps":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 56c10-12 18-22 18-33 0-10-8-18-18-18S14 13 14 23c0 11 8 21 18 33z" fill="#4285f4" />
          <path d="M32 36c7 0 12-5 12-12s-5-12-12-12-12 5-12 12 5 12 12 12z" fill="#fbbc05" />
          <path d="M32 19c-2 0-4 2-4 4 0 3 4 7 4 7s4-4 4-7c0-2-2-4-4-4z" fill="#ea4335" />
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
    case "gps":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="13" fill="none" stroke="#0ea5e9" strokeWidth="4" />
          <circle cx="32" cy="32" r="4.5" fill="#0ea5e9" />
          <path d="M32 10v8M32 46v8M10 32h8M46 32h8" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return <span>{label}</span>;
  }
}

function BulletList({ items }) {
  return (
    <ul className="field-bullets">
      {items.map((item) => (
        <li key={item}>
          <i className="bi bi-check-lg" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FieldForceManagementPage() {
  return (
    <div className="field-page">
      <section className="field-hero">
        {/* White-theme decorations */}
        <div className="field-hero__orb field-hero__orb--1" aria-hidden="true" />
        <div className="field-hero__orb field-hero__orb--2" aria-hidden="true" />
        <div className="field-hero__beam" aria-hidden="true" />

        <div className="field-hero__inner">
          <div className="field-hero__layout">
            <div className="field-hero__copy">
              <p className="field-hero__eyebrow">Field Force Management</p>
              <div className="field-hero__badge">
                <div className="field-hero__badge-dot" />
                Mobile-first field operations
              </div>
              <h1>
                Field Force<br />
                <span className="field-hero__title-accent">Management</span>
              </h1>
              <p className="field-hero__subtitle">
                Manage and monitor your on-field teams with real-time tracking,
                analytics, and complete operational visibility.
              </p>

              <div className="field-hero__pills" aria-label="Field force highlights">
                {heroPills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>

              <div className="field-hero__actions">
                <Link to="/contact" className="field-btn field-btn--primary">
                  Get in Touch <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to="/services" className="field-btn field-btn--ghost">
                  Explore Services
                </Link>
              </div>

              <div className="field-hero__metrics" aria-label="Field force metrics">
                {heroMetrics.map((metric) => (
                  <article key={metric.label} className="field-hero__metric-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="field-hero__visual" aria-hidden="true">
              <div className="field-hero__visual-card">
                <div className="field-hero__visual-head">
                  <span>Field Ops Dashboard</span>
                  <strong>Live workforce control</strong>
                </div>

                <div className="field-hero__visual-grid">
                  <div className="field-hero__visual-stat field-hero__visual-stat--primary">
                    <span>Coverage</span>
                    <strong>92%</strong>
                  </div>
                  <div className="field-hero__visual-stat">
                    <span>Tasks</span>
                    <strong>128</strong>
                  </div>
                  <div className="field-hero__visual-stat">
                    <span>Active</span>
                    <strong>46</strong>
                  </div>
                </div>

                <div className="field-hero__visual-list">
                  <div>
                    <span>Tracking</span>
                    <strong>Real-time GPS visibility</strong>
                  </div>
                  <div>
                    <span>Routing</span>
                    <strong>Smarter multi-stop planning</strong>
                  </div>
                  <div>
                    <span>Analytics</span>
                    <strong>Actionable performance reports</strong>
                  </div>
                </div>

                <div className="field-hero__bars" aria-hidden="true">
                  {heroBars.map((bar, index) => (
                    <span key={`${bar.c}-${index}`} style={{ height: `${bar.h}%`, background: bar.c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="field-content">
        <div className="field-container">
          <div className="field-section-label">
            <i className="bi bi-geo-alt" /> Our Services
          </div>

          <div className="field-grid field-grid--intro">
            <article className="field-card field-card--soft">
              <h4>Real-time Tracking</h4>
              <p>
                Maintain complete visibility of your field workforce with real-time GPS tracking.
                Monitor locations, movement patterns, and attendance to ensure optimal coverage and accountability across your teams.
              </p>
              <BulletList items={trackingLeft} />
              <BulletList items={trackingRight} />
            </article>

            <article className="field-card field-card--image">
              <h4>About Field Force Management</h4>
              <div className="field-card__photo">
                <img src={aboutImage} alt="Field force management team discussing work" />
              </div>
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          </div>

          <div className="field-grid field-grid--two">
            <article className="field-card field-card--soft">
              <h4>Route Optimization</h4>
              <p>
                Optimize routes for your field teams to reduce travel time and cut fuel costs, while improving overall efficiency. Plan optimal routes considering multiple stops, priorities, and real-time traffic conditions.
              </p>
              <BulletList items={routeLeft} />
            </article>

            <article className="field-card field-card--feature-list">
              <h4>Field Force Management Features</h4>
              <div className="field-feature-list">
                {featureCards.map((feature) => (
                  <article key={feature.title} className="field-feature-item">
                    <i className="bi bi-check-lg" aria-hidden="true" />
                    <div>
                      <strong>{feature.title}</strong>
                      <p>{feature.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <div className="field-grid field-grid--two">
            <article className="field-card field-card--white">
              <h4>Performance Analytics</h4>
              <p>
                Gain deep insights into field force performance through comprehensive analytics and reporting. Track key performance indicators, identify trends, and make data-driven decisions to optimize operations and improve productivity.
              </p>
              <BulletList items={analyticsLeft} />
            </article>

            <article className="field-card field-card--soft">
              <h4>Mobile Application Development</h4>
              <p>
                We develop native mobile applications for iOS and Android, enabling field teams to access critical enterprise features on the go. The app supports offline work and automatically syncs data when connected.
              </p>
              <BulletList items={analyticsRight} />
            </article>
          </div>

          <article className="field-card field-card--compliance">
            <h4>Security &amp; Compliance</h4>
            <p>
              We prioritize security, privacy, and compliance for field force systems. Our solutions are built to meet industry standards and regulatory requirements, ensuring your operational data remains safe, secure, and reliable.
            </p>
            <div className="field-bullet-columns">
              <BulletList items={securityBulletsLeft} />
              <BulletList items={securityBulletsRight} />
            </div>
            <p className="field-card__footnote">
              By integrating security and compliance measures, Kevalon Technology ensures your field force management system is fully compliant, dependable, and ready for enterprise deployment.
            </p>
          </article>

          <div className="field-tools">
            <div className="field-section-title field-section-title--tools">
              <h2>Tools &amp; Platforms</h2>
              <p>
                We use industry-leading technologies to build secure, scalable, and high-performance field operations platforms.
              </p>
            </div>

            <div className="field-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="field-tool-card">
                  <div className="field-tool-card__icon">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="field-cta">
            <div>
              <h3>Ready to Optimize Your Field Operations?</h3>
              <p>
                Let Kevalon Technology help you build a comprehensive field force management system that improves efficiency and drives productivity.
              </p>
            </div>

            <div className="field-cta__actions">
              <Link to="/contact" className="field-btn field-btn--primary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}