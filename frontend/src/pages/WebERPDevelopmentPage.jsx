import React from "react";
import { Link } from "react-router-dom";
import "./WebERPDevelopmentPage.css";

import aboutImage from "../Images/game-dev-user.jpg.jpg";

const erpCards = [
  {
    title: "Custom ERP Solutions",
    icon: "bi-gear-fill",
    desc: "Tailored ERP solutions designed to meet your specific business requirements. Build custom modules and features that align with your business processes and workflows.",
    bullets: [
      "Custom ERP module development",
      "Business process automation",
      "Workflow management and approval systems",
      "Role-based access control and permissions",
      "Multi-company and multi-currency support",
      "Custom reporting and analytics",
    ],
    tone: "soft",
  },
  {
    title: "ERP Modules",
    icon: "bi-boxes",
    desc: "Comprehensive ERP modules covering all aspects of business operations from finance to human resources, inventory to sales.",
    bullets: [
      "Financial Management (Accounting, Billing, Invoicing)",
      "Human Resources Management (HRM, Payroll, Attendance)",
      "Inventory Management (Stock, Warehouse, Procurement)",
      "Sales & CRM (Customer Management, Sales Orders, Quotations)",
      "Purchase Management (Vendor Management, Purchase Orders)",
      "Project Management (Task Tracking, Resource Allocation)",
    ],
    tone: "white",
  },
  {
    title: "Business Intelligence & Analytics",
    icon: "bi-bar-chart-line",
    desc: "Advanced reporting and analytics capabilities to gain insights into your business performance and make data-driven decisions.",
    bullets: [
      "Real-time dashboards and KPIs",
      "Custom reports and data visualization",
      "Financial reports and statements",
      "Sales analytics and forecasting",
      "Inventory reports and stock analysis",
      "Export to Excel, PDF, and other formats",
    ],
    tone: "soft",
  },
  {
    title: "Integration Services",
    icon: "bi-diagram-3-fill",
    desc: "Seamless integration with third-party systems, APIs, and services to connect your ERP with existing business tools and platforms.",
    bullets: [
      "Payment gateway integration (Stripe, PayPal, Razorpay)",
      "E-commerce platform integration (Shopify, WooCommerce)",
      "Accounting software integration (QuickBooks, Xero)",
      "Email and SMS service integration",
      "Cloud storage integration (AWS S3, Google Drive)",
      "API development and third-party integrations",
    ],
    tone: "white",
  },
  {
    title: "Security & Compliance",
    icon: "bi-shield-lock-fill",
    desc: "Enterprise-grade security and compliance features to protect your business data and ensure regulatory compliance.",
    bullets: [
      "Data encryption and secure storage",
      "User authentication and authorization",
      "Audit trails and activity logging",
      "GDPR and data privacy compliance",
      "Regular security audits and updates",
      "Backup and disaster recovery",
    ],
    tone: "soft",
  },
];

const erpHighlights = [
  "Centralized enterprise data management and system integration",
  "Process automation and operational workflow optimization",
  "Real-time analytics, reporting, and enterprise dashboards",
  "Secure cloud-based architecture with enterprise scalability",
];

const heroMetrics = [
  { value: "12+", label: "Core Modules" },
  { value: "99%", label: "Process Visibility" },
  { value: "24/7", label: "System Access" },
];

const heroBars = [
  { h: 30, c: "#8c3bb6" },
  { h: 72, c: "#f0cf42" },
  { h: 48, c: "#d36a69" },
  { h: 86, c: "#f0cf42" },
  { h: 38, c: "#f0cf42" },
  { h: 70, c: "#1ab6bd" },
  { h: 55, c: "#0f9ec7" },
  { h: 90, c: "#8c3bb6" },
  { h: 46, c: "#f0cf42" },
  { h: 78, c: "#f0cf42" },
  { h: 36, c: "#1ab6bd" },
  { h: 64, c: "#f0cf42" },
  { h: 82, c: "#0f9ec7" },
  { h: 42, c: "#d36a69" },
];

const tools = [
  { name: "React", kind: "react" },
  { name: "Node.js", kind: "node" },
  { name: "Python", kind: "python" },
  { name: "JavaScript", kind: "javascript" },
  { name: "PostgreSQL", kind: "postgres" },
  { name: "MongoDB", kind: "mongodb" },
  { name: "MySQL", kind: "mysql" },
  { name: "SQL Server", kind: "sqlserver" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
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
    case "python":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M31 8h9c4 0 7 3 7 7v11H25c-5 0-9 4-9 9v4c0 4 3 7 7 7h4v3c0 4 3 7 7 7h9c4 0 7-3 7-7V37c0-4-3-7-7-7H33c-1 0-2-1-2-2v-4c0-1 1-2 2-2z" fill="#3776ab" />
          <path d="M42 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#fff" />
          <path d="M22 46c-4 0-7-3-7-7V26c0-4 3-7 7-7h10v6H20c-1 0-2 1-2 2v10c0 1 1 2 2 2h12v6z" fill="#ffd343" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="12" y="12" width="40" height="40" rx="4" fill="#f7df1e" />
          <path d="M28 40c1 2 3 4 6 4 3 0 5-2 5-5V24h-6v14c0 1-1 2-2 2-2 0-3-1-4-2l-3 2c1 3 3 5 7 5z" fill="#1a1a1a" />
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
    case "sqlserver":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M24 13 39 9l10 8-5 13-14 3-9-8 3-12z" fill="#f25022" />
          <path d="M20 26 33 41l13-3-4-11-22-1z" fill="#7fba00" />
          <path d="M17 28 28 44l14-3-4-11-21-2z" fill="#00a4ef" />
          <path d="M31 9 42 20l-4 11-14 3-6-7 13-18z" fill="#ffb900" />
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
    default:
      return <span className="erp-tool-fallback">{label}</span>;
  }
}

