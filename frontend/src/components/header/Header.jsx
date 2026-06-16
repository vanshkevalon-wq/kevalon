import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../Images/Logo.png";
import internshipTrainingImage from "../../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg";

const navLinks = [
  { label: "Home",      to: "/"          },
  { label: "About",     to: "/about"     },
  { label: "Services",  to: "/services",  hasDropdown: true },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Careers",   to: "/careers"   },
  { label: "Contact",   to: "/contact"   },
];

const services = [
  { label: "Web Application Development",    desc: "React, Next.js, Node.js, MongoDB",           icon: "bi-code-slash",       to: "/services/web-application-development",    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80" },
  { label: "Mobile App Development",         desc: "iOS, Android, Flutter, React Native",        icon: "bi-phone",            to: "/services/mobile-application-development", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80" },
  { label: "Game Development",               desc: "Unity, 2D & 3D, Cross-Platform",             icon: "bi-controller",       to: "/services/game-development",               image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"    },
  { label: "E-Commerce Development",         desc: "Shopify, WooCommerce, Custom Stores",        icon: "bi-cart3",            to: "/services/e-commerce-development",         image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"    },
  { label: "Web ERP Development",            desc: "Enterprise ERP, Integrations, Reporting",   icon: "bi-kanban",           to: "/services/web-erp-development",            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { label: "SEO & Digital Marketing",        desc: "SEO, Social Media, Growth Strategy",         icon: "bi-graph-up-arrow",   to: "/services/seo-digital-marketing",          image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80" },
  { label: "CRM Development",                desc: "Custom CRM, Automation, Integrations",      icon: "bi-people-fill",      to: "/services/crm-development",                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { label: "API Development",                desc: "RESTful & GraphQL APIs, Microservices",      icon: "bi-plug",             to: "/services/api-development",                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"    },
  { label: "Field Force Management",         desc: "Mobile-first field apps, tracking, reporting", icon: "bi-geo-alt",        to: "/services/field-force-management",         image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" },
  { label: "Internship/Training",            desc: "Workshops, Live Projects, Hands-on Training", icon: "bi-mortarboard-fill",to: "/services/internship-training",            image: internshipTrainingImage },
];

export default function Header() {
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [dropdownOpen,       setDropdownOpen]       = useState(false);
  const [hoveredService,     setHoveredService]     = useState(services[0]);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled,           setScrolled]           = useState(false);
  const closeTimer = useRef(null);

  const isGlass = !scrolled;

  const openDropdown     = () => { clearTimeout(closeTimer.current); setDropdownOpen(true);  };
  const closeDropdown    = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 150); };
  const closeDropdownNow = () => { clearTimeout(closeTimer.current); setDropdownOpen(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinkCls = ({ isActive }) =>
    `relative inline-block px-1 py-1 transition-all duration-300 border-b-2 text-[#0d3d5a]
     ${isActive
       ? "border-[#61BBC5] text-[#0d3d5a]"
       : "border-transparent hover:text-[#61BBC5] hover:border-[#61BBC5]"}`;

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          FIXED HEADER WRAPPER
      ═══════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-[999] flex justify-center font-['Nunito_Sans',sans-serif]"
        style={{ padding: isGlass ? "10px 12px 6px" : "0" }}
      >
        {/* ── Navbar pill / bar ── */}
        <div
          className="w-full relative flex items-center justify-between transition-all duration-400"
          onMouseLeave={closeDropdown}
          style={{
            maxWidth:     isGlass ? "1400px" : "100%",
            borderRadius: isGlass ? "999px"  : "0px",
            padding:      isGlass ? "10px 16px" : "10px 20px",
            /* Responsive padding via clamp */
            background:   isGlass ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(28px) saturate(200%) brightness(1.25)",
            WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.25)",
            border:       isGlass ? "1px solid rgba(255,255,255,0.65)" : "none",
            borderBottom: !isGlass ? "1px solid rgba(97,187,197,0.18)" : "none",
            boxShadow:    isGlass
              ? "0 8px 32px rgba(97,187,197,0.22),0 2px 8px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.9)"
              : "0 4px 24px rgba(3,70,101,0.12)",
          }}
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center shrink-0 cursor-pointer">
            <img
              src={logo}
              alt="Kevalon Technology"
              className="h-[38px] sm:h-[44px] md:h-[50px] lg:h-[56px] w-auto object-contain"
            />
          </NavLink>

          {/* ── Desktop nav — hidden below 901px ── */}
          <nav className="hidden min-[901px]:flex items-center gap-[clamp(14px,2vw,32px)] mx-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} onMouseEnter={openDropdown} className="relative">
                  <NavLink
                    to={link.to}
                    className="group relative cursor-pointer whitespace-nowrap text-[clamp(13px,1.3vw,15px)] font-semibold tracking-[0.1px] transition-all duration-300 flex items-center gap-0.5"
                  >
                    {({ isActive }) => (
                      <span className={navLinkCls({ isActive })}>
                        {link.label}
                        <i className="bi bi-chevron-down text-[10px] ml-0.5 opacity-60" />
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
                  className="whitespace-nowrap text-[clamp(13px,1.3vw,15px)] font-semibold tracking-[0.1px] transition-all duration-300"
                >
                  {({ isActive }) => (
                    <span className={navLinkCls({ isActive })}>{link.label}</span>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* ── Right side: Apply Now + Hamburger ── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <NavLink
              to="/apply-now"
              className="hidden min-[901px]:inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold text-white whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_24px_rgba(3,70,101,0.28)]"
              style={{ background: "linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)" }}
            >
              Apply Now
            </NavLink>

            {/* Hamburger — visible below 901px */}
            <button
              onClick={() => { setMenuOpen(p => !p); if (menuOpen) setMobileServicesOpen(false); }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex min-[901px]:hidden flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer bg-transparent border-none p-1.5 rounded-lg transition-colors duration-200 hover:bg-[rgba(3,70,101,0.06)]"
            >
              <span className={`block w-full h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`block w-full h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-full h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
            </button>
          </div>

          {/* ══ MEGA-MENU (desktop only) ══ */}
          <div
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            className={`
              absolute z-[9999] hidden min-[901px]:block
              bg-white rounded-[20px] overflow-hidden
              shadow-[0_24px_64px_rgba(3,70,101,0.18)]
              border border-[rgba(3,70,101,0.08)]
              transition-all duration-200 ease-out origin-top
              ${dropdownOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
            `}
            style={{
              top: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(860px, calc(100vw - 32px))",
            }}
          >
            <div className="flex items-stretch" style={{ minHeight: 420 }}>
              {/* service grid — 58% */}
              <div className="py-4 px-4 border-r border-[rgba(3,70,101,0.07)]" style={{ width: "58%" }}>
                <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-[#9ca3af] mb-3 px-1">Our Services</p>
                <div className="grid grid-cols-3 gap-1">
                  {services.map(svc => (
                    <NavLink
                      key={svc.label}
                      to={svc.to}
                      onMouseEnter={() => setHoveredService(svc)}
                      onClick={() => setDropdownOpen(false)}
                      className={`group/item flex flex-col items-center gap-1 px-2 py-2 rounded-[12px] text-center transition-all duration-150 cursor-pointer border
                        ${hoveredService.label === svc.label
                          ? "bg-[rgba(97,187,197,0.10)] border-[rgba(97,187,197,0.35)] shadow-[0_2px_14px_rgba(97,187,197,0.15)]"
                          : "border-transparent hover:bg-[rgba(3,70,101,0.04)] hover:border-[rgba(3,70,101,0.08)]"}`}
                    >
                      <span className={`w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full flex items-center justify-center text-[15px] shrink-0 transition-all duration-150
                        ${hoveredService.label === svc.label
                          ? "bg-[linear-gradient(137deg,#61BBC5,#034665)] text-white shadow-[0_4px_14px_rgba(97,187,197,0.4)]"
                          : "bg-[rgba(3,70,101,0.07)] text-[#034665] group-hover/item:bg-[linear-gradient(137deg,#61BBC5,#034665)] group-hover/item:text-white"}`}
                      >
                        <i className={`bi ${svc.icon}`} />
                      </span>
                      <p className={`text-[11px] font-semibold mb-0 leading-snug transition-colors duration-150
                        ${hoveredService.label === svc.label ? "text-[#034665]" : "text-[#1a2e3b] group-hover/item:text-[#0a8fb6]"}`}
                      >
                        {svc.label}
                      </p>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* image preview — 42% */}
              <div className="flex flex-col" style={{ width: "42%" }}>
                <div className="flex-1 relative overflow-hidden" style={{ minHeight: 360 }}>
                  <img
                    key={hoveredService.label}
                    src={hoveredService.image}
                    alt={hoveredService.label}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,30,50,0.92) 0%,rgba(3,30,50,0.3) 50%,transparent 100%)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-[14px] font-bold m-0 mb-1 leading-[1.3]">{hoveredService.label}</p>
                    <p className="text-white/75 text-[11.5px] m-0 leading-[1.5]">{hoveredService.desc}</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-[#f8fbfc] border-t border-[rgba(3,70,101,0.07)] flex-shrink-0">
                  <NavLink
                    to="/services"
                    onClick={() => setDropdownOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white w-fit transition-opacity duration-200 hover:opacity-90"
                    style={{ background: "linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)" }}
                  >
                    View all services <i className="bi bi-arrow-right text-[11px]" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═════════════════════════════
          MOBILE OVERLAY
      ═════════════════════════════ */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 min-[901px]:hidden"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
      />

      {/* ═════════════════════════════
          MOBILE DRAWER (right slide-in)
      ═════════════════════════════ */}
      <div
        className="fixed top-0 right-0 h-full w-[min(300px,85vw)] bg-white z-[1001] flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] min-[901px]:hidden"
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[rgba(13,61,90,0.08)] flex-shrink-0">
          <img src={logo} alt="Kevalon" className="h-9 w-auto object-contain" />
          <button
            onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(13,61,90,0.08)] border-none cursor-pointer text-[#0d3d5a] text-[18px] transition-colors duration-200 hover:bg-[rgba(13,61,90,0.14)]"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* drawer links */}
        <div className="flex flex-col px-3 py-3 gap-1 flex-1 overflow-y-auto">
          {navLinks.map(link =>
            link.hasDropdown ? (
              <div key={link.label}>
                {/* ── Services row:
                     LEFT  = NavLink label → navigates to /services page
                     RIGHT = chevron button → only toggles the dropdown
                ── */}
                <div
                  className="flex items-center rounded-[10px] transition-colors duration-200"
                  style={{ background: mobileServicesOpen ? "rgba(97,187,197,0.07)" : "transparent" }}
                >
                  {/* label — navigates */}
                  <NavLink
                    to={link.to}
                    end
                    onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                    className={({ isActive }) =>
                      `flex-1 px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200 rounded-[10px]
                       ${isActive ? "bg-[rgba(13,61,90,0.08)] text-[#0d3d5a]" : "text-[#0d3d5a]"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {/* chevron — toggles dropdown only */}
                  <button
                    onClick={() => setMobileServicesOpen(p => !p)}
                    aria-label="Toggle services dropdown"
                    className="flex items-center justify-center w-10 h-full py-2.5 pr-3 flex-shrink-0 border-none bg-transparent cursor-pointer text-[#61BBC5]"
                  >
                    <i
                      className="bi bi-chevron-down text-[13px] transition-transform duration-300"
                      style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                </div>

                {/* animated services sub-list */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: mobileServicesOpen ? `${services.length * 52}px` : "0px",
                    opacity:   mobileServicesOpen ? 1 : 0,
                  }}
                >
                  <div className="ml-3 pl-3 border-l-2 border-[rgba(97,187,197,0.45)] flex flex-col gap-0.5 py-1">
                    {services.map(svc => (
                      <NavLink
                        key={svc.label}
                        to={svc.to}
                        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[12.5px] font-medium transition-colors duration-150
                           ${isActive ? "bg-[rgba(97,187,197,0.12)] text-[#034665]" : "text-[#1a2e3b] hover:bg-[rgba(97,187,197,0.10)] hover:text-[#034665]"}`
                        }
                      >
                        <i className={`bi ${svc.icon} text-[#61BBC5] text-[13px] flex-shrink-0`} />
                        <span className="leading-[1.3]">{svc.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-[10px] text-[15px] font-semibold transition-colors duration-200 block
                   ${isActive ? "bg-[rgba(13,61,90,0.08)] text-[#0d3d5a]" : "text-[#0d3d5a] hover:bg-[rgba(13,61,90,0.05)]"}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}

          <NavLink
            to="/apply-now"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center rounded-full px-4 py-3 font-semibold text-[15px] text-white mt-3 transition-opacity duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)" }}
          >
            Apply Now
          </NavLink>
        </div>
      </div>
    </>
  );
}
