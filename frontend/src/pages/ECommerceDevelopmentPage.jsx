import React from "react";
import { Link } from "react-router-dom";
import "./ECommerceDevelopmentPage.css";

import aboutImage from "../Images/game-dev-user.jpg.jpg";

const serviceCards = [
  {
    title: "Product Management",
    icon: "bi-cart3",
    desc: "Comprehensive product management system to organize and showcase your inventory. Manage products, categories, variants, and inventory with ease.",
    bullets: [
      "Product catalog management",
      "Category and subcategory organization",
      "Product variants and attributes",
      "Inventory tracking and stock management",
      "Bulk product import/export",
      "Product search and filtering",
    ],
    tone: "soft",
  },
  {
    title: "Shopping Cart & Checkout",
    icon: "bi-bag-check",
    desc: "Streamlined shopping cart and checkout process to maximize conversions. Provide a smooth and secure checkout experience for your customers.",
    bullets: [
      "Add to cart functionality",
      "Cart persistence and recovery",
      "Guest checkout option",
      "Multi-step checkout process",
      "Order summary and review",
      "Shipping and tax calculation",
    ],
    tone: "white",
  },
  {
    title: "Payment Integration",
    icon: "bi-credit-card",
    desc: "Secure payment processing with support for multiple payment gateways. Accept payments from customers worldwide with confidence.",
    bullets: [
      "Credit/debit card processing",
      "Payment gateway integration (Stripe, PayPal, Razorpay)",
      "Digital wallet support",
      "Bank transfer and COD options",
      "Secure payment processing (PCI compliance)",
      "Multi-currency support",
    ],
    tone: "soft",
  },
  {
    title: "Order Management",
    icon: "bi-truck",
    desc: "Efficient order management system to track, process, and fulfill orders. Manage your entire order lifecycle from placement to delivery.",
    bullets: [
      "Order tracking and status updates",
      "Order history and details",
      "Order status management",
      "Invoice generation",
      "Shipping label printing",
      "Order cancellation and refunds",
    ],
    tone: "white",
  },
  {
    title: "Security & Compliance",
    icon: "bi-shield-lock",
    desc: "Enterprise-grade security to protect your business and customer data. Ensure compliance with industry standards and regulations.",
    bullets: [
      "SSL/HTTPS encryption",
      "PCI DSS compliance",
      "Secure customer data storage",
      "Fraud detection and prevention",
      "Regular security audits",
      "GDPR compliance",
    ],
    tone: "soft",
  },
];

const ecommerceFeatures = [
  "Advanced Product Catalog (Categories, filters, search)",
  "Smart Shopping Cart (Wishlist, save for later)",
  "Secure Payment Gateway Integration",
  "Order & Delivery Management System",
  "Real-Time Inventory Tracking",
  "Mobile-First Responsive Design",
  "Multi-Vendor Marketplace Support",
  "SEO & Conversion Optimization",
];

const featureTiles = [
  { title: "High Performance", subtitle: "Fast & optimized stores" },
  { title: "Secure Payments", subtitle: "Safe transactions" },
  { title: "Scalable Systems", subtitle: "Business growth ready" },
  { title: "Smart Analytics", subtitle: "Data-driven decisions" },
];

const tools = [
  { name: "React", kind: "react" },
  { name: "Node.js", kind: "node" },
  { name: "PostgreSQL", kind: "postgres" },
  { name: "MongoDB", kind: "mongodb" },
  { name: "PayPal", kind: "paypal" },
  { name: "Shopify", kind: "shopify" },
  { name: "Woo Commerce", kind: "woocommerce" },
  { name: "AWS", kind: "aws" },
  { name: "Docker", kind: "docker" },
  { name: "Mobile Commerce", kind: "mobilecommerce" },
];

const heroStats = [
  { value: "350+", label: "Stores Built" },
  { value: "99.9%", label: "Secure Checkout" },
  { value: "24/7", label: "Business Support" },
];

const dashboardMetrics = [
  { label: "Today’s Revenue", value: "₹42.8K", delta: "+18%" },
  { label: "Orders", value: "128", delta: "+12" },
  { label: "Visitors", value: "3.4K", delta: "+9%" },
];

