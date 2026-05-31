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
        <path d="M14.9 3.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.8-2.6.6-.8 1.5-1.3 2.5-1.4.2 1-.2 1.9-.9 2.9Z" fill="currentColor"/>
        <path d="M19.1 14.8c-.5 1.2-.8 1.8-1.5 2.8-1 .8-1.8 1.7-3.2 1.7-1.1 0-1.5-.6-2.8-.6s-1.7.6-2.9.6c-1.4 0-2.4-1-3.3-2-2.2-2.8-2.5-8.4-0.6-11 1-1.4 2.6-2.3 4.2-2.3 1.2 0 2.3.8 2.9.8.7 0 2-.9 3.5-.8.6 0 2.4.2 3.5 1.8-.1.1-2.1 1.2-2.1 4 0 3.3 2.8 4.5 2.3 7Z" fill="currentColor"/>
      </svg>
    );
  }

  if (kind === 'android') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.7 7.1 6.5 5.1M16.3 7.1l1.2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M8 8.2c0-1.6 1.8-2.8 4-2.8s4 1.2 4 2.8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="6.1" y="8.6" width="11.8" height="9.2" rx="2.2" fill="currentColor"/>
        <circle cx="10" cy="12" r="0.7" fill="#fff"/>
        <circle cx="14" cy="12" r="0.7" fill="#fff"/>
        <path d="M10 15.4h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    );
  }

  if (kind === 'react') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="8.3" ry="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
      </svg>
    );
  }

  if (kind === 'flutter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.3 13.8 13.8 5.3h4.6l-8.2 8.2 4.2 4.2h-4.6l-4.5-4.1Z" fill="currentColor" opacity="0.95"/>
        <path d="M10.1 13.2 13.6 9.7 19 15.1 15.5 18.6 10.1 13.2Z" fill="currentColor"/>
      </svg>
    );
  }

  return <span className="mad-badge-text">{kind.toUpperCase()}</span>;
}

function TechIcon({ kind, name }) {
  switch (kind) {
    case 'react':
      return <AppIcon kind="react" />;
    case 'flutter':
      return <AppIcon kind="flutter" />;
    case 'android':
      return <AppIcon kind="android" />;
    case 'apple':
      return <AppIcon kind="apple" />;
    case 'js':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2.2" fill="#f7df1e" />
          <path d="M10.2 16.9c.5.9 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.3 0-.9-.6-1.2-1.7-1.7l-.6-.3c-1.7-.8-2.8-1.8-2.8-3.9 0-1.9 1.4-3.3 3.6-3.3 1.6 0 2.8.6 3.7 2.2l-2 1.3c-.5-.9-1-1.2-1.7-1.2s-1.1.5-1.1 1.2c0 .8.5 1.1 1.5 1.6l.6.3c2 1 3.1 1.9 3.1 4.1 0 2.3-1.8 3.5-4.2 3.5-2.3 0-3.8-1.1-4.5-2.6l2.2-1.3Z" fill="#1d1d1d"/>
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2.2" fill="#3178c6" />
          <path d="M7.2 8.2h9.6v1.8h-3.5v7h-2.5v-7H7.2V8.2Z" fill="#fff"/>
          <path d="M16.4 15.8c.5.7 1.2 1 2 1 .8 0 1.3-.4 1.3-1 0-.7-.5-1-1.6-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.7 1.3-2.9 3.4-2.9 1.4 0 2.4.5 3.1 1.5l-1.5 1c-.4-.5-.9-.8-1.6-.8-.6 0-1 .3-1 .9 0 .6.4.9 1.3 1.2l.6.2c1.7.7 2.6 1.4 2.6 3.1 0 1.8-1.5 3-3.8 3-1.8 0-3-.6-3.7-1.6l1.4-1Z" fill="#fff" opacity="0.92"/>
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8 18.7 6.7v7.8L12 18.4 5.3 14.5V6.7L12 2.8Z" fill="#3c873a"/>
          <path d="M8.1 8.2h2.3l1.7 2.7 1.7-2.7h2.2l-2.9 4.4v2.5h-2.1v-2.5L8.1 8.2Z" fill="#fff"/>
          <path d="M6.9 10.1h1.3l3.8 5.4h-1.5l-.8-1.2H8.9l-.8 1.2H6.6l2.4-3.5-2.1-1.9Z" fill="#fff" opacity="0.88"/>
        </svg>
      );
    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 7.2 12 12 21.5 16.8 12 12 2.5Z" fill="#ffca28"/>
          <path d="M12 2.5 10.2 9.4 12 11.5l1.8-2.1L12 2.5Z" fill="#ffa000"/>
          <path d="M7.2 12 12 21.5 9.4 13.7 7.2 12Z" fill="#f57c00"/>
          <path d="M16.8 12 12 21.5 14.6 13.7 16.8 12Z" fill="#ff9100"/>
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.8 14.6c2.5-1.6 5.4-2.5 8.7-2.5 2.1 0 4 .3 5.8.8" fill="none" stroke="#232f3e" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.7 16.9c.7.4 1.4.6 2.3.6.7 0 1.4-.2 1.8-.5" fill="none" stroke="#ff9900" strokeWidth="1.7" strokeLinecap="round"/>
          <text x="4.3" y="12.5" fill="#232f3e" fontSize="7.6" fontWeight="700" fontFamily="Arial, sans-serif">aws</text>
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.4 13.2h2.3v-2.1H4.4v2.1Zm2.5 0h2.3v-2.1H6.9v2.1Zm2.5 0h2.3v-2.1H9.4v2.1Zm2.5 0h2.3v-2.1h-2.3v2.1Zm2.5 0h2.3v-2.1h-2.3v2.1Z" fill="#2496ed"/>
          <path d="M8.2 7.2h5.3l2 1.9v2.2h-7.3V7.2Z" fill="#2496ed" opacity="0.9"/>
          <path d="M4.8 13.5c0 2.8 1.8 4.8 5.8 4.8 4.4 0 7.2-2.4 7.2-5.8 0-.4 0-.8-.1-1-1.7 0-2.9-.5-3.8-1.3-.8-.8-1.2-1.8-1.2-3H8.4c-.1 1.3-.7 2.2-1.7 2.8-.8.5-1.8.8-2.9.8H4c.3.7.5 1.5.8 2.1Z" fill="#2496ed" opacity="0.96"/>
        </svg>
      );
    default:
      return <span className="mad-badge-text">{name}</span>;
  }
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
          <div className="mad-hero__breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right" />
            <Link to="/services">Services</Link>
            <i className="bi bi-chevron-right" />
            <span>Mobile Application Development</span>
          </div>

          <div className="mad-hero__badge">
            <span className="mad-hero__badge-dot" />
            Mobile App Development
          </div>

          <h1 className="mad-hero__title">
            Know More About Mobile Application Development
          </h1>

          <p className="mad-hero__subtitle">
            Build powerful, scalable mobile applications for iOS and Android platforms.
          </p>

          <div className="mad-hero__actions">
            <Link to="/contact" className="mad-btn mad-btn--primary">
              Start Your Project <i className="bi bi-arrow-right ms-2" />
            </Link>
            <a href="#enterprise-mobile-apps" className="mad-btn mad-btn--ghost">
              Enterprise Solutions
            </a>
          </div>
        </div>

        <div className="mad-hero__visual" aria-hidden="true">
          <div className="mad-signal-bars">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
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
