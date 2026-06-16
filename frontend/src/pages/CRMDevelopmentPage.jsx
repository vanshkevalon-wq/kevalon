import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GradText({ c }) { return <span style={{ background:"linear-gradient(135deg,#034665,#61BBC5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{c}</span>; }
function Pill({ icon, label }) {
  return <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(97,187,197,0.1)", border:"1px solid rgba(97,187,197,0.28)", borderRadius:50, padding:"0.28rem 0.88rem" }}><i className={`bi ${icon}`} style={{ fontSize:"0.68rem", color:"#61BBC5" }} /><span style={{ fontSize:"0.68rem", fontWeight:700, color:"#034665", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span></div>;
}
function CheckItem({ text, bg, color }) {
  return <div style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem" }}><span style={{ width:18, height:18, borderRadius:5, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}><i className="bi bi-check-lg" style={{ fontSize:"0.58rem", color }} /></span><span style={{ fontSize:"0.79rem", color:"#374151", lineHeight:1.5 }}>{text}</span></div>;
}
function TechPill({ color, bg, border, icon, label, delay }) {
  return <motion.div className="svc-tp" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay }} viewport={{ once:true }}><div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:bg, border:`1.5px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${icon}`} style={{ fontSize:"0.95rem", color }} /></div><span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>{label}</span></motion.div>;
}
function OfferRow({ icon, title, desc, delay }) {
  return <motion.div className="svc-or" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay }} viewport={{ once:true }}><div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${icon}`} style={{ fontSize:"0.98rem", color:"#034665" }} /></div><div><strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>{title}</strong><p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>{desc}</p></div><i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} /></motion.div>;
}
function ProcCard({ n, icon, title, desc, delay }) {
  return <motion.div className="svc-pc" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay }} viewport={{ once:true }}><span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>{n}</span><div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${icon}`} style={{ fontSize:"1.25rem", color:"#034665" }} /></div><h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>{title}</h4><p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>{desc}</p></motion.div>;
}

const SVC_CSS = `
  .svc-sc{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}
  .svc-sc:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}
  .svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;}
  .svc-pc:hover{border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16);}
  .svc-or{display:flex;align-items:flex-start;gap:1rem;padding:0.85rem 1rem;border-radius:14px;border:1.5px solid #f1f5f9;background:#fafbfc;transition:all 0.25s;cursor:default;}
  .svc-or:hover{border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px);}
  .svc-tp{display:flex;align-items:center;gap:0.5rem;padding:0.65rem 0.95rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;transition:all 0.25s;cursor:default;}
  .svc-tp:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}
  .svc-mc{background:#fff;border-radius:20px;border:1.5px solid #e2e8f0;overflow:hidden;margin-bottom:0.7rem;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:grid;grid-template-columns:1fr 1fr;}
  @media(max-width:960px){.svc-2c,.svc-bc,.svc-mc{grid-template-columns:1fr !important;}.svc-3c{grid-template-columns:1fr 1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}}
  @media(max-width:560px){.svc-3c{grid-template-columns:1fr !important;}.svc-tg{grid-template-columns:1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}.svc-2c{grid-template-columns:1fr !important;}}
`;

const CARDS = [
  {
    ac:"#2563eb", abg:"#eff6ff", abdr:"#bfdbfe", ic:"bi-person-badge-fill",
    cat:"Lead Intelligence", title:"Lead Management & Intelligent Tracking", badge:"AI Scoring",
    desc:"Our CRM platforms enable organizations to capture, qualify, manage, and nurture leads across the complete sales lifecycle. Kevalon Technology's intelligent lead management systems ensure that every prospect is tracked, prioritized, and converted through structured workflows and data-driven automation.",
    feats:[
      "Multi-channel lead capture from web, mobile, campaigns, and integrations",
      "AI-assisted lead scoring, segmentation, and qualification workflows",
      "Automated lead assignment based on rules, territory, and team structure",
      "Complete lead activity tracking with engagement history and touchpoints",
      "Conversion analytics, performance reporting, and sales funnel insights",
    ], fbg:"#fafbff", flip:false,
  },
  {
    ac:"#7c3aed", abg:"#f5f3ff", abdr:"#ddd6fe", ic:"bi-graph-up-arrow",
    cat:"Sales Intelligence", title:"Sales Pipeline Management", badge:"Forecasting",
    desc:"Kevalon Technology's CRM platforms provide complete visibility and control over your sales lifecycle. Our intelligent pipeline management systems enable organizations to structure, monitor, and optimize every stage of the sales journey — from first interaction to successful conversion.",
    feats:[
      "Customizable pipeline stages aligned with your sales strategy",
      "Real-time deal tracking, forecasting, and revenue projections",
      "Interactive pipeline visualization with performance analytics",
      "Automated stage transitions and workflow orchestration",
      "Sales team performance metrics and productivity dashboards",
    ], fbg:"#fdf8ff", flip:true,
  },
  {
    ac:"#16a34a", abg:"#f0fdf4", abdr:"#bbf7d0", ic:"bi-gear-fill",
    cat:"Automation", title:"Intelligent Workflow Automation", badge:"Smart Triggers",
    desc:"Kevalon Technology's CRM automation frameworks are designed to eliminate operational inefficiencies and streamline business processes through intelligent workflows. Our systems automate repetitive tasks, optimize internal operations, and enable teams to focus on high-value business activities.",
    feats:[
      "Automated multi-channel email campaigns and communication flows",
      "Smart task automation, scheduling, and follow-up management",
      "Rule-based workflow orchestration with triggers and conditions",
      "Real-time data synchronization across integrated platforms",
      "Intelligent notifications, alerts, and system monitoring",
    ], fbg:"#f0fdf4", flip:false,
  },
  {
    ac:"#f59e0b", abg:"#fffbeb", abdr:"#fed7aa", ic:"bi-bar-chart-fill",
    cat:"Business Intelligence", title:"Reporting & Business Intelligence", badge:"Analytics",
    desc:"Kevalon Technology's CRM analytics platforms transform raw data into actionable business intelligence. Our reporting systems provide real-time visibility into sales performance, customer behavior, and operational efficiency, enabling organizations to make strategic, data-driven decisions.",
    feats:[
      "Custom dashboards and executive-level reporting systems",
      "Sales performance analytics with KPI tracking",
      "Customer behavior insights and engagement analysis",
      "Revenue forecasting and predictive analytics",
      "Advanced data visualization, export, and integration tools",
    ], fbg:"#fffbf0", flip:true,
  },
];

