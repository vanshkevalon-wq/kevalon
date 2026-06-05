import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const SITEMAP = [
  {
    category: 'Main Pages',
    icon: 'bi-house-fill',
    color: '#61BBC5',
    links: [
      { label: 'Home',      to: '/',          desc: 'Welcome to Kevalon Technology'              },
      { label: 'About Us',  to: '/about',      desc: 'Who we are, our mission and vision'        },
      { label: 'Services',  to: '/services',   desc: 'All our digital services at a glance'      },
      { label: 'Portfolio', to: '/portfolio',  desc: 'Our delivered projects and case studies'   },
      { label: 'Blog',      to: '/blog',       desc: 'Tech articles, guides, and insights'       },
      { label: 'Careers',   to: '/careers',    desc: 'Open positions at Kevalon Technology'      },
      { label: 'Contact',   to: '/contact',    desc: 'Get in touch with our team'                },
      { label: 'Apply Now', to: '/apply-now',  desc: 'Submit your job or internship application' },
    ],
  },
  {
    category: 'Services',
    icon: 'bi-grid-1x2-fill',
    color: '#0a8fb6',
    links: [
      { label: 'Web Application Development',    to: '/services/web-application-development',    desc: 'Static, semi-dynamic & dynamic web apps'         },
      { label: 'Mobile Application Development', to: '/services/mobile-application-development', desc: 'iOS, Android, Flutter & React Native'            },
      { label: 'Game Development',               to: '/services/game-development',               desc: '2D/3D games for mobile, web & desktop'           },
      { label: 'E-Commerce Development',         to: '/services/e-commerce-development',         desc: 'Custom online stores & payment integration'      },
      { label: 'Web ERP Development',            to: '/services/web-erp-development',            desc: 'Enterprise resource planning systems'            },
      { label: 'API Development',                to: '/services/api-development',                desc: 'RESTful & GraphQL APIs, microservices'           },
      { label: 'CRM Development',                to: '/services/crm-development',                desc: 'Customer relationship management platforms'      },
      { label: 'SEO & Digital Marketing',        to: '/services/seo-digital-marketing',          desc: 'Search rankings, PPC & social media growth'     },
      { label: 'Field Force Management',         to: '/services/field-force-management',         desc: 'GPS tracking & field team management apps'       },
      { label: 'Internship & Training',          to: '/services/internship-training',            desc: 'Hands-on IT training for aspiring developers'    },
    ],
  },
  {
    category: 'Legal & Information',
    icon: 'bi-shield-fill-check',
    color: '#034665',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy', desc: 'How we collect and use your data'    },
      { label: 'Terms of Use',   to: '/terms-of-use',   desc: 'Rules governing use of our website'  },
      { label: 'Sitemap',        to: '/sitemap',        desc: 'Full directory of all website pages'  },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="lp-page">

      {/* ── Hero ── */}
      <section className="lp-hero lp-hero--sitemap">
        <div className="lp-hero__dots" />
        <div className="lp-hero__blob lp-hero__blob--tl" />
        <div className="lp-hero__blob lp-hero__blob--br" />
        <div className="lp-hero__inner">
          <span className="lp-eyebrow"><span className="lp-eyebrow__dot" />Navigation</span>
          <h1 className="lp-hero__title">Sitemap</h1>
          <p className="lp-hero__subtitle">
            A complete directory of all pages on the Kevalon Technology website.
          </p>
          <div className="lp-hero__meta">
            <span><i className="bi bi-layers" /> {SITEMAP.reduce((a, c) => a + c.links.length, 0)} pages listed</span>
            <span><i className="bi bi-building" /> Kevalon Technology</span>
          </div>
          <div className="lp-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>Sitemap</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="lp-content">
        <div className="lp-wrap">

          <div className="lp-intro-card">
            <i className="bi bi-map-fill lp-intro-card__icon" />
            <p>
              This sitemap lists every page on the <strong>Kevalon Technology</strong> website to help
              you quickly find what you're looking for. Use the links below to navigate directly to
              any section of our website.
            </p>
          </div>

          <div className="lp-sitemap-grid">
            {SITEMAP.map((cat, i) => (
              <div className="lp-sitemap-cat" key={cat.category} style={{ '--si': i, '--cc': cat.color }}>
                <div className="lp-sitemap-cat__head">
                  <div className="lp-sitemap-cat__icon">
                    <i className={`bi ${cat.icon}`} />
                  </div>
                  <h2 className="lp-sitemap-cat__title">{cat.category}</h2>
                  <span className="lp-sitemap-cat__count">{cat.links.length} pages</span>
                </div>
                <div className="lp-sitemap-cat__links">
                  {cat.links.map((lnk, j) => (
                    <Link
                      key={lnk.to}
                      to={lnk.to}
                      className="lp-sitemap-link"
                      style={{ '--li': j }}
                    >
                      <div className="lp-sitemap-link__left">
                        <i className="bi bi-arrow-right-circle-fill lp-sitemap-link__arrow" />
                        <div>
                          <span className="lp-sitemap-link__label">{lnk.label}</span>
                          <span className="lp-sitemap-link__desc">{lnk.desc}</span>
                        </div>
                      </div>
                      <span className="lp-sitemap-link__path">{lnk.to}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
