import React, { useState } from 'react';
import { apiRequest } from '../utils/api';

const contactInfo = [
  { icon: 'bi-envelope-fill', label: 'Email Us',  value: 'career@kevalontechnology.in', sub: 'We reply within 24 hours'         },
  { icon: 'bi-telephone-fill',label: 'Call Us',   value: '+91 9081012218',               sub: 'Mon – Sat, 9 AM – 7 PM IST'       },
  { icon: 'bi-geo-alt-fill',  label: 'Visit Us',  value: 'India',                         sub: 'Available for in-person meetings'  },
];

const inputCls = [
  'w-full min-w-0 py-[0.6rem] pr-4 pl-10',
  'border-[1.5px] border-[rgba(148,163,184,0.35)] rounded-[10px]',
  "bg-[#f8fafc] text-[#0f172a] text-[0.88rem] outline-none font-['Inter',sans-serif]",
  'transition-all duration-200 appearance-none box-border',
  'focus:border-[#61BBC5] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(97,187,197,0.15)]',
  'placeholder:text-[#94a3b8]',
].join(' ');

const labelCls = 'block text-[0.82rem] font-semibold text-[#334155] tracking-[0.01em] mb-1';

/* ── Field defined OUTSIDE Contact so it never re-mounts on re-render ── */
const Field = ({ id, name, type = 'text', placeholder, required, icon, asTextarea = false, rows, value, onChange, focused, setFocused }) => (
  <div className="flex flex-col min-w-0 w-full">
    <label htmlFor={id} className={labelCls}>
      {name.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
      {required && <span className="text-[#61BBC5]"> *</span>}
    </label>
    <div className="relative w-full min-w-0">
      <i
        className={`bi ${icon} absolute left-3 text-[0.9rem] pointer-events-none transition-colors duration-200 z-10
          ${asTextarea ? 'top-[11px]' : 'top-1/2 -translate-y-1/2'}
          ${focused === name ? '!text-[#61BBC5]' : 'text-[#94a3b8]'}`}
      />
      {asTextarea ? (
        <textarea
          id={id} name={name} rows={rows || 5} placeholder={placeholder} required={required}
          value={value} onChange={onChange}
          onFocus={() => setFocused(name)} onBlur={() => setFocused('')}
          className={inputCls + ' resize-vertical min-h-[80px]'}
        />
      ) : (
        <input
          id={id} name={name} type={type} placeholder={placeholder} required={required}
          value={value} onChange={onChange}
          onFocus={() => setFocused(name)} onBlur={() => setFocused('')}
          className={inputCls}
        />
      )}
    </div>
  </div>
);

const Contact = ({ showMap = false }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
  const [status,   setStatus]   = useState({ type: 'idle', message: '' });
  const [focused,  setFocused]  = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
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
          phone: formData.phone || '',
          message: formData.message,
        }),
      });
      setStatus({ type: 'success', message: "Message sent! We'll get back to you within 24 hours." });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    }
  };

  /* shared field props */
  const fp = { onChange: handleChange, focused, setFocused };

  return (
    <section className="relative bg-white overflow-hidden font-['Inter',sans-serif] pt-[100px] sm:pt-[120px] md:pt-24 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">

      {/* bg decorations */}
      <div aria-hidden="true" className="absolute rounded-full pointer-events-none z-0 top-[-150px] left-[-120px]" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(97,187,197,0.14) 0%,transparent 70%)', filter: 'blur(90px)' }} />
      <div aria-hidden="true" className="absolute rounded-full pointer-events-none z-0 bottom-[-100px] right-[-80px]"  style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(97,187,197,0.10) 0%,transparent 70%)', filter: 'blur(90px)' }} />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.13] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle,#61BBC5 1.5px,transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-[1160px] mx-auto">

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-stretch">

          {/* ── LEFT PANEL ── */}
          <div className="flex flex-col">
            <div
              className="rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-[2.75rem_2.25rem] text-white overflow-hidden relative flex-1 flex flex-col"
              style={{ background: 'linear-gradient(145deg,#0d3846 0%,#0a2f3b 50%,#083240 100%)', boxShadow: '0 30px 80px rgba(1,72,103,0.25)', border: '1px solid rgba(97,187,197,0.2)' }}
            >
              <div className="absolute rounded-full pointer-events-none" style={{ top: -80, right: -80, width: 260, height: 260, background: 'radial-gradient(circle,rgba(97,187,197,0.3) 0%,transparent 70%)' }} />

              <div className="inline-flex items-center gap-[7px] bg-[rgba(97,187,197,0.15)] border border-[rgba(97,187,197,0.35)] text-[#b8e4f0] text-[0.72rem] font-bold tracking-[0.1em] uppercase px-3.5 py-[5px] rounded-full mb-5 sm:mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#61BBC5]" style={{ animation: 'ctPulse 2s ease-in-out infinite' }} />
                Let's Talk
              </div>

              <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-white mb-3 sm:mb-4 leading-[1.15] text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
                Got a Project<br />
                <span style={{ background: 'linear-gradient(137.68deg,#61BBC5 0%,#b8e4f0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  in Mind?
                </span>
              </h2>

              <p className="text-[rgba(200,232,240,0.85)] text-[0.88rem] sm:text-[0.92rem] leading-[1.8] mb-6 sm:mb-8">
                Whether you're a startup or an enterprise, we'd love to hear about your vision. Drop us a message and our team will get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-4 sm:gap-5 mb-auto">
                {contactInfo.map(item => (
                  <div key={item.label} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-[12px] bg-[rgba(97,187,197,0.15)] border border-[rgba(97,187,197,0.3)] flex items-center justify-center flex-shrink-0 text-[0.9rem] sm:text-[1rem] text-[#61BBC5]">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <p className="text-[0.68rem] sm:text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[rgba(200,232,240,0.7)] m-0 mb-0.5">{item.label}</p>
                      <p className="text-[0.85rem] sm:text-[0.9rem] font-semibold text-white m-0 mb-0.5">{item.value}</p>
                      <p className="text-[0.72rem] sm:text-[0.75rem] text-[rgba(200,232,240,0.65)] m-0">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM ── */}
          <div className="flex flex-col">
            <div
              className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-[rgba(97,187,197,0.18)] p-5 sm:p-8 md:p-[2.5rem_2.25rem] w-full flex-1 box-border"
              style={{ boxShadow: '0 20px 60px rgba(1,72,103,0.08)' }}
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="font-['Poppins',sans-serif] font-bold text-[1.15rem] sm:text-[1.35rem] text-[#0d2f3f] m-0 mb-1.5">Send us a message</h3>
                <p className="text-[#64748b] text-[0.85rem] sm:text-[0.88rem] m-0">Fill in the details below and we'll respond promptly.</p>
              </div>

              <form className="flex flex-col gap-4 sm:gap-[1.1rem] w-full" onSubmit={handleSubmit} noValidate>

                {/* name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
                  <Field id="ct-firstName" name="firstName" placeholder="Alex"  required icon="bi-person"   value={formData.firstName} {...fp} />
                  <Field id="ct-lastName"  name="lastName"  placeholder="Chen"  required icon="bi-person"   value={formData.lastName}  {...fp} />
                </div>

                {/* email */}
                <Field id="ct-email" name="email" type="email" placeholder="alex@example.com" required icon="bi-envelope" value={formData.email} {...fp} />

                {/* phone + service row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
                  <Field id="ct-phone" name="phone" type="tel" placeholder="+91 98765 43210" icon="bi-telephone" value={formData.phone} {...fp} />

                  {/* service select */}
                  <div className="flex flex-col min-w-0 w-full">
                    <label htmlFor="ct-service" className={labelCls}>Service needed</label>
                    <div className="relative w-full min-w-0">
                      <i className={`bi bi-grid absolute left-3 top-1/2 -translate-y-1/2 text-[0.9rem] pointer-events-none z-10 transition-colors duration-200 ${focused === 'service' ? '!text-[#61BBC5]' : 'text-[#94a3b8]'}`} />
                      <select
                        id="ct-service" name="service" value={formData.service} onChange={handleChange}
                        onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                        className={inputCls}
                      >
                        <option value="">Select a service</option>
                        {['Web Development', 'Mobile App', 'Custom Software', 'SEO Services', 'UI/UX Design', 'Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* message */}
                <Field id="ct-message" name="message" placeholder="Tell us about your project, goals, and timeline..." required icon="bi-chat-text" asTextarea rows={5} value={formData.message} {...fp} />

                {/* status */}
                {status.message && (
                  <div className={`flex items-center gap-2.5 px-4 py-3 rounded-[10px] text-[0.85rem] sm:text-[0.88rem] font-medium
                    ${status.type === 'success'
                      ? 'bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.25)] text-[#065f46]'
                      : 'bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.2)] text-[#991b1b]'
                    }`}>
                    <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                    {status.message}
                  </div>
                )}

                {/* submit */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 sm:py-4 border-0 rounded-full text-white text-[0.9rem] sm:text-[0.95rem] font-bold cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 mt-1"
                  style={{ background: 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)', boxShadow: '0 8px 24px rgba(1,72,103,0.25)', borderRadius: '9999px' }}
                >
                  {status.type === 'loading' ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/35 border-t-white rounded-full" style={{ animation: 'ctSpin 0.7s linear infinite' }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <i className="bi bi-send-fill" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAP SECTION ── */}
      {showMap && (
        <div className="px-4 sm:px-6 pb-16 sm:pb-20 bg-white mt-12 sm:mt-16">
          <div className="max-w-[1160px] mx-auto">

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-6 sm:mb-8 pt-10 sm:pt-14">
              <div>
                <div className="inline-flex items-center gap-2 bg-[rgba(3,70,101,0.08)] border border-[rgba(3,70,101,0.25)] text-[#034665] text-[0.72rem] font-bold tracking-[0.1em] uppercase px-3.5 py-[5px] rounded-full mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#034665]" style={{ animation: 'ctPulse 2s ease-in-out infinite' }} /> Find Us
                </div>
                <h2 className="font-['Poppins',sans-serif] font-bold text-[#0d3d5a] mb-2 text-[1.3rem] sm:text-[1.6rem] md:text-[2rem]">Our Location</h2>
                <p className="text-[#5a7a8a] text-[0.88rem] sm:text-[0.92rem] leading-[1.7] max-w-[420px] m-0">Come meet us in person — we're based in Gujarat, India.</p>
              </div>
            </div>

            <div
              className="relative rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden h-[260px] sm:h-[360px] md:h-[460px]"
              style={{ boxShadow: '0 24px 64px rgba(1,72,103,0.14),0 0 0 1px rgba(97,187,197,0.18)' }}
            >
              {[['top-3 left-3', 'border-t-[3px] border-l-[3px] rounded-tl-[4px]'], ['top-3 right-3', 'border-t-[3px] border-r-[3px] rounded-tr-[4px]'], ['bottom-3 left-3', 'border-b-[3px] border-l-[3px] rounded-bl-[4px]'], ['bottom-3 right-3', 'border-b-[3px] border-r-[3px] rounded-br-[4px]']].map(([pos, shape], i) => (
                <div key={i} aria-hidden="true" className={`absolute w-6 h-6 sm:w-7 sm:h-7 z-10 pointer-events-none border-[#61BBC5] ${pos} ${shape}`} />
              ))}
              <iframe
                className="w-full h-full block border-0 transition-[filter] duration-300 hover:saturate-100"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                title="Kevalon Technology Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.6854044491!2d72.41493582929688!3d23.020584800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div
                className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 z-[4] bg-white rounded-[0.75rem] sm:rounded-[1rem] p-2.5 sm:p-[0.85rem_1.1rem] flex items-center gap-2.5 sm:gap-3 border border-[rgba(97,187,197,0.2)] max-w-[calc(100%-24px)] sm:max-w-[280px]"
                style={{ boxShadow: '0 8px 28px rgba(1,72,103,0.18)' }}
              >
                <div className="w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-[8px] sm:rounded-[10px] flex items-center justify-center flex-shrink-0 text-[0.85rem] sm:text-[1rem] text-white" style={{ background: 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)' }}>
                  <i className="bi bi-building" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[0.78rem] sm:text-[0.85rem] text-[#0d2f3f] m-0 mb-0.5 truncate">Kevalon Technology</p>
                  <p className="text-[0.7rem] sm:text-[0.75rem] text-[#64748b] m-0">Gujarat, India</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ahmedabad,Gujarat,India"
                  target="_blank" rel="noreferrer"
                  aria-label="Open in Google Maps"
                  className="ml-auto w-7 h-7 sm:w-8 sm:h-8 rounded-[7px] sm:rounded-[8px] flex items-center justify-center text-[#034665] text-[0.75rem] sm:text-[0.8rem] flex-shrink-0 transition-all duration-200"
                  style={{ background: 'rgba(97,187,197,0.1)', border: '1px solid rgba(97,187,197,0.25)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(137.68deg,#61BBC5 0.13%,#034665 100%)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(97,187,197,0.1)'; e.currentTarget.style.color = '#034665'; e.currentTarget.style.borderColor = 'rgba(97,187,197,0.25)'; }}
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
