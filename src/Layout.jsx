import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const isCaseStudy = pathname.startsWith('/case-study/');

  return (
    <>
      <Header />

      {/* Fixed "Back to Portfolio" — only on case study pages, rendered at root level so position:fixed always works */}
      {isCaseStudy && (
        <Link
          to="/portfolio"
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '28px',
            zIndex: 9999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#034665',
            border: '1px solid rgba(97,187,197,0.4)',
            borderRadius: '999px',
            padding: '12px 22px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fff',
            textDecoration: 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(3,70,101,0.35), 0 2px 8px rgba(0,0,0,0.15)',
            transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
            fontFamily: 'Inter, Nunito Sans, sans-serif',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#61BBC5';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(97,187,197,0.45)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#034665';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(3,70,101,0.35)';
          }}
          aria-label="Back to Portfolio"
        >
          <i className="bi bi-arrow-left" style={{ fontSize: '0.9rem' }} />
          <span>Back to Portfolio</span>
        </Link>
      )}

      <Outlet />
      <Footer />
    </>
  );
}