const chartBars = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 76 },
  { label: "Thu", value: 64 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 72 },
];

const recentOrders = [
  { customer: "Aarav", product: "Wireless Headphones", amount: "₹2,490", status: "Paid" },
  { customer: "Meera", product: "Smart Watch Pro", amount: "₹4,199", status: "Processing" },
  { customer: "Rohan", product: "Running Shoes", amount: "₹3,280", status: "Shipped" },
];

const productHighlights = [
  { name: "Smart Watch Pro", sold: "84 sold" },
  { name: "Wireless Headphones", sold: "129 sold" },
  { name: "Fitness Band", sold: "62 sold" },
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
    case "paypal":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M24 50h8c8 0 14-4 16-13 2-8-2-13-10-13H26c-2 0-4 1-4 4l-5 22h7z" fill="#1f6bff" />
          <path d="M30 43h7c6 0 10-4 11-9 1-5-1-8-7-8h-9z" fill="#0b3ea9" />
          <path d="M18 14h13c6 0 10 3 10 8 0 6-4 10-10 10H24l-2 8h-7l3-26z" fill="#2493ff" />
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M20 16 26 11h12l6 5 3 31-15 6-15-6 3-31z" fill="#95bf47" />
          <path d="M27 25c0-5 3-8 7-8s7 3 7 8v3h-4v-3c0-3-1-5-3-5s-3 2-3 5v3h-4z" fill="#fff" />
          <path d="M22 24h20l2 18-12 4-12-4z" fill="#7aa52f" />
        </svg>
      );
    case "woocommerce":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 20h20l7 5v18l-7 5H14z" fill="#7f54b3" />
          <path d="M18 24h8l2 10 3-10h5l-6 20h-5l-3-10-3 10h-5l-6-20h5z" fill="#fff" />
          <path d="M37 21h11l4 4v17l-4 4H37z" fill="#a36dd8" opacity="0.95" />
          <text x="42" y="37" fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif">Woo</text>
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
    case "mobilecommerce":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="17" y="10" width="30" height="44" rx="6" fill="#1f2937" />
          <rect x="21" y="15" width="22" height="28" rx="2" fill="#eef6fb" />
          <path d="M26 24h12l2 9H24z" fill="#3aa0c7" />
          <circle cx="32" cy="44" r="2.5" fill="#cbd5e1" />
          <path d="M39 31c0 5-4 9-9 9s-9-4-9-9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M41 26h6l2 4-2 4h-5" fill="none" stroke="#3aa0c7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return <span className="ece-tool__fallback">{label}</span>;
  }
}

