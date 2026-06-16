import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GradText({ children }) {
  return <span style={{ background:"linear-gradient(135deg,#034665,#61BBC5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{children}</span>;
}
function Pill({ icon, label }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(97,187,197,0.1)", border:"1px solid rgba(97,187,197,0.28)", borderRadius:50, padding:"0.28rem 0.88rem" }}>
      <i className={`bi ${icon}`} style={{ fontSize:"0.68rem", color:"#61BBC5" }} />
      <span style={{ fontSize:"0.68rem", fontWeight:700, color:"#034665", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function MagCard({ accentColor, accentBg, accentBorder, iconClass, category, title, badge, desc, desc2, features, flip, delay }) {
  const contentBlock = (
    <div style={{ padding:"2rem", borderRight: flip ? "none" : "1.5px solid #f1f5f9", borderLeft: flip ? "1.5px solid #f1f5f9" : "none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
        <div style={{ width:46, height:46, borderRadius:14, background:accentBg, border:`1.5px solid ${accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className={`bi ${iconClass}`} style={{ fontSize:"1.3rem", color:accentColor }} />
        </div>
        <div>
          <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:accentColor, marginBottom:"0.15rem" }}>{category}</div>
          <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{title}</h3>
        </div>
        {badge && <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:accentBg, color:accentColor, border:`1px solid ${accentBorder}`, whiteSpace:"nowrap" }}>{badge}</span>}
      </div>
      <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{desc}</p>
      {desc2 && <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>{desc2}</p>}
    </div>
  );
  const featBlock = (
    <div style={{ padding:"2rem", background:"#fafbfc" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:700, color:accentColor, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
        {features.map(f => (
          <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
            <span style={{ width:18, height:18, borderRadius:5, background:accentBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
              <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:accentColor }} />
            </span>
            <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <motion.div
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      transition={{ duration:0.5, delay: delay||0 }} viewport={{ once:true, margin:"-40px" }}
      style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
      className="svc-two-col">
      {flip ? <>{featBlock}{contentBlock}</> : <>{contentBlock}{featBlock}</>}
    </motion.div>
  );
}

export default function GameDevelopmentPage() {
  useEffect(() => { window.scrollTo(0,0); document.title="Game Development | Kevalon Technology"; return ()=>{document.title="Kevalon Technology";}; }, []);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{`
        .svc-stat-card{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}
        .svc-stat-card:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}
        .svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;}
        .svc-pc:hover{border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16);}
        .svc-tp{display:flex;align-items:center;gap:0.55rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;font-size:0.81rem;font-weight:600;color:#374151;transition:all 0.25s;cursor:default;}
        .svc-tp:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}
        .svc-or{display:flex;align-items:flex-start;gap:0.85rem;padding:0.7rem 0.9rem;border-radius:12px;border:1.5px solid #e2e8f0;transition:all 0.22s;}
        .svc-or:hover{border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px);}
        @media(max-width:960px){
          .svc-two-col{grid-template-columns:1fr !important;}
          .svc-three-col{grid-template-columns:1fr 1fr !important;}
          .svc-four-col{grid-template-columns:1fr 1fr !important;}
          .svc-bc{grid-template-columns:1fr !important;}
        }
        @media(max-width:560px){
          .svc-three-col{grid-template-columns:1fr !important;}
          .svc-tg{grid-template-columns:1fr !important;}
          .svc-four-col{grid-template-columns:1fr 1fr !important;}
          .svc-two-col{grid-template-columns:1fr !important;}
        }
      `}</style>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-controller" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            Game<br /><GradText>Development</GradText>
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
            Create engaging and immersive games that captivate players and drive success.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Get in Touch
            </Link>
            <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
              View Portfolio <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}><path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" /></svg>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              {icon:"bi-controller",   color:"#034665", val:"20+",  label:"Games Shipped"    },
              {icon:"bi-calendar-check",color:"#4f46e5",val:"3+",   label:"Years Experience" },
              {icon:"bi-star-fill",    color:"#f59e0b", val:"4.6+", label:"Play Store Rating" },
              {icon:"bi-people-fill",  color:"#22c55e", val:"25k+", label:"Active Players"   },
            ].map((s,i)=>(
              <motion.div key={s.label} className="svc-stat-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:i*0.08 }} viewport={{ once:true }}>
                <div style={{ width:42, height:42, borderRadius:12, background:s.color+"12", border:"1.5px solid "+s.color+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}>
                  <i className={`bi ${s.icon}`} style={{ fontSize:"1.05rem", color:s.color }} />
                </div>
                <div style={{ fontSize:"1.8rem", fontWeight:900, color:"#0d1f35", lineHeight:1, marginBottom:"0.25rem" }}>{s.val}</div>
                <div style={{ fontSize:"0.73rem", color:"#64748b", fontWeight:500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ padding:"3.5rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0" }}>
                Game Development<br /><GradText>With Kevalon Technology</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Game development is the process of creating video games for various platforms including mobile devices, desktop computers, consoles, and web browsers. It involves game design, programming, art creation, sound design, and testing to create engaging and immersive gaming experiences.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we develop custom games that captivate players and drive engagement. Our game development team creates 2D and 3D games for multiple platforms using industry-leading game engines and modern technologies.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem 1.5rem" }}>
                {[
                  "2D & 3D Game Development",
                  "Mobile Games (iOS & Android)",
                  "Multiplayer Online Games",
                  "Game UI/UX Design",
                  "Unity & Unreal Engine",
                  "Cross-Platform Publishing",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.45rem", padding:"0.25rem 0" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", flexShrink:0, marginTop:"0.15rem", fontSize:"0.8rem" }} />
                    <span style={{ fontSize:"0.82rem", color:"#374151", lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }} style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ textAlign:"center", marginBottom:"1rem" }}>
                  <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#034665,#0a6e90)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:"0.5rem" }}>
                    <i className="bi bi-controller" style={{ fontSize:"1.8rem", color:"#fff" }} />
                  </div>
                  <div style={{ fontSize:"0.9rem", fontWeight:700, color:"#0d1f35" }}>Game Studio Pipeline</div>
                  <div style={{ fontSize:"0.72rem", color:"#94a3b8" }}>Mobile - Web - PC Games</div>
                </div>
                {[
                  {icon:"bi-lightbulb-fill",  color:"#f59e0b", bg:"#fffbeb",  label:"Concept & Design",  sub:"Ideation - GDD - Prototyping"  },
                  {icon:"bi-code-slash",       color:"#034665", dark:true,      label:"Development",       sub:"Unity - Unreal - C# / C++"     },
                  {icon:"bi-palette2",         color:"#8b5cf6", bg:"#f5f3ff",  label:"Art & Animation",   sub:"2D / 3D - Rigging - VFX"       },
                  {icon:"bi-phone",            color:"#22c55e", bg:"#f0fdf4",  label:"Deploy & Publish",  sub:"App Store - Play Store - Web"  },
                ].map((item,i)=>(
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:item.dark?"linear-gradient(135deg,#034665,#0a6e90)":(item.bg||"#fff"), border:`1.5px solid ${item.dark?"transparent":"#f1f5f9"}` }}>
                      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:item.dark?"rgba(255,255,255,0.15)":item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color:item.dark?"#fff":item.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize:"0.77rem", fontWeight:700, color:item.dark?"#fff":"#0d1f35" }}>{item.label}</div>
                        <div style={{ fontSize:"0.64rem", color:item.dark?"rgba(255,255,255,0.55)":"#94a3b8" }}>{item.sub}</div>
                      </div>
                      <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:item.dark?"rgba(255,255,255,0.65)":"#22c55e", fontSize:"0.78rem" }} />
                    </div>
                    {i<3 && <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}><div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} /></div>}
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Game live on all platforms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GAME TYPES — magazine cards */}
      <section style={{ padding:"2rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Types of Games We <GradText>Build</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              From casual puzzles to immersive 3D worlds — we engineer every genre with precision and passion.
            </p>
          </motion.div>

          <MagCard
            accentColor="#8b5cf6" accentBg="#f5f3ff" accentBorder="#ddd6fe"
            iconClass="bi-phone-fill" category="Mobile Gaming" title="2D Game Development" badge="Unity - C#"
            desc="Create engaging 2D games for mobile, web, and desktop platforms. Our 2D games feature beautiful graphics, smooth animations, and addictive gameplay mechanics."
            desc2="Optimized for performance on all devices with battery-efficient rendering and responsive touch controls."
            features={["Sprite-based 2D graphics","2D animation and physics","Tile-based level design","Puzzle and arcade games","Platformer games","Casual mobile games"]}
            delay={0} />

          <MagCard
            accentColor="#ef4444" accentBg="#fef2f2" accentBorder="#fecaca"
            iconClass="bi-cpu-fill" category="3D & Immersive" title="3D Game Development" badge="Unreal - Unity"
            desc="Build immersive 3D games with realistic graphics, advanced physics, and stunning visual effects. Our 3D games provide engaging experiences across multiple platforms."
            desc2="Built for modern hardware performance with LOD systems, shader optimization, and efficient asset pipelines."
            features={["3D modeling and animation","Real-time rendering","Physics simulation","Action and adventure games","Racing games","Simulation games"]}
            flip delay={0.08} />

          <MagCard
            accentColor="#16a34a" accentBg="#f0fdf4" accentBorder="#bbf7d0"
            iconClass="bi-phone-landscape-fill" category="Mobile Platform" title="Mobile Game Development" badge="iOS - Android"
            desc="Develop mobile games for iOS and Android platforms. Our mobile games are optimized for performance, battery life, and various screen sizes."
            desc2="Built with mobile-first architecture ensuring smooth gameplay across thousands of Android and iOS devices."
            features={["iOS and Android games","Touch controls and gestures","Mobile-optimized graphics","In-app purchases integration","Push notifications","Social media integration"]}
            delay={0.12} />

          <MagCard
            accentColor="#0ea5e9" accentBg="#f0f9ff" accentBorder="#bae6fd"
            iconClass="bi-people-fill" category="Online Gaming" title="Multiplayer Games" badge="Real-Time - Servers"
            desc="Create multiplayer games that connect players worldwide. Our multiplayer games support real-time gameplay, matchmaking, and social features."
            desc2="From small indie co-op titles to large-scale competitive arenas — we handle the full backend infrastructure."
            features={["Real-time multiplayer gameplay","Matchmaking and lobbies","Leaderboards and rankings","Chat and social features","Server infrastructure","Anti-cheat systems"]}
            flip delay={0.16} />

          <MagCard
            accentColor="#f97316" accentBg="#fff7ed" accentBorder="#fed7aa"
            iconClass="bi-palette2" category="Creative" title="Game Design & Art" badge="UI/UX - Art"
            desc="Comprehensive game design services including concept art, character design, level design, and UI/UX for games."
            desc2="Our creative team handles the complete visual pipeline — from initial concept sketches to final in-game assets."
            features={["Game concept and storyboarding","Character design and animation","Level design and environment art","UI/UX design for games","Sound design and music","Game testing and QA"]}
            delay={0.20} />
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="About Game Development" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Mobile - Web - <GradText>PC Games</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we create high-quality, immersive, and engaging games for mobile, web, and desktop platforms using industry-leading engines like Unity and Unreal Engine. Our expert developers and designers focus on delivering visually rich, performance-optimized, and scalable gaming solutions tailored to modern user expectations.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                From simple casual games to advanced multiplayer systems, we build games that ensure smooth gameplay, strong security, and cross-platform compatibility. Our development process combines creative design, advanced technologies, and user-focused mechanics to deliver interactive, reliable, and commercially successful gaming experiences for global audiences.
              </p>

              {/* Game Types */}
              <div style={{ marginBottom:"1.4rem" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 0.75rem" }}>Game Types We Develop</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {["Casual Games","Puzzle Games","RPG Games","Racing Games","Sports Games","Simulation Games","Arcade Games","Metaverse Games"].map(g=>(
                    <span key={g} style={{ fontSize:"0.78rem", fontWeight:600, color:"#034665", background:"rgba(97,187,197,0.10)", border:"1px solid rgba(97,187,197,0.28)", borderRadius:20, padding:"0.28rem 0.85rem" }}>{g}</span>
                  ))}
                </div>
              </div>

              {/* Features checklist */}
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {[
                  "2D & 3D Game Development (High-quality graphics & animations)",
                  "Mobile Game Development (Android & iOS platforms)",
                  "Multiplayer & Online Gaming (Real-time networking)",
                  "Professional Game Design (UI/UX, characters, levels)",
                  "Unity & Unreal Engine Development",
                  "Cross-Platform Games (Mobile, Web, Desktop)",
                  "Cloud-Based Gaming Support",
                  "Game Optimization & Performance Tuning",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.85rem", flexShrink:0 }} />
                    <span style={{ fontSize:"0.85rem", color:"#334155", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              {/* Technologies & Game Engines */}
              <Pill icon="bi-cpu-fill" label="Technologies & Game Engines We Use" />
              <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.5rem" }}>
                Technologies <GradText>We Use</GradText>
              </h3>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>
                At Kevalon Technology, we leverage industry-leading game engines, programming languages, and cloud technologies to build high-performance, scalable, and immersive gaming experiences across platforms.
              </p>
              <div className="svc-tg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                {[
                  {c:"#1d1d1d", bg:"#f5f5f5", bdr:"#1d1d1d28", ic:"bi-unity",          lb:"Unity"          },
                  {c:"#0d3d5a", bg:"#f0f7ff", bdr:"#0d3d5a28", ic:"bi-cpu-fill",        lb:"Unreal Engine"  },
                  {c:"#004482", bg:"#f0f4ff", bdr:"#00448228", ic:"bi-code-slash",       lb:"C++"            },
                  {c:"#68217a", bg:"#f9f0ff", bdr:"#68217a28", ic:"bi-filetype-cs",      lb:"C#"             },
                  {c:"#f7df1e", bg:"#fffde7", bdr:"#f7df1e28", ic:"bi-braces",           lb:"JavaScript"     },
                  {c:"#3ddc84", bg:"#f0fdf4", bdr:"#3ddc8428", ic:"bi-android2",         lb:"Android"        },
                  {c:"#1d1d1d", bg:"#f5f5f5", bdr:"#1d1d1d28", ic:"bi-apple",            lb:"iOS"            },
                  {c:"#ff9900", bg:"#fffbeb", bdr:"#ff990028", ic:"bi-cloud-fill",       lb:"AWS Cloud"      },
                  {c:"#2496ed", bg:"#f0f9ff", bdr:"#2496ed28", ic:"bi-box-seam",         lb:"Docker"         },
                  {c:"#61BBC5", bg:"rgba(97,187,197,0.1)", bdr:"rgba(97,187,197,0.3)", ic:"bi-joystick", lb:"Custom Engines" },
                ].map((tech,i)=>(
                  <motion.div key={tech.lb} className="svc-tp" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:i*0.055 }} viewport={{ once:true }}>
                    <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:tech.bg, border:`1.5px solid ${tech.bdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className={`bi ${tech.ic}`} style={{ fontSize:"0.95rem", color:tech.c }} />
                    </div>
                    <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>{tech.lb}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GAME DEVELOPMENT FEATURES */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-stars" label="Game Development Features" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Game Development <GradText>Features</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:620, margin:"0 auto" }}>
              At Kevalon Technology, we deliver high-performance, scalable, and immersive gaming solutions designed for modern platforms and global users.
            </p>
          </motion.div>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)", height:"100%", boxSizing:"border-box" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>What We Deliver</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                  {[
                    { icon:"bi-joystick",   text:"2D & 3D Game Development (High-quality graphics & animations)" },
                    { icon:"bi-phone-fill", text:"Mobile Game Development (Android & iOS platforms)"            },
                    { icon:"bi-people-fill",text:"Multiplayer & Online Gaming (Real-time networking)"           },
                    { icon:"bi-palette2",   text:"Professional Game Design (UI/UX, characters, levels)"        },
                  ].map(item=>(
                    <div key={item.text} style={{ display:"flex", alignItems:"flex-start", gap:"0.85rem" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.95rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.88rem", color:"#334155", lineHeight:1.65, paddingTop:"0.4rem", fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)", height:"100%", boxSizing:"border-box" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>Advanced Capabilities</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                  {[
                    { icon:"bi-unity",        text:"Unity & Unreal Engine Development"            },
                    { icon:"bi-grid-1x2-fill", text:"Cross-Platform Games (Mobile, Web, Desktop)"  },
                    { icon:"bi-cloud-fill",    text:"Cloud-Based Gaming Support"                   },
                    { icon:"bi-speedometer2",  text:"Game Optimization & Performance Tuning"       },
                  ].map(item=>(
                    <div key={item.text} style={{ display:"flex", alignItems:"flex-start", gap:"0.85rem" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))", border:"1.5px solid rgba(97,187,197,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.95rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.88rem", color:"#334155", lineHeight:1.65, paddingTop:"0.4rem", fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2rem" }}>
            <Pill icon="bi-check2-all" label="What We Offer" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Our Game Dev <GradText>Services</GradText>
            </h2>
          </motion.div>
          <div className="svc-three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            {[
              {icon:"bi-joystick",     title:"2D Game Development",    desc:"Polished 2D games for mobile, web, and desktop with great gameplay loops."},
              {icon:"bi-box-fill",     title:"3D Game Development",    desc:"Immersive 3D experiences with realistic physics and environments."},
              {icon:"bi-phone-fill",   title:"Mobile Game Development",desc:"iOS and Android games optimized for touch controls and performance."},
              {icon:"bi-people-fill",  title:"Multiplayer Games",      desc:"Real-time online games with dedicated servers and matchmaking."},
              {icon:"bi-palette2",     title:"Game Design & Art",      desc:"Complete art direction, character design, UI/UX, and sound design."},
              {icon:"bi-arrow-repeat", title:"Post-Launch Support",    desc:"Bug fixes, new content, platform updates, and ongoing maintenance."},
            ].map((item,i)=>(
              <motion.div key={item.title} className="svc-pc" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:i*0.07 }} viewport={{ once:true }}>
                <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize:"1.25rem", color:"#034665" }} />
                </div>
                <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>{item.title}</h4>
                <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65, margin:0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