export default function CRMDevelopmentPage() {
  useEffect(() => { window.scrollTo(0,0); document.title="CRM Development | Kevalon Technology"; return ()=>{ document.title="Kevalon Technology"; }; }, []);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{SVC_CSS}</style>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-people-fill" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            CRM<br /><GradText c="Development" />
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
            Streamline your customer relationships and boost sales with custom CRM solutions.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Get in Touch
            </Link>
            <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
              View Portfolio <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}><svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}><path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" /></svg></div>
      </section>

      {/* STATS */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-4c" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[{icon:"bi-people-fill",color:"#034665",val:"1.2k+",label:"Leads Managed"},{icon:"bi-graph-up-arrow",color:"#22c55e",val:"32%",label:"Higher Close Rate"},{icon:"bi-lightning-charge-fill",color:"#f59e0b",val:"3+",label:"Years Experience"},{icon:"bi-star-fill",color:"#4f46e5",val:"100%",label:"Client Satisfaction"}].map((s,i)=>(
              <motion.div key={s.label} className="svc-sc" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:i*0.08 }} viewport={{ once:true }}>
                <div style={{ width:42, height:42, borderRadius:12, background:s.color+"12", border:"1.5px solid "+s.color+"25", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 0.65rem" }}><i className={`bi ${s.icon}`} style={{ fontSize:"1.05rem", color:s.color }} /></div>
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
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0" }}>
                CRM Development<br /><GradText c="With Kevalon Technology" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Customer Relationship Management (CRM) development focuses on building intelligent digital platforms that enable organizations to manage customer interactions, relationships, and engagement across the entire business lifecycle. A robust CRM system centralizes customer data, optimizes communication channels, and enhances operational efficiency through automation and analytics.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we design and engineer custom CRM solutions aligned with your business objectives. Our platforms empower organizations to manage leads, streamline sales pipelines, automate workflows, and unlock actionable insights through real-time reporting, advanced analytics, and data-driven decision-making.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                By combining scalable architecture, secure infrastructure, and modern technologies, our CRM systems support long-term growth, improve customer experience, and help businesses build strong, lasting customer relationships in competitive digital markets.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                {["Lead Management","Sales Pipeline","Workflow Automation","Customer Analytics","Email Campaigns","Mobile CRM Access"].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"0.82rem", color:"#374151", fontWeight:500 }}>
                    <div style={{ width:19, height:19, borderRadius:5, background:"rgba(97,187,197,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color:"#034665" }} /></div>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }} style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"1rem" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} /><div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} /><div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}><span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>crm.kevalontechnology.in</span></div>
                </div>
                {[
                  {icon:"bi-funnel-fill",       color:"#034665", dark:true,     label:"Sales Pipeline",        sub:"128 Leads - 32% Conversion"    },
                  {icon:"bi-envelope-fill",     color:"#4f46e5", bg:"#eff6ff",  label:"Email Automation",      sub:"Active campaigns running"       },
                  {icon:"bi-bar-chart-fill",    color:"#22c55e", bg:"#f0fdf4",  label:"Analytics Dashboard",   sub:"Real-time KPI tracking"         },
                  {icon:"bi-phone-fill",        color:"#f59e0b", bg:"#fffbeb",  label:"Mobile CRM App",        sub:"iOS & Android access"           },
                ].map((item,i)=>(
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:item.dark?"linear-gradient(135deg,#034665,#0a6e90)":(item.bg||"#ffffff"), border:`1.5px solid ${item.dark?"transparent":"#f1f5f9"}` }}>
                      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:item.dark?"rgba(255,255,255,0.15)":item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color:item.dark?"#fff":item.color }} /></div>
                      <div><div style={{ fontSize:"0.77rem", fontWeight:700, color:item.dark?"#fff":"#0d1f35" }}>{item.label}</div><div style={{ fontSize:"0.64rem", color:item.dark?"rgba(255,255,255,0.55)":"#94a3b8" }}>{item.sub}</div></div>
                      <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:item.dark?"rgba(255,255,255,0.65)":"#22c55e", fontSize:"0.78rem" }} />
                    </div>
                    {i<3&&<div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}><div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} /></div>}
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>CRM tracking your sales in real-time</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAGAZINE CARDS */}
      <section style={{ padding:"2rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>CRM Modules We <GradText c="Build" /></h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>Intelligent CRM solutions for every stage of the customer lifecycle.</p>
          </motion.div>
          {CARDS.map((card,idx)=>(
            <motion.div key={card.title} className="svc-mc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:idx*0.08 }} viewport={{ once:true, margin:"-40px" }}>
              {!card.flip?(
                <>
                  <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:card.abg, border:`1.5px solid ${card.abdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className={`bi ${card.ic}`} style={{ fontSize:"1.2rem", color:card.ac }} /></div>
                      <div><div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:card.ac, marginBottom:"0.15rem" }}>{card.cat}</div><h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{card.title}</h3></div>
                      <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:card.abg, color:card.ac, border:`1px solid ${card.abdr}`, whiteSpace:"nowrap" }}>{card.badge}</span>
                    </div>
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.82rem", color:"#034665", fontWeight:600, fontStyle:"italic", background:"rgba(97,187,197,0.07)", borderLeft:"3px solid #61BBC5", padding:"10px 16px", borderRadius:"0 8px 8px 0", margin:0 }}>Designed by Kevalon Technology to deliver structured, scalable, and high-conversion {card.cat.toLowerCase()} ecosystems.</p>
                  </div>
                  <div style={{ padding:"2rem", background:card.fbg }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                </>
              ):(
                <>
                  <div style={{ padding:"2rem", background:card.fbg, borderRight:"1.5px solid #f1f5f9" }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                  <div style={{ padding:"2rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:card.abg, border:`1.5px solid ${card.abdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className={`bi ${card.ic}`} style={{ fontSize:"1.2rem", color:card.ac }} /></div>
                      <div><div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:card.ac, marginBottom:"0.15rem" }}>{card.cat}</div><h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{card.title}</h3></div>
                      <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:card.abg, color:card.ac, border:`1px solid ${card.abdr}`, whiteSpace:"nowrap" }}>{card.badge}</span>
                    </div>
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.82rem", color:"#034665", fontWeight:600, fontStyle:"italic", background:"rgba(97,187,197,0.07)", borderLeft:"3px solid #61BBC5", padding:"10px 16px", borderRadius:"0 8px 8px 0", margin:0 }}>Built by Kevalon Technology to drive predictable revenue, operational transparency, and scalable growth.</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CRM SOLUTIONS ABOUT */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="CRM Development Solutions" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Intelligent Customer <GradText c="Relationship Management" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we build advanced, scalable, and secure CRM platforms that help organizations transform customer engagement into long-term business value. Our CRM solutions are designed to centralize customer data, streamline operations, and enable intelligent decision-making across sales, marketing, and support teams.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                We focus on creating fully customized CRM systems that align with your business workflows, ensuring seamless integration with existing tools, cloud platforms, and enterprise software ecosystems. Our solutions empower businesses to improve productivity, enhance customer satisfaction, and achieve measurable growth through automation and data intelligence.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {[
                  "Centralized customer data management with real-time access",
                  "Sales pipeline automation and lead lifecycle management",
                  "AI-driven insights, analytics, and performance reporting",
                  "Secure cloud-based architecture with enterprise-grade scalability",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.85rem", flexShrink:0 }} />
                    <span style={{ fontSize:"0.88rem", color:"#334155", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Technologies We Use" />
              <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.5rem" }}>Technologies <GradText c="We Use" /></h3>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>At Kevalon Technology, we adopt modern, secure, and scalable technologies to build high-performance digital solutions that meet enterprise standards and future-ready business requirements.</p>
              <div className="svc-tg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                <TechPill color="#61dafb" bg="#f0fcff" border="#61dafb28" icon="bi-code-slash"      label="React"       delay={0}     />
                <TechPill color="#3c873a" bg="#f0fdf4" border="#3c873a28" icon="bi-node-plus"       label="Node.js"     delay={0.055} />
                <TechPill color="#336791" bg="#eff6ff" border="#33679128" icon="bi-database"        label="PostgreSQL"  delay={0.11}  />
                <TechPill color="#6cac48" bg="#f0fdf4" border="#6cac4828" icon="bi-hdd-fill"        label="MongoDB"     delay={0.165} />
                <TechPill color="#00758f" bg="#f0fdff" border="#00758f28" icon="bi-database-fill"   label="MySQL"       delay={0.22}  />
                <TechPill color="#ef4444" bg="#fef2f2" border="#ef444428" icon="bi-lightning"       label="Redis"       delay={0.275} />
                <TechPill color="#ff9900" bg="#fffbeb" border="#ff990028" icon="bi-cloud-fill"      label="AWS"         delay={0.33}  />
                <TechPill color="#2496ed" bg="#f0f9ff" border="#2496ed28" icon="bi-box-seam"        label="Docker"      delay={0.385} />
                <TechPill color="#61BBC5" bg="rgba(97,187,197,0.1)" border="rgba(97,187,197,0.3)" icon="bi-phone-fill" label="Mobile Apps" delay={0.44} />
                <TechPill color="#034665" bg="#f0f7ff" border="#03466528" icon="bi-hdd-network"    label="Databases"   delay={0.495} />
              </div>

              {/* CRM Capabilities */}
              <div style={{ marginTop:"1.5rem", background:"#fff", borderRadius:16, border:"1.5px solid rgba(97,187,197,0.16)", padding:"1.5rem", boxShadow:"0 4px 16px rgba(3,70,101,0.06)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1rem" }}>CRM Capabilities</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
                  {[
                    "Intelligent lead management with real-time tracking and prioritization",
                    "End-to-end sales automation and pipeline optimization",
                    "Centralized customer database with secure data governance",
                    "Advanced analytics, reporting, and business intelligence dashboards",
                    "Secure mobile and cloud access for remote teams",
                  ].map(f=>(
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.82rem", flexShrink:0 }} />
                      <span style={{ fontSize:"0.83rem", color:"#334155", fontWeight:500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-arrow-right-circle-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our Development <GradText c="Process" /></h2>
          </motion.div>
          <div className="svc-3c" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            <ProcCard n="01" icon="bi-search"       title="Discovery & Planning"      desc="We map your sales process, team structure, and requirements to design the perfect CRM architecture." delay={0} />
            <ProcCard n="02" icon="bi-diagram-3"    title="Architecture Design"        desc="Data model, module planning, integrations, and UX wireframes reviewed and approved." delay={0.07} />
            <ProcCard n="03" icon="bi-code-slash"   title="Development"                desc="Clean, modular CRM built with modern stack — secure, scalable, and well-documented." delay={0.14} />
            <ProcCard n="04" icon="bi-shield-check" title="Testing & QA"               desc="End-to-end testing, data migration validation, and performance benchmarks." delay={0.21} />
            <ProcCard n="05" icon="bi-cloud-upload" title="Deployment & Training"      desc="Live deployment with team onboarding, data import, and zero-downtime go-live." delay={0.28} />
            <ProcCard n="06" icon="bi-graph-up-arrow" title="Support & Growth"         desc="Ongoing feature additions, performance tuning, and dedicated support." delay={0.35} />
          </div>
        </div>
      </section>

      {/* SERVICES + TECH */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our CRM <GradText c="Services" /></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>End-to-end CRM services from strategy and design to deployment and long-term growth.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <OfferRow icon="bi-code-square"   title="Custom CRM Development"  desc="Tailored CRM platforms built around your exact sales process and team structure." delay={0} />
                <OfferRow icon="bi-plug"          title="CRM Integration"          desc="Connect your CRM to email, marketing tools, ERP, accounting, and payment systems." delay={0.06} />
                <OfferRow icon="bi-gear-fill"     title="Workflow Automation"      desc="Smart automation rules that eliminate manual tasks and accelerate your pipeline." delay={0.12} />
                <OfferRow icon="bi-bar-chart-line" title="Analytics & Reporting"   desc="Custom dashboards, KPI tracking, and predictive sales analytics built in." delay={0.18} />
                <OfferRow icon="bi-phone-fill"    title="Mobile CRM App"           desc="Native iOS and Android CRM apps for field sales and remote teams." delay={0.24} />
                <OfferRow icon="bi-arrow-repeat"  title="Maintenance & Support"    desc="Ongoing updates, new feature development, and dedicated technical support." delay={0.30} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>Smart CRM Systems for Scalable Business Growth</p>
                <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem" }}>Kevalon Technology builds advanced, scalable, and secure CRM platforms that help organizations transform customer engagement into long-term business value.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  {[
                    { icon:"bi-people-fill",        text:"Experienced & certified CRM developers"                },
                    { icon:"bi-sliders",             text:"Customized CRM solutions for every business"          },
                    { icon:"bi-bar-chart-line-fill", text:"Transparent reporting and analytics"                  },
                    { icon:"bi-currency-rupee",      text:"Cost-effective development models"                    },
                    { icon:"bi-arrow-repeat",        text:"Long-term support, maintenance & upgrades"            },
                    { icon:"bi-calendar-check",      text:"Guaranteed timelines & transparent process"           },
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

    </div>
  );
}
