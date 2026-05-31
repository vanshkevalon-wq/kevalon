import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import internshipTrainingImage from "../../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg";
import crmPreviewImage from "../../Images/fa88305e0eb98cb1d11865dba2fbfda76e2af9ae.jpg";

const navLinks = [
  { label: "Home",      to: "/"         },
  { label: "About",     to: "/about"    },
  { label: "Services",  to: "/services", hasDropdown: true },
  { label: "Portfolio", to: "/portfolio"},
  { label: "Contact",   to: "/contact"  },
];

const services = [
  {
    label: "Web Application Development",
    desc:  "React, Next.js, Node.js, MongoDB",
    icon:  "bi-code-slash",
    to:    "/services/web-application-development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    label: "Mobile App Development",
    desc:  "iOS, Android, Flutter, React Native",
    icon:  "bi-phone",
    to:    "/services/mobile-application-development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
  {
    label: "Game Development",
    desc:  "Unity, 2D & 3D, Cross-Platform",
    icon:  "bi-controller",
    to:    "/services/game-development",
    image: "https://images.pexels.com/photos/7776195/pexels-photo-7776195.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-7776195.jpg&fm=jpg",
  },
  {
    label: "E-Commerce Development",
    desc:  "Shopify, WooCommerce, Custom Stores",
    icon:  "bi-cart3",
    to:    "/services/e-commerce-development",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Web ERP Development",
    desc:  "Enterprise ERP, Integrations, Reporting",
    icon:  "bi-kanban",
    to:    "/services/web-erp-development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    label: "SEO & Digital Marketing",
    desc:  "SEO, Social Media, Growth Strategy",
    icon:  "bi-graph-up-arrow",
    to:    "/services/seo-digital-marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80",
  },
  {
    label: "CRM Development",
    desc:  "Custom CRM, Automation, Integrations",
    icon:  "bi-people-fill",
    to:    "/services/crm-development",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    label: "API Development",
    desc:  "RESTful & GraphQL APIs, Microservices",
    icon:  "bi-plug",
    to:    "/services/api-development",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
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
  const [hoveredService,    setHoveredService]    = useState(services.find((service) => service.label === "E-Commerce Development") || services[0]);
  const [mobileServicesOpen,setMobileServicesOpen]= useState(false);
  const closeTimer = useRef(null);

  const openDropdown  = () => { clearTimeout(closeTimer.current); setDropdownOpen(true);  };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 150); };

  return (
    <>
      {/* ════════════════════════════════════════════════
          OUTER WRAPPER  — position:relative so the
          mega-menu can be absolutely positioned to it
      ════════════════════════════════════════════════ */}
      <div className="w-full flex justify-center mt-2 font-['Nunito_Sans'] px-0 max-[900px]:px-2 relative z-50">

        {/* ── Navbar pill ── */}
        <div
          className="
            relative w-full max-w-none
            flex items-center justify-between
            px-[18px] pr-6 py-[12px]
            rounded-[64px]
            border border-[rgba(97,187,197,0.14)]
            shadow-[inset_0px_18.5px_40.6px_-3.5px_rgba(3,70,101,0.06),0px_8px_24px_rgba(3,70,101,0.10)]
            bg-[linear-gradient(135deg,rgba(255,255,255,0.86)_0%,rgba(241,250,252,0.74)_100%)]
            backdrop-blur-[14px]
            max-[900px]:rounded-[22px] max-[900px]:px-4 max-[900px]:pr-3
          "
          /* keep dropdown alive when mouse moves from nav link into the panel */
          onMouseLeave={closeDropdown}
        >

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Pyj6mPiWW/p4s798c4_expires_30_days.png"
              alt="Kevalon Technology Logo"
              className="h-[clamp(42px,6vw,58px)] w-auto object-contain"
            />
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden min-[901px]:flex items-center gap-[clamp(16px,2.2vw,36px)] mx-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} onMouseEnter={() => { const ecommerce = services.find((service) => service.label === 'E-Commerce Development'); if (ecommerce) setHoveredService(ecommerce); openDropdown(); }}>
                  <NavLink
                    to={link.to}
                    className="group relative cursor-pointer whitespace-nowrap text-[clamp(14px,1.4vw,16px)] font-semibold tracking-[0.1px] pb-[5px] transition-all duration-300 flex items-center gap-1"
                  >
                    {({ isActive }) => (
                      <span className={`
                        relative inline-flex items-center gap-1 px-1 py-1
                        transition-all duration-300 border-b-2 border-transparent
                        ${isActive
                          ? "text-[#0d3d5a]"
                          : "text-[#374151]"}
                        group-hover:text-[#0a8fb6] group-hover:border-[#0a8fb6]
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
                  className="group relative cursor-pointer whitespace-nowrap text-[clamp(14px,1.4vw,16px)] font-semibold tracking-[0.1px] pb-[5px] transition-all duration-300"
                >
                  {({ isActive }) => (
                    <span className={`
                      relative inline-block px-1 py-1
                      transition-all duration-300 border-b-2
                      ${isActive
                        ? "text-[#0d3d5a] border-[#0a8fb6]"
                        : "text-[#374151] border-transparent"}
                      group-hover:text-[#0a8fb6] group-hover:border-[#0a8fb6]
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
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              className="flex min-[901px]:hidden flex-col gap-[5px] cursor-pointer p-[6px] bg-transparent border-none z-[1001]"
            >
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-[22px] h-[2.5px] rounded-[2px] bg-[#0d3d5a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
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
            style={{ top: "100%" }}
            className={`
              absolute left-0 right-0 z-[60]
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
            <div className="flex">

              {/* ── Left: 3×2 service grid (62%) ── */}
              <div className="py-4 px-4 border-r border-[rgba(3,70,101,0.07)]" style={{ width: "62%" }}>

                {/* section label */}
                <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-[#9ca3af] mb-3 px-1">
                  Our Services
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {services.map((svc) => (
                    <NavLink
                      key={svc.label}
                      to={svc.to}
                      onMouseEnter={() => setHoveredService(svc)}
                      onClick={() => setDropdownOpen(false)}
                      className={`
                        group/item flex flex-col items-center gap-2 px-2 py-3 rounded-[14px] text-center
                        transition-all duration-150 cursor-pointer border no-underline
                        ${hoveredService.label === svc.label
                          ? "bg-[rgba(97,187,197,0.10)] border-[rgba(97,187,197,0.35)] shadow-[0_2px_14px_rgba(97,187,197,0.15)]"
                          : "border-transparent hover:bg-[rgba(3,70,101,0.04)] hover:border-[rgba(3,70,101,0.08)]"}
                      `}
                    >
                      {/* icon */}
                      <span className={`
                        w-10 h-10 rounded-[12px] flex items-center justify-center text-[17px]
                        transition-all duration-150
                        ${hoveredService.label === svc.label
                          ? "bg-[linear-gradient(137deg,#61BBC5,#034665)] text-white shadow-[0_4px_14px_rgba(97,187,197,0.4)]"
                          : "bg-[rgba(3,70,101,0.07)] text-[#034665] group-hover/item:bg-[linear-gradient(137deg,#61BBC5,#034665)] group-hover/item:text-white"}
                      `}>
                        <i className={`bi ${svc.icon}`} />
                      </span>

                      {/* label */}
                      <p className={`
                        text-[11.5px] font-semibold mb-0 leading-snug
                        transition-colors duration-150
                        ${hoveredService.label === svc.label ? "text-[#034665]" : "text-[#1a2e3b]"}
                        group-hover/item:text-[#0a8fb6]
                      `}>
                        {svc.label}
                      </p>

                      {/* desc */}
                      <p className="text-[10.5px] text-[#9ca3af] mb-0 leading-snug">
                        {svc.desc}
                      </p>
                    </NavLink>
                  ))}
                </div>

                {/* CTA strip */}
                <div className="border-t border-[rgba(3,70,101,0.07)] px-1 pt-3 mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#9ca3af]">Need a custom solution?</span>
                  <NavLink
                    to="/contact"
                    onClick={() => setDropdownOpen(false)}
                    className="text-[11.5px] font-semibold text-white bg-[linear-gradient(137deg,#61BBC5,#034665)] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Talk to us →
                  </NavLink>
                </div>
              </div>

              {/* ── Right: image preview (38%) ── */}
              <div className="flex flex-col" style={{ width: "38%" }}>

                {/* image */}
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    key={hoveredService.label}
                    src={hoveredService.image}
                    alt={hoveredService.label}
                    className="w-full h-full object-cover"
                    style={{ transition: "opacity 0.25s ease" }}
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031e32ee] via-[#031e3244] to-transparent" />
                  {/* title on image */}
                  <p className="absolute bottom-3 left-4 right-4 text-white text-[13px] font-bold leading-snug m-0 drop-shadow-md">
                    {hoveredService.label}
                  </p>
                </div>

                {/* desc + link */}
                <div className="px-5 py-4 flex flex-col gap-3 flex-1 justify-between bg-[#f8fbfc]">
                  <div>
                    <p className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[#9ca3af] mb-1">
                      Tech Stack
                    </p>
                    <p className="text-[12.5px] text-[#374151] leading-relaxed m-0 font-medium">
                      {hoveredService.desc}
                    </p>
                  </div>
                  <NavLink
                    to="/services"
                    onClick={() => setDropdownOpen(false)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#034665] hover:text-[#0a8fb6] transition-colors duration-200 w-fit"
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
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[998] transition-all duration-300 hidden max-[900px]:block ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* ════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════ */}
      <div className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-[999] shadow-[10px_0_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hidden max-[900px]:flex flex-col overflow-y-auto ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-[rgba(13,61,90,0.08)]">
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Pyj6mPiWW/p4s798c4_expires_30_days.png"
            alt="logo"
            className="h-[45px]"
          />
          <button onClick={() => setMenuOpen(false)} className="text-[30px] leading-none text-[#0d3d5a] hover:opacity-70 transition-opacity">
            &times;
          </button>
        </div>

        <div className="flex flex-col px-4 py-5 gap-2">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileServicesOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-[12px] text-[15px] font-semibold text-[#0d3d5a] hover:bg-[rgba(13,61,90,0.06)] transition-all duration-200"
                >
                  {link.label}
                  <i className={`bi bi-chevron-down text-[12px] transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-3 mt-1 flex flex-col gap-1">
                    {services.map((svc) => (
                      <NavLink
                        key={svc.label}
                        to={svc.to}
                        onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13.5px] font-medium text-[#1a2e3b] hover:bg-[rgba(97,187,197,0.1)] hover:text-[#034665] transition-all duration-200"
                      >
                        <i className={`bi ${svc.icon} text-[#034665] text-[14px]`} />
                        {svc.label}
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
                  `px-4 py-3 rounded-[12px] text-[15px] font-semibold transition-all duration-200
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
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[linear-gradient(137.68deg,#61BBC5_0.13%,#034665_100%)] px-4 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Apply Now
          </NavLink>
        </div>
      </div>
    </>
  );
}
