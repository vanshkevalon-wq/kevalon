import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const SECTIONS = [
  {
    title: 'Information We Collect',
    icon: 'bi-database',
    content: [
      'Personal identification information (name, email address, phone number) when you voluntarily submit contact forms, apply for jobs, or enquire about our services.',
      'Technical data including IP address, browser type and version, time zone, operating system, and other technology identifiers on the devices you use to access our website.',
      'Usage data such as pages visited, time spent on pages, links clicked, referral sources, and interaction patterns to help us understand how visitors use our website.',
      'Communication records including emails, enquiry messages, and support interactions you initiate with our team.',
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: 'bi-gear-fill',
    content: [
      'To respond to your enquiries, provide requested services, and deliver project-related communications.',
      'To process job applications and internship requests submitted through our website or via email.',
      'To improve our website functionality, content quality, and overall user experience based on analytics data.',
      'To send relevant updates about our services, blog articles, or company news — only when you have opted in.',
      'To comply with applicable legal obligations and protect our legitimate business interests.',
      'To prevent fraud, unauthorised access, and maintain the security of our systems.',
    ],
  },
  {
    title: 'Cookies & Tracking Technologies',
    icon: 'bi-browser-chrome',
    content: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytics data.',
      'Essential cookies are necessary for the website to function correctly and cannot be disabled.',
      'Analytics cookies (e.g., Google Analytics) help us understand traffic patterns and user behaviour in aggregate.',
      'You may control or disable non-essential cookies through your browser settings. Disabling cookies may affect some website functionality.',
    ],
  },
  {
    title: 'Data Sharing & Third Parties',
    icon: 'bi-share',
    content: [
      'We do not sell, rent, or trade your personal information to any third party for marketing purposes.',
      'We may share data with trusted service providers (e.g., hosting, email, analytics) who assist in operating our website under strict confidentiality agreements.',
      'We may disclose information where required by law, court order, or governmental authority.',
      'In the event of a business merger, acquisition, or asset sale, personal data may be transferred as part of the transaction.',
    ],
  },
  {
    title: 'Data Security',
    icon: 'bi-shield-lock-fill',
    content: [
      'We implement industry-standard technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.',
      'Data transmissions to and from our website are protected using HTTPS/TLS encryption.',
      'Access to personal data is restricted to authorised personnel who need it to perform their duties.',
      'Despite our precautions, no method of internet transmission or electronic storage is 100% secure. We encourage you to use caution when sharing sensitive information online.',
    ],
  },
  {
    title: 'Your Rights',
    icon: 'bi-person-check-fill',
    content: [
      'Right to access — you may request a copy of the personal data we hold about you.',
      'Right to correction — you may ask us to correct inaccurate or incomplete data.',
      'Right to deletion — you may request deletion of your personal data, subject to legal retention requirements.',
      'Right to object — you may object to processing of your data for direct marketing at any time.',
      'Right to data portability — you may request your data in a structured, machine-readable format where applicable.',
      'To exercise any of these rights, contact us at: privacy@kevalontechnology.in',
    ],
  },
  {
    title: 'Data Retention',
    icon: 'bi-clock-history',
    content: [
      'We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law.',
      'Contact form submissions are retained for up to 2 years for business correspondence purposes.',
      'Job application data is retained for 12 months after the conclusion of the recruitment process, unless you request earlier deletion.',
      'Analytics data is retained in aggregated, anonymised form indefinitely for business planning purposes.',
    ],
  },
  {
    title: "Children's Privacy",
    icon: 'bi-people-fill',
    content: [
      'Our website and services are not directed at individuals under the age of 16.',
      'We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will delete it promptly.',
    ],
  },
  {
    title: 'Changes to This Policy',
    icon: 'bi-pencil-square',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations.',
      'The "Last Updated" date at the top of this page indicates when the policy was most recently revised.',
      'We encourage you to review this page periodically. Continued use of our website after changes constitutes acceptance of the updated policy.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="lp-page">

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero__dots" />
        <div className="lp-hero__blob lp-hero__blob--tl" />
        <div className="lp-hero__blob lp-hero__blob--br" />
        <div className="lp-hero__inner">
          <span className="lp-eyebrow"><span className="lp-eyebrow__dot" />Legal</span>
          <h1 className="lp-hero__title">Privacy Policy</h1>
          <p className="lp-hero__subtitle">
            How Kevalon Technology collects, uses, and protects your personal information.
          </p>
          <div className="lp-hero__meta">
            <span><i className="bi bi-calendar3" /> Last Updated: January 2026</span>
            <span><i className="bi bi-building" /> Kevalon Technology</span>
          </div>
          <div className="lp-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="lp-content">
        <div className="lp-wrap">

          {/* intro card */}
          <div className="lp-intro-card">
            <i className="bi bi-info-circle-fill lp-intro-card__icon" />
            <p>
              At <strong>Kevalon Technology</strong>, your privacy is important to us. This Privacy
              Policy explains what information we collect when you visit our website at{' '}
              <strong>kevalontechnology.in</strong>, how we use it, and the choices you have. By
              using our website, you agree to the practices described in this policy.
            </p>
          </div>

          {/* sections */}
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

          {/* contact card */}
          <div className="lp-contact-card">
            <h3>Contact Us About Privacy</h3>
            <p>If you have questions about this Privacy Policy or how we handle your data, please reach out:</p>
            <div className="lp-contact-card__items">
              <a href="mailto:privacy@kevalontechnology.in" className="lp-contact-card__item">
                <i className="bi bi-envelope-fill" /><span>privacy@kevalontechnology.in</span>
              </a>
              <a href="mailto:ceo@kevalontechnology.in" className="lp-contact-card__item">
                <i className="bi bi-envelope-fill" /><span>ceo@kevalontechnology.in</span>
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
