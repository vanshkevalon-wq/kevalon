import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileApplicationDevelopmentPage.css';

const appTypes = [
  {
    id: 'ios',
    title: 'iOS Development',
    icon: 'apple',
    desc: 'Native iOS application development using Swift and Objective-C. Build high-performance apps for iPhone and iPad with native iOS features and seamless App Store integration.',
    bullets: [
      'Native iOS app development (Swift, Objective-C)',
      'iPhone and iPad app development',
      'iOS UI/UX design and implementation',
      'Core Data and CloudKit integration',
      'App Store submission and optimization',
      'iOS app testing and debugging',
    ],
  },
  {
    id: 'android',
    title: 'Android Development',
    icon: 'android',
    desc: 'Native Android application development using Kotlin and Java. Build feature-rich Android apps with Material Design and Google Play Store integration.',
    bullets: [
      'Native Android app development (Kotlin, Java)',
      'Material Design implementation',
      'Android UI/UX design and development',
      'Room Database and Firebase integration',
      'Google Play Store submission and optimization',
      'Android app testing and debugging',
    ],
  },
  {
    id: 'react-native',
    title: 'React Native Development',
    icon: 'react',
    desc: 'Cross-platform mobile app development using React Native. Build iOS and Android apps with a single codebase, reducing development time and costs.',
    bullets: [
      'Cross-platform app development (iOS & Android)',
      'React Native framework and best practices',
      'Native module integration',
      'State management (Redux, Context API)',
      'API integration and data management',
      'App deployment to App Store and Play Store',
    ],
  },
  {
    id: 'flutter',
    title: 'Flutter Development',
    icon: 'flutter',
    desc: 'Cross-platform mobile app development using Flutter. Build beautiful, high-performance apps for iOS and Android with a single codebase using Dart.',
    bullets: [
      'Cross-platform app development (iOS & Android)',
      'Flutter framework and Dart programming',
      'Custom UI widgets and animations',
      'State management (Provider, Bloc, Riverpod)',
      'Firebase and backend integration',
      'App deployment to App Store and Play Store',
    ],
  },
];

const featurePills = [
  'User Authentication & Authorization',
  'Push Notifications & Real-Time Updates',
  'Offline Data Synchronization',
  'Payment Gateway Integration',
  'Social Media Integration',
  'Analytics & Crash Reporting',
];

const enterpriseBenefits = [
  'Native iOS & Android Applications',
  'Cross-Platform App Development (Flutter, React Native)',
  'Secure Backend & API Integration',
  'Cloud Integration & Scalability',
  'App Store & Play Store Deployment Support',
  'Performance Optimization & Security',
];

const techStack = [
  { name: 'React', icon: 'react' },
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Android', icon: 'android' },
  { name: 'iOS', icon: 'apple' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'Node.js', icon: 'node' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Docker', icon: 'docker' },
];

function AppIcon({ kind }) {
  if (kind === 'apple') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.9 3.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.8-2.6.6-.8 1.5-1.3 2.5-1.4.2 1-.2 1.9-.9 2.9Z" fill="currentColor" />
        <path d="M19.1 14.8c-.5 1.2-.8 1.8-1.5 2.8-1 .8-1.8 1.7-3.2 1.7-1.1 0-1.5-.6-2.8-.6s-1.7.6-2.9.6c-1.4 0-2.4-1-3.3-2-2.2-2.8-2.5-8.4-0.6-11 1-1.4 2.6-2.3 4.2-2.3 1.2 0 2.3.8 2.9.8.7 0 2-.9 3.5-.8.6 0 2.4.2 3.5 1.8-.1.1-2.1 1.2-2.1 4 0 3.3 2.8 4.5 2.3 7Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'android') {
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
  }

  if (kind === 'react') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'flutter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.3 13.8 13.8 5.3h4.6l-8.2 8.2 4.2 4.2h-4.6l-4.5-4.1Z" fill="currentColor" opacity="0.95" />
        <path d="M10.1 13.2 13.6 9.7 19 15.1 15.5 18.6 10.1 13.2Z" fill="currentColor" />
      </svg>
    );
  }

  return <span className="mad-badge-text">{kind.toUpperCase()}</span>;
}

