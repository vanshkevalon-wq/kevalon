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

const CSS = `
  @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .grid-bg{background-image:none;}
  .dot-bg{background-image:none;}
  .svc-stat-card{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}
  .svc-stat-card:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}
  .svc-tech-pill{display:flex;align-items:center;gap:0.5rem;padding:0.65rem 0.95rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;font-size:0.8rem;font-weight:600;color:#374151;transition:all 0.25s;cursor:default;}
  .svc-tech-pill:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}
  .svc-or{display:flex;align-items:flex-start;gap:0.85rem;padding:0.7rem 0.9rem;border-radius:12px;border:1.5px solid #e2e8f0;transition:all 0.22s;}
  .svc-or:hover{border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px);}
  .svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;}
  .svc-pc:hover{border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16);}
  .svc-tp{display:flex;align-items:center;gap:0.5rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;transition:all 0.25s;cursor:default;}
  .svc-tp:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}
  .mag-card{background:#fff;border-radius:20px;border:1.5px solid #e2e8f0;overflow:hidden;margin-bottom:0.7rem;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:grid;grid-template-columns:1fr 1fr;}
  @media(max-width:900px){
    .mag-card{grid-template-columns:1fr !important;}
    .svc-two-col{grid-template-columns:1fr !important;}
    .svc-four-col{grid-template-columns:1fr 1fr !important;}
    .svc-bc{grid-template-columns:1fr !important;}
  }
  @media(max-width:560px){
    .svc-five-col{grid-template-columns:repeat(3,1fr) !important;}
    .svc-tg{grid-template-columns:1fr !important;}
    .svc-four-col{grid-template-columns:1fr 1fr !important;}
  }
`;