export default function WebERPDevelopmentPage() {
  return (
    <div className="erp-page">
      <section className="erp-hero">
        <div className="erp-hero__inner">
          <div className="erp-hero__grid">
            <div className="erp-hero__copy">
              <div className="erp-hero__breadcrumb">
                <Link to="/">Home</Link>
                <i className="bi bi-chevron-right" />
                <Link to="/services">Services</Link>
                <i className="bi bi-chevron-right" />
                <span>Web ERP Development</span>
              </div>

              <div className="erp-hero__eyebrow">Web ERP Development</div>
              <h1>Know More About Web ERP Development</h1>
              <p>Build powerful, integrated ERP solutions to streamline finance, operations, inventory, and business workflows.</p>

              <div className="erp-hero__actions">
                <Link to="#erp-modules" className="erp-btn erp-btn--primary">Explore ERP Modules</Link>
                <Link to="/contact" className="erp-btn erp-btn--ghost">Talk to Us</Link>
              </div>

              <div className="erp-hero__metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="erp-metric-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="erp-hero__visual" aria-hidden="true">
              <div className="erp-hero__visual-card">
                <div className="erp-hero__visual-top">
                  <div>
                    <span>Enterprise Planning</span>
                    <strong>ERP Command Center</strong>
                  </div>
                  <i className="bi bi-kanban" />
                </div>

                <div className="erp-hero__visual-grid">
                  <div className="erp-hero__stat erp-hero__stat--accent">
                    <span>Orders</span>
                    <strong>4,820</strong>
                  </div>
                  <div className="erp-hero__stat">
                    <span>Inventory</span>
                    <strong>92%</strong>
                  </div>
                  <div className="erp-hero__stat">
                    <span>Approvals</span>
                    <strong>18 Pending</strong>
                  </div>
                  <div className="erp-hero__stat erp-hero__stat--wide">
                    <span>Operational Workflow</span>
                    <div className="erp-hero__bars">
                      {heroBars.map((bar, index) => (
                        <span key={index} style={{ height: `${bar.h}%`, background: bar.c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="erp-content">
        <div className="erp-container">
          <header className="erp-section-head">
            <h2>Web ERP Development</h2>
            <p>With Kevalon Technology</p>
          </header>

          <div className="erp-layout" id="erp-modules">
            <div className="erp-left">
              {erpCards.map((card) => (
                <article key={card.title} className={`erp-card erp-card--${card.tone}`}>
                  <div className="erp-card__title-row">
                    <i className={`bi ${card.icon}`} aria-hidden="true" />
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.desc}</p>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="erp-right">
              <article className="erp-about-card">
                <h3>Web ERP Development Solutions</h3>
                <span>Kevalon Technology - Intelligent Enterprise Resource Planning Systems</span>
                <img src={aboutImage} alt="Web ERP development team planning" />
                <div className="erp-about-card__copy">
                  <p>
                    We design and develop intelligent, scalable, and secure Web ERP platforms that integrate core business processes into a unified digital ecosystem.
                  </p>
                  <p>
                    Our ERP solutions centralize data, streamline operations, and enhance organizational efficiency across departments.
                  </p>
                  <p>
                    Our custom Web ERP systems are engineered to support finance, HR, inventory, supply chain, operations, and customer management — enabling seamless collaboration, real-time visibility, and data-driven decision-making across the enterprise.
                  </p>
                </div>

                <ul className="erp-highlights">
                  {erpHighlights.map((item) => (
                    <li key={item}>
                      <i className="bi bi-check2" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <section className="erp-tools">
            <h2>Tools & Platforms</h2>
            <div className="erp-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="erp-tool-card">
                  <div className="erp-tool-card__icon">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="erp-cta">
            <h2>Ready to Transform Your Business Operations?</h2>
            <p>Let Kevalon Technology help you build a custom Web ERP solution that streamlines your operations and improves efficiency.</p>
            <Link to="/contact" className="erp-btn">Get In Touch</Link>
          </section>
        </div>
      </section>
    </div>
  );
}