import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GradText({ children }) {
  return (
    <span style={{ background: "linear-gradient(135deg,#034665,#61BBC5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {children}
    </span>
  );
}
function Pill({ icon, label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(97,187,197,0.1)", border: "1px solid rgba(97,187,197,0.28)", borderRadius: 50, padding: "0.28rem 0.88rem" }}>
      <i className={`bi ${icon}`} style={{ fontSize: "0.68rem", color: "#61BBC5" }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#034665", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

const CHECK_CSS = (bg, color) => ({ width:18, height:18, borderRadius:5, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" });

export default function WebAppDevelopmentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Web Application Development | Kevalon Technology";
    return () => { document.title = "Kevalon Technology"; };
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", color: "#1e293b", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        .svc-stat-card { text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s; }
        .svc-stat-card:hover { border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14); }
        .svc-pc { background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;position:relative;overflow:hidden; }
        .svc-pc:hover { border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16); }
        .svc-tp { display:flex;align-items:center;gap:0.55rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;font-size:0.81rem;font-weight:600;color:#374151;transition:all 0.25s;cursor:default; }
        .svc-tp:hover { transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08); }
        .svc-or { display:flex;align-items:flex-start;gap:0.85rem;padding:0.7rem 0.9rem;border-radius:12px;border:1.5px solid #e2e8f0;transition:all 0.22s; }
        .svc-or:hover { border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px); }
        .svc-mc { background:#fff;border-radius:20px;border:1.5px solid #e2e8f0;overflow:hidden;margin-bottom:0.7rem;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:grid;grid-template-columns:1fr 1fr; }
        @media(max-width:960px){
          .svc-two-col,.svc-bc,.svc-mc { grid-template-columns:1fr !important; }
          .svc-three-col { grid-template-columns:1fr 1fr !important; }
          .svc-four-col { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:560px){
          .svc-three-col { grid-template-columns:1fr !important; }
          .svc-four-col  { grid-template-columns:1fr 1fr !important; }
          .svc-tg        { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:"relative", minHeight:500, display:"flex", alignItems:"center", background:"#fff", overflow:"hidden", paddingTop:"5rem" }}>
        <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1.5rem 3.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-globe2" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.6rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 1rem" }}>
            Web Application<br /><GradText>Development</GradText>
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.85, maxWidth:580, margin:"0 auto 0.75rem" }}>
            Intuitive design is how we give the user new superpowers.
          </p>
          <p style={{ color:"#475569", fontSize:"0.93rem", lineHeight:1.85, maxWidth:620, margin:"0 auto 1.8rem" }}>
            Web application development refers to the process of creating web pages and deploying them to a server. This process includes web design, web content development, client-side/server-side scripting, and network security configuration.
          </p>
          <p style={{ color:"#475569", fontSize:"0.93rem", lineHeight:1.85, maxWidth:620, margin:"0 auto 1.8rem" }}>
            At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we specialize in developing both static and dynamic websites that are tailored to your business needs. Our team of experienced developers uses modern technologies and best practices to ensure your website is fast, secure, and scalable.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Start Your Project
            </Link>
            <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
              View Portfolio <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}>
            <path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              { icon:"bi-code-slash",     color:"#034665", val:"50+",  label:"Projects Delivered"  },
              { icon:"bi-calendar-check", color:"#4f46e5", val:"3+",   label:"Years Experience"    },
              { icon:"bi-people-fill",    color:"#22c55e", val:"20+",  label:"Expert Developers"   },
              { icon:"bi-star-fill",      color:"#f59e0b", val:"100%", label:"Client Satisfaction" },
            ].map((s, i) => (
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

      {/* ── THREE SERVICE TYPES ── */}
      <section style={{ padding:"3rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Types of Websites We <GradText>Build</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              Robust, scalable web solutions engineered for every business need — fully featured and always performant.
            </p>
          </motion.div>

          {/* Card 1 — Static */}
          <motion.div className="svc-mc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true, margin:"-40px" }}>
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f0fdf4", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-lightning-charge-fill" style={{ fontSize:"1.2rem", color:"#16a34a" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#16a34a", marginBottom:"0.15rem" }}>Fast & Lightweight</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Static Website Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.85rem" }}>
                Static websites are the perfect solution for businesses that require a fast, reliable, and professional online presence. At Kevalon Technology, we design high-quality static websites that deliver speed, simplicity, and strong brand visibility while maintaining a modern and visually appealing user experience.
              </p>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>
                Our static websites are ideal for companies that do not require frequent content updates but want a strong digital footprint. These websites are <strong style={{ color:"#0d1f35" }}>lightweight, secure, SEO-friendly, and optimized for performance</strong> across all devices and browsers.
              </p>
            </div>
            <div style={{ padding:"2rem", background:"#f8fafc" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#16a34a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1rem" }}>Key Features</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {[
                  "Ultra fast-loading and high-performance pages",
                  "Mobile-first and fully responsive design",
                  "SEO-optimized structure and clean code",
                  "Low maintenance and cost-effective solution",
                  "High security with minimal vulnerabilities",
                  "Perfect for portfolios, business profiles, brochures, and brand websites",
                ].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
                    <span style={CHECK_CSS("#dcfce7","#16a34a")}><i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#16a34a" }} /></span>
                    <span style={{ fontSize:"0.83rem", color:"#374151", lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Semi-Dynamic */}
          <motion.div className="svc-mc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.08 }} viewport={{ once:true, margin:"-40px" }}>
            <div style={{ padding:"2rem", background:"#f8fafc", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#4f46e5", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1rem" }}>Key Features</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {[
                  "Easy content updates with admin panel or CMS",
                  "High performance and fast-loading pages",
                  "SEO-optimized structure and clean code",
                  "Mobile-first and responsive design",
                  "Cost-effective compared to fully dynamic systems",
                  "Ideal for business websites, startups, and service providers",
                ].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
                    <span style={CHECK_CSS("#ede9fe","#4f46e5")}><i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#4f46e5" }} /></span>
                    <span style={{ fontSize:"0.83rem", color:"#374151", lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#eff6ff", border:"1.5px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-sliders" style={{ fontSize:"1.2rem", color:"#4f46e5" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4f46e5", marginBottom:"0.15rem" }}>Flexible & Manageable</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Semi-Dynamic Website Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.85rem" }}>
                Semi-dynamic websites offer the perfect balance between static and fully dynamic platforms. They allow businesses to manage content easily while maintaining high performance, security, and scalability. At Kevalon Technology, we build semi-dynamic websites that combine speed, flexibility, and professional design.
              </p>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>
                These websites are ideal for businesses that need content updates such as <strong style={{ color:"#0d1f35" }}>blogs, services, portfolios, galleries, testimonials, and announcements</strong> without complex backend systems.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Dynamic */}
          <motion.div className="svc-mc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.16 }} viewport={{ once:true, margin:"-40px" }}>
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f0f9ff", border:"1.5px solid #bae6fd", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className="bi bi-cpu-fill" style={{ fontSize:"1.2rem", color:"#0a8fb6" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#0a8fb6", marginBottom:"0.15rem" }}>Powerful & Scalable</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Dynamic Website Development</h3>
                </div>
              </div>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.85rem" }}>
                Dynamic websites empower businesses with complete control over content, users, and data. At Kevalon Technology, we build <strong style={{ color:"#0d1f35" }}>secure, scalable, and high-performance dynamic websites</strong> that enable real-time content updates, user interactions, and advanced system integrations.
              </p>
              <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>
                Our dynamic web solutions are ideal for organizations that require frequent updates, user authentication systems, dashboards, <strong style={{ color:"#0d1f35" }}>CRM/ERP integration, e-commerce functionality, and database-driven operations</strong> designed to support business growth and digital transformation.
              </p>
            </div>
            <div style={{ padding:"2rem", background:"#f8fafc" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#0a8fb6", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1rem" }}>Key Features</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {[
                  "Powerful admin panel for complete content management",
                  "Secure user authentication & role-based access",
                  "Database integration & real-time data processing",
                  "Third-party API integration & payment gateways",
                  "High-level security architecture & data protection",
                  "Scalable system design for future expansion",
                  "SEO-friendly structure & performance optimization",
                ].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
                    <span style={CHECK_CSS("#e0f2fe","#0a8fb6")}><i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#0a8fb6" }} /></span>
                    <span style={{ fontSize:"0.83rem", color:"#374151", lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="About Web App Development" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Kevalon Technology — <GradText>Your Trusted Partner</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Kevalon Technology is a leading web application development company in Ahmedabad, Gujarat, delivering scalable, secure, and high-performance digital solutions for startups, SMEs, and enterprises. We specialize in building custom web applications that help businesses grow, automate operations, and establish a strong online presence.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Our expert developers use modern technologies, frameworks, and cloud platforms to create responsive, SEO-friendly, and user-centric web applications. From business portals and SaaS platforms to enterprise dashboards and e-commerce systems, we deliver future-ready solutions aligned with industry standards and business goals.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we follow a structured development process including <strong style={{ color:"#034665" }}>strategy planning, UI/UX design, development, testing, deployment, and long-term support</strong>. This ensures reliable performance, data security, and long-term scalability for every project.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {[
                  "Custom Web Application Development in Ahmedabad",
                  "Enterprise Web Solutions",
                  "SaaS Application Development",
                  "E-commerce Web Development",
                  "Secure Web Portals & Dashboards",
                  "SEO-Friendly & Performance Optimized Web Apps",
                ].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.85rem", flexShrink:0 }} />
                    <span style={{ fontSize:"0.85rem", color:"#334155", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <p style={{ color:"#4a5568", lineHeight:1.85, fontSize:"0.93rem", marginTop:"1.2rem" }}>
                If you are looking for the best web application development company in Ahmedabad, <strong style={{ color:"#034665" }}>Kevalon Technology</strong> is your trusted technology partner. We transform ideas into powerful digital products that deliver business growth, efficiency, and long-term success.
              </p>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ width:"100%", background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"1.2rem" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}>
                    <span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>app.kevalontechnology.in</span>
                  </div>
                </div>
                {[
                  { icon:"bi-palette2",   color:"#4f46e5", dark:false, label:"UI/UX Design",  sub:"Wireframes & prototypes"         },
                  { icon:"bi-code-slash", color:"#034665", dark:true,  label:"Frontend",      sub:"React · Next.js · TypeScript"    },
                  { icon:"bi-server",     color:"#22c55e", dark:false, label:"Backend",       sub:"Node.js · Express · APIs"        },
                  { icon:"bi-database",   color:"#f59e0b", dark:false, label:"Database Layer",sub:"PostgreSQL · MongoDB"            },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background: item.dark ? "linear-gradient(135deg,#034665,#0a6e90)" : "#f8fafc", border:`1.5px solid ${item.dark ? "transparent" : "#f1f5f9"}` }}>
                      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background: item.dark ? "rgba(255,255,255,0.15)" : item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color: item.dark ? "#fff" : item.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize:"0.77rem", fontWeight:700, color: item.dark ? "#fff" : "#0d1f35" }}>{item.label}</div>
                        <div style={{ fontSize:"0.64rem", color: item.dark ? "rgba(255,255,255,0.55)" : "#94a3b8" }}>{item.sub}</div>
                      </div>
                      <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color: item.dark ? "rgba(255,255,255,0.65)" : "#22c55e", fontSize:"0.78rem" }} />
                    </div>
                    {i < 3 && <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}><div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} /></div>}
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Your app is live and running</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.2rem" }}>
            <Pill icon="bi-diagram-3-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Our Development <GradText>Process</GradText>
            </h2>
          </motion.div>
          <div className="svc-three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            {[
              { step:"01", icon:"bi-search",        title:"Discovery & Strategy", desc:"We analyze your goals, audience, and requirements to define the right architecture and tech stack for your project." },
              { step:"02", icon:"bi-palette2",       title:"UI/UX Design",         desc:"Wireframes and pixel-perfect mockups reviewed and approved by you before any development begins." },
              { step:"03", icon:"bi-code-slash",     title:"Development",          desc:"Clean, scalable code built with modern frameworks, best practices, and security standards throughout." },
              { step:"04", icon:"bi-shield-check",   title:"Testing & QA",         desc:"Rigorous cross-device, cross-browser testing and performance audits for flawless delivery." },
              { step:"05", icon:"bi-cloud-upload",   title:"Deployment",           desc:"Smooth CI/CD deployment with zero downtime, server configuration, and live monitoring." },
              { step:"06", icon:"bi-graph-up-arrow", title:"Support & Growth",     desc:"Ongoing maintenance, performance monitoring, and feature enhancements after launch." },
            ].map((s, i) => (
              <motion.div key={s.step} className="svc-pc" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:i*0.08 }} viewport={{ once:true }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.75rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:900, color:"#61BBC5", background:"rgba(97,187,197,0.12)", padding:"0.18rem 0.55rem", borderRadius:4, letterSpacing:"0.06em" }}>{s.step}</span>
                  <div style={{ width:34, height:34, borderRadius:10, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className={`bi ${s.icon}`} style={{ fontSize:"0.9rem", color:"#034665" }} />
                  </div>
                </div>
                <h4 style={{ fontWeight:800, color:"#0d1f35", marginBottom:"0.4rem", fontSize:"0.95rem" }}>{s.title}</h4>
                <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.7, margin:0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.2rem" }}>
            <Pill icon="bi-cpu-fill" label="Technologies We Use" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Technologies <GradText>We Use</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:560, margin:"0 auto" }}>
              At Kevalon Technology, we use modern, industry-standard technologies and frameworks to build high-performance, scalable, and secure digital solutions. Our tech stack is carefully chosen to ensure speed, reliability, SEO optimization, and long-term scalability for web applications and business platforms.
            </p>
          </motion.div>
          <div className="svc-four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              { c:"#e34f26", bg:"#fff7f0", bdr:"#e34f2628", ic:"bi-filetype-html",   lb:"HTML5"        },
              { c:"#264de4", bg:"#eff6ff", bdr:"#264de428", ic:"bi-filetype-css",    lb:"CSS3"         },
              { c:"#7952b3", bg:"#f5f3ff", bdr:"#7952b328", ic:"bi-bootstrap",       lb:"Bootstrap"    },
              { c:"#38bdf8", bg:"#f0f9ff", bdr:"#38bdf828", ic:"bi-wind",            lb:"Tailwind CSS" },
              { c:"#3d7ebf", bg:"#eff6ff", bdr:"#3d7ebf28", ic:"bi-flask",           lb:"Flask"        },
              { c:"#092e20", bg:"#f0fdf4", bdr:"#09342028", ic:"bi-code-slash",      lb:"Django"       },
              { c:"#777bb4", bg:"#f5f3ff", bdr:"#777bb428", ic:"bi-filetype-php",    lb:"PHP"          },
              { c:"#21759b", bg:"#f0f9ff", bdr:"#21759b28", ic:"bi-wordpress",       lb:"WordPress"    },
            ].map((tech, i) => (
              <motion.div key={tech.lb} className="svc-tp" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:i*0.055 }} viewport={{ once:true }}>
                <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:tech.bg, border:`1.5px solid ${tech.bdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <i className={`bi ${tech.ic}`} style={{ fontSize:"1rem", color:tech.c }} />
                </div>
                <span style={{ fontSize:"0.85rem", fontWeight:600, color:"#374151" }}>{tech.lb}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
