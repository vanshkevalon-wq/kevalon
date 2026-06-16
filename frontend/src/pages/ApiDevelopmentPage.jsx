import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlug, FaShieldAlt, FaRocket, FaCode, FaServer, FaAws } from "react-icons/fa";
import {
  SiGraphql, SiNodedotjs, SiPostgresql, SiMongodb,
  SiRedis, SiSwagger, SiPostman, SiDocker,
} from "react-icons/si";

/* ─── shared token ──────────────────────────────────────── */
const DS = { fontSize: "0.9rem", color: "#4a5568", lineHeight: 1.78, marginBottom: "0.75rem" };

/* ─── helpers ───────────────────────────────────────────── */
function Pill({ icon, label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(97,187,197,0.1)", border: "1px solid rgba(97,187,197,0.28)", borderRadius: 50, padding: "0.28rem 0.88rem" }}>
      <i className={`bi ${icon}`} style={{ fontSize: "0.68rem", color: "#61BBC5" }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#034665", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function GradText({ children }) {
  return (
    <span style={{ background: "linear-gradient(135deg,#034665,#61BBC5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {children}
    </span>
  );
}

function ApiSection({ color, bg, borderColor, icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, margin: "-40px" }}
      style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: 16, background: bg, borderLeft: `4px solid ${borderColor}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.25s" }}
      whileHover={{ boxShadow: `0 6px 24px ${color}22` }}
    >
      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1f35", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {icon} {title}
      </h4>
      {children}
    </motion.div>
  );
}

function FeatureGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem 1.5rem", marginTop: "0.75rem" }}>
      {items.map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", padding: "0.25rem 0" }}>
          <span style={{ color: "#22c55e", flexShrink: 0, marginTop: "0.15rem", fontSize: "0.8rem" }}>✔</span>
          <span style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.55 }}>{f}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function ApiDevelopmentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "API Development | Kevalon Technology";
    return () => { document.title = "Kevalon Technology"; };
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", color: "#1e293b", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @keyframes float-y  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .grid-bg {
          background-image: none;
        }
        .dot-bg {
          background-image: none;
        }
        .stat-card { text-align:center; padding:1.2rem 0.9rem; border-radius:18px; background:#fff; border:1.5px solid #e2e8f0; box-shadow:0 4px 18px rgba(0,0,0,0.04); transition:all 0.25s; }
        .stat-card:hover { border-color:#61BBC5; transform:translateY(-4px); box-shadow:0 12px 28px rgba(97,187,197,0.14); }
        .api-card-grid { }
        @media(max-width:760px){ .api-card-grid { grid-template-columns:1fr !important; } }
        .proc-card { background:#fff; border-radius:18px; padding:1.4rem 1.2rem; border:1.5px solid #e2e8f0; position:relative; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.04); transition:all 0.28s; }
        .proc-card:hover { border-color:#61BBC5; transform:translateY(-5px); box-shadow:0 12px 30px rgba(97,187,197,0.16); }
        .offer-row { display:flex; align-items:flex-start; gap:1rem; padding:0.85rem 1rem; border-radius:14px; border:1.5px solid #f1f5f9; background:#fafbfc; transition:all 0.25s; cursor:default; }
        .offer-row:hover { border-color:#61BBC5; background:#f0fbfc; transform:translateX(4px); }
        .tech-pill { display:flex; align-items:center; gap:0.5rem; padding:0.65rem 0.95rem; border-radius:50px; border:1.5px solid #e2e8f0; background:#fff; font-size:0.8rem; font-weight:600; color:#374151; transition:all 0.25s; cursor:default; }
        .tech-pill:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(0,0,0,0.08); }

        @media(max-width:960px){
          .hero-grid  { grid-template-columns:1fr !important; }
          .intro-grid { grid-template-columns:1fr !important; }
          .api-two-col { grid-template-columns:1fr !important; }
          .api-two-col aside { position:static !important; }
          .proc-grid  { grid-template-columns:1fr 1fr !important; }
          .bot-grid   { grid-template-columns:1fr !important; }
          .stats-flow-grid { grid-template-columns:1fr !important; }
          .svc-bc     { grid-template-columns:1fr !important; }
        }
        @media(max-width:560px){
          .proc-grid  { grid-template-columns:1fr !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .tech-grid2 { grid-template-columns:1fr 1fr !important; }
          .svc-tg     { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="grid-bg" style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center", background: "#ffffff", overflow: "hidden", paddingTop: "2rem" }}>

        {/* radial glows — unchanged */}
        

        {/* centered content */}
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <div>
           
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"1.1rem" }}>
              API<br />
              <GradText>Development</GradText>
            </h1>
            <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, marginBottom:"1.8rem", maxWidth:520, margin:"0 auto 1.8rem" }}>
              Secure, scalable, and high-performance APIs that connect systems, integrate platforms, and power modern digital ecosystems.
            </p>
          
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
                <i className="bi bi-lightning-charge-fill" style={{ fontSize:"0.82rem" }} /> Start Your Project
              </Link>
              <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
                View Portfolio <i className="bi bi-arrow-right" />
              </Link>
            </div>
            </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}>
            <path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            <motion.div className="stat-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0 }} viewport={{ once:true }}>
              <div style={{ width:42, height:42, borderRadius:12, background:"#034665"+"12", border:"1.5px solid "+"#034665"+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}>
                <i className="bi bi-code-square" style={{ fontSize:"1.05rem", color:"#034665" }} />
              </div>
              <div style={{ fontSize:"1.8rem", fontWeight:900, color:"#0d1f35", lineHeight:1, marginBottom:"0.25rem" }}>50+</div>
              <div style={{ fontSize:"0.73rem", color:"#64748b", fontWeight:500 }}>APIs Delivered</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.08 }} viewport={{ once:true }}>
              <div style={{ width:42, height:42, borderRadius:12, background:"#4f46e5"+"12", border:"1.5px solid "+"#4f46e5"+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}>
                <i className="bi bi-calendar-check" style={{ fontSize:"1.05rem", color:"#4f46e5" }} />
              </div>
              <div style={{ fontSize:"1.8rem", fontWeight:900, color:"#0d1f35", lineHeight:1, marginBottom:"0.25rem" }}>3+</div>
              <div style={{ fontSize:"0.73rem", color:"#64748b", fontWeight:500 }}>Years of Expertise</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.16 }} viewport={{ once:true }}>
              <div style={{ width:42, height:42, borderRadius:12, background:"#22c55e"+"12", border:"1.5px solid "+"#22c55e"+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}>
                <i className="bi bi-activity" style={{ fontSize:"1.05rem", color:"#22c55e" }} />
              </div>
              <div style={{ fontSize:"1.8rem", fontWeight:900, color:"#0d1f35", lineHeight:1, marginBottom:"0.25rem" }}>99%</div>
              <div style={{ fontSize:"0.73rem", color:"#64748b", fontWeight:500 }}>Uptime Guaranteed</div>
            </motion.div>
            <motion.div className="stat-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.24 }} viewport={{ once:true }}>
              <div style={{ width:42, height:42, borderRadius:12, background:"#f59e0b"+"12", border:"1.5px solid "+"#f59e0b"+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}>
                <i className="bi bi-star-fill" style={{ fontSize:"1.05rem", color:"#f59e0b" }} />
              </div>
              <div style={{ fontSize:"1.8rem", fontWeight:900, color:"#0d1f35", lineHeight:1, marginBottom:"0.25rem" }}>100%</div>
              <div style={{ fontSize:"0.73rem", color:"#64748b", fontWeight:500 }}>Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section className="dot-bg" style={{ padding:"3.5rem 0", background:"#ffffff", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem", position:"relative" }}>
          <div className="intro-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0" }}>
                API Development <GradText>With Kevalon Technology</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem", fontSize:"0.94rem" }}>
                API (Application Programming Interface) development is the process of creating interfaces that allow different software applications to communicate with each other. APIs enable seamless data exchange, integration, and functionality sharing between systems.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we specialize in developing secure, scalable, and high-performance APIs that power your applications using the latest technologies and best practices.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  Custom RESTful APIs
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  GraphQL Services
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  API Security & Auth
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  Third-party Integrations
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  Microservices Architecture
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                  <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} />
                  </div>
                  Real-time Webhooks
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }} style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"1.2rem" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}>
                    <span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>api.kevalon.com/v2/</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"0.45rem", marginBottom:"1rem", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, padding:"0.18rem 0.55rem", borderRadius:4, background:"#22c55e18", color:"#22c55e", border:"1px solid #22c55e38", letterSpacing:"0.04em" }}>GET</span>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, padding:"0.18rem 0.55rem", borderRadius:4, background:"#3b82f618", color:"#3b82f6", border:"1px solid #3b82f638", letterSpacing:"0.04em" }}>POST</span>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, padding:"0.18rem 0.55rem", borderRadius:4, background:"#f59e0b18", color:"#f59e0b", border:"1px solid #f59e0b38", letterSpacing:"0.04em" }}>PUT</span>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, padding:"0.18rem 0.55rem", borderRadius:4, background:"#ef444418", color:"#ef4444", border:"1px solid #ef444438", letterSpacing:"0.04em" }}>DELETE</span>
                </div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:"#ffffff", border:"1.5px solid #f1f5f9" }}>
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"#61BBC518", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="bi bi-laptop" style={{ fontSize:"0.9rem", color:"#61BBC5" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#0d1f35" }}>Client Request</div>
                      <div style={{ fontSize:"0.64rem", color:"#94a3b8" }}>Web / Mobile / IoT</div>
                    </div>
                    <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:"#22c55e", fontSize:"0.78rem" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}>
                    <div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:"linear-gradient(135deg,#034665,#0a6e90)", border:"1.5px solid transparent" }}>
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="bi bi-shield-check" style={{ fontSize:"0.9rem", color:"#fff" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#fff" }}>API Gateway</div>
                      <div style={{ fontSize:"0.64rem", color:"rgba(255,255,255,0.55)" }}>Auth · Rate Limiting</div>
                    </div>
                    <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:"rgba(255,255,255,0.65)", fontSize:"0.78rem" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}>
                    <div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:"#ffffff", border:"1.5px solid #f1f5f9" }}>
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"#4f46e518", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="bi bi-cpu" style={{ fontSize:"0.9rem", color:"#4f46e5" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#0d1f35" }}>Business Logic</div>
                      <div style={{ fontSize:"0.64rem", color:"#94a3b8" }}>Process · Validate</div>
                    </div>
                    <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:"#22c55e", fontSize:"0.78rem" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}>
                    <div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:"#ffffff", border:"1.5px solid #f1f5f9" }}>
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"#22c55e18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="bi bi-database" style={{ fontSize:"0.9rem", color:"#22c55e" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#0d1f35" }}>Database Layer</div>
                      <div style={{ fontSize:"0.64rem", color:"#94a3b8" }}>PostgreSQL · MongoDB</div>
                    </div>
                    <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:"#22c55e", fontSize:"0.78rem" }} />
                  </div>
                </div>
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>200 OK</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Response in 42 ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ API TYPES — MAGAZINE CARDS ══ */}
      <section style={{ padding:"2rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>

          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Types of APIs We <GradText>Build</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              Robust, scalable API solutions engineered for every use case — fully described and always visible.
            </p>
          </motion.div>

          {/* ── Card 1 : RESTful ── */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="api-card-grid"
          >
            {/* left: content */}
            <div style={{ padding:"2rem 2rem 2rem 2rem", borderRight:"1.5px solid #f1f5f9" }}>
              {/* header */}
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#eff6ff", border:"1.5px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <FaPlug style={{ fontSize:"1.2rem", color:"#2563eb" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:"0.15rem" }}>REST Architecture</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>RESTful API Development</h3>
                </div>
                <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:"#eff6ff", color:"#2563eb", border:"1px solid #bfdbfe", whiteSpace:"nowrap" }}>HTTP · JSON</span>
              </div>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>
                We build <strong style={{ color:"#0d1f35" }}>enterprise-grade RESTful APIs</strong> using standardized HTTP protocols — making them highly scalable, reliable and platform-independent across web, mobile, cloud and enterprise systems.
              </p>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0" }}>
                Designed with focus on <strong style={{ color:"#0d1f35" }}>performance, security, scalability and long-term maintainability</strong> with clean architecture and intuitive endpoints.
              </p>
            </div>
            {/* right: features */}
            <div style={{ padding:"2rem", background:"#ffffff" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#2563eb", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Standard HTTP methods</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>JSON-based data exchange</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Stateless architecture</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Version control & compatibility</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>JWT, OAuth2, API Keys auth</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>HTTPS / TLS encryption</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Swagger / OpenAPI docs</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#2563eb" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Caching & optimization</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 2 : GraphQL ── */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.08 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="api-card-grid"
          >
            {/* left: features */}
            <div style={{ padding:"2rem", background:"#ffffff", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#7c3aed", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Flexible data querying</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Single unified endpoint</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Reduced network overhead</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Schema-driven development</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Real-time subscriptions</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Microservices support</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Enterprise auth layers</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#7c3aed" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Caching & performance</span>
                </div>
              </div>
            </div>
            {/* right: content */}
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#f5f3ff", border:"1.5px solid #ddd6fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <SiGraphql style={{ fontSize:"1.2rem", color:"#7c3aed" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7c3aed", marginBottom:"0.15rem" }}>Query Language</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>GraphQL API Development</h3>
                </div>
                <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:"#f5f3ff", color:"#7c3aed", border:"1px solid #ddd6fe", whiteSpace:"nowrap" }}>Schema · Types</span>
              </div>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>
                We design <strong style={{ color:"#0d1f35" }}>high-performance GraphQL APIs</strong> that provide a modern, flexible data layer — letting clients fetch exactly what they need in one request, eliminating over-fetching entirely.
              </p>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0" }}>
                Built for <strong style={{ color:"#0d1f35" }}>scalability, real-time performance and enterprise security</strong> — ideal for complex applications and microservices ecosystems.
              </p>
            </div>
          </motion.div>

          {/* ── Card 3 : Security ── */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.16 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", marginBottom:"0.7rem", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="api-card-grid"
          >
            {/* left: content */}
            <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#fef2f2", border:"1.5px solid #fecaca", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <FaShieldAlt style={{ fontSize:"1.2rem", color:"#dc2626" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#dc2626", marginBottom:"0.15rem" }}>Zero-Trust Model</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>API Security & Authentication</h3>
                </div>
                <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", whiteSpace:"nowrap" }}>Auth · Encrypt</span>
              </div>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>
                Security is not an add-on — it is built into the foundation. We implement <strong style={{ color:"#0d1f35" }}>enterprise-grade security architectures</strong> protecting data and integrations from modern cyber threats.
              </p>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0" }}>
                Our frameworks ensure <strong style={{ color:"#0d1f35" }}>secure access control, data confidentiality and compliance readiness</strong> across all cloud and enterprise environments.
              </p>
            </div>
            {/* right: features */}
            <div style={{ padding:"2rem", background:"#ffffff" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#dc2626", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>JWT authentication</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>OAuth 2.0 authorization</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>API key management</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Role-based access (RBAC)</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Rate limiting & throttling</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>HTTPS / SSL / TLS</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Input validation & sanitization</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#dc2626" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Threat monitoring & logging</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4 : Features ── */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.24 }} viewport={{ once:true, margin:"-40px" }}
            style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e2e8f0", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", display:"grid", gridTemplateColumns:"1fr 1fr" }}
            className="api-card-grid"
          >
            {/* left: features */}
            <div style={{ padding:"2rem", background:"#ffffff", borderRight:"1.5px solid #f1f5f9" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#16a34a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>REST & GraphQL APIs</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Swagger / OpenAPI docs</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>API versioning strategies</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Microservices architecture</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Real-time data streaming</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Third-party integrations</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Webhook & event systems</span>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}>
                  <span style={{ width:18, height:18, borderRadius:5, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color:"#16a34a" }} /></span>
                  <span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>Caching & load balancing</span>
                </div>
              </div>
            </div>
            {/* right: content */}
            <div style={{ padding:"2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"#ffffff", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <FaRocket style={{ fontSize:"1.2rem", color:"#16a34a" }} />
                </div>
                <div>
                  <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#16a34a", marginBottom:"0.15rem" }}>Platform Capabilities</div>
                  <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>Key Features & Capabilities</h3>
                </div>
                <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:"#ffffff", color:"#16a34a", border:"1px solid #bbf7d0", whiteSpace:"nowrap" }}>Scale · Speed</span>
              </div>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>
                Our API solutions are engineered to deliver <strong style={{ color:"#0d1f35" }}>performance, scalability, security and business agility</strong> — empowering organizations to scale operations and integrate platforms effortlessly.
              </p>
              <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"1.1rem" }}>
                From initial design to production deployment, every solution is built for <strong style={{ color:"#0d1f35" }}>long-term maintainability and digital transformation</strong>.
              </p>
              {/* mini stat row */}
              <div style={{ display:"flex", gap:"0.65rem" }}>
                <div style={{ flex:1, padding:"0.7rem 0.8rem", borderRadius:12, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", textAlign:"center" }}>
                  <div style={{ fontSize:"1.2rem", fontWeight:900, color:"#16a34a", lineHeight:1 }}>50+</div>
                  <div style={{ fontSize:"0.62rem", color:"#4ade80", fontWeight:600, marginTop:"0.2rem" }}>APIs Built</div>
                </div>
                <div style={{ flex:1, padding:"0.7rem 0.8rem", borderRadius:12, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", textAlign:"center" }}>
                  <div style={{ fontSize:"1.2rem", fontWeight:900, color:"#16a34a", lineHeight:1 }}>99%</div>
                  <div style={{ fontSize:"0.62rem", color:"#4ade80", fontWeight:600, marginTop:"0.2rem" }}>Uptime SLA</div>
                </div>
                <div style={{ flex:1, padding:"0.7rem 0.8rem", borderRadius:12, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", textAlign:"center" }}>
                  <div style={{ fontSize:"1.2rem", fontWeight:900, color:"#16a34a", lineHeight:1 }}>3+</div>
                  <div style={{ fontSize:"0.62rem", color:"#4ade80", fontWeight:600, marginTop:"0.2rem" }}>Yrs Expertise</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="grid-bg" style={{ padding:"3.5rem 0", background:"#ffffff", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem", position:"relative" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-arrow-right-circle-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>
              Our Development <GradText>Process</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", maxWidth:460, margin:"0 auto" }}>
              A structured workflow that keeps you informed and in control at every stage.
            </p>
          </motion.div>
          <div className="proc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>01</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-search" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>Discovery & Planning</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>Analyse systems, data flows, and business goals to map the ideal API architecture.</p>
            </motion.div>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0.07 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>02</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-pencil-square" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>API Design</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>Endpoint planning, schema design, auth strategy, and OpenAPI spec creation.</p>
            </motion.div>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0.14 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>03</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-code-slash" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>Development</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>Clean, secure, well-documented code with modern stacks and best practices.</p>
            </motion.div>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0.21 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>04</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-shield-check" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>Testing & QA</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>Unit, integration, load, and security testing for bulletproof reliability.</p>
            </motion.div>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0.28 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>05</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-cloud-upload" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>Deployment</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>CI/CD pipelines, zero-downtime releases, and infrastructure-as-code setup.</p>
            </motion.div>

            <motion.div className="proc-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:0.35 }} viewport={{ once:true }}>
              <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>06</span>
              <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="bi bi-graph-up-arrow" style={{ fontSize:"1.25rem", color:"#034665" }} />
              </div>
              <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>Support & Evolution</h4>
              <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>Ongoing monitoring, performance tuning, security patches, and feature additions.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ SERVICES + TECH ══ */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="bot-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>

            {/* Offerings */}
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>
                Our API <GradText>Services</GradText>
              </h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>End-to-end API services from design and development to documentation, testing, and long-term support.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-code-square" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>Custom API Development</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Business-specific APIs tailored to your exact workflows and enterprise systems.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0.06 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-plug" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>API Integration</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Seamless integration with web, mobile, cloud, IoT, and third-party services.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0.12 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-shield-lock" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>Secure API Architecture</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Auth, encryption, access control, and enterprise-grade security layers.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0.18 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-file-text" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>API Documentation</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Developer-friendly docs for easy onboarding and long-term maintainability.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0.24 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-speedometer2" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>API Testing & Monitoring</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Performance, load testing, and real-time analytics dashboards.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

                <motion.div className="offer-row" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:0.30 }} viewport={{ once:true }}>
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-arrow-repeat" style={{ fontSize:"0.98rem", color:"#034665" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>Maintenance & Support</strong>
                    <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>Ongoing upgrades, security patches, and performance optimisation.</p>
                  </div>
                  <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                </motion.div>

              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Tech Stack" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>
                Technologies We <GradText>Use</GradText>
              </h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Industry-standard tools chosen for speed, reliability, and long-term scalability.</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0.6rem" }}>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#22c55e14", border:"1.5px solid #22c55e28", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-hdd-stack" style={{ fontSize:"0.95rem", color:"#22c55e" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>Node.js</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.055 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#a855f714", border:"1.5px solid #a855f728", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-share-fill" style={{ fontSize:"0.95rem", color:"#a855f7" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>GraphQL</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.11 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#3b82f614", border:"1.5px solid #3b82f628", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-database" style={{ fontSize:"0.95rem", color:"#3b82f6" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>PostgreSQL</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.165 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#16a34a14", border:"1.5px solid #16a34a28", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-database-fill" style={{ fontSize:"0.95rem", color:"#16a34a" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>MongoDB</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.22 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#ef444414", border:"1.5px solid #ef444428", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-lightning" style={{ fontSize:"0.95rem", color:"#ef4444" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>Redis</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.275 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#84cc1614", border:"1.5px solid #84cc1628", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-file-earmark-code" style={{ fontSize:"0.95rem", color:"#84cc16" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>Swagger</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.33 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#f9731614", border:"1.5px solid #f9731628", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-send" style={{ fontSize:"0.95rem", color:"#f97316" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>Postman</span>
                </motion.div>

                <motion.div className="tech-pill" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:0.385 }} viewport={{ once:true }}>
                  <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:"#0ea5e914", border:"1.5px solid #0ea5e928", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="bi bi-box-seam" style={{ fontSize:"0.95rem", color:"#0ea5e9" }} />
                  </div>
                  <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>Docker</span>
                </motion.div>

              </div>
              <div style={{ marginTop:"1.2rem", padding:"1rem 1.2rem", borderRadius:15, background:"#ffffff", border:"1.5px solid #bae6fd" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.55rem", marginBottom:"0.4rem" }}>
                  <i className="bi bi-lightning-charge-fill" style={{ color:"#0ea5e9", fontSize:"0.88rem" }} />
                  <span style={{ fontSize:"0.8rem", fontWeight:700, color:"#0c4a6e" }}>Fast API Delivery</span>
                </div>
                <p style={{ fontSize:"0.76rem", color:"#0369a1", lineHeight:1.6, margin:0 }}>
                  From discovery to deployment — production-ready APIs within weeks, not months.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </div>
  );
}