/* Official tech icon URLs from devicons CDN */
const TECH_ICON_URLS = {
  react:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  flutter:  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  android:  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
  apple:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
  js:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  ts:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  node:     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
  aws:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  docker:   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
};

function TechIcon({ kind, name }) {
  const url = TECH_ICON_URLS[kind];
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        width="40"
        height="40"
        style={{ objectFit: 'contain', display: 'block' }}
        loading="lazy"
      />
    );
  }
  return <span className="mad-badge-text">{name}</span>;
}

export default function MobileApplicationDevelopmentPage() {
  const [activeType, setActiveType] = useState('ios');
  const active = appTypes.find((type) => type.id === activeType) || appTypes[0];

  return (
    <div className="mad-page">
      <section className="mad-hero">
        <div className="mad-hero__grid-bg" aria-hidden="true" />
        <div className="mad-hero__orb mad-hero__orb--1" aria-hidden="true" />
        <div className="mad-hero__orb mad-hero__orb--2" aria-hidden="true" />

        <div className="mad-hero__inner">
          <div className="mad-hero__badge">
            <span className="mad-hero__badge-dot" />
            Mobile App Development
          </div>

          <h1 className="mad-hero__title">
            Mobile Application<br />
            <span className="mad-hero__title-accent">Development</span>
          </h1>

          <p className="mad-hero__subtitle">
            We build powerful, user-friendly mobile applications for Android and iOS platforms that drive engagement and deliver real business value.
          </p>

          <div className="mad-hero__actions">
            <Link to="/contact" className="mad-btn mad-btn--primary">
              Start Your Project <i className="bi bi-arrow-right ms-2" />
            </Link>
            <Link to="/portfolio" className="mad-btn mad-btn--ghost">
              View Our Work
            </Link>
          </div>

          {/* stat chips */}
          <div className="mad-hero__stats">
            {[
              { icon: 'bi-file-earmark-check', val: '50+', label: 'Projects Delivered' },
              { icon: 'bi-people', val: '3+', label: 'Years Experience' },
              { icon: 'bi-star-fill', val: '100%', label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="mad-stat-chip">
                <i className={`bi ${s.icon}`} />
                <span className="mad-stat-chip__val">{s.val}</span>
                <span className="mad-stat-chip__lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mad-hero__visual" aria-hidden="true">
          <div className="mad-phones-wrap">

            {/* iOS badge */}
            <div className="mad-platform-badge mad-platform-badge--ios">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              <div><span>iOS</span><small>Development</small></div>
            </div>

            {/* Android badge */}
            <div className="mad-platform-badge mad-platform-badge--android">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#3DDC84"><path d="M17.523 15.341c-.384 0-.697-.311-.697-.697s.313-.697.697-.697.697.311.697.697-.313.697-.697.697zm-11.046 0c-.384 0-.697-.311-.697-.697s.313-.697.697-.697.697.311.697.697-.313.697-.697.697zm11.46-6.681l1.379-2.388c.076-.132.03-.3-.102-.376-.132-.077-.3-.03-.376.102l-1.395 2.415C15.979 7.737 14.068 7.2 12 7.2s-3.979.537-5.443 1.213L5.162 5.998c-.076-.132-.244-.179-.376-.102-.132.076-.178.244-.102.376l1.379 2.388C3.961 9.847 2.4 12.024 2.4 14.4h19.2c0-2.376-1.561-4.553-3.663-5.74z" /></svg>
              <div><span>Android</span><small>Development</small></div>
            </div>

            {/* Flutter badge */}
            <div className="mad-platform-badge mad-platform-badge--flutter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#54C5F8"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.013 9.372l-7.419 7.966 7.419 7.966H21.7l-7.393-7.966L21.7 9.372h-7.373z" /></svg>
              <div><span>Flutter</span><small>Development</small></div>
            </div>

            {/* Back phone — Analytics */}
            <div className="mad-phone mad-phone--back">
              <div className="mad-phone__screen">
                <div className="mad-phone__notch" />
                <div className="mad-phone__content">
                  <div className="mad-phone__back-header">
                    <span className="mad-phone__back-title">Statistics</span>
                    <span className="mad-phone__back-week">This Week ›</span>
                  </div>
                  {/* Line chart area */}
                  <div className="mad-phone__linechart">
                    <svg viewBox="0 0 180 60" preserveAspectRatio="none" className="mad-phone__linechart-svg">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#61BBC5" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#61BBC5" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,50 C20,45 30,15 50,20 C70,25 80,35 100,18 C120,5 140,30 160,12 L160,60 L0,60 Z" fill="url(#chartFill)" />
                      <path d="M0,50 C20,45 30,15 50,20 C70,25 80,35 100,18 C120,5 140,30 160,12" fill="none" stroke="#61BBC5" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="160" cy="12" r="3.5" fill="#61BBC5" />
                      {/* peak label */}
                      <rect x="138" y="2" width="32" height="13" rx="4" fill="#61BBC5" />
                      <text x="154" y="12" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">$4,880</text>
                    </svg>
                    <div className="mad-phone__linechart-days">
                      {['Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d}>{d}</span>)}
                    </div>
                  </div>
                  {/* Data rows */}
                  <div className="mad-phone__back-section">Categories</div>
                  {[
                    { label: 'UI/UX Design',  val: '$1,250', bar: 52 },
                    { label: 'Development',   val: '$2,420', bar: 78 },
                    { label: 'Marketing',     val: '$980',   bar: 38 },
                    { label: 'Others',        val: '$830',   bar: 30 },
                  ].map((r) => (
                    <div key={r.label} className="mad-phone__back-row">
                      <span className="mad-phone__back-row-label">{r.label}</span>
                      <div className="mad-phone__back-row-bar">
                        <div className="mad-phone__back-row-fill" style={{ width: `${r.bar}%` }} />
                      </div>
                      <span className="mad-phone__back-row-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Front phone — Dashboard */}
            <div className="mad-phone mad-phone--front">
              <div className="mad-phone__screen">
                <div className="mad-phone__notch" />
                <div className="mad-phone__content">
                  {/* Header row */}
                  <div className="mad-phone__topbar">
                    <div>
                      <div className="mad-phone__greeting">Hello, Kevin 👋</div>
                      <div className="mad-phone__subgreeting">Dashboard</div>
                    </div>
                    <div className="mad-phone__avatar">K</div>
                  </div>
                  {/* Earnings card */}
                  <div className="mad-phone__earnings-card">
                    <div className="mad-phone__earnings-label">Total Earnings</div>
                    <div className="mad-phone__earnings-row">
                      <span className="mad-phone__earnings-val">$24,680</span>
                      <div className="mad-phone__earnings-icon">
                        <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                          <path d="M3 13l4-4 3 3 4-5 3 3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="mad-phone__earnings-sub">+2.5% from last month</div>
                  </div>
                  {/* Transactions */}
                  <div className="mad-phone__tx-header">
                    <span>Transactions</span>
                    <span className="mad-phone__tx-viewall">View all</span>
                  </div>
                  {[
                    { name: 'Google Pay',  amt: '-$120.00',  color: '#4ade80', icon: 'GP' },
                    { name: 'Apple Store', amt: '-$89.00',   color: '#a78bfa', icon: '🍎' },
                    { name: 'Dribbble',    amt: '+$250.00',  color: '#f472b6', icon: 'Dr' },
                    { name: 'Figma',       amt: '-$998.00',  color: '#60a5fa', icon: 'Fi' },
                  ].map((tx) => (
                    <div key={tx.name} className="mad-phone__tx-row">
                      <div className="mad-phone__tx-icon" style={{ background: tx.color + '22', color: tx.color }}>
                        {tx.icon}
                      </div>
                      <div className="mad-phone__tx-info">
                        <span className="mad-phone__tx-name">{tx.name}</span>
                        <span className="mad-phone__tx-date">Today</span>
                      </div>
                      <span className="mad-phone__tx-amt" style={{ color: tx.amt.startsWith('+') ? '#4ade80' : 'rgba(255,255,255,0.8)' }}>
                        {tx.amt}
                      </span>
                    </div>
                  ))}
                  {/* Bottom nav bar */}
                  <div className="mad-phone__navbar">
                    <span className="mad-phone__nav-dot mad-phone__nav-dot--active" />
                    <span className="mad-phone__nav-dot" />
                    <div className="mad-phone__nav-plus">+</div>
                    <span className="mad-phone__nav-dot" />
                    <span className="mad-phone__nav-dot" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mad-intro">
        <div className="mad-container">
          <div className="mad-intro__grid">
            <div className="mad-intro__left">
              <div className="mad-card mad-card--tint">
                <h2>Mobile Application Development</h2>
                <h3>With Kevalon Technology</h3>
                <p>
                  Our Mobile Application Development services are designed to help businesses build
                  powerful, scalable mobile applications for iOS and Android platforms.
                </p>
                <p>
                  At Kevalon Technology, we offer structured mobile application development services
                  that combine modern frameworks with best practices. Our services are designed to help
                  you build high-quality mobile applications that deliver exceptional user experiences.
                </p>
              </div>

              <div className="mad-card mad-card--feature" id="enterprise-mobile-apps">
                <div className="mad-card__title-row">
                  <i className="bi bi-shield-check" />
                  <h3>Enterprise Mobile App Development</h3>
                </div>
                <p>
                  For businesses that need secure, scalable, future-ready mobile apps, we build enterprise
                  solutions that support growth, compliance, and performance.
                </p>
                <div className="mad-benefit-grid">
                  {enterpriseBenefits.map((item) => (
                    <div key={item} className="mad-benefit-card">
                      <i className="bi bi-check-circle-fill" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mad-intro__right">
              <div className="mad-visual-card">
                <div className="mad-visual-card__image" aria-hidden="true">
                  <div className="mad-visual-orb mad-visual-orb--1" />
                  <div className="mad-visual-orb mad-visual-orb--2" />
                  <div className="mad-visual-phone">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <p>
                  At Kevalon Technology, we deliver high-performance, secure, and scalable mobile
                  applications designed to help businesses grow in the digital ecosystem.
                </p>
                <p>
                  Our mobile app development services cover iOS app development, Android app
                  development, and cross-platform solutions using modern frameworks and industry best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mad-types">
        <div className="mad-container">
          <div className="mad-section-head">
            <h2>Mobile Application Development Services</h2>
          </div>

          <div className="mad-tabs">
            {appTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`mad-tab ${activeType === type.id ? 'mad-tab--active' : ''}`}
                onClick={() => setActiveType(type.id)}
              >
                <span className="mad-tab__icon"><AppIcon kind={type.icon} /></span>
                <span>{type.title.replace(' Development', '')}</span>
              </button>
            ))}
          </div>

          <div className="mad-type-panel">
            <div className="mad-type-panel__left">
              <div className="mad-type-panel__title-row">
                <i className={`bi ${active.icon}`} />
                <h3>{active.title}</h3>
              </div>
              <p>{active.desc}</p>
            </div>

            <div className="mad-type-panel__right">
              <ul>
                {active.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mad-features">
        <div className="mad-container">
          <div className="mad-section-head">
            <h2>Mobile App Features</h2>
            <p>Comprehensive mobile app features and integrations to enhance user experience and functionality.</p>
          </div>

          <div className="mad-feature-grid">
            {featurePills.map((feature) => (
              <div key={feature} className="mad-feature-card">
                <i className="bi bi-check-lg" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mad-security">
        <div className="mad-container">
          <div className="mad-security__card">
            <div className="mad-security__title-row">
              <i className="bi bi-shield-lock" />
              <h2>Security & Performance</h2>
            </div>
            <p>
              At Kevalon Technology, we follow enterprise-grade security standards and performance
              optimization strategies to ensure your mobile applications are secure, fast, reliable,
              and scalable for long-term growth.
            </p>
            <ul>
              <li>End-to-end data encryption and secure storage systems</li>
              <li>Secure API architecture, authentication & authorization</li>
              <li>Performance optimization, caching & load balancing</li>
              <li>Memory management and battery efficiency optimization</li>
              <li>Application security audits & penetration testing</li>
              <li>Compliance with GDPR, data privacy & regulatory standards</li>
              <li>Scalable infrastructure for high user traffic handling</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mad-tools">
        <div className="mad-container">
          <div className="mad-section-head">
            <h2>Tools & Platforms</h2>
          </div>

          <div className="mad-tools__grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="mad-tool-card">
                <div className="mad-tool-card__icon" aria-hidden="true">
                  <TechIcon kind={tech.icon} name={tech.name} />
                </div>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
