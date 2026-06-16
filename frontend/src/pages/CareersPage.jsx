import { useEffect, useRef, useState } from 'react';
import { positions as staticPositions } from '../data/positionsData';
import { apiRequest } from '../utils/api';

/* ── Animated count-up hook ── */
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return { ref, val };
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Stats Item ── */
function StatItem({ icon, target, suffix, label, sub }) {
  const { ref, val } = useCountUp(target);
  return (
    <div ref={ref} className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-10 gap-1.5 text-center border-r border-[rgba(97,187,197,0.15)] transition-colors duration-200 hover:bg-[rgba(97,187,197,0.06)] [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b sm:[&:nth-child(1)]:border-b-0 sm:[&:nth-child(2)]:border-b-0 last:border-r-0 [&:nth-child(4)]:border-r-0 sm:[&:nth-child(4)]:border-r-0">
      <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center text-[1.1rem] text-[#034665] mb-2 transition-all duration-200 hover:scale-110 hover:rotate-[-5deg]"
        style={{ background: 'linear-gradient(138deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))', border: '1.5px solid rgba(97,187,197,0.22)' }}>
        <i className={`bi ${icon}`} />
      </div>
      <div className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-black leading-[1.2]"
        style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {val}{suffix}
      </div>
      <div className="text-[0.88rem] font-bold text-[#0d3d5a]">{label}</div>
      <div className="text-[0.72rem] font-semibold text-[#7a9aaa] tracking-[0.04em] uppercase">{sub}</div>
    </div>
  );
}

/* ─── Static data ─────────────────────────────────────── */
const values = [
  { icon: 'bi-lightbulb-fill',    title: 'Innovation',    desc: 'We encourage creative thinking and new ideas that push boundaries.' },
  { icon: 'bi-people-fill',       title: 'Collaboration', desc: 'Teamwork amplifies every result we deliver together.' },
  { icon: 'bi-award-fill',        title: 'Excellence',    desc: 'We strive for quality and craftsmanship in everything we build.' },
  { icon: 'bi-shield-fill-check', title: 'Integrity',     desc: 'Honest and transparent in all dealings with our team and clients.' },
];

const perks = [
  { icon: 'bi-graph-up-arrow',    title: 'Career Growth',          desc: 'Clear growth path with dedicated mentorship and regular reviews.' },
  { icon: 'bi-mortarboard-fill',  title: 'Learning & Development', desc: 'Training programs, upskilling opportunities, and certifications.' },
  { icon: 'bi-heart-pulse-fill',  title: 'Health Insurance',       desc: 'Comprehensive health coverage for you and your family.' },
  { icon: 'bi-clock-fill',        title: 'Flexible Hours',         desc: 'Work-life balance we actually mean — not just say.' },
  { icon: 'bi-cash-coin',         title: 'Performance Bonus',      desc: 'Rewarded fairly and quickly for your measurable impact.' },
  { icon: 'bi-tools',             title: 'Latest Tools',           desc: 'Best hardware, software, and subscriptions to do great work.' },
];

const ALL_CATEGORIES = 'All';

const inputCls = "w-full py-[0.7rem] pr-4 pl-10 border-[1.5px] border-[rgba(148,163,184,0.35)] rounded-[10px] bg-[#f8fafc] text-[#0f172a] text-[0.88rem] outline-none transition-all duration-200 placeholder:text-[#94a3b8] focus:border-[#61BBC5] focus:bg-white focus:shadow-[0_0_0_3px_rgba(97,187,197,0.12)] box-border";

/* ─── Apply Modal ─────────────────────────────────────── */
function ApplyModal({ position, onClose }) {
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', phone: '', linkedInProfile: '', portfolioUrl: '' });
  const [resume, setResume]   = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [status, setStatus]   = useState({ type: 'idle', msg: '' });
  const [drag, setDrag]       = useState(false);

  const handleFile = (file) => { if (file) { setResume(file); setResumeName(file.name); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setStatus({ type: 'error', msg: 'Please upload your resume before submitting.' });
      return;
    }
    setStatus({ type: 'loading', msg: '' });
    try {
      const payload = new FormData();
      payload.append('firstName',       form.firstName);
      payload.append('lastName',        form.lastName);
      payload.append('email',           form.email);
      payload.append('phone',           form.phone || '');
      payload.append('linkedInProfile', form.linkedInProfile || '');
      payload.append('portfolioUrl',    form.portfolioUrl || '');
      payload.append('role',            position.title);
      payload.append('resume',          resume);
      await apiRequest('/api/applications', { method: 'POST', body: payload });
      setStatus({ type: 'success', msg: "Application submitted! We'll review it and get back to you soon." });
      setTimeout(onClose, 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Something went wrong. Please try again.' });
    }
  };

  const field = (id, label, name, type, placeholder, required = false, icon = 'bi-pencil') => (
    <div className="flex flex-col gap-[0.4rem]">
      <label htmlFor={id} className="text-[0.8rem] font-semibold text-[#334155]">
        {label}{required && <span className="text-[#61BBC5]"> *</span>}
      </label>
      <div className="relative flex items-center">
        <i className={`bi ${icon} absolute left-3 text-[0.88rem] text-[#94a3b8] pointer-events-none z-10`} />
        <input id={id} name={name} type={type} placeholder={placeholder} required={required}
          value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
          className={inputCls} />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[rgba(1,22,36,0.65)] backdrop-blur-[6px] z-[9000] flex items-center justify-center p-4"
      style={{ animation: 'carFadeIn 0.2s ease' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-[1.75rem] w-full max-w-[680px] max-h-[90vh] overflow-y-auto shadow-[0_32px_80px_rgba(1,72,103,0.3)]"
        style={{ animation: 'carSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}>

        <div className="flex items-start justify-between gap-4 px-5 sm:px-8 py-6 sm:py-8 pb-5 border-b border-[rgba(97,187,197,0.15)]">
          <div>
            <span className={`text-[0.68rem] font-bold tracking-[0.06em] uppercase px-2.5 py-[3px] rounded-full ${
              position.type === 'Intern'
                ? 'bg-[rgba(97,187,197,0.12)] text-[#034665] border border-[rgba(97,187,197,0.3)]'
                : 'bg-[rgba(3,70,101,0.08)] text-[#034665] border border-[rgba(3,70,101,0.2)]'
            }`}>{position.type}</span>
            <h2 className="font-bold text-[1.2rem] text-[#0d2f3f] m-[0.4rem_0_0.3rem]">{position.title}</h2>
            <p className="text-[0.8rem] text-[#94a3b8] m-0">
              <i className="bi bi-geo-alt text-[#61BBC5]" /> {position.location}
              {position.exp ? <>&nbsp;·&nbsp;<i className="bi bi-briefcase text-[#61BBC5]" /> {position.exp}</> : null}
            </p>
          </div>
          <button className="w-9 h-9 rounded-[9px] border border-[rgba(97,187,197,0.2)] bg-[rgba(97,187,197,0.06)] text-[#64748b] text-[0.9rem] flex items-center justify-center cursor-pointer flex-shrink-0 transition-all duration-200 hover:bg-[rgba(239,68,68,0.08)] hover:border-[rgba(239,68,68,0.2)] hover:text-[#dc2626]"
            onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[0.82rem] text-[#034665] mx-4 sm:mx-8 my-3 border border-[rgba(97,187,197,0.3)]"
          style={{ background: 'linear-gradient(to right,rgba(97,187,197,0.1),rgba(3,70,101,0.07))' }}>
          <i className="bi bi-lock-fill text-[#61BBC5] text-[0.75rem]" />
          Applying for: <strong className="font-bold">{position.title}</strong>
        </div>

        <form className="flex flex-col gap-4 px-5 sm:px-8 py-6 pt-3" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            {field('cm-fn','First name','firstName','text','Alex',true,'bi-person')}
            {field('cm-ln','Last name','lastName','text','Chen',true,'bi-person')}
          </div>
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            {field('cm-em','Email address','email','email','alex@example.com',true,'bi-envelope')}
            {field('cm-ph','Phone number','phone','tel','+91 98765 43210',true,'bi-telephone')}
          </div>
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            {field('cm-li','LinkedIn Profile','linkedInProfile','url','linkedin.com/in/yourname',false,'bi-linkedin')}
            {field('cm-po','Portfolio URL','portfolioUrl','url','yoursite.com',false,'bi-globe')}
          </div>

          <div className="flex flex-col gap-[0.4rem]">
            <label className="text-[0.8rem] font-semibold text-[#334155]">Resume / CV <span className="text-[#61BBC5]">*</span></label>
            <label htmlFor="cm-resume"
              className={`flex items-center gap-4 px-5 py-[1.1rem] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                drag       ? 'border-[#61BBC5] bg-[rgba(97,187,197,0.07)]' :
                resumeName ? 'border-solid border-[rgba(97,187,197,0.5)] bg-[rgba(97,187,197,0.06)]' :
                'border-[rgba(97,187,197,0.35)] bg-[rgba(97,187,197,0.03)] hover:border-[#61BBC5] hover:bg-[rgba(97,187,197,0.07)]'
              }`}
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}>
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[1.2rem] text-white flex-shrink-0"
                style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                <i className={`bi ${resumeName ? 'bi-file-earmark-check-fill' : 'bi-cloud-upload'}`} />
              </div>
              <div className="flex flex-col gap-[2px]">
                {resumeName
                  ? <><strong className="text-[0.85rem] font-semibold text-[#334155]">{resumeName}</strong><span className="text-[0.73rem] text-[#94a3b8]">Click to replace</span></>
                  : <><strong className="text-[0.85rem] font-semibold text-[#334155]">Drag & drop or click to upload</strong><span className="text-[0.73rem] text-[#94a3b8]">PDF, DOC, DOCX — max 10 MB</span></>}
              </div>
            </label>
            <input id="cm-resume" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
          </div>

          {status.msg && (
            <div className={`flex items-center gap-[0.6rem] px-4 py-[0.8rem] rounded-[9px] text-[0.85rem] font-medium border ${
              status.type === 'success'
                ? 'bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.25)] text-[#065f46]'
                : 'bg-[rgba(239,68,68,0.07)] border-[rgba(239,68,68,0.2)] text-[#991b1b]'
            }`}>
              <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
              {status.msg}
            </div>
          )}

          <button type="submit"
            className="inline-flex items-center justify-center gap-[0.6rem] w-full py-[0.95rem] border-none rounded-full text-white text-[0.92rem] font-bold cursor-pointer shadow-[0_6px_20px_rgba(1,72,103,0.22)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)', borderRadius: '9999px' }}
            disabled={status.type === 'loading'}>
            {status.type === 'loading'
              ? <><span className="inline-block w-4 h-4 border-2 border-[rgba(255,255,255,0.35)] border-t-white rounded-full animate-spin" /> Submitting…</>
              : <>Submit Application <i className="bi bi-send-fill" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function CareersPage() {
  const [activeFilter,  setFilter]        = useState(ALL_CATEGORIES);
  const [applyPosition, setApplyPosition] = useState(null);

  const hero      = useReveal(0.08);
  const statsRev  = useReveal(0.08);
  const valuesRev = useReveal(0.08);
  const perksRev  = useReveal(0.08);
  const posRev    = useReveal(0.08);
  const ctaRev    = useReveal(0.08);

  const positions  = staticPositions;
  const categories = [ALL_CATEGORIES, ...Array.from(new Set(positions.map(p => p.category)))];
  const filtered   = activeFilter === ALL_CATEGORIES ? positions : positions.filter(p => p.category === activeFilter);

  /* gradient text helper */
  const grad = { background: 'linear-gradient(135deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' };

  return (
    <div className="bg-white overflow-x-hidden" style={{ fontFamily: "Inter,'Nunito Sans',sans-serif", color: '#0f172a' }}>

      {/* ══ HERO ══ */}
      <section className="relative bg-white overflow-hidden min-h-[88vh] sm:min-h-[88vh] flex items-center"
        style={{ padding: 'clamp(90px,10vw,120px) clamp(16px,4vw,48px) clamp(40px,6vw,80px)' }}>

        {/* blobs */}
        <div className="absolute pointer-events-none" style={{ top:-80, left:-120, width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle,rgba(97,187,197,0.10) 0%,transparent 65%)', filter:'blur(60px)' }} aria-hidden="true" />
        <div className="absolute pointer-events-none" style={{ bottom:-80, right:-100, width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(3,70,101,0.09) 0%,transparent 65%)', filter:'blur(60px)' }} aria-hidden="true" />

        <div
          className="relative z-10 max-w-[1240px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-[72px] items-center transition-opacity duration-300"
          style={{ opacity: hero.visible ? 1 : 0 }}
          ref={hero.ref}>

          {/* left */}
          <div style={{ animation: hero.visible ? 'cr-left 0.8s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
            <span className="inline-flex items-center gap-2 rounded-full mb-5 self-start"
              style={{ background:'rgba(97,187,197,0.09)', border:'1.5px solid rgba(97,187,197,0.28)', padding:'6px 18px', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#034665' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation:'cr-dot 2.2s ease-in-out infinite' }} />
              Join Our Team
            </span>

            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(1.9rem,3.6vw,3rem)', fontWeight:900, color:'#0d3d5a', letterSpacing:'-0.03em', lineHeight:1.1, margin:'0 0 20px' }}>
              Build Your Career<br />
              With <span style={grad}>Kevalon</span>
            </h1>

            <p style={{ fontSize:'1.05rem', color:'#4a6a7a', lineHeight:1.85, margin:'0 0 22px', maxWidth:520 }}>
              Explore exciting internship and full-time opportunities in web development,
              mobile apps, UI/UX, DevOps, and analytics. Grow with a team that invests in you.
            </p>

            <div className="flex gap-3.5 flex-col sm:flex-row flex-wrap">
              <a href="#positions"
                className="inline-flex items-center gap-2.5 rounded-full font-bold no-underline text-white transition-all duration-200 hover:-translate-y-[3px] hover:scale-[1.03] hover:text-white"
                style={{ padding:'13px 30px', fontSize:'0.92rem', background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 8px 24px rgba(97,187,197,0.35)' }}>
                View Open Positions <i className="bi bi-arrow-right" />
              </a>
              <a href="#values"
                className="inline-flex items-center gap-2.5 rounded-full font-bold no-underline text-[#034665] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:text-[#034665]"
                style={{ padding:'13px 30px', fontSize:'0.92rem', border:'1.5px solid rgba(97,187,197,0.35)', boxShadow:'0 4px 14px rgba(3,70,101,0.07)' }}>
                Our Culture
              </a>
            </div>
          </div>

          {/* right — card */}
          <div className="relative" style={{ animation: hero.visible ? 'cr-right 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none' }}>
            <div className="relative" style={{ height: 'clamp(300px,55vw,420px)', overflow: 'visible', padding: '16px 36px 24px 16px' }}>
              <div className="absolute z-10 bg-white rounded-3xl p-[30px_28px] transition-all duration-[350ms] hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(3,70,101,0.14)]"
                style={{ top: 16, left: 16, right: 36, border:'1.5px solid rgba(97,187,197,0.18)', boxShadow:'0 12px 40px rgba(3,70,101,0.10)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-[13px] flex items-center justify-center text-white text-[1.1rem]"
                    style={{ background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 6px 18px rgba(97,187,197,0.35)' }}>
                    <i className="bi bi-briefcase-fill" />
                  </div>
                  <span className="text-[0.7rem] font-extrabold tracking-[0.1em] uppercase rounded-full px-[11px] py-[3px]"
                    style={{ color:'#61BBC5', background:'rgba(97,187,197,0.09)', border:'1px solid rgba(97,187,197,0.25)' }}>We're Hiring</span>
                </div>
                <h3 style={{ fontSize:'1.15rem', fontWeight:800, color:'#0d3d5a', margin:'0 0 10px', fontFamily:"'Playfair Display',Georgia,serif" }}>Grow With Us</h3>
                <p style={{ fontSize:'0.88rem', color:'#5a7a8a', lineHeight:1.75, margin:0 }}>
                  A passionate team of engineers, designers and strategists working on real products with real impact.
                </p>
              </div>

              {[
                { cls:'bottom-[55px] right-[-30px]', anim:'cr-float-a 5s ease-in-out infinite', icon:'bi-people-fill', label:'20+ Experts' },
                { cls:'bottom-[-10px] left-[-20px]', anim:'cr-float-b 6s ease-in-out 1s infinite', icon:'bi-check-circle-fill', label:'Open Roles' },
                { cls:'top-[-10px] right-[20px]',   anim:'cr-float-c 4.5s ease-in-out 0.5s infinite', icon:'bi-mortarboard-fill', label:'Mentorship' },
              ].map((chip) => (
                <div key={chip.label}
                  className={`absolute z-[20] hidden sm:inline-flex items-center gap-1.5 rounded-full font-extrabold text-[#034665] whitespace-nowrap ${chip.cls}`}
                  style={{ background:'#fff', border:'1.5px solid rgba(97,187,197,0.28)', boxShadow:'0 6px 22px rgba(3,70,101,0.12)', padding:'9px 16px', fontSize:'0.78rem', animation:chip.anim }}>
                  <i className={`bi ${chip.icon} text-[#61BBC5] text-[0.9rem]`} />
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* responsive: stack on mobile */}
        <style>{`
          @media(max-width:960px){
            .careers-hero-grid { grid-template-columns: 1fr !important; }
            .careers-hero-right { display: none !important; }
          }
        `}</style>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background:'#fff', borderTop:'1.5px solid rgba(97,187,197,0.15)', borderBottom:'1.5px solid rgba(97,187,197,0.15)' }}>
        <div
          className="max-w-[1240px] mx-auto px-6 sm:px-12 transition-opacity duration-300"
          style={{ opacity: statsRev.visible ? 1 : 0 }}
          ref={statsRev.ref}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            <StatItem icon="bi-calendar-check"  target={2}   suffix="+" label="Years in Business"  sub="Trusted experience"     />
            <StatItem icon="bi-briefcase-fill"   target={13}  suffix="+" label="Open Positions"     sub="Across departments"     />
            <StatItem icon="bi-people-fill"      target={20}  suffix="+" label="Team Members"       sub="Skilled professionals"  />
            <StatItem icon="bi-emoji-smile-fill" target={100} suffix="%" label="Team Satisfaction"  sub="We mean it"             />
          </div>
        </div>
      </section>

      {/* ══ OUR VALUES ══ */}
      <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12" id="values">
        <div
          className="max-w-[1240px] mx-auto transition-opacity duration-300"
          style={{ opacity: valuesRev.visible ? 1 : 0 }}
          ref={valuesRev.ref}>

          <div className="text-center mb-14" style={{ animation: valuesRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
            <span className="inline-flex items-center gap-2 rounded-full mb-4"
              style={{ background:'rgba(97,187,197,0.09)', border:'1.5px solid rgba(97,187,197,0.28)', padding:'6px 18px', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#034665' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation:'cr-dot 2.2s ease-in-out infinite' }} />
              Our Culture
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(2rem,3.8vw,3rem)', fontWeight:900, color:'#0d3d5a', letterSpacing:'-0.025em', lineHeight:1.15, margin:'0 0 12px' }}>
              What We <span style={grad}>Stand For</span>
            </h2>
            <p style={{ fontSize:'1rem', color:'#5a7a8a', maxWidth:480, margin:'0 auto', lineHeight:1.8 }}>The values that guide every decision we make and every team we build.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ animation: valuesRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.08s both' : 'none' }}>
            {values.map((v, i) => (
              <div key={v.title}
                className="relative bg-white rounded-[28px] text-center overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group"
                style={{ border:'1.5px solid rgba(97,187,197,0.14)', padding:'32px 28px', boxShadow:'0 4px 20px rgba(3,70,101,0.06)', animation:`cr-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s both` }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-[28px_28px_0_0] scale-x-0 origin-left transition-transform duration-[350ms] group-hover:scale-x-100"
                  style={{ background:'linear-gradient(90deg,#61BBC5,#034665)' }} />
                <div className="w-[54px] h-[54px] rounded-[16px] flex items-center justify-center text-[1.3rem] text-white mx-auto mb-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                  style={{ background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 6px 18px rgba(97,187,197,0.35)' }}>
                  <i className={`bi ${v.icon}`} />
                </div>
                <h4 style={{ fontSize:'1rem', fontWeight:800, color:'#0d3d5a', margin:'0 0 10px', letterSpacing:'-0.01em' }}>{v.title}</h4>
                <p style={{ fontSize:'0.88rem', color:'#5a7a8a', lineHeight:1.8, margin:0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PERKS & BENEFITS ══ */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12" style={{ background:'#f8fafc', borderTop:'1.5px solid rgba(97,187,197,0.12)' }}>
        <div className="absolute pointer-events-none" style={{ top:-60, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle,rgba(97,187,197,0.07) 0%,transparent 65%)', filter:'blur(50px)' }} aria-hidden="true" />

        <div
          className="max-w-[1240px] mx-auto relative z-10 transition-opacity duration-300"
          style={{ opacity: perksRev.visible ? 1 : 0 }}
          ref={perksRev.ref}>

          <div className="text-center mb-14" style={{ animation: perksRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
            <span className="inline-flex items-center gap-2 rounded-full mb-4"
              style={{ background:'rgba(97,187,197,0.09)', border:'1.5px solid rgba(97,187,197,0.28)', padding:'6px 18px', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#034665' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation:'cr-dot 2.2s ease-in-out infinite' }} />
              Why Join Us
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(2rem,3.8vw,3rem)', fontWeight:900, color:'#0d3d5a', letterSpacing:'-0.025em', lineHeight:1.15, margin:'0 0 12px' }}>
              Perks &amp; <span style={grad}>Benefits</span>
            </h2>
            <p style={{ fontSize:'1rem', color:'#5a7a8a', maxWidth:480, margin:'0 auto', lineHeight:1.8 }}>We offer a supportive environment with excellent perks and tools to help you do your best work.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ animation: perksRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.08s both' : 'none' }}>
            {perks.map((p, i) => (
              <div key={p.title}
                className="relative bg-white rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group"
                style={{ border:'1.5px solid rgba(97,187,197,0.14)', padding:'32px 28px', boxShadow:'0 4px 20px rgba(3,70,101,0.06)', animation:`cr-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.07}s both` }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-[22px_22px_0_0] scale-x-0 origin-left transition-transform duration-[350ms] group-hover:scale-x-100"
                  style={{ background:'linear-gradient(90deg,#61BBC5,#034665)' }} />
                <div className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center text-[1.3rem] text-white mb-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                  style={{ background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 6px 18px rgba(97,187,197,0.35)' }}>
                  <i className={`bi ${p.icon}`} />
                </div>
                <h4 style={{ fontSize:'0.97rem', fontWeight:800, color:'#0d3d5a', margin:'0 0 10px', letterSpacing:'-0.01em' }}>{p.title}</h4>
                <p style={{ fontSize:'0.88rem', color:'#5a7a8a', lineHeight:1.8, margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ══ */}
      <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12" id="positions">
        <div
          className="max-w-[1240px] mx-auto transition-opacity duration-300"
          style={{ opacity: posRev.visible ? 1 : 0 }}
          ref={posRev.ref}>

          <div className="text-center mb-14" style={{ animation: posRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
            <span className="inline-flex items-center gap-2 rounded-full mb-4"
              style={{ background:'rgba(97,187,197,0.09)', border:'1.5px solid rgba(97,187,197,0.28)', padding:'6px 18px', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#034665' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation:'cr-dot 2.2s ease-in-out infinite' }} />
              We're Hiring
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(2rem,3.8vw,3rem)', fontWeight:900, color:'#0d3d5a', letterSpacing:'-0.025em', lineHeight:1.15, margin:'0 0 12px' }}>
              Open <span style={grad}>Positions</span>
            </h2>
            <p style={{ fontSize:'1rem', color:'#5a7a8a', maxWidth:480, margin:'0 auto', lineHeight:1.8 }}>Internships are listed first. Filter by department to find your fit.</p>
          </div>

          {/* filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(tab => (
              <button key={tab}
                onClick={() => setFilter(tab)}
                className="rounded-full font-semibold cursor-pointer transition-all duration-[280ms] whitespace-nowrap border-[1.5px]"
                style={{
                  padding: '7px 20px', fontSize: '0.82rem',
                  background: activeFilter === tab ? 'linear-gradient(138deg,#61BBC5,#034665)' : '#fff',
                  borderColor: activeFilter === tab ? 'transparent' : 'rgba(97,187,197,0.25)',
                  color: activeFilter === tab ? '#fff' : '#475569',
                  boxShadow: activeFilter === tab ? '0 4px 14px rgba(1,72,103,0.22)' : 'none',
                }}>
                {tab}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3 text-[#94a3b8]">
              <i className="bi bi-briefcase text-[2.5rem]" />
              <p className="m-0 text-[0.95rem]">No open positions in this category right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ animation: posRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.08s both' : 'none' }}>
              {filtered.map((pos, i) => (
                <div key={pos.id}
                  className="relative bg-white rounded-[28px] overflow-hidden flex flex-col gap-[0.85rem] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group"
                  style={{ border:'1.5px solid rgba(97,187,197,0.14)', padding:'28px', boxShadow:'0 4px 24px rgba(3,70,101,0.06)', animation:`cr-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.06}s both` }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-[28px_28px_0_0] scale-x-0 origin-left transition-transform duration-[350ms] group-hover:scale-x-100"
                    style={{ background:'linear-gradient(90deg,#61BBC5,#034665)' }} />

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.68rem] font-bold tracking-[0.06em] uppercase px-2.5 py-[3px] rounded-full"
                      style={pos.type === 'Intern'
                        ? { background:'rgba(97,187,197,0.12)', color:'#034665', border:'1px solid rgba(97,187,197,0.3)' }
                        : { background:'rgba(3,70,101,0.08)', color:'#034665', border:'1px solid rgba(3,70,101,0.2)' }}>
                      {pos.type}
                    </span>
                    <span className="text-[0.68rem] font-semibold text-[#94a3b8] ml-auto">{pos.category}</span>
                  </div>

                  <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'1.05rem', fontWeight:900, color:'#0d3d5a', margin:0, lineHeight:1.35 }}>{pos.title}</h3>
                  <p style={{ fontSize:'0.88rem', color:'#5a7a8a', lineHeight:1.75, margin:0, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{pos.desc}</p>

                  <div className="flex gap-4 flex-wrap" style={{ fontSize:'0.77rem', color:'#94a3b8', fontWeight:500 }}>
                    <span><i className="bi bi-briefcase mr-1" style={{ color:'#61BBC5' }} />{pos.exp}</span>
                    <span><i className="bi bi-geo-alt mr-1" style={{ color:'#61BBC5' }} />{pos.location}</span>
                  </div>

                  {pos.skills?.length > 0 && (
                    <div className="flex flex-col gap-[0.4rem]">
                      <p style={{ fontSize:'0.72rem', fontWeight:800, color:'#334155', margin:0, letterSpacing:'0.04em', textTransform:'uppercase' }}>Key Skills</p>
                      <div className="flex flex-wrap gap-[0.4rem]">
                        {pos.skills.map(s => (
                          <span key={s} className="rounded-full" style={{ fontSize:'0.7rem', fontWeight:700, padding:'3px 10px', background:'rgba(97,187,197,0.10)', border:'1px solid rgba(97,187,197,0.25)', color:'#034665' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {pos.responsibilities?.length > 0 && (
                    <div className="flex flex-col gap-[0.4rem]">
                      <p style={{ fontSize:'0.72rem', fontWeight:800, color:'#334155', margin:0, letterSpacing:'0.04em', textTransform:'uppercase' }}>Responsibilities</p>
                      <ul className="list-none p-0 m-0 flex flex-col gap-[0.3rem]">
                        {pos.responsibilities.map(r => (
                          <li key={r} className="flex items-start gap-2" style={{ fontSize:'0.83rem', color:'#5a7a8a', lineHeight:1.6 }}>
                            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[7px]" style={{ background:'#61BBC5' }} />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="inline-flex items-center gap-1.5 text-white font-bold mt-auto self-start transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer"
                    style={{ fontSize:'0.82rem', padding:'8px 20px', borderRadius:'9999px', background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 4px 14px rgba(1,72,103,0.2)', outline:'none' }}
                    onClick={() => setApplyPosition(pos)}>
                    Apply Now <i className="bi bi-arrow-right" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ INTERNSHIP / TRAINING CTA ══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12" style={{ background:'#f8fafc', borderTop:'1.5px solid rgba(97,187,197,0.12)' }}>
        <div
          className="max-w-[1240px] mx-auto transition-opacity duration-300"
          style={{ opacity: ctaRev.visible ? 1 : 0 }}
          ref={ctaRev.ref}>

          <div className="relative rounded-[2rem] overflow-hidden"
            style={{ background:'linear-gradient(138deg,#61BBC5,#034665)', boxShadow:'0 24px 64px rgba(1,72,103,0.28)', animation: ctaRev.visible ? 'cr-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>

            <div className="absolute pointer-events-none" style={{ width:380, height:380, borderRadius:'50%', top:-100, right:-80, background:'rgba(255,255,255,0.07)', filter:'blur(60px)' }} aria-hidden="true" />
            <div className="absolute pointer-events-none" style={{ width:260, height:260, borderRadius:'50%', bottom:-60, left:-40, background:'rgba(255,255,255,0.05)', filter:'blur(50px)' }} aria-hidden="true" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] items-center gap-10 p-8 sm:p-12 md:p-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full mb-5"
                  style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)', padding:'6px 18px', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#fff' }}>
                  <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background:'rgba(255,255,255,0.8)' }} />
                  Internship / Training
                </span>

                <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(1.7rem,2.8vw,2.4rem)', fontWeight:900, color:'#fff', lineHeight:1.15, letterSpacing:'-0.025em', margin:'0 0 16px' }}>
                  Know More About<br />Internship &amp; Training
                </h2>

                <p style={{ fontSize:'0.97rem', color:'rgba(255,255,255,0.82)', lineHeight:1.8, maxWidth:480, margin:'0 0 24px' }}>
                  Hands-on internships and training programs designed to help you build real-world skills with mentorship from our engineering team.
                </p>

                <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-2.5">
                  {[
                    ['bi-clock-fill',     'Duration: 3–6 months practical training'],
                    ['bi-person-video3',  'Mentorship: One-to-one from senior engineers'],
                    ['bi-award-fill',     'Outcomes: Stipend, certificate & real project experience'],
                  ].map(([ico, txt]) => (
                    <li key={ico} className="flex items-center gap-3" style={{ fontSize:'0.93rem', color:'rgba(255,255,255,0.9)' }}>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:'rgba(255,255,255,0.15)' }}>
                        <i className={`bi ${ico} text-[0.75rem] text-white`} />
                      </span>
                      {txt}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 flex-col sm:flex-row flex-wrap">
                  <button
                    className="inline-flex items-center justify-center gap-2 bg-white font-bold border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
                    style={{ fontSize:'0.92rem', padding:'13px 30px', borderRadius:'9999px', color:'#034665', boxShadow:'0 6px 20px rgba(0,0,0,0.15)', outline:'none' }}
                    onClick={() => setApplyPosition({ title:'Internship / Training', type:'Intern', location:'Ahmedabad', exp:'3–6 months' })}>
                    Apply Now <i className="bi bi-arrow-right" />
                  </button>
                  <a href="#positions"
                    className="inline-flex items-center justify-center gap-2 no-underline font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:text-white w-full sm:w-auto"
                    style={{ fontSize:'0.92rem', padding:'13px 30px', color:'rgba(255,255,255,0.92)', border:'1.5px solid rgba(255,255,255,0.28)' }}>
                    View Positions <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>

              {/* decorative icon cluster — hidden on small screens */}
              <div className="hidden lg:flex justify-center" aria-hidden="true">
                <div className="relative w-[220px] h-[220px]">
                  <div className="absolute inset-0 rounded-[2rem]" style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80px] h-[80px] rounded-[22px] flex items-center justify-center" style={{ background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.22)' }}>
                      <i className="bi bi-mortarboard-fill text-[2.2rem] text-white" />
                    </div>
                  </div>
                  {[
                    { ico:'bi-code-slash',     pos:{ top:16, left:16 },     delay:'0s'   },
                    { ico:'bi-palette2',       pos:{ top:16, right:16 },    delay:'0.4s' },
                    { ico:'bi-phone-fill',     pos:{ bottom:16, left:16 },  delay:'0.8s' },
                    { ico:'bi-bar-chart-fill', pos:{ bottom:16, right:16 }, delay:'0.2s' },
                  ].map(({ ico, pos, delay }) => (
                    <div key={ico}
                      className="absolute w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                      style={{ ...pos, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.18)', animation:`cr-float-a 4s ease-in-out ${delay} infinite` }}>
                      <i className={`bi ${ico} text-white text-[1rem]`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {applyPosition && <ApplyModal position={applyPosition} onClose={() => setApplyPosition(null)} />}

      <style>{`
        @keyframes cr-up      { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cr-left    { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cr-right   { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes cr-dot     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.8)} }
        @keyframes cr-float-a { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
        @keyframes cr-float-b { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-16px) rotate(-1deg)} }
        @keyframes cr-float-c { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes carFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes carSlideUp { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>
    </div>
  );
}
