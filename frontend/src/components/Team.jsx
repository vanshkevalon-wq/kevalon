import { useState, useEffect, useRef, useCallback } from "react";

const TEAM = [
  { name: "Harsh Kothari",    role: "Founder & CEO",               image: "/harsh kothari.jpg",    initials: "HK", tag: "Leadership"  },
  { name: "Sachin Prajapati", role: "HR Manager / Technical Head", image: "/sachin prajapati.jpg", initials: "SP", tag: "Operations"  },
  { name: "Abhishek Shah",    role: "Sales & Marketing Head",      image: "/abhishek shah.jpg",    initials: "AS", tag: "Growth"      },
  { name: "Hetvi Pandya",     role: "MERN Stack Developer",        image: "/hetvi pandya.jpg",     initials: "HP", tag: "Engineering" },
  { name: "Keyur Nayi",       role: "Graphic Designer",            image: "/keyur nayi.jpg",       initials: "KN", tag: "Design"      },
  { name: "Shubham Suthar",   role: "UI/UX Designer",              image: "/shubham suthar.jpg",   initials: "SS", tag: "Design"      },
  { name: "Parth Patel",      role: "UI/UX Designer",              image: "/Parth Patel.jpg",      initials: "PP", tag: "Design"      },
  { name: "Harsh Tailor",     role: "Digital Marketing Executive", image: "/harsh tailor.jpg",     initials: "HT", tag: "Marketing"   },
  { name: "Bhavya Shah",      role: "Digital Marketing Executive", image: "/bhavya shah.png",      initials: "BS", tag: "Marketing"   },
  { name: "Yesha Patel",      role: "Digital Marketing Executive", image: "/yesha patel.png",      initials: "YP", tag: "Marketing"   },
];

const tagColors = {
  Leadership:  { bg: "rgba(97,187,197,0.12)",  text: "#034665" },
  Operations:  { bg: "rgba(10,143,182,0.12)",  text: "#0a8fb6" },
  Growth:      { bg: "rgba(97,187,197,0.12)",  text: "#034665" },
  Engineering: { bg: "rgba(3,70,101,0.10)",    text: "#034665" },
  Design:      { bg: "rgba(10,143,182,0.12)",  text: "#0a8fb6" },
  Marketing:   { bg: "rgba(97,187,197,0.12)",  text: "#61BBC5" },
};

const ORBIT_STYLE = [
  { top: "2%",   left:  "5%"  },
  { top: "2%",   right: "5%"  },
  { top: "38%",  left:  "0%"  },
  { top: "38%",  right: "0%"  },
  { bottom: "6%",left:  "10%" },
  { bottom: "6%",right: "10%" },
];
const ORBIT_ANIM  = ["tmOrbitFloat0","tmOrbitFloat1","tmOrbitFloat2","tmOrbitFloat3","tmOrbitFloat4","tmOrbitFloat5"];
const ORBIT_DUR   = ["4.2s","5.1s","4.6s","5.4s","4.9s","5.2s"];
const ORBIT_DELAY = ["0s","0.4s","0.8s","0.2s","0.6s","1s"];

