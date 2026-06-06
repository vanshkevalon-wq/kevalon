import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../Images/Logo.png";
import internshipTrainingImage from "../../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg";
import crmPreviewImage from "../../Images/fa88305e0eb98cb1d11865dba2fbfda76e2af9ae.jpg";

const navLinks = [
  { label: "Home",      to: "/"         },
  { label: "About",     to: "/about"    },
  { label: "Services",  to: "/services", hasDropdown: true },
  { label: "Portfolio", to: "/portfolio"},
  { label: "Careers",   to: "/careers"  },
  { label: "Contact",   to: "/contact"  },
];

const services = [
  {
    label: "Web Application Development",
    desc:  "React, Next.js, Node.js, MongoDB",
    icon:  "bi-code-slash",
    to:    "/services/web-application-development",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
  },
  {
    label: "Mobile App Development",
    desc:  "iOS, Android, Flutter, React Native",
    icon:  "bi-phone",
    to:    "/services/mobile-application-development",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
  },
  {
    label: "Game Development",
    desc:  "Unity, 2D & 3D, Cross-Platform",
    icon:  "bi-controller",
    to:    "/services/game-development",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  },
  {
    label: "E-Commerce Development",
    desc:  "Shopify, WooCommerce, Custom Stores",
    icon:  "bi-cart3",
    to:    "/services/e-commerce-development",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    label: "Web ERP Development",
    desc:  "Enterprise ERP, Integrations, Reporting",
    icon:  "bi-kanban",
    to:    "/services/web-erp-development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    label: "SEO & Digital Marketing",
    desc:  "SEO, Social Media, Growth Strategy",
    icon:  "bi-graph-up-arrow",
    to:    "/services/seo-digital-marketing",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
  },
  {
    label: "CRM Development",
    desc:  "Custom CRM, Automation, Integrations",
    icon:  "bi-people-fill",
    to:    "/services/crm-development",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
  {
    label: "API Development",
    desc:  "RESTful & GraphQL APIs, Microservices",
    icon:  "bi-plug",
    to:    "/services/api-development",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    label: "Field Force Management",
    desc:  "Mobile-first field apps, tracking, reporting",
    icon:  "bi-geo-alt",
    to:    "/services/field-force-management",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    label: "Internship/Training",
    desc:  "Workshops, Live Projects, Hands-on Training",
    icon:  "bi-mortarboard-fill",
    to:    "/services/internship-training",
    image: internshipTrainingImage,
  },
];

export default function Header() {
  const [menuOpen,          setMenuOpen]          = useState(false);
  const [dropdownOpen,      setDropdownOpen]      = useState(false);
  const [hoveredService,    setHoveredService]    = useState(services[0]);
  const [mobileServicesOpen,setMobileServicesOpen]= useState(false);
  const [scrolled,          setScrolled]          = useState(false);
  const closeTimer = useRef(null);
  const location   = useLocation();

  // glass effect on all pages — pill at top, frosted bar when scrolled
  const isGlass       = !scrolled;
  // white nav text only on home hero (dark video bg) before scrolling
  const isHome        = location.pathname === "/";
  const useWhiteText  = false; // Changed to always use dark text

  const openDropdown  = () => { clearTimeout(closeTimer.current); setDropdownOpen(true);  };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 150); };
  const closeDropdownNow = () => { clearTimeout(closeTimer.current); setDropdownOpen(false); };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════
          OUTER WRAPPER  — position:relative so the
          mega-menu can be absolutely positioned to it
      ════════════════════════════════════════════════ */}
      <div className="fixed inset-x-0 top-0 w-full flex justify-center font-['Nunito_Sans'] z-[999]"
        style={{ padding: isGlass ? '12px 16px 8px' : '0' }}
      >

        {/* ── Navbar pill / bar ── */}
        <div
          onMouseLeave={closeDropdown}
          style={{
            width: '100%',
            maxWidth: isGlass ? '1400px' : '100%',
            borderRadius: isGlass ? '999px' : '0px',
            padding: isGlass ? '14px 32px' : '12px 32px',
            border: isGlass
              ? '1px solid rgba(255,255,255,0.60)'
              : 'none',
            borderBottom: isGlass
              ? 'none'
              : '1px solid rgba(255,255,255,0.30)',
            background: isGlass
              ? 'rgb(255 255 255 / 92%)'
              : 'rgba(255,255,255,0.95)',
            backdropFilter: isGlass
              ? 'blur(28px) saturate(200%) brightness(1.25)'
              : 'blur(28px) saturate(180%) brightness(1.2)',
            WebkitBackdropFilter: isGlass
              ? 'blur(28px) saturate(200%) brightness(1.25)'
              : 'blur(28px) saturate(180%) brightness(1.2)',
            boxShadow: isGlass
              ? '0 8px 32px rgba(97,187,197,0.22), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.55)'
              : '0 4px 24px rgba(3,70,101,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, border-radius 0.4s ease, max-width 0.4s ease',
          }}
        >

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img
              src={logo}
              alt="Kevalon Technology Logo"
              className="h-[clamp(42px,6vw,58px)] w-auto object-contain"
            />
          </NavLink>

          {/* ── Desktop Nav ── */}
          <nav className="hidden min-[901px]:flex items-center gap-[clamp(16px,2.2vw,36px)] mx-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} onMouseEnter={() => { openDropdown(); }}>
                  <NavLink
                    to={link.to}
                    className="group relative cursor-pointer whitespace-nowrap text-[clamp(14px,1.4vw,16px)] font-semibold tracking-[0.1px] pb-[5px] transition-all duration-300 flex items-center gap-1 no-underline"
                  >
                    {({ isActive }) => (
                      <span className={`
                        relative inline-flex items-center gap-1 px-1 py-1
                        transition-all duration-300 border-b-2
                        ${useWhiteText
                          ? "text-white border-transparent group-hover:text-white group-hover:border-white"
                          : isActive
                            ? "text-[#0d3d5a] border-[#61BBC5]"
                            : "text-[#0d3d5a] border-transparent group-hover:text-[#61BBC5] group-hover:border-[#61BBC5]"
                        }
                      `}>
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  onMouseEnter={closeDropdownNow}
                  className="group relative cursor-pointer whitespace-nowrap text-[clamp(14px,1.4vw,16px)] font-semibold tracking-[0.1px] pb-[5px] transition-all duration-300"
                >
                  {({ isActive }) => (
                    <span className={`
                      relative inline-block px-1 py-1
                      transition-all duration-300 border-b-2
                      ${useWhiteText
                        ? isActive
                          ? "text-white border-white"
                          : "text-white border-transparent group-hover:text-white group-hover:border-white"
                        : isActive
                          ? "text-[#0d3d5a] border-[#61BBC5]"
                          : "text-[#0d3d5a] border-transparent group-hover:text-[#61BBC5] group-hover:border-[#61BBC5]"
                      }
                    `}>
                      {link.label}
                    </span>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* Apply Now + Hamburger */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/apply-now"
              className="hidden min-[901px]:inline-flex items-center gap-2 rounded-full bg-[linear-gradient(137.68deg,#61BBC5_0.13%,#034665_100%)] px-4 py-2 font-semibold text-white no-underline border-0 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(3,70,101,0.28)] hover:no-underline"
            >
              Apply Now
            </NavLink>

            <button
              onClick={() => { setMenuOpen((p) => !p); if (menuOpen) setMobileServicesOpen(false); }}
              aria-label="Toggle menu"
              className="flex min-[901px]:hidden flex-col gap-[5px] cursor-pointer p-[6px] bg-transparent border-none z-[1001]"
            >
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-[#0d3d5a]'} ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-[#0d3d5a]'} ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-[#0d3d5a]'} ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
            </button>
          </div>

          {/* ════════════════════════════════════════════════
              MEGA-MENU
              absolute → anchored to the navbar pill
              left-0 right-0 → exactly logo-left to Apply-Now-right
              top-[calc(100%+10px)] → just below the pill
          ════════════════════════════════════════════════ */}
          <div
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '860px',
            }}
            className={`
              z-[9999]
              hidden min-[901px]:block
              bg-white rounded-[20px]
              shadow-[0_24px_64px_rgba(3,70,101,0.18)]
              border border-[rgba(3,70,101,0.08)]
              overflow-hidden
              transition-all duration-200 ease-out origin-top
              ${dropdownOpen
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"}
            `}
          >
            <div className="flex items-stretch" style={{ minHeight: '420px' }}>

              {/* ── Left: service grid (58%) ── */}
              <div className="py-4 px-4 border-r border-[rgba(3,70,101,0.07)]" style={{ width: "58%" }}>
                <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-[#9ca3af] mb-3 px-1">
                  Our Services
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {services.map((svc) => (
                    <NavLink
                      key={svc.label}
                      to={svc.to}
                      onMouseEnter={() => setHoveredService(svc)}
                      onClick={() => setDropdownOpen(false)}
                      className={`
                        group/item flex flex-col items-center gap-1 px-2 py-2 rounded-[12px] text-center
                        transition-all duration-150 cursor-pointer border no-underline
                        ${hoveredService.label === svc.label
                          ? "bg-[rgba(97,187,197,0.10)] border-[rgba(97,187,197,0.35)] shadow-[0_2px_14px_rgba(97,187,197,0.15)]"
                          : "border-transparent hover:bg-[rgba(3,70,101,0.04)] hover:border-[rgba(3,70,101,0.08)]"}
                      `}
                    >
                      <span className={`
                        w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full flex items-center justify-center text-[15px] shrink-0
                        transition-all duration-150
                        ${hoveredService.label === svc.label
                          ? "bg-[linear-gradient(137deg,#61BBC5,#034665)] text-white shadow-[0_4px_14px_rgba(97,187,197,0.4)]"
                          : "bg-[rgba(3,70,101,0.07)] text-[#034665] group-hover/item:bg-[linear-gradient(137deg,#61BBC5,#034665)] group-hover/item:text-white"}
                      `}>
                        <i className={`bi ${svc.icon}`} />
                      </span>
                      <p className={`
                        text-[11px] font-semibold mb-0 leading-snug
                        transition-colors duration-150
                        ${hoveredService.label === svc.label ? "text-[#034665]" : "text-[#1a2e3b]"}
                        group-hover/item:text-[#0a8fb6]
                      `}>
                        {svc.label}
                      </p>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* ── Right: image preview (42%) — full height ── */}
              <div style={{ width: "42%", display: "flex", flexDirection: "column" }}>
                {/* image fills all available space */}
                <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: "360px" }}>
                  <img
                    key={hoveredService.label}
                    src={hoveredService.image}
                    alt={hoveredService.label}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 0.25s ease",
                    }}
                  />
                  {/* dark gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(3,30,50,0.92) 0%, rgba(3,30,50,0.3) 50%, transparent 100%)"
                  }} />
                  {/* text on image */}
                  <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                    <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 4px", lineHeight: 1.3 }}>
                      {hoveredService.label}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11.5px", margin: 0, lineHeight: 1.5 }}>
                      {hoveredService.desc}
                    </p>
                  </div>
                </div>
                {/* view all strip */}
                <div style={{ padding: "12px 16px", background: "#f8fbfc", borderTop: "1px solid rgba(3,70,101,0.07)", flexShrink: 0 }}>
                  <NavLink
                    to="/services"
                    onClick={() => setDropdownOpen(false)}
                    className="inline-flex items-center gap-2 no-underline px-4 py-2 rounded-full text-[12px] font-bold text-white bg-[linear-gradient(137.68deg,#61BBC5_0.13%,#034665_100%)] hover:opacity-90 hover:no-underline transition-all duration-200 w-fit"
                  >
                    View all services <i className="bi bi-arrow-right text-[11px]" />
                  </NavLink>
                </div>
              </div>

            </div>
          </div>
          {/* end mega-menu */}

        </div>
        {/* end navbar pill */}
      </div>
      {/* end outer wrapper */}


      {/* ════════════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════════════ */}
      <div
        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          transition: 'opacity 0.3s',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        className="hidden max-[900px]:block"
      />

      {/* ════════════════════════════════════════════════
          MOBILE DRAWER  — slides in from the RIGHT
      ════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '280px',
          background: '#fff',
          zIndex: 1001,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          transition: 'transform 0.3s ease',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        className="hidden max-[900px]:flex"
      >
        {/* ── Header row: logo + close button ── */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[rgba(13,61,90,0.08)]" style={{ flexShrink: 0 }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          <button
            onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
            aria-label="Close menu"
            style={{
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(13,61,90,0.08)',
              border: 'none',
              cursor: 'pointer',
              color: '#0d3d5a',
              fontSize: '18px',
              flexShrink: 0,
            }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* ── Nav links ── */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px', gap: '4px', flex: 1, overflowY: 'auto' }}>
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileServicesOpen((p) => !p)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px', borderRadius: '10px',
                    fontSize: '15px', fontWeight: 600,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#0d3d5a',
                  }}
                >
                  {link.label}
                  <i className={`bi bi-chevron-down`} style={{ fontSize: '12px', transition: 'transform 0.25s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {/* Services sub-list */}
                {mobileServicesOpen && (
                  <div style={{ marginLeft: '12px', paddingLeft: '10px', borderLeft: '2px solid rgba(97,187,197,0.5)', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px', marginBottom: '4px' }}>
                    {services.map((svc) => (
                      <NavLink
                        key={svc.label}
                        to={svc.to}
                        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 500, color: '#1a2e3b', textDecoration: 'none' }}
                        className="hover:bg-[rgba(97,187,197,0.1)] hover:text-[#034665]"
                      >
                        <i className={`bi ${svc.icon}`} style={{ color: '#61BBC5', fontSize: '13px', flexShrink: 0 }} />
                        <span style={{ lineHeight: 1.3 }}>{svc.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-[10px] rounded-[10px] text-[15px] font-semibold transition-all duration-200 no-underline
                   ${isActive ? "bg-[rgba(13,61,90,0.08)] text-[#0d3d5a]" : "text-[#0d3d5a] hover:bg-[rgba(13,61,90,0.06)]"}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}

          <NavLink
            to="/apply-now"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', background: 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)', padding: '12px 16px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}
          >
            Apply Now
          </NavLink>
        </div>
      </div>
    </>
  );
}
