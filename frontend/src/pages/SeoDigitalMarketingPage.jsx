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
        <div className="seo-hero__inner">
          <div className="seo-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <strong>SEO & Digital Marketing</strong>
          </div>
          <h1>SEO & Digital Marketing Services</h1>
          <p>
            Grow your visibility, traffic, and revenue with data-driven SEO and marketing strategies.
          </p>
        </div>
      </section>

      <section className="seo-content">
        <div className="seo-content__head">
          <h2>Web SEO & Digital Marketing Services Development</h2>
          <h3>Grow Your Business Online with Kevalon Technology</h3>
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
