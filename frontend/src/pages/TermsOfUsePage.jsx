import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    icon: 'bi-check-circle-fill',
    content: [
      'By accessing or using the Kevalon Technology website (kevalontechnology.in), you confirm that you have read, understood, and agree to be bound by these Terms of Use.',
      'If you do not agree with any part of these terms, you must discontinue use of our website immediately.',
      'These terms apply to all visitors, users, and clients who access or use any part of our website or services.',
      'We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: 'Use of the Website',
    icon: 'bi-globe2',
    content: [
      'You may use this website for lawful purposes only, in compliance with all applicable local, national, and international laws and regulations.',
      'You must not use the website to transmit unsolicited communications, spam, malicious code, or harmful content.',
      'You must not attempt to gain unauthorised access to any part of the website, server, database, or connected systems.',
      'You must not interfere with or disrupt the integrity or performance of the website or its infrastructure.',
      'Automated scraping, crawling, or data harvesting of our website without prior written consent is strictly prohibited.',
    ],
  },
  {
    title: 'Intellectual Property',
    icon: 'bi-award-fill',
    content: [
      'All content on this website — including text, graphics, logos, images, icons, designs, source code, and software — is the exclusive intellectual property of Kevalon Technology.',
      'Content is protected under applicable copyright, trademark, and intellectual property laws of India and international conventions.',
      'You may not reproduce, distribute, modify, create derivative works of, or commercially exploit any content from this website without prior written permission from Kevalon Technology.',
      'Permitted use includes viewing and printing content for personal, non-commercial reference, provided all copyright notices are retained.',
      'Any unauthorised use may result in legal action under applicable intellectual property laws.',
    ],
  },
  {
    title: 'Services & Engagements',
    icon: 'bi-briefcase-fill',
    content: [
      'Information provided on this website about our services (web development, mobile apps, ERP, SEO, etc.) is for general informational purposes and does not constitute a contractual offer.',
      'Formal service engagements are governed by separate written agreements (contracts/proposals) signed between Kevalon Technology and the client.',
      'Pricing, timelines, and deliverables are subject to change and must be confirmed through our official quotation or contract process.',
      'We reserve the right to refuse service to any individual or entity at our sole discretion.',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    icon: 'bi-exclamation-triangle-fill',
    content: [
      'This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.',
      'Kevalon Technology does not warrant that the website will be uninterrupted, error-free, secure, or free of viruses or other harmful components.',
      'We do not warrant the accuracy, completeness, or timeliness of information published on this website.',
      'Any reliance you place on information from this website is strictly at your own risk.',
    ],
  },
  {
    title: 'Limitation of Liability',
    icon: 'bi-shield-x',
    content: [
      'To the fullest extent permitted by applicable law, Kevalon Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website.',
      'This includes, but is not limited to, loss of profits, loss of data, loss of goodwill, business interruption, or any other commercial damages.',
      'Our total liability to you for any claim arising from use of this website shall not exceed the amount paid by you (if any) for accessing our services in the preceding 3 months.',
    ],
  },
  {
    title: 'Third-Party Links',
    icon: 'bi-box-arrow-up-right',
    content: [
      'Our website may contain links to external websites operated by third parties for your convenience and reference.',
      'Kevalon Technology has no control over the content, privacy practices, or policies of third-party websites and accepts no responsibility for them.',
      'The inclusion of any link does not imply endorsement, approval, or recommendation by Kevalon Technology.',
      'You access third-party websites entirely at your own risk.',
    ],
  },
  {
    title: 'Governing Law & Jurisdiction',
    icon: 'bi-bank',
    content: [
      'These Terms of Use are governed by and construed in accordance with the laws of India.',
      'Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in India.',
      'By using our website, you irrevocably submit to the jurisdiction of courts in India for resolution of any disputes.',
    ],
  },
  {
    title: 'Termination',
    icon: 'bi-x-octagon-fill',
    content: [
      'We reserve the right to terminate or restrict your access to this website at any time, without notice, for conduct that violates these Terms of Use or is harmful to other users, Kevalon Technology, or third parties.',
      'Upon termination, all provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.',
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <div className="lp-page">

      {/* ── Hero ── */}
      <section className="lp-hero lp-hero--terms">
        <div className="lp-hero__dots" />
        <div className="lp-hero__blob lp-hero__blob--tl" />
        <div className="lp-hero__blob lp-hero__blob--br" />
        <div className="lp-hero__inner">
          <span className="lp-eyebrow"><span className="lp-eyebrow__dot" />Legal</span>
          <h1 className="lp-hero__title">Terms of Use</h1>
          <p className="lp-hero__subtitle">
            The rules and guidelines governing your use of the Kevalon Technology website and services.
          </p>
          <div className="lp-hero__meta">
            <span><i className="bi bi-calendar3" /> Last Updated: January 2026</span>
            <span><i className="bi bi-building" /> Kevalon Technology</span>
          </div>
          <div className="lp-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>Terms of Use</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="lp-content">
        <div className="lp-wrap">

          <div className="lp-intro-card">
            <i className="bi bi-info-circle-fill lp-intro-card__icon" />
            <p>
              These Terms of Use govern your access to and use of the <strong>Kevalon Technology</strong>{' '}
              website located at <strong>kevalontechnology.in</strong>. Please read these terms carefully
              before using our website. These terms were last updated in January 2026.
            </p>
          </div>

          {SECTIONS.map((sec, i) => (
            <div className="lp-section" key={sec.title} style={{ '--si': i }}>
              <div className="lp-section__head">
                <div className="lp-section__icon"><i className={`bi ${sec.icon}`} /></div>
                <h2 className="lp-section__title">{sec.title}</h2>
              </div>
              <ul className="lp-list">
                {sec.content.map((item, j) => (
                  <li key={j}><span className="lp-list__dot" />{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lp-contact-card">
            <h3>Questions About These Terms?</h3>
            <p>If you have any questions or concerns about these Terms of Use, please contact us:</p>
            <div className="lp-contact-card__items">
              <a href="mailto:ceo@kevalontechnology.in" className="lp-contact-card__item">
                <i className="bi bi-envelope-fill" /><span>ceo@kevalontechnology.in</span>
              </a>
              <a href="tel:+919081012218" className="lp-contact-card__item">
                <i className="bi bi-telephone-fill" /><span>+91 9081012218</span>
              </a>
              <div className="lp-contact-card__item">
                <i className="bi bi-geo-alt-fill" />
                <span>913, Solaris Business Hub, Bhuyangdev — 380063</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
