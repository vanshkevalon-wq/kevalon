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

export default function MobileApplicationDevelopmentPage() {
  useEffect(() => { window.scrollTo(0,0); document.title="Mobile App Development | Kevalon Technology"; return ()=>{document.title="Kevalon Technology";}; }, []);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{`
        .svc-stat-card{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}
        .svc-stat-card:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}
        .svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;position:relative;overflow:hidden;}
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
          .svc-mc{grid-template-columns:1fr !important;}
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
          <Pill icon="bi-phone-fill" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            Mobile Application<br /><GradText>Development</GradText>
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:560, margin:"0 auto 1.8rem" }}>
            Build powerful, scalable mobile applications for iOS and Android platforms.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Get in Touch
            </Link>
            <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
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
              {icon:"bi-phone-fill",       color:"#034665", val:"30+",  label:"Apps Delivered"    },
              {icon:"bi-calendar-check",   color:"#4f46e5", val:"3+",   label:"Years Experience"  },
              {icon:"bi-star-fill",        color:"#f59e0b", val:"4.8+", label:"App Store Rating"  },
              {icon:"bi-emoji-smile-fill", color:"#22c55e", val:"100%", label:"Client Satisfaction"},
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
                Mobile Application Development<br /><GradText>With Kevalon Technology</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Our Mobile Application Development services are designed to help businesses build powerful, scalable mobile applications for iOS and Android platforms. Whether you're a startup looking to launch your first mobile app or an enterprise seeking to expand your digital presence, our team offers comprehensive mobile development solutions.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we offer structured mobile application development services that combine modern frameworks with best practices. Our services are designed to help you build high-quality mobile applications that deliver exceptional user experiences.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem 1.5rem" }}>
                {[
                  "Native iOS & Android App Development",
                  "Cross-Platform App Development (Flutter, React Native)",
                  "Secure Backend & API Integration",
                  "Cloud Integration & Scalability",
                  "App Store & Play Store Deployment Support",
                  "Performance Optimization & Security",
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
                    <i className="bi bi-phone-fill" style={{ fontSize:"1.8rem", color:"#fff" }} />
                  </div>
                  <div style={{ fontSize:"0.9rem", fontWeight:700, color:"#0d1f35" }}>iOS - Android - Cross-Platform Apps</div>
                  <div style={{ fontSize:"0.72rem", color:"#94a3b8" }}>iOS & Android from one codebase</div>
                </div>
                {[
                  {icon:"bi-apple",    color:"#1d1d1d", bg:"#f5f5f5", label:"iOS App",       sub:"Swift - Objective-C - SwiftUI"    },
                  {icon:"bi-android2", color:"#3ddc84", bg:"#f0fdf4", label:"Android App",   sub:"Kotlin - Java - Jetpack Compose"  },
                  {icon:"bi-layers-fill",color:"#61dafb",bg:"#f0fcff",label:"React Native",  sub:"One codebase - Both platforms"    },
                  {icon:"bi-phone",    color:"#027dfd", bg:"#f0f7ff", label:"Flutter",        sub:"Dart - Material - Cupertino"      },
                ].map((item,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.55rem 0.85rem", borderRadius:11, background:item.bg, border:"1.5px solid #f1f5f9", marginBottom:"0.4rem" }}>
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color:item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#0d1f35" }}>{item.label}</div>
                      <div style={{ fontSize:"0.64rem", color:"#94a3b8" }}>{item.sub}</div>
                    </div>
                    <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:"#22c55e", fontSize:"0.78rem" }} />
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>App published on both stores</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PLATFORMS — magazine cards */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Mobile Platforms We <GradText>Develop For</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              Native and cross-platform mobile solutions engineered for every device — fully featured and always performant.
            </p>
          </motion.div>

          {/* iOS */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f5f5f5", border:"1.5px solid #d1d5db", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-apple" style={{ fontSize:"1.3rem", color:"#1d1d1d" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#1d1d1d", marginBottom:"0.15rem" }}>Apple Platform</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>iOS Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.85rem" }}>
                Native iOS application development using Swift and Objective-C. Build <strong style={{ color:"#0d1f35" }}>high-performance apps for iPhone and iPad</strong> with native iOS features and seamless App Store integration.
              </p>
            </div>
            <div style={{ padding:"2rem", background:"#fafbfc" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#1d1d1d", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "Native iOS app development (Swift, Objective-C)",
                  "iPhone and iPad app development",
                  "iOS UI/UX design and implementation",
                  "Core Data and CloudKit integration",
                  "App Store submission and optimization",
                  "iOS app testing and debugging",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#1d1d1d" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Android */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.08 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", background:"#ffffff", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#16a34a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "Native Android app development (Kotlin, Java)",
                  "Material Design implementation",
                  "Android UI/UX design and development",
                  "Room Database and Firebase integration",
                  "Google Play Store submission and optimization",
                  "Android app testing and debugging",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#ffffff", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-android2" style={{ fontSize:"1.3rem", color:"#16a34a" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#16a34a", marginBottom:"0.15rem" }}>Google Platform</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Android Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.85rem" }}>
                Native Android application development using Kotlin and Java. Build <strong style={{ color:"#0d1f35" }}>feature-rich Android apps</strong> with Material Design and Google Play Store integration.
              </p>
            </div>
          </motion.div>

          {/* React Native */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.12 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f0fcff", border:"1.5px solid #bae6fd", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-layers-fill" style={{ fontSize:"1.2rem", color:"#0ea5e9" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#0ea5e9", marginBottom:"0.15rem" }}>Cross-Platform</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>React Native Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8 }}>
                Cross-platform mobile app development using React Native. Build <strong style={{ color:"#0d1f35" }}>iOS and Android apps with a single codebase</strong>, reducing development time and costs.
              </p>
            </div>
            <div style={{ padding:"2rem", background:"#fafbfc" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#0ea5e9", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "Cross-platform app development (iOS & Android)",
                  "React Native framework and best practices",
                  "Native module integration",
                  "State management (Redux, Context API)",
                  "API integration and data management",
                  "App deployment to App Store and Play Store",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#e0f2fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#0ea5e9" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Flutter */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.16 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", background:"#fafbfc", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#027dfd", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "Cross-platform app development (iOS & Android)",
                  "Flutter framework and Dart programming",
                  "Custom UI widgets and animations",
                  "State management (Provider, Bloc, Riverpod)",
                  "Firebase and backend integration",
                  "App deployment to App Store and Play Store",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#027dfd" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f0f7ff", border:"1.5px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-phone" style={{ fontSize:"1.2rem", color:"#027dfd" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#027dfd", marginBottom:"0.15rem" }}>One Codebase</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Flutter Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8 }}>
                Cross-platform mobile app development using Flutter. Build <strong style={{ color:"#0d1f35" }}>beautiful, high-performance apps for iOS and Android</strong> with a single codebase using Dart.
              </p>
            </div>
          </motion.div>

          {/* Mobile App Features */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.20 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#fef3c7", border:"1.5px solid #fde68a", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-stars" style={{ fontSize:"1.2rem", color:"#d97706" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#d97706", marginBottom:"0.15rem" }}>Built-In</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Mobile App Features</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8 }}>
                Comprehensive mobile app features and integrations to <strong style={{ color:"#0d1f35" }}>enhance user experience and functionality</strong> across every platform.
              </p>
            </div>
            <div style={{ padding:"2rem", background:"#fafbfc" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#d97706", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "User authentication and authorization",
                  "Push notifications and real-time updates",
                  "Offline data synchronization",
                  "Payment gateway integration",
                  "Social media integration",
                  "Analytics and crash reporting",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#fef3c7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#d97706" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Security & Performance */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.24 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="svc-two-col">
            <div style={{ padding:"2rem", background:"#fafbfc", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#4f46e5", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                {[
                  "End-to-end data encryption and secure storage",
                  "Secure API architecture, authentication & authorization",
                  "Performance optimization, caching & load balancing",
                  "Memory management and battery efficiency",
                  "Application security audits & penetration testing",
                  "Compliance with GDPR, data privacy & regulatory standards",
                  "Scalable infrastructure for high user traffic handling",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                    <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
                      <i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#4f46e5" }} />
                    </span>
                    <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#eff6ff", border:"1.5px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-shield-lock-fill" style={{ fontSize:"1.2rem", color:"#4f46e5" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4f46e5", marginBottom:"0.15rem" }}>Enterprise-Grade</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Security & Performance</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>
                At Kevalon Technology, we follow enterprise-grade security standards and performance optimization strategies to ensure your mobile applications are <strong style={{ color:"#0d1f35" }}>secure, fast, reliable, and scalable</strong> for long-term growth.
              </p>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8 }}>
                Our mobile app architecture is designed with a <strong style={{ color:"#0d1f35" }}>security-first and performance-driven approach</strong>, protecting user data while delivering smooth user experiences across all devices and platforms.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="About Mobile App Development" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Kevalon Technology —<GradText> Your Trusted Partner</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we deliver high-performance, secure, and scalable mobile applications designed to help businesses grow in the digital ecosystem. Our mobile app development services cover iOS app development, Android app development, and cross-platform solutions using modern frameworks and industry best practices.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                We build user-centric mobile applications that combine beautiful UI/UX design with powerful backend architecture. From business apps and e-commerce platforms to enterprise solutions and startup products, our mobile apps are designed for performance, security, and long-term scalability.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                Our development process includes <strong style={{ color:"#034665" }}>strategy planning, UI/UX design, development, testing, deployment, and long-term support</strong>, ensuring reliable performance, smooth user experience, and future-ready mobile solutions.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom:"1.2rem" }}>
                {[
                  "Native iOS & Android App Development",
                  "Cross-Platform App Development (Flutter, React Native)",
                  "Secure Backend & API Integration",
                  "Cloud Integration & Scalability",
                  "App Store & Play Store Deployment Support",
                  "Performance Optimization & Security",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.85rem", flexShrink:0 }} />
                    <span style={{ fontSize:"0.85rem", color:"#334155", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <p style={{ color:"#4a5568", lineHeight:1.85, fontSize:"0.93rem" }}>
                If you are looking for a professional mobile app development company in Ahmedabad, <strong style={{ color:"#034665" }}>Kevalon Technology</strong> is your trusted partner for building innovative, reliable, and future-ready mobile applications that drive business growth and digital success.
              </p>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              {/* Why Choose */}
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)", marginBottom:"1.2rem" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>Why Choose Kevalon Technology</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem" }}>
                  {[
                    { icon:"bi-people-fill",     text:"Experienced & certified mobile app developers"   },
                    { icon:"bi-shield-check",    text:"Scalable, secure & future-ready architecture"     },
                    { icon:"bi-graph-up-arrow",  text:"Business-focused & ROI-driven solutions"          },
                    { icon:"bi-currency-rupee",  text:"Cost-effective development models"                },
                    { icon:"bi-arrow-repeat",    text:"Long-term support, maintenance & upgrades"        },
                    { icon:"bi-calendar-check",  text:"Guaranteed timelines & transparent process"       },
                  ].map(item=>(
                    <div key={item.text} style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.85rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.85rem", color:"#334155", lineHeight:1.65, paddingTop:"0.35rem", fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2rem" }}>
            <Pill icon="bi-cpu-fill" label="Technologies We Use" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Technologies <GradText>We Use</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:600, margin:"0 auto" }}>
              At Kevalon Technology, we use modern mobile app development technologies and frameworks to build secure, scalable, and high-performance applications. Our technology stack enables us to deliver reliable iOS, Android, and cross-platform mobile solutions tailored to business needs.
            </p>
          </motion.div>
          <div className="svc-four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              {c:"#61dafb", bg:"#f0fcff", bdr:"#61dafb28", ic:"bi-code-slash",     lb:"React Native" },
              {c:"#027dfd", bg:"#f0f7ff", bdr:"#027dfd28", ic:"bi-phone",          lb:"Flutter"      },
              {c:"#3ddc84", bg:"#f0fdf4", bdr:"#3ddc8428", ic:"bi-android2",       lb:"Android"      },
              {c:"#1d1d1d", bg:"#f5f5f5", bdr:"#1d1d1d28", ic:"bi-apple",          lb:"iOS"          },
              {c:"#f7df1e", bg:"#fffde7", bdr:"#f7df1e28", ic:"bi-braces",         lb:"JavaScript"   },
              {c:"#3178c6", bg:"#eff6ff", bdr:"#3178c628", ic:"bi-braces-asterisk",lb:"TypeScript"   },
              {c:"#3c873a", bg:"#f0fdf4", bdr:"#3c873a28", ic:"bi-node-plus",      lb:"Node.js"      },
              {c:"#ff6b35", bg:"#fff4f0", bdr:"#ff6b3528", ic:"bi-fire",           lb:"Firebase"     },
              {c:"#ff9900", bg:"#fffbeb", bdr:"#ff990028", ic:"bi-cloud-fill",     lb:"AWS"          },
              {c:"#2496ed", bg:"#f0f9ff", bdr:"#2496ed28", ic:"bi-box-seam",       lb:"Docker"       },
            ].map((tech,i)=>(
              <motion.div key={tech.lb} className="svc-tp" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:i*0.055 }} viewport={{ once:true }}>
                <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:tech.bg, border:`1.5px solid ${tech.bdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <i className={`bi ${tech.ic}`} style={{ fontSize:"0.95rem", color:tech.c }} />
                </div>
                <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>{tech.lb}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
