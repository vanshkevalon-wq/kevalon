import { useState, useEffect, useRef, useCallback } from "react";
import './Team.css';

const TEAM = [
  { name: "Harsh Kothari",    role: "Founder & CEO",                 image: "/harsh kothari.jpg",    initials: "HK", tag: "Leadership" },
  { name: "Sachin Prajapati", role: "HR Manager / Technical Head",   image: "/sachin prajapati.jpg", initials: "SP", tag: "Operations" },
  { name: "Abhishek Shah",    role: "Sales & Marketing Head",        image: "/abhishek shah.jpg",    initials: "AS", tag: "Growth"     },
  { name: "Hetvi Pandya",     role: "MERN Stack Developer",          image: "/hetvi pandya.jpg",     initials: "HP", tag: "Engineering"},
  { name: "Keyur Nayi",       role: "Graphic Designer",              image: "/keyur nayi.jpg",       initials: "KN", tag: "Design"     },
  { name: "Shubham Suthar",   role: "UI/UX Designer",                image: "/shubham suthar.jpg",   initials: "SS", tag: "Design"     },
  { name: "Parth Patel",      role: "UI/UX Designer",                image: "/Parth Patel.jpg",      initials: "PP", tag: "Design"     },
  { name: "Harsh Tailor",     role: "Digital Marketing Executive",   image: "/harsh tailor.jpg",     initials: "HT", tag: "Marketing"  },
  { name: "Bhavya Shah",      role: "Digital Marketing Executive",   image: "/bhavya shah.png",      initials: "BS", tag: "Marketing"  },
  { name: "Yesha Patel",      role: "Digital Marketing Executive",   image: "/yesha patel.png",      initials: "YP", tag: "Marketing"  },
];

const tagColors = {
  Leadership:  { bg: "rgba(97,187,197,0.12)",  text: "#034665"  },
  Operations:  { bg: "rgba(10,143,182,0.12)",  text: "#0a8fb6"  },
  Growth:      { bg: "rgba(97,187,197,0.12)",  text: "#034665"  },
  Engineering: { bg: "rgba(3,70,101,0.10)",    text: "#034665"  },
  Design:      { bg: "rgba(10,143,182,0.12)",  text: "#0a8fb6"  },
  Marketing:   { bg: "rgba(97,187,197,0.12)",  text: "#61BBC5"  },
};

export default function Team() {
  const [active,  setActive]  = useState(0);
  const [prev,    setPrev]    = useState(null);
  const [dir,     setDir]     = useState(1);   // 1 = forward, -1 = back
  const [visible, setVisible] = useState(false);
  const sectionRef            = useRef(null);
  const autoRef               = useRef(null);
  const total                 = TEAM.length;

  const go = useCallback((idx, direction) => {
    setPrev(active);
    setDir(direction);
    setActive(idx);
  }, [active]);

  const next = useCallback(() => go((active + 1) % total, 1),  [active, go, total]);
  const prev_ = useCallback(() => go((active - 1 + total) % total, -1), [active, go, total]);

  /* auto-advance */
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3800);
  }, [next]);

  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, [resetAuto]);

  /* scroll-reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const member = TEAM[active];
  const tc     = tagColors[member.tag] || tagColors.Leadership;

  /* surrounding avatars */
  const surroundIdx = TEAM.map((_, i) => i).filter(i => i !== active);

  return (
    <section className="tm-section" ref={sectionRef}>
      {/* background */}
      <div className="tm-bg-dots"  aria-hidden="true" />
      <div className="tm-bg-glow tm-bg-glow--a" aria-hidden="true" />
      <div className="tm-bg-glow tm-bg-glow--b" aria-hidden="true" />
      <div className="tm-bg-glow tm-bg-glow--c" aria-hidden="true" />

      <div className={`tm-wrap${visible ? ' tm-wrap--in' : ''}`}>

        {/* ── LEFT: text + controls ── */}
        <div className="tm-left">
          <span className="tm-eyebrow">
            <span className="tm-eyebrow__dot" />
            Our Team
          </span>
          <h2 className="tm-heading">
            Meet the minds<br/>
            <span className="tm-heading__grad">building Kevalon</span>
          </h2>
          <p className="tm-desc">
            A tight-knit team of engineers, designers and marketers
            who ship fast and care deeply about quality.
          </p>

          {/* member info card — changes with active */}
          <div className={`tm-info tm-info--${dir > 0 ? 'next' : 'prev'}`} key={active}>
            <div className="tm-info__tag" style={{ background: tc.bg, color: tc.text }}>
              {member.tag}
            </div>
            <h3 className="tm-info__name">{member.name}</h3>
            <p className="tm-info__role">{member.role}</p>

            <div className="tm-info__row">
              <span className="tm-info__count">
                <span className="tm-info__num">{String(active + 1).padStart(2,'0')}</span>
                <span className="tm-info__sep">/</span>
                <span className="tm-info__total">{String(total).padStart(2,'0')}</span>
              </span>
              <div className="tm-info__socials">
                <a href="#" className="tm-info__social" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
                <a href="#" className="tm-info__social" aria-label="Email">
                  <i className="bi bi-envelope-fill" />
                </a>
              </div>
            </div>
          </div>

          {/* nav arrows */}
          <div className="tm-nav">
            <button className="tm-nav__btn" onClick={() => { prev_(); resetAuto(); }} aria-label="Previous">
              <i className="bi bi-arrow-left" />
            </button>
            <div className="tm-nav__dots">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  className={`tm-nav__dot${active === i ? ' tm-nav__dot--on' : ''}`}
                  onClick={() => { go(i, i > active ? 1 : -1); resetAuto(); }}
                  aria-label={`Go to ${TEAM[i].name}`}
                />
              ))}
            </div>
            <button className="tm-nav__btn" onClick={() => { next(); resetAuto(); }} aria-label="Next">
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>

        {/* ── RIGHT: spotlight + avatar ring ── */}
        <div className="tm-right">

          {/* surrounding small avatars */}
          <div className="tm-orbit">
            {surroundIdx.slice(0, 6).map((idx, pos) => (
              <button
                key={idx}
                className={`tm-orbit__avatar tm-orbit__avatar--${pos}`}
                onClick={() => { go(idx, idx > active ? 1 : -1); resetAuto(); }}
                aria-label={TEAM[idx].name}
                title={TEAM[idx].name}
              >
                <img
                  src={TEAM[idx].image}
                  alt={TEAM[idx].name}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
                <div className="tm-orbit__fallback">{TEAM[idx].initials}</div>
              </button>
            ))}
          </div>

          {/* main spotlight photo */}
          <div className="tm-spotlight" key={`spot-${active}`}>
            <div className="tm-spotlight__ring tm-spotlight__ring--1" />
            <div className="tm-spotlight__ring tm-spotlight__ring--2" />
            <div className="tm-spotlight__ring tm-spotlight__ring--3" />

            <div className={`tm-spotlight__photo tm-spotlight__photo--${dir > 0 ? 'in-right' : 'in-left'}`}>
              <img
                src={member.image}
                alt={member.name}
                className="tm-spotlight__img"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
              <div className="tm-spotlight__fallback">{member.initials}</div>
            </div>

            {/* floating name chip */}
            <div className="tm-spotlight__chip">
              <span className="tm-spotlight__chip-dot" />
              {member.name}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