function MagCard({ accentColor, accentBg, accentBorder, iconClass, category, title, badge, desc, desc2, features, featBg, flip, delay }) {
  const contentBlock = (
    <div style={{ padding:"2rem", borderRight: flip?"none":"1.5px solid #f1f5f9", borderLeft: flip?"1.5px solid #f1f5f9":"none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
        <div style={{ width:46, height:46, borderRadius:14, background:accentBg, border:`1.5px solid ${accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className={`bi ${iconClass}`} style={{ fontSize:"1.3rem", color:accentColor }} />
        </div>
        <div>
          <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:accentColor, marginBottom:"0.15rem" }}>{category}</div>
          <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{title}</h3>
        </div>
        <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:accentBg, color:accentColor, border:`1px solid ${accentBorder}`, whiteSpace:"nowrap" }}>{badge}</span>
      </div>
      <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>{desc}</p>
      {desc2 && <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, margin:0 }}>{desc2}</p>}
    </div>
  );
  const featBlock = (
    <div style={{ padding:"2rem", background: featBg||"#fafbfc" }}>
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
    <motion.div className="mag-card" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:delay||0 }} viewport={{ once:true, margin:"-40px" }}>
      {flip ? <>{featBlock}{contentBlock}</> : <>{contentBlock}{featBlock}</>}
    </motion.div>
  );
}

export default function WebERPDevelopmentPage() {
  useEffect(() => { window.scrollTo(0,0); document.title="Web ERP Development | Kevalon Technology"; return ()=>{document.title="Kevalon Technology";}; }, []);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="grid-bg" style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <div>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"1.1rem" }}>
              Web ERP<br /><GradText>Development</GradText>
            </h1>
            <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
              Build powerful, integrated ERP solutions to streamline your business operations, improve efficiency, and drive growth.
            </p>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
                <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Start Your Project
              </Link>
              <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
                View Portfolio <i className="bi bi-arrow-right" />
              </Link>
            </div>
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
            {[{icon:"bi-kanban",color:"#034665",val:"12+",label:"Core ERP Modules"},{icon:"bi-graph-up-arrow",color:"#22c55e",val:"99%",label:"Process Visibility"},{icon:"bi-clock-history",color:"#4f46e5",val:"24/7",label:"System Access"},{icon:"bi-star-fill",color:"#f59e0b",val:"100%",label:"Client Satisfaction"}].map((s,i)=>(
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
      <section className="dot-bg" style={{ padding:"3.5rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0" }}>
                Web ERP Development <GradText>With Kevalon Technology</GradText>
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem", fontSize:"0.94rem" }}>
                Our Web ERP Development services are designed to help businesses build powerful, integrated Enterprise Resource Planning (ERP) solutions to streamline operations, improve efficiency, and drive growth.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we offer structured Web ERP development services that combine modern web technologies with best practices to help you build high-quality ERP systems that deliver exceptional business value.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem 1.5rem" }}>
                {["Custom ERP Module Development","Business Process Automation","Workflow Management & Approvals","Role-Based Access Control","Multi-Company & Multi-Currency","Custom Reporting & Analytics"].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.45rem", padding:"0.25rem 0" }}>
                    <span style={{ color:"#22c55e", flexShrink:0, marginTop:"0.15rem", fontSize:"0.8rem" }}>&#10003;</span>
                    <span style={{ fontSize:"0.82rem", color:"#374151", lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }} style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"1rem" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} /><div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} /><div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}>
                    <span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>erp.kevalon.com/dashboard</span>
                  </div>
                </div>
                {[{icon:"bi-bar-chart-line-fill",color:"#4f46e5",bg:"#eff6ff",label:"Finance Dashboard",sub:"$42.8K Revenue — +18% MoM"},{icon:"bi-people-fill",color:"#034665",bg:"linear-gradient(135deg,#034665,#0a6e90)",label:"HR & Payroll",sub:"46 Active — Auto payroll",dark:true},{icon:"bi-boxes",color:"#f59e0b",bg:"#fffbeb",label:"Inventory",sub:"4,820 SKUs — 92% In Stock"},{icon:"bi-cart-check-fill",color:"#22c55e",bg:"#f0fdf4",label:"Sales Pipeline",sub:"128 Orders — 84% Win Rate"}].map((item,i)=>(
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background: item.dark?"linear-gradient(135deg,#034665,#0a6e90)":(item.bg||"#ffffff"), border:`1.5px solid ${item.dark?"transparent":"#f1f5f9"}` }}>
                      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background: item.dark?"rgba(255,255,255,0.15)":item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color: item.dark?"#fff":item.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize:"0.77rem", fontWeight:700, color: item.dark?"#fff":"#0d1f35" }}>{item.label}</div>
                        <div style={{ fontSize:"0.64rem", color: item.dark?"rgba(255,255,255,0.55)":"#94a3b8" }}>{item.sub}</div>
                      </div>
                      <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color: item.dark?"rgba(255,255,255,0.65)":"#22c55e", fontSize:"0.78rem" }} />
                    </div>
                    {i<3 && <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}><div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} /></div>}
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>All departments connected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ERP MODULES — magazine cards */}
      <section style={{ padding:"2rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              ERP Modules We <GradText>Build</GradText>
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              Comprehensive ERP modules covering all aspects of business operations — from finance to human resources, inventory to sales.
            </p>
          </motion.div>

          <MagCard accentColor="#4f46e5" accentBg="#eff6ff" accentBorder="#bfdbfe" iconClass="bi-currency-dollar" category="Custom ERP Solutions" title="Custom ERP Development" badge="Tailored · Modular" desc={<>We deliver <strong style={{color:"#0d1f35"}}>tailored ERP solutions</strong> designed to meet your specific business requirements — building custom modules and features that align with your business processes and workflows.</>} desc2={<>Multi-company and multi-currency support with <strong style={{color:"#0d1f35"}}>role-based access control</strong>, workflow management, and automated approval systems.</>} features={["Custom ERP module development","Business process automation","Workflow management & approval systems","Role-based access control & permissions","Multi-company & multi-currency support","Custom reporting and analytics","Audit trails & activity logging","Enterprise-grade scalability"]} delay={0} />

          <MagCard accentColor="#22c55e" accentBg="#f0fdf4" accentBorder="#bbf7d0" iconClass="bi-boxes" category="ERP Modules" title="Core Business Modules" badge="Finance · HR · Inventory" desc={<>Comprehensive ERP modules covering all aspects of <strong style={{color:"#0d1f35"}}>business operations</strong> — from finance and human resources to inventory management, sales, and procurement.</>} desc2={<>Fully integrated modules with <strong style={{color:"#0d1f35"}}>real-time data synchronization</strong> ensuring seamless collaboration across all departments.</>} features={["Financial Management (Accounting, Billing, Invoicing)","Human Resources Management (HRM, Payroll, Attendance)","Inventory Management (Stock, Warehouse, Procurement)","Sales & CRM (Customer Management, Sales Orders)","Purchase Management (Vendor Management, POs)","Project Management (Task Tracking, Resource Allocation)"]} flip delay={0.08} />

          <MagCard accentColor="#f59e0b" accentBg="#fffbeb" accentBorder="#fed7aa" iconClass="bi-bar-chart-line-fill" category="Analytics & Integration" title="Business Intelligence & Integration Services" badge="BI · Dashboards · APIs" desc={<>Advanced <strong style={{color:"#0d1f35"}}>reporting and analytics capabilities</strong> to gain insights into business performance and make data-driven decisions — plus seamless integration with third-party systems and services.</>} desc2={<>Connect your ERP with <strong style={{color:"#0d1f35"}}>payment gateways, e-commerce platforms, accounting software, and cloud storage</strong> for a unified digital ecosystem.</>} features={["Real-time dashboards and KPIs","Custom reports and data visualization","Payment gateway integration (Stripe, Razorpay)","E-commerce integration (Shopify, WooCommerce)","Accounting software integration (QuickBooks, Xero)","Export to Excel, PDF and other formats"]} delay={0.16} />
        </div>
      </section>

      {/* PROCESS */}
      <section className="grid-bg" style={{ padding:"3.5rem 0", background:"#ffffff", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-arrow-right-circle-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our Development <GradText>Process</GradText></h2>
          </motion.div>
          <div className="svc-3c" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            {[
              {n:"01",icon:"bi-search",title:"Discovery & Planning",desc:"Business process mapping, module planning, and technical architecture design."},
              {n:"02",icon:"bi-diagram-3",title:"System Architecture",desc:"Database schema, API design, module dependencies, and user role planning."},
              {n:"03",icon:"bi-code-slash",title:"Development",desc:"Modular ERP built sprint by sprint with weekly demos and client feedback."},
              {n:"04",icon:"bi-shield-check",title:"Testing & QA",desc:"End-to-end process testing, load testing, and user acceptance testing."},
              {n:"05",icon:"bi-cloud-upload",title:"Deployment & Training",desc:"Live deployment, data migration, team training, and go-live support."},
              {n:"06",icon:"bi-graph-up-arrow",title:"Support & Growth",desc:"Ongoing maintenance, new modules, performance tuning, and dedicated support."},
            ].map((s,i)=>(
              <motion.div key={s.n} className="svc-pc" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.38, delay:i*0.07 }} viewport={{ once:true }}>
                <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>{s.n}</span>
                <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <i className={`bi ${s.icon}`} style={{ fontSize:"1.25rem", color:"#034665" }} />
                </div>
                <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>{s.title}</h4>
                <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES + TECH */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our ERP <GradText>Services</GradText></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>End-to-end ERP services from strategy and design to deployment and long-term support.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {[
                  {icon:"bi-kanban",title:"Custom ERP Development",desc:"Tailored ERP platforms built around your exact business processes and workflows."},
                  {icon:"bi-plug",title:"ERP Integration",desc:"Seamless integration with web apps, mobile apps, cloud platforms, and third-party services."},
                  {icon:"bi-gear-fill",title:"Workflow Automation",desc:"Automate approvals, procurement, and reporting workflows enterprise-wide."},
                  {icon:"bi-bar-chart-line",title:"Business Intelligence & Analytics",desc:"Real-time dashboards, KPIs, financial reports, and data-driven insights."},
                  {icon:"bi-shield-lock-fill",title:"Security & Compliance",desc:"Data encryption, role-based access, GDPR compliance, and audit trails."},
                  {icon:"bi-arrow-repeat",title:"Maintenance & Support",desc:"Ongoing updates, performance tuning, and dedicated ERP support."}
                ].map((item,i)=>(
                  <motion.div key={item.title} className="svc-or" initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.32, delay:i*0.06 }} viewport={{ once:true }}>
                    <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${item.icon}`} style={{ fontSize:"0.98rem", color:"#034665" }} /></div>
                    <div><strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>{item.title}</strong><p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>{item.desc}</p></div>
                    <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Tech Stack" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Technologies We <GradText>Use</GradText></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Industry-leading, enterprise-grade technologies to build secure, scalable ERP platforms.</p>
              <div className="svc-tg" style={{ display:"grid", gap:"0.6rem" }}>
                {[
                  {c:"#22c55e",bg:"#f0fdf4",bdr:"#22c55e28",ic:"bi-code-slash",lb:"React"},
                  {c:"#3c873a",bg:"#f0fdf4",bdr:"#3c873a28",ic:"bi-node-plus",lb:"Node.js"},
                  {c:"#3776ab",bg:"#eff6ff",bdr:"#3776ab28",ic:"bi-filetype-py",lb:"Python"},
                  {c:"#336791",bg:"#eff6ff",bdr:"#33679128",ic:"bi-database",lb:"PostgreSQL"},
                  {c:"#6cac48",bg:"#f0fdf4",bdr:"#6cac4828",ic:"bi-database-fill",lb:"MongoDB"},
                  {c:"#00546b",bg:"#f0fffe",bdr:"#00546b28",ic:"bi-table",lb:"MySQL"},
                  {c:"#ff9900",bg:"#fffbeb",bdr:"#ff990028",ic:"bi-cloud-fill",lb:"AWS"},
                  {c:"#2496ed",bg:"#f0f9ff",bdr:"#2496ed28",ic:"bi-box-seam",lb:"Docker"}
                ].map((tech,i)=>(
                  <motion.div key={tech.lb} className="svc-tp" initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.28, delay:i*0.055 }} viewport={{ once:true }}>
                    <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:tech.bg, border:`1.5px solid ${tech.bdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}><i className={`bi ${tech.ic}`} style={{ fontSize:"0.95rem", color:tech.c }} /></div>
                    <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>{tech.lb}</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop:"1.2rem", padding:"1rem 1.2rem", borderRadius:15, background:"#ffffff", border:"1.5px solid #bae6fd" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.55rem", marginBottom:"0.4rem" }}><i className="bi bi-lightning-charge-fill" style={{ color:"#0ea5e9", fontSize:"0.88rem" }} /><span style={{ fontSize:"0.8rem", fontWeight:700, color:"#0c4a6e" }}>Fast ERP Delivery</span></div>
                <p style={{ fontSize:"0.76rem", color:"#0369a1", lineHeight:1.6, margin:0 }}>From discovery to go-live — production-ready ERP platforms within weeks, not months.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