export default function ECommerceDevelopmentPage() {
  return (
    <div className="ece-page">
      <section className="ece-hero">
        {/* White-theme hero decorations */}
        <div className="ece-hero__orb ece-hero__orb--1" aria-hidden="true" />
        <div className="ece-hero__orb ece-hero__orb--2" aria-hidden="true" />
        <div className="ece-hero__beam" aria-hidden="true" />

        <div className="ece-hero__inner">
          <div className="ece-hero__grid">
            <div className="ece-hero__content">
              <div className="ece-hero__badge">
                <span />
                E-Commerce Development
              </div>

              <h1>
                E-Commerce<br />
                <span className="ece-hero__title-accent">Development</span>
              </h1>
              <p>Build powerful online stores that drive sales and grow your business globally.</p>

              <div className="ece-hero__actions">
                <Link to="/contact" className="ece-btn ece-btn--primary">
                  Get Started <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to="/portfolio" className="ece-btn ece-btn--ghost">
                  View Work
                </Link>
              </div>

              <div className="ece-hero__stats">
                {heroStats.map((item) => (
                  <div key={item.label} className="ece-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ece-hero__visual" aria-hidden="true">
              <div className="ece-hero__visual-card">
                <div className="ece-hero__visual-top">
                  <div>
                    <span>Online Store Dashboard</span>
                    <strong>Sales overview</strong>
                  </div>
                  <i className="bi bi-cart3" />
                </div>
                <div className="ece-hero__visual-metrics">
                  {dashboardMetrics.map((metric) => (
                    <div key={metric.label} className="ece-metric-card">
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <small>{metric.delta}</small>
                    </div>
                  ))}
                </div>
                <div className="ece-hero__visual-body">
                  <div className="ece-chart-card">
                    <div className="ece-chart-card__head">
                      <span>Revenue trend</span>
                      <strong>Weekly sales</strong>
                    </div>
                    <div className="ece-chart-bars">
                      {chartBars.map((bar) => (
                        <div key={bar.label} className="ece-chart-bar-wrap">
                          <div className="ece-chart-bar" style={{ height: `${bar.value}%` }} />
                          <span>{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ece-side-stack">
                    <div className="ece-side-card ece-side-card--status">
                      <span>Today's Goal</span>
                      <strong>82% completed</strong>
                      <div className="ece-progress"><span style={{ width: "82%" }} /></div>
                    </div>

                    <div className="ece-side-card">
                      <span>Top Products</span>
                      <div className="ece-product-list">
                        {productHighlights.map((item) => (
                          <div key={item.name} className="ece-product-item">
                            <div className="ece-product-item__dot" />
                            <div>
                              <strong>{item.name}</strong>
                              <small>{item.sold}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ece-orders-card">
                  <div className="ece-orders-card__head">
                    <span>Recent Orders</span>
                    <strong>Live updates</strong>
                  </div>
                  <div className="ece-orders-list">
                    {recentOrders.map((order) => (
                      <div key={`${order.customer}-${order.product}`} className="ece-order-item">
                        <div className="ece-order-item__avatar">{order.customer.slice(0, 1)}</div>
                        <div className="ece-order-item__details">
                          <strong>{order.customer}</strong>
                          <span>{order.product}</span>
                        </div>
                        <div className="ece-order-item__amount">
                          <strong>{order.amount}</strong>
                          <span>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ece-content">
        <div className="ece-container">
          <div className="ece-section-head">
            <div className="ece-section-label">
              <i className="bi bi-cart3" /> Our Services
            </div>
          </div>

          <div className="ece-main-grid">
            <div className="ece-left-col">
              {serviceCards.slice(0, 5).map((card) => (
                <article key={card.title} className={`ece-card ece-card--${card.tone}`}>
                  <div className="ece-card__title-row">
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

            <div className="ece-right-col">
              <article className="ece-about-card">
                <h3>About E-Commerce Development</h3>
                <img src={aboutImage} alt="E-Commerce development team planning" />
                <div className="ece-about-card__copy">
                  <p>
                    At Kevalon Technology, we design and develop powerful, secure, and scalable e-commerce platforms that empower businesses to sell products and services globally. Our solutions combine modern UI/UX, seamless navigation, and high-performance architecture to deliver smooth and engaging shopping experiences.
                  </p>
                  <p>
                    From product management, inventory automation, and secure payment gateways to order processing, analytics, and marketing integrations — we deliver complete end-to-end e-commerce ecosystems.
                  </p>
                </div>

                <div className="ece-tiles">
                  {featureTiles.map((tile) => (
                    <div key={tile.title} className="ece-tile">
                      <strong>{tile.title}</strong>
                      <span>{tile.subtitle}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="ece-features-card">
                <div className="ece-card__title-row">
                  <i className="bi bi-cart3" aria-hidden="true" />
                  <h3>E-Commerce Features</h3>
                </div>
                <p>
                  Our e-commerce platforms are designed to deliver seamless shopping experiences, secure transactions, and scalable business growth.
                </p>
                <ul className="ece-features-list">
                  {ecommerceFeatures.map((feature) => (
                    <li key={feature}>
                      <i className="bi bi-check2" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <section className="ece-tools">
            <h2>Tools & Platforms</h2>
            <div className="ece-tools__grid">
              {tools.map((tool) => (
                <div key={tool.name} className="ece-tool-card">
                  <div className="ece-tool-card__icon">
                    <ToolIcon kind={tool.kind} label={tool.name} />
                  </div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="ece-cta">
            <h2>Ready to Launch Your Online Store?</h2>
            <p>
              Let Kevalon Technology help you build a powerful e-commerce platform that drives sales and grows your business online.
            </p>
            <Link to="/contact" className="ece-btn ece-btn--primary">
              Get In Touch
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}