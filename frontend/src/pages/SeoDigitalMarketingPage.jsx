import React from 'react';
import { Link } from 'react-router-dom';
import './SeoDigitalMarketingPage.css';

const serviceBullets = [
  'Search Engine Optimization (SEO) for higher Google rankings',
  'Keyword research and SEO content strategy',
  'On-page SEO optimization and technical improvements',
  'Google Ads and Pay-Per-Click (PPC) campaign management',
  'Social media marketing and brand awareness campaigns',
  'Website analytics tracking and performance reporting',
];

const strategySteps = [
  'Website Audit: We analyze your website performance, technical structure, and SEO opportunities.',
  'Keyword Research: We identify high-value keywords your target customers are searching for.',
  'On-Page Optimization: We improve website content, meta tags, headings, and site structure.',
  'Link Building & Promotion: We increase domain authority with quality backlinks and content promotion.',
  'Monitoring & Reporting: Monthly SEO reports with traffic growth and ranking improvements.',
];

const benefitChips = [
  'Technical SEO Audits',
  'Keyword Research',
  'Google Ads & PPC',
  'Analytics & Reporting',
];

const tools = [
  { name: 'Google Analytics', icon: 'bi-graph-up-arrow' },
  { name: 'Google Ads', icon: 'bi-badge-ad' },
  { name: 'Google Search Console', icon: 'bi-search' },
  { name: 'Ahrefs', icon: 'bi-link-45deg' },
  { name: 'SEMrush', icon: 'bi-link-45deg' },
  { name: 'Social Media Marketing', icon: 'bi-share' },
  { name: 'Keyword Planner', icon: 'bi-key' },
  { name: 'Screaming Frog', icon: 'bi-bug' },
  { name: 'Moz SEO', icon: 'bi-bar-chart-line' },
  { name: 'Facebook & Instagram Ads', icon: 'bi-megaphone' },
];

