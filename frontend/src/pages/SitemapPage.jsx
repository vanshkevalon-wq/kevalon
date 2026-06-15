import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="bg-white font-[Inter,'Nunito_Sans',sans-serif] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-white pt-[120px] pb-[72px] px-12 overflow-hidden text-center max-md:pt-24 max-md:pb-14 max-md:px-6 max-sm:pt-[88px] max-sm:pb-12 max-sm:px-4">
        <div className="relative z-10 max-w-[720px] mx-auto animate-[lp-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-[18px] py-[6px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-navy mb-[18px]">
            <span className="w-[7px] h-[7px] rounded-full bg-teal flex-shrink-0 animate-[lp-dot_2.2s_ease-in-out_infinite]" />
            Navigation
          </span>

          <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] font-black text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.03em] leading-[1.1] m-0 mb-4">
            Sitemap
          </h1>
          <p className="text-base text-[#5a7a8a] leading-[1.8] max-w-[560px] mx-auto m-0 mb-5">
            A complete directory of all pages on the Kevalon Technology website.
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap mb-5 text-[0.8rem] text-[#7a9aaa] font-medium max-md:flex-col max-md:gap-2">
            <span><i className="bi bi-layers text-teal mr-1" /> {SITEMAP.reduce((a, c) => a + c.links.length, 0)} pages listed</span>
            <span><i className="bi bi-building text-teal mr-1" /> Kevalon Technology</span>
          </div>
          <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#94a3b8]">
            <Link to="/" className="text-teal hover:text-navy transition-colors duration-200">Home</Link>
            <span>›</span>
            <span className="text-navy-dark">Sitemap</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pt-16 pb-24 px-12 bg-white border-t-[1.5px] border-[rgba(97,187,197,0.12)] max-md:pt-12 max-md:pb-[72px] max-md:px-6 max-sm:pt-10 max-sm:pb-16 max-sm:px-4">
        <div className="max-w-[860px] mx-auto">

          <div className="flex items-start gap-4 bg-white border-[1.5px] border-[rgba(97,187,197,0.22)] rounded-[18px] p-[24px_28px] mb-12 animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
            <i className="bi bi-map-fill text-[1.4rem] text-teal flex-shrink-0 mt-0.5" />
            <p className="text-[0.97rem] text-[#4a6a7a] leading-[1.85] m-0">
              This sitemap lists every page on the <strong className="text-navy-dark">Kevalon Technology</strong> website to help
              you quickly find what you're looking for. Use the links below to navigate directly to
              any section of our website.
            </p>
          </div>

          <div className="flex flex-col gap-9">
            {SITEMAP.map((cat, i) => (
              <div key={cat.category}
                className="bg-white border-[1.5px] border-[rgba(97,187,197,0.16)] rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(3,70,101,0.06)] transition-all duration-200 hover:shadow-[0_12px_36px_rgba(3,70,101,0.10)] hover:border-[rgba(97,187,197,0.32)] animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${i * 0.1}s` }}>

                {/* category head */}
                <div className="flex items-center gap-3.5 px-6 py-5 bg-white border-b border-[rgba(97,187,197,0.12)]">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-base shadow-[0_4px_12px_rgba(97,187,197,0.3)]"
                    style={{ background: `linear-gradient(138deg, ${cat.color}, #034665)` }}>
                    <i className={`bi ${cat.icon}`} />
                  </div>
                  <h2 className="text-base font-extrabold text-navy-dark m-0 flex-1">{cat.category}</h2>
                  <span className="text-[0.72rem] font-bold text-[#7a9aaa] bg-[rgba(97,187,197,0.10)] border border-[rgba(97,187,197,0.22)] rounded-full px-3 py-[3px] tracking-[0.04em]">
                    {cat.links.length} pages
                  </span>
                </div>

                {/* links */}
                <div className="flex flex-col py-2">
                  {cat.links.map((lnk, j) => (
                    <Link
                      key={lnk.to}
                      to={lnk.to}
                      className="flex items-center justify-between gap-4 px-6 py-3 no-underline text-inherit border-b border-[rgba(97,187,197,0.07)] last:border-b-0 transition-all duration-200 hover:bg-[rgba(97,187,197,0.05)] hover:pl-8 animate-[lp-link-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
                      style={{ animationDelay: `${j * 0.04}s` }}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <i className="bi bi-arrow-right-circle-fill text-base text-[rgba(97,187,197,0.4)] flex-shrink-0 transition-all duration-200 group-hover:text-teal" />
                        <div>
                          <span className="block text-[0.9rem] font-bold text-navy-dark transition-colors duration-200">{lnk.label}</span>
                          <span className="block text-[0.77rem] text-[#7a9aaa] mt-px">{lnk.desc}</span>
                        </div>
                      </div>
                      <span className="text-[0.72rem] font-semibold text-[#94a3b8] font-mono whitespace-nowrap flex-shrink-0 max-md:hidden">
                        {lnk.to}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <style>{`
        @keyframes lp-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lp-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.9)} }
        @keyframes lp-card-in { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lp-link-in { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );
}