export default function Team() {
  const [active,   setActive]  = useState(0);
  const [dir,      setDir]     = useState(1);
  const [visible,  setVisible] = useState(false);
  const sectionRef = useRef(null);
  const autoRef    = useRef(null);
  const total      = TEAM.length;

  const go        = useCallback((idx, direction) => { setDir(direction); setActive(idx); }, []);
  const next      = useCallback(() => go((active + 1) % total, 1),               [active, go, total]);
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3800);
  }, [next]);

  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, [resetAuto]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const member      = TEAM[active];
  const tc          = tagColors[member.tag] || tagColors.Leadership;
  const surroundIdx = TEAM.map((_, i) => i).filter(i => i !== active);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 px-4 sm:px-6 font-['Inter','Nunito_Sans',sans-serif] overflow-hidden"
      style={{ background: "linear-gradient(135deg,#f8fbfc 0%,#eef6f8 100%)" }}
    >
      {/* dot-grid bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(97,187,197,0.08) 1px,transparent 1px)",
          backgroundSize:  "40px 40px",
          maskImage:       "radial-gradient(ellipse 80% 80% at 50% 50%,black 25%,transparent 100%)",
        }}
      />

      {/* ambient glows — all wrapped in overflow-hidden via section */}
      {[
        ["520px","top-[-120px] right-[-80px]",   "rgba(97,187,197,0.14)", "tmGlowDrift1 24s ease-in-out infinite"],
        ["400px","bottom-[-100px] left-[-80px]", "rgba(3,70,101,0.08)",   "tmGlowDrift2 20s ease-in-out infinite"],
        ["300px","top-[50%] left-[40%]",          "rgba(97,187,197,0.07)", "tmGlowDrift3 18s ease-in-out infinite"],
      ].map(([size, pos, color, anim], k) => (
        <div
          key={k}
          aria-hidden="true"
          className={`absolute rounded-full pointer-events-none z-0 ${pos}`}
          style={{ width: size, height: size, background: `radial-gradient(circle,${color},transparent 70%)`, filter: "blur(120px)", animation: anim }}
        />
      ))}

      {/* ── main two-column grid ── */}
      <div
        className={`relative z-10 max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >

        {/* ════ LEFT ════ */}
        <div className="flex flex-col gap-6 sm:gap-7">

          {/* eyebrow */}
          <span className="inline-flex items-center gap-2 bg-[rgba(97,187,197,0.08)] border-[1.5px] border-[rgba(97,187,197,0.28)] rounded-full px-[18px] py-[6px] text-[0.72rem] font-extrabold text-[#034665] tracking-[0.12em] uppercase w-fit">
            <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5]" style={{ animation: "tmDot 2s ease-in-out infinite" }} />
            Our Team
          </span>

          {/* heading */}
          <h2 className="font-['Playfair_Display',Georgia,serif] font-extrabold text-[#0d3d5a] leading-[1.15] tracking-[-0.03em] m-0 text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem]">
            Meet the minds<br />
            <span style={{ background: "linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%,#61BBC5 100%)", backgroundSize: "250% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmerAccent 4s linear infinite" }}>
              building Kevalon
            </span>
          </h2>

          <p className="text-[0.95rem] sm:text-[0.98rem] text-[#5a7a8a] leading-[1.8] m-0 max-w-[420px]">
            A tight-knit team of engineers, designers and marketers who ship fast and care deeply about quality.
          </p>

          {/* member info card */}
          <div
            key={active}
            className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 pb-4 sm:pb-5 flex flex-col gap-2 relative overflow-hidden"
            style={{
              background:           "rgba(255,255,255,0.55)",
              backdropFilter:       "blur(28px) saturate(200%) brightness(1.25)",
              WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.25)",
              border:               "1px solid rgba(255,255,255,0.8)",
              boxShadow:            "0 12px 32px rgba(97,187,197,0.15),inset 0 1px 0 rgba(255,255,255,1)",
              animation:            `${dir > 0 ? "tmInfoNext" : "tmInfoPrev"} 0.42s cubic-bezier(0.22,1,0.36,1) both`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]" style={{ background: "linear-gradient(90deg,#61BBC5,#034665)" }} />
            <div className="absolute bottom-0 left-0 h-[2px] rounded-b-[24px]" style={{ background: "linear-gradient(90deg,#61BBC5,#034665)", animation: "tmProgressBar 3.8s linear both" }} />

            <div className="inline-flex items-center text-[0.65rem] font-extrabold tracking-[0.1em] uppercase rounded-[6px] px-2.5 py-[3px] w-fit" style={{ background: tc.bg, color: tc.text }}>
              {member.tag}
            </div>
            <h3 className="text-[1.15rem] sm:text-[1.25rem] font-extrabold text-[#0d3d5a] m-0 leading-[1.2]">{member.name}</h3>
            <p className="text-[0.80rem] sm:text-[0.82rem] text-[#61BBC5] m-0 font-semibold leading-[1.35]">{member.role}</p>

            <div className="flex items-center justify-between mt-1.5">
              <span className="flex items-baseline gap-1">
                <span className="text-[1.3rem] sm:text-[1.5rem] font-[900] text-[#0d3d5a] leading-none">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-[0.8rem] text-[#aac5d0]">/</span>
                <span className="text-[0.8rem] text-[#aac5d0] font-semibold">{String(total).padStart(2, "0")}</span>
              </span>
              <div className="flex gap-2">
                {["bi-linkedin", "bi-envelope-fill"].map((ic, j) => (
                  <a
                    key={j}
                    href="#"
                    className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center text-[#61BBC5] text-[0.80rem] transition-all duration-200 hover:scale-110 hover:rotate-[-5deg]"
                    style={{ background: "rgba(97,187,197,0.10)", border: "1.5px solid rgba(97,187,197,0.25)" }}
                    aria-label={ic.includes("linkedin") ? "LinkedIn" : "Email"}
                    onMouseEnter={e => { e.currentTarget.style.background = "#61BBC5"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(97,187,197,0.10)"; e.currentTarget.style.color = "#61BBC5"; }}
                  >
                    <i className={`bi ${ic}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* dot nav */}
          <div className="flex flex-wrap gap-1.5">
            {TEAM.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to ${TEAM[i].name}`}
                onClick={() => { go(i, i > active ? 1 : -1); resetAuto(); }}
                className={`h-[5px] rounded-full border-0 cursor-pointer transition-all duration-300 ${active === i ? "w-7" : "w-2 bg-[rgba(3,70,101,0.15)]"}`}
                style={active === i ? { background: "linear-gradient(90deg,#61BBC5,#034665)" } : {}}
              />
            ))}
          </div>
        </div>

        {/* ════ RIGHT ════
             Layout:  orbit avatars float around a central spotlight photo.
             The rings must be CLIPPED (overflow-hidden on inner clip div),
             but the name chip must appear BELOW the photo — so we add
             extra padding-bottom to the outer column to make room,
             and the chip is absolutely positioned outside the clip div.
        ════ */}
        <div
          className="relative flex items-center justify-center pb-8"
          style={{ height: "clamp(400px,55vw,540px)" }}
        >

          {/* ── orbit avatars: circular, float around spotlight ── */}
          {surroundIdx.slice(0, 6).map((idx, pos) => (
            <button
              key={idx}
              aria-label={TEAM[idx].name}
              title={TEAM[idx].name}
              onClick={() => { go(idx, idx > active ? 1 : -1); resetAuto(); }}
              className="absolute rounded-full overflow-hidden border-0 p-0 cursor-pointer transition-all duration-[280ms] hover:scale-[1.18]"
              style={{
                width:      "clamp(40px,11vw,56px)",
                height:     "clamp(40px,11vw,56px)",
                zIndex:     5,
                background: "transparent",
                border:     "none",
                boxShadow:  "none",
                animation: `${ORBIT_ANIM[pos]} ${ORBIT_DUR[pos]} ease-in-out ${ORBIT_DELAY[pos]} infinite`,
                ...ORBIT_STYLE[pos],
              }}
            >
              <img
                src={TEAM[idx].image}
                alt={TEAM[idx].name}
                className="w-full h-full object-cover object-top block rounded-full"
                onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
              />
              {/* fallback initials */}
              <div
                className="w-full h-full hidden items-center justify-center text-[0.7rem] font-extrabold text-white rounded-full"
                style={{ background: "linear-gradient(135deg,#61BBC5,#034665)" }}
              >
                {TEAM[idx].initials}
              </div>
            </button>
          ))}

          {/* ── spotlight container
               • overflow-hidden clips the rings at the column edge
               • extra pb-8 makes room so chip isn't cropped
               • position: relative so chip can absolute-position below photo
          ── */}
          <div
            key={`spot-${active}`}
            className="relative flex-shrink-0"
            style={{
              width:   "clamp(190px,48%,300px)",
              height:  "clamp(250px,60%,400px)",
              zIndex:  10,
            }}
          >
            {/* decorative pulsing rings — use vw-based sizes so they scale and don't overflow */}
            {[
              ["min(300px,80vw)",  "tmRingPulse1 3.6s ease-in-out infinite"],
              ["min(370px,95vw)",  "tmRingPulse2 3.6s ease-in-out 0.4s infinite"],
              ["min(440px,110vw)", "tmRingPulse3 3.6s ease-in-out 0.8s infinite"],
            ].map(([size, anim], i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border-[1.5px] border-[rgba(97,187,197,0.25)]"
                style={{ width: size, height: size, animation: anim, zIndex: 0 }}
              />
            ))}

            {/* photo frame — overflow-hidden crops photo to rounded rect */}
            <div
              className="absolute inset-0 rounded-[22px] sm:rounded-[28px] overflow-hidden"
              style={{
                zIndex:    1,
                boxShadow: "0 24px 64px rgba(3,70,101,0.18),0 0 0 4px rgba(97,187,197,0.18),0 0 0 8px rgba(97,187,197,0.07)",
                animation: `${dir > 0 ? "tmPhotoInRight" : "tmPhotoInLeft"} 0.5s cubic-bezier(0.22,1,0.36,1) both`,
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top block"
                onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
              />
              <div
                className="w-full h-full hidden items-center justify-center text-[2.5rem] font-extrabold text-white"
                style={{ background: "linear-gradient(135deg,#61BBC5,#034665)" }}
              >
                {member.initials}
              </div>
            </div>

            {/* ── name chip: z-[30] ensures it's always ABOVE the photo (z:1) and rings (z:0)
                 bottom: -20px sits just below the photo rect ── */}
            <div
              className="absolute left-1/2 bg-white border border-[rgba(97,187,197,0.3)] rounded-full text-[0.70rem] sm:text-[0.78rem] font-bold text-[#0d3d5a] whitespace-nowrap flex items-center gap-1.5 sm:gap-2"
              style={{
                bottom:    "-20px",
                transform: "translateX(-50%)",
                zIndex:    30,
                padding:   "6px 14px",
                boxShadow: "0 6px 20px rgba(3,70,101,0.12)",
                animation: "tmChipIn 0.4s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation: "tmDot 2s ease-in-out infinite" }} />
              {member.name}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes tmGlowDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes tmGlowDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,25px)} }
        @keyframes tmGlowDrift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,30px)} }
      `}</style>
    </section>
  );
}