export default function SeoDigitalMarketingPage() {
  return (
    <div className="seo-page">
      <section className="seo-hero">
        {/* White theme decorations */}
        <div className="seo-hero__orb seo-hero__orb--1" aria-hidden="true" />
        <div className="seo-hero__orb seo-hero__orb--2" aria-hidden="true" />
        <div className="seo-hero__beam" aria-hidden="true" />

        <div className="seo-hero__inner">
          {/* Left: copy */}
          <div className="seo-hero__copy">
            <div className="seo-hero__badge">
              <div className="seo-hero__badge-dot" />
              SEO &amp; Digital Marketing
            </div>
            <h1>
              SEO &amp; Digital<br />
              <span className="seo-hero__title-accent">Marketing</span>
            </h1>
            <p>
              Grow your visibility, traffic, and revenue with data-driven SEO and marketing strategies built for real results.
            </p>
            <div className="seo-hero__actions">
              <Link to="/contact" className="seo-btn seo-btn--primary">
                Get Started <i className="bi bi-arrow-right ms-2" />
              </Link>
              <Link to="/portfolio" className="seo-btn seo-btn--ghost">
                View Work
              </Link>
            </div>
            <div className="seo-hero__stats">
              <div className="seo-stat-chip"><strong>Top 10</strong><span>Google rankings</span></div>
              <div className="seo-stat-chip"><strong>3x</strong><span>Organic traffic growth</span></div>
              <div className="seo-stat-chip"><strong>ROI</strong><span>Focused campaigns</span></div>
            </div>
          </div>

          {/* Right: visual */}
          <div className="seo-hero__visual" aria-hidden="true">
            <div style={{ position:'relative', width:'min(440px,100%)' }}>
              <div className="seo-visual-card">
                <div className="seo-visual-top">
                  <div>
                    <span>SEO Dashboard</span>
                    <strong>Performance overview</strong>
                  </div>
                  <i className="bi bi-graph-up-arrow" />
                </div>

                <div className="seo-visual-metrics">
                  {[
                    { label:'Organic Traffic', val:'48.2K', delta:'+24%' },
                    { label:'Rankings', val:'Top 5', delta:'+12' },
                    { label:'Conversions', val:'3.8%', delta:'+0.6%' },
                  ].map(m => (
                    <div key={m.label} className="seo-visual-metric">
                      <span>{m.label}</span>
                      <strong>{m.val}</strong>
                      <small>{m.delta}</small>
                    </div>
                  ))}
                </div>

                <div className="seo-visual-chart">
                  <span>Weekly Organic Sessions</span>
                  <div className="seo-visual-bars">
                    {[35,48,52,68,62,80,74].map((h,i) => (
                      <div key={i} className="seo-visual-bar" style={{ height:`${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="seo-visual-keywords">
                  {['SEO Audit','Keyword Research','On-Page','Link Building','Google Ads','Analytics'].map((kw,i) => (
                    <span key={kw} className={i < 3 ? 'active' : ''}>{kw}</span>
                  ))}
                </div>
              </div>

              <div className="seo-float-badge seo-float-badge--1">
                <i className="bi bi-search" /> #1 Rankings
              </div>
              <div className="seo-float-badge seo-float-badge--2">
                <i className="bi bi-graph-up" /> +3x Traffic
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-content">
        <div className="seo-content__head">
          <div className="seo-section-label">
            <i className="bi bi-graph-up-arrow" /> Our Services
          </div>
        </div>

        <div className="seo-grid seo-grid--intro">
          <article className="seo-card">
            <p>
              In today&apos;s competitive digital world, building a strong online presence is essential for
              business growth and success. Kevalon Technology provides professional SEO and digital
              marketing services designed to increase your website visibility, attract targeted visitors,
              and convert them into loyal customers.
            </p>
            <p>
              Our team focuses on strategic search engine optimization, performance marketing, and
              data-driven digital campaigns that help businesses rank higher on search engines and
              generate measurable growth.
            </p>
          </article>

          <article className="seo-card seo-card--feature">
            <h4>SEO & Digital Marketing Services</h4>
            <p>
              Increase your online visibility, website traffic, and customer leads with professional
              digital marketing strategies.
            </p>
            <div className="seo-image-placeholder" aria-hidden="true" />
            <p>
              At Kevalon Technology, we provide result-oriented SEO and digital marketing services that
              help businesses improve search rankings, attract targeted visitors, and generate high-quality leads.
            </p>
            <div className="seo-chip-grid">
              {benefitChips.map((chip) => (
                <span key={chip} className="seo-chip">
                  <i className="bi bi-check-circle-fill" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="seo-grid seo-grid--details">
          <article className="seo-card seo-card--accent">
            <h4>Our Digital Marketing Services</h4>
            <ul>
              {serviceBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="seo-card">
            <h4>Our SEO Strategy</h4>
            <ol>
              {strategySteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article className="seo-card seo-card--accent">
            <h4>Why Choose Kevalon Technology</h4>
            <ul>
              <li>Experienced digital marketing professionals</li>
              <li>Customized SEO strategies for every business</li>
              <li>Transparent monthly reporting and analytics</li>
              <li>Affordable digital marketing solutions</li>
              <li>Focus on long-term growth and lead generation</li>
            </ul>
          </article>

          <article className="seo-card">
            <h4>What You Get</h4>
            <ul>
              <li>Complete SEO audit report</li>
              <li>Keyword targeting strategy</li>
              <li>Monthly traffic and ranking report</li>
              <li>Continuous website optimization</li>
              <li>Dedicated digital marketing support</li>
            </ul>
          </article>
        </div>

        <section className="seo-tools">
          <h4>Tools & Platforms</h4>
          <div className="seo-tools__grid">
            {tools.map((tool) => (
              <div key={tool.name} className="seo-tool">
                <i className={`bi ${tool.icon}`} aria-hidden="true" />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
