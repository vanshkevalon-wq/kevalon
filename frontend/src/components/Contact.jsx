import React, { useState } from 'react';
import { apiRequest } from '../utils/api';
import './Contact.css';

const contactInfo = [
  {
    icon: 'bi-envelope-fill',
    label: 'Email Us',
    value: 'contact@kevalontechnology.in',
    sub: 'We reply within 24 hours',
  },
  {
    icon: 'bi-telephone-fill',
    label: 'Call Us',
    value: '+91 98765 43210',
    sub: 'Mon – Sat, 9 AM – 7 PM IST',
  },
  {
    icon: 'bi-geo-alt-fill',
    label: 'Visit Us',
    value: 'Ahmedabad, Gujarat, India',
    sub: 'Available for in-person meetings',
  },
];

const Contact = ({ showMap = false }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', service: '', message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });
    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      });
      setStatus({ type: 'success', message: 'Message sent! We\'ll be in touch soon.' });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
      e.target.reset();
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Could not send message. Please try again.' });
    }
  };

  return (
    <section className="ct-section">
      {/* bg decoration */}
      <div className="ct-bg-orb ct-bg-orb--1" aria-hidden="true" />
      <div className="ct-bg-orb ct-bg-orb--2" aria-hidden="true" />
      <div className="ct-bg-dots"            aria-hidden="true" />

      <div className="ct-container">
        <div className="ct-grid">

          {/* ── LEFT PANEL ── */}
          <div className="ct-left">
            <div className="ct-left__inner">
              <div className="ct-badge">
                <span className="ct-badge__dot" />
                Let's Talk
              </div>

              <h2 className="ct-left__title">
                Got a Project<br />
                <span>in Mind?</span>
              </h2>

              <p className="ct-left__body">
                Whether you're a startup or an enterprise, we'd love to hear about your
                vision. Drop us a message and our team will get back to you within 24 hours.
              </p>

              <div className="ct-info-list">
                {contactInfo.map((item) => (
                  <div key={item.label} className="ct-info-item">
                    <div className="ct-info-item__icon">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <p className="ct-info-item__label">{item.label}</p>
                      <p className="ct-info-item__value">{item.value}</p>
                      <p className="ct-info-item__sub">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* social row */}
              <div className="ct-socials">
                {[
                  { icon: 'bi-linkedin',  href: '#' },
                  { icon: 'bi-twitter-x', href: '#' },
                  { icon: 'bi-instagram', href: '#' },
                  { icon: 'bi-github',    href: '#' },
                ].map((s) => (
                  <a key={s.icon} href={s.href} className="ct-social-btn" aria-label={s.icon}>
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM ── */}
          <div className="ct-right">
            <div className="ct-form-card">
              <div className="ct-form-card__head">
                <h3>Send us a message</h3>
                <p>Fill in the details below and we'll respond promptly.</p>
              </div>

              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-form__row">
                  <div className={`ct-field ${focused === 'firstName' || formData.firstName ? 'ct-field--active' : ''}`}>
                    <label htmlFor="ct-firstName">First name <span>*</span></label>
                    <div className="ct-field__wrap">
                      <i className="bi bi-person" />
                      <input
                        id="ct-firstName" name="firstName" type="text"
                        placeholder="Alex" required
                        value={formData.firstName} onChange={handleChange}
                        onFocus={() => setFocused('firstName')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                  </div>

                  <div className={`ct-field ${focused === 'lastName' || formData.lastName ? 'ct-field--active' : ''}`}>
                    <label htmlFor="ct-lastName">Last name <span>*</span></label>
                    <div className="ct-field__wrap">
                      <i className="bi bi-person" />
                      <input
                        id="ct-lastName" name="lastName" type="text"
                        placeholder="Chen" required
                        value={formData.lastName} onChange={handleChange}
                        onFocus={() => setFocused('lastName')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                  </div>
                </div>

                <div className={`ct-field ${focused === 'email' || formData.email ? 'ct-field--active' : ''}`}>
                  <label htmlFor="ct-email">Email address <span>*</span></label>
                  <div className="ct-field__wrap">
                    <i className="bi bi-envelope" />
                    <input
                      id="ct-email" name="email" type="email"
                      placeholder="alex@example.com" required
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                    />
                  </div>
                </div>

                <div className="ct-form__row">
                  <div className={`ct-field ${focused === 'phone' || formData.phone ? 'ct-field--active' : ''}`}>
                    <label htmlFor="ct-phone">Phone number</label>
                    <div className="ct-field__wrap">
                      <i className="bi bi-telephone" />
                      <input
                        id="ct-phone" name="phone" type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                  </div>

                  <div className={`ct-field ${focused === 'service' || formData.service ? 'ct-field--active' : ''}`}>
                    <label htmlFor="ct-service">Service needed</label>
                    <div className="ct-field__wrap">
                      <i className="bi bi-grid" />
                      <select
                        id="ct-service" name="service"
                        value={formData.service} onChange={handleChange}
                        onFocus={() => setFocused('service')}
                        onBlur={() => setFocused('')}
                      >
                        <option value="">Select a service</option>
                        {['Web Development','Mobile App','Custom Software','SEO Services','UI/UX Design','Other'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`ct-field ${focused === 'message' || formData.message ? 'ct-field--active' : ''}`}>
                  <label htmlFor="ct-message">Your message <span>*</span></label>
                  <div className="ct-field__wrap ct-field__wrap--textarea">
                    <i className="bi bi-chat-text" />
                    <textarea
                      id="ct-message" name="message" rows="5"
                      placeholder="Tell us about your project, goals, and timeline..." required
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                    />
                  </div>
                </div>

                {status.message && (
                  <div className={`ct-status ct-status--${status.type}`}>
                    <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                    {status.message}
                  </div>
                )}

                <button type="submit" className="ct-submit" disabled={status.type === 'loading'}>
                  {status.type === 'loading' ? (
                    <><span className="ct-spinner" /> Sending…</>
                  ) : (
                    <>Send Message <i className="bi bi-send-fill" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAP SECTION — only on /contact page ── */}
      {showMap && (
        <div className="ct-map-section">
          <div className="ct-container">

            <div className="ct-map-header">
              <div className="ct-map-header__left">
                <div className="ct-badge">
                  <span className="ct-badge__dot" />
                  Find Us
                </div>
                <h3 className="ct-map-title">Our Location</h3>
                <p className="ct-map-sub">
                  We're based in Ahmedabad, Gujarat — the heart of India's tech and startup ecosystem.
                  Drop by or reach us online anytime.
                </p>
              </div>
              <div className="ct-map-header__chips">
                <div className="ct-map-chip">
                  <i className="bi bi-geo-alt-fill" />
                  <span>Ahmedabad, Gujarat 380001</span>
                </div>
                <div className="ct-map-chip">
                  <i className="bi bi-clock-fill" />
                  <span>Mon – Sat · 9 AM – 7 PM IST</span>
                </div>
                <div className="ct-map-chip">
                  <i className="bi bi-telephone-fill" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="ct-map-frame-wrap">
              {/* decorative corner accents */}
              <div className="ct-map-corner ct-map-corner--tl" aria-hidden="true" />
              <div className="ct-map-corner ct-map-corner--tr" aria-hidden="true" />
              <div className="ct-map-corner ct-map-corner--bl" aria-hidden="true" />
              <div className="ct-map-corner ct-map-corner--br" aria-hidden="true" />

              <iframe
                className="ct-map-iframe"
                title="Kevalon Technology Location — Ahmedabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.6854044491!2d72.41493582929688!3d23.020584800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* floating info card over the map */}
              <div className="ct-map-card">
                <div className="ct-map-card__icon">
                  <i className="bi bi-building" />
                </div>
                <div>
                  <p className="ct-map-card__name">Kevalon Technology</p>
                  <p className="ct-map-card__addr">Ahmedabad, Gujarat, India</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ahmedabad,Gujarat,India"
                  target="_blank"
                  rel="noreferrer"
                  className="ct-map-card__link"
                  aria-label="Open in Google Maps"
                >
                  <i className="bi bi-box-arrow-up-right" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Contact;
