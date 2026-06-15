import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="bg-white font-[Inter,'Nunito_Sans',sans-serif] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-white pt-[120px] pb-[72px] px-12 overflow-hidden text-center max-md:pt-24 max-md:pb-14 max-md:px-6 max-sm:pt-[88px] max-sm:pb-12 max-sm:px-4">
        <div className="relative z-10 max-w-[720px] mx-auto animate-[lp-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-[18px] py-[6px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-navy mb-[18px]">
            <span className="w-[7px] h-[7px] rounded-full bg-teal flex-shrink-0 animate-[lp-dot_2.2s_ease-in-out_infinite]" />
            Legal
          </span>

          <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] font-black text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.03em] leading-[1.1] m-0 mb-4">
            Terms of Use
          </h1>
          <p className="text-base text-[#5a7a8a] leading-[1.8] max-w-[560px] mx-auto m-0 mb-5">
            The rules and guidelines governing your use of the Kevalon Technology website and services.
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap mb-5 text-[0.8rem] text-[#7a9aaa] font-medium max-md:flex-col max-md:gap-2">
            <span><i className="bi bi-calendar3 text-teal mr-1" /> Last Updated: January 2026</span>
            <span><i className="bi bi-building text-teal mr-1" /> Kevalon Technology</span>
          </div>
          <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#94a3b8]">
            <Link to="/" className="text-teal hover:text-navy transition-colors duration-200">Home</Link>
            <span>›</span>
            <span className="text-navy-dark">Terms of Use</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pt-16 pb-24 px-12 bg-white border-t-[1.5px] border-[rgba(97,187,197,0.12)] max-md:pt-12 max-md:pb-[72px] max-md:px-6 max-sm:pt-10 max-sm:pb-16 max-sm:px-4">
        <div className="max-w-[860px] mx-auto">

          <div className="flex items-start gap-4 bg-white border-[1.5px] border-[rgba(97,187,197,0.22)] rounded-[18px] p-[24px_28px] mb-12 animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
            <i className="bi bi-info-circle-fill text-[1.4rem] text-teal flex-shrink-0 mt-0.5" />
            <p className="text-[0.97rem] text-[#4a6a7a] leading-[1.85] m-0">
              These Terms of Use govern your access to and use of the <strong className="text-navy-dark">Kevalon Technology</strong>{' '}
              website located at <strong className="text-navy-dark">kevalontechnology.in</strong>. Please read these terms carefully
              before using our website. These terms were last updated in January 2026.
            </p>
          </div>

          {SECTIONS.map((sec, i) => (
            <div key={sec.title}
              className="mb-10 pb-10 border-b border-[rgba(97,187,197,0.12)] last:border-b-0 group animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center gap-3.5 mb-[18px]">
                <div className="w-[42px] h-[42px] rounded-[13px] flex-shrink-0 bg-gradient-to-br from-[rgba(97,187,197,0.15)] to-[rgba(3,70,101,0.08)] border-[1.5px] border-[rgba(97,187,197,0.22)] flex items-center justify-center text-base text-navy transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-teal group-hover:to-navy group-hover:text-white group-hover:scale-[1.08] group-hover:rotate-[-4deg] group-hover:border-transparent">
                  <i className={`bi ${sec.icon}`} />
                </div>
                <h2 className="text-[1.15rem] font-extrabold text-navy-dark m-0 tracking-[-0.01em] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:h-[2.5px] after:w-10 after:bg-gradient-to-r after:from-teal after:to-navy after:rounded-sm">
                  {sec.title}
                </h2>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {sec.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[0.93rem] text-[#4a6a7a] leading-[1.75]">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-br from-teal to-navy mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-white border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-3xl p-[36px_40px] mt-12 animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] max-md:p-[24px_20px]">
            <h3 className="text-[1.25rem] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] m-0 mb-2">Questions About These Terms?</h3>
            <p className="text-[0.9rem] text-[#5a7a8a] m-0 mb-[22px]">If you have any questions or concerns about these Terms of Use, please contact us:</p>
            <div className="flex flex-col gap-3">
              {[
                { href: 'mailto:ceo@kevalontechnology.in', icon: 'bi-envelope-fill', text: 'ceo@kevalontechnology.in' },
                { href: 'tel:+919081012218',               icon: 'bi-telephone-fill', text: '+91 9081012218' },
              ].map(({ href, icon, text }) => (
                <a key={href} href={href}
                  className="flex items-start gap-3 text-[0.88rem] text-[#4a6a7a] no-underline px-3.5 py-2.5 rounded-xl border border-transparent transition-all duration-200 hover:bg-[rgba(255,255,255,0.7)] hover:border-[rgba(97,187,197,0.3)] hover:translate-x-1 hover:text-navy">
                  <i className={`bi ${icon} text-teal text-base mt-0.5 flex-shrink-0`} />
                  <span>{text}</span>
                </a>
              ))}
              <div className="flex items-start gap-3 text-[0.88rem] text-[#4a6a7a] px-3.5 py-2.5 rounded-xl">
                <i className="bi bi-geo-alt-fill text-teal text-base mt-0.5 flex-shrink-0" />
                <span>913, Solaris Business Hub, Bhuyangdev — 380063</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes lp-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lp-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.9)} }
        @keyframes lp-card-in { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
