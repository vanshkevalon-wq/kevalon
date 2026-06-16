import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="bg-white font-[Inter,'Nunito_Sans',sans-serif] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-white pt-[120px] pb-[72px] px-12 overflow-hidden text-center max-md:pt-24 max-md:pb-14 max-md:px-6 max-sm:pt-[88px] max-sm:pb-12 max-sm:px-4">
        <div className="relative z-10 max-w-[720px] mx-auto animate-[lp-up_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          {/* eyebrow */}
          <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.09)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-[18px] py-[6px] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-navy mb-[18px]">
            <span className="w-[7px] h-[7px] rounded-full bg-teal flex-shrink-0 animate-[lp-dot_2.2s_ease-in-out_infinite]" />
            Legal
          </span>

          <h1 className="text-[clamp(2.2rem,4vw,3.4rem)] font-black text-navy-dark font-[Playfair_Display,Georgia,serif] tracking-[-0.03em] leading-[1.1] m-0 mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-[#5a7a8a] leading-[1.8] max-w-[560px] mx-auto m-0 mb-5">
            How Kevalon Technology collects, uses, and protects your personal information.
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap mb-5 text-[0.8rem] text-[#7a9aaa] font-medium max-md:flex-col max-md:gap-2">
            <span><i className="bi bi-calendar3 text-teal mr-1" /> Last Updated: January 2026</span>
            <span><i className="bi bi-building text-teal mr-1" /> Kevalon Technology</span>
          </div>
          <div className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#94a3b8]">
            <Link to="/" className="text-teal hover:text-navy transition-colors duration-200">Home</Link>
            <span>›</span>
            <span className="text-navy-dark">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pt-16 pb-24 px-12 bg-white border-t-[1.5px] border-[rgba(97,187,197,0.12)] max-md:pt-12 max-md:pb-[72px] max-md:px-6 max-sm:pt-10 max-sm:pb-16 max-sm:px-4">
        <div className="max-w-[860px] mx-auto">

          {/* intro card */}
          <div className="flex items-start gap-4 bg-white border-[1.5px] border-[rgba(97,187,197,0.22)] rounded-[18px] p-[24px_28px] mb-12 animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
            <i className="bi bi-info-circle-fill text-[1.4rem] text-teal flex-shrink-0 mt-0.5" />
            <p className="text-[0.97rem] text-[#4a6a7a] leading-[1.85] m-0">
              At <strong className="text-navy-dark">Kevalon Technology</strong>, your privacy is important to us. This Privacy
              Policy explains what information we collect when you visit our website at{' '}
              <strong className="text-navy-dark">kevalontechnology.in</strong>, how we use it, and the choices you have. By
              using our website, you agree to the practices described in this policy.
            </p>
          </div>

          {/* sections */}
          {SECTIONS.map((sec, i) => (
            <div key={sec.title}
              className="mb-10 pb-10 border-b border-[rgba(97,187,197,0.12)] last:border-b-0 group animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ '--si': i, animationDelay: `${i * 0.05}s` }}>
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

          {/* contact card */}
          <div className="bg-white border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-3xl p-[36px_40px] mt-12 animate-[lp-card-in_0.6s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] max-md:p-[24px_20px]">
            <h3 className="text-[1.25rem] font-extrabold text-navy-dark font-[Playfair_Display,Georgia,serif] m-0 mb-2">Contact Us About Privacy</h3>
            <p className="text-[0.9rem] text-[#5a7a8a] m-0 mb-[22px]">If you have questions about this Privacy Policy or how we handle your data, please reach out:</p>
            <div className="flex flex-col gap-3">
              {[
                { href: 'mailto:privacy@kevalontechnology.in', icon: 'bi-envelope-fill', text: 'privacy@kevalontechnology.in' },
                { href: 'mailto:ceo@kevalontechnology.in',     icon: 'bi-envelope-fill', text: 'ceo@kevalontechnology.in'     },
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
