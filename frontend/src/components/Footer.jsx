import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../Images/Logo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">

          {/* ── Logo & Description ── */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 pe-lg-4">
            <div className="footer-logo mb-3">
              <img src={logo} alt="Kevalon Technology" style={{ maxWidth: '200px', height: 'auto' }} />
            </div>
            <p className="footer-description">
              Kevalon Technology — Leading IT company in Ahmedabad, Gujarat, India.
              Expert website development, mobile app development (Flutter, React Native,
              Android, iOS), SEO services, and digital marketing solutions. Your Digital
              Growth Partner.
            </p>
            <p className="footer-services-list mt-3">
              Best IT Company in Ahmedabad | Web Development | Mobile App Development | CRM Solutions
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* ── Our Expertise ── */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="footer-heading">Our Expertise</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/services/web-application-development">Web Application Development</Link></li>
              <li><Link to="/services/mobile-application-development">Mobile Application Development</Link></li>
              <li><Link to="/services/game-development">Game Development</Link></li>
              <li><Link to="/services/e-commerce-development">E-Commerce Development</Link></li>
              <li><Link to="/services/web-erp-development">Web ERP Development</Link></li>
              <li><Link to="/services/api-development">API Development</Link></li>
              <li><Link to="/services/internship-training">Internship &amp; Training</Link></li>
              <li><Link to="/services/crm-development">CRM Development</Link></li>
              <li><Link to="/services/seo-digital-marketing">SEO &amp; Digital Marketing</Link></li>
            </ul>
          </div>

          {/* ── Get in Touch ── */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Get in Touch</h5>
            <div className="footer-contact-info">

              <div className="contact-item d-flex mb-3">
                <i className="bi bi-envelope me-3 fs-5" />
                <div>
                  <strong>Email</strong>
                  <p className="mb-0">
                    <a href="mailto:career@kevalontechnology.in">career@kevalontechnology.in</a>
                  </p>
                  <p className="mb-0">
                    <a href="mailto:ceo@kevalontechnology.in">ceo@kevalontechnology.in</a>
                  </p>
                </div>
              </div>

              <div className="contact-item d-flex mb-3">
                <i className="bi bi-telephone me-3 fs-5" />
                <div>
                  <strong>Phone</strong>
                  <p className="mb-0">
                    <a href="tel:+919081012218">+91 9081012218</a> /{' '}
                    <a href="tel:+919104012218">+91 9104012218</a>
                  </p>
                </div>
              </div>

              <div className="contact-item d-flex mb-3">
                <i className="bi bi-geo-alt me-3 fs-5" />
                <div>
                  <strong>Office</strong>
                  <p className="mb-0">913, Solaris Business Hub</p>
                  <p className="mb-0">Parshwanath Jain BRTS, Bhuyangdev</p>
                  <p className="mb-0">Ahmedabad, Gujarat</p>
                </div>
              </div>

            </div>

            <div className="footer-social-icons mt-4">
              <a href="https://www.linkedin.com/company/kevalon-technology" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://x.com/KevalonT" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter / X">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="https://www.instagram.com/kevalon_technology" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="https://wa.link/a02fdn" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">
                <i className="bi bi-whatsapp" />
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom text-center mt-5">
          <p className="mb-0">&copy; 2026 Kevalon Technology &mdash; All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
