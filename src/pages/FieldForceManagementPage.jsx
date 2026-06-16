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

const CSS=`@keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.grid-bg{background-image:none;}.dot-bg{background-image:none;}.svc-sc{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}.svc-sc:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}.svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;}.svc-pc:hover{border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16);}.svc-or{display:flex;align-items:flex-start;gap:1rem;padding:0.85rem 1rem;border-radius:14px;border:1.5px solid #f1f5f9;background:#fafbfc;transition:all 0.25s;cursor:default;}.svc-or:hover{border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px);}.svc-tp{display:flex;align-items:center;gap:0.5rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;transition:all 0.25s;cursor:default;}.svc-tp:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}.svc-mc{background:#fff;border-radius:20px;border:1.5px solid #e2e8f0;overflow:hidden;margin-bottom:0.7rem;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:grid;grid-template-columns:1fr 1fr;}@media(max-width:960px){.svc-2c,.svc-bc,.svc-mc{grid-template-columns:1fr !important;}.svc-3c{grid-template-columns:1fr 1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}}@media(max-width:560px){.svc-3c{grid-template-columns:1fr !important;}.svc-tg{grid-template-columns:1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}.svc-2c{grid-template-columns:1fr !important;}}` ;

const CARDS=[
  {
    ac:"#0ea5e9",abg:"#f0f9ff",abdr:"#bae6fd",ic:"bi-geo-alt-fill",cat:"Location Intelligence",title:"Real-Time Tracking",badge:"Live · GPS",
    desc:<>We build <strong style={{color:"#0d1f35"}}>real-time GPS tracking systems</strong> that maintain complete visibility of your field workforce. Monitor locations, movement patterns, and attendance to ensure optimal coverage and accountability across your teams.</>,
    desc2:<>Designed for <strong style={{color:"#0d1f35"}}>full operational accountability</strong> with geofencing, automated attendance, and timestamped check-in / check-out functionality.</>,
    feats:["GPS-based location tracking","Real-time location updates","Movement history & route review","Geofencing & zone alerts","Automated attendance tracking","Check-in / Check-out functionality","Offline mode support","Real-time notifications"],
    fbg:"#f0f9ff",flip:false
  },
  {
    ac:"#22c55e",abg:"#f0fdf4",abdr:"#bbf7d0",ic:"bi-clipboard-check-fill",cat:"Task Management",title:"Task Assignment & Management",badge:"Assign · Track",
    desc:<>Assign, manage, and track tasks for your field force seamlessly. Ensure <strong style={{color:"#0d1f35"}}>timely completion of assignments</strong> while maintaining complete visibility into progress and task status.</>,
    desc2:<>Built with <strong style={{color:"#0d1f35"}}>completion verification, photo attachments, and priority-based scheduling</strong> to keep field teams accountable and on track.</>,
    feats:["Task creation & assignment","Priority-based scheduling","Task status tracking","Completion verification (photos, checklists)","Photo & document attachments","Task reassignment & delegation","Digital signature support","Push notifications & alerts"],
    fbg:"#f0fdf4",flip:true
  },
  {
    ac:"#f59e0b",abg:"#fffbeb",abdr:"#fed7aa",ic:"bi-map-fill",cat:"Route Optimization",title:"Smart Route Planning",badge:"Multi-Stop · Traffic",
    desc:<>Optimize routes for your field teams to <strong style={{color:"#0d1f35"}}>reduce travel time and cut fuel costs</strong>, while boosting overall efficiency. Plan optimal routes considering multiple stops, priorities, and real-time traffic conditions.</>,
    desc2:<>Built with <strong style={{color:"#0d1f35"}}>live traffic intelligence and deviation alerts</strong> to keep field operations on schedule and under budget.</>,
    feats:["Multi-stop route planning","Distance & time optimization","Traffic-aware routing","Route sharing & navigation","Route deviation alerts","Fuel cost estimation","Territory coverage maps","Trip history & analysis"],
    fbg:"#fffbf0",flip:false
  },
  {
    ac:"#7c3aed",abg:"#f5f3ff",abdr:"#ddd6fe",ic:"bi-bar-chart-line-fill",cat:"Performance Analytics",title:"Field Analytics & Reporting",badge:"KPIs · Dashboards",
    desc:<>Gain deep insights into field force performance through <strong style={{color:"#0d1f35"}}>comprehensive analytics and reporting</strong>. Track KPIs, identify trends, and make data-driven decisions to optimize operations.</>,
    desc2:<>Export reports to PDF / Excel and visualize <strong style={{color:"#0d1f35"}}>key metrics in interactive dashboards</strong> for better decision-making.</>,
    feats:["Employee performance metrics","Task completion rates","Time & attendance tracking","Productivity analytics","Custom dashboards & reports","Export & data visualization","Team comparison views","Productivity forecasting"],
    fbg:"#faf5ff",flip:true
  },
  {
    ac:"#034665",abg:"#f0f9ff",abdr:"#bae6fd",ic:"bi-phone-fill",cat:"Mobile Application",title:"Mobile Application Development",badge:"iOS · Android",
    desc:<>We develop <strong style={{color:"#0d1f35"}}>native mobile applications for iOS and Android</strong>, enabling field teams to access critical enterprise features on the go. Apps support offline work and automatically sync data when connected.</>,
    desc2:<>Built with <strong style={{color:"#0d1f35"}}>offline mode support, push notifications, digital signature, and photo capture</strong> for a complete field experience.</>,
    feats:["iOS & Android native apps","Offline mode support","Real-time data synchronization","Push notifications & alerts","Photo & document capture","Digital signature support","Cross-platform performance","Enterprise security protocols"],
    fbg:"#f0f9ff",flip:false
  },
];

export default function FieldForceManagementPage() {
  useEffect(()=>{ window.scrollTo(0,0); document.title="Field Force Management | Kevalon Technology"; return ()=>{ document.title="Kevalon Technology"; }; },[]);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="grid-bg" style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <div>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"1.1rem" }}>Field Force<br /><GradText c="Management" /></h1>
            <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>Manage and monitor your on-field teams effectively with real-time GPS tracking, task allocation, route optimization, and performance analytics.</p>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
              <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
                <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Start Your Project
              </Link>
              <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
                View Portfolio <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}><svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}><path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" /></svg></div>
      </section>

      {/* STATS */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-4c" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[{icon:"bi-geo-alt-fill",color:"#034665",val:"Live",label:"Field Visibility"},{icon:"bi-map-fill",color:"#0ea5e9",val:"Smart",label:"Route Planning"},{icon:"bi-lightning-charge-fill",color:"#f59e0b",val:"Fast",label:"Task Updates"},{icon:"bi-star-fill",color:"#22c55e",val:"100%",label:"Client Satisfaction"}].map((s,i)=>(
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
      <section className="dot-bg" style={{ padding:"3.5rem 0", background:"#ffffff", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0" }}>Field Force Management <GradText c="With Kevalon Technology" /></h2>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem", fontSize:"0.94rem" }}>Field Force Management (FFM) is a comprehensive enterprise solution designed to manage, track, and optimize the performance of your on-field workforce. Whether it's sales teams, service technicians, delivery personnel, or field agents, our system provides real-time visibility, task allocation, route optimization, and performance analytics.</p>
              <p style={{ color:"#4a5568", lineHeight:1.8, marginBottom:"1.2rem", fontSize:"0.94rem" }}>At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we develop customized FFM solutions that help businesses increase operational efficiency, reduce costs, and enhance customer satisfaction. Our platform enables data-driven decision-making and empowers management teams with actionable insights.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                {["Real-Time GPS Tracking","Task Assignment & Management","Route Optimization","Performance Analytics","Mobile App for Field Staff","Offline Mode & Data Sync"].map(f=>(
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
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}><span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>ffm.kevalon.com/ops</span></div>
                </div>
                {[
                  {icon:"bi-map-fill",color:"#034665",dark:true,label:"Live Field Map",sub:"46 Agents Active — 92% Coverage"},
                  {icon:"bi-geo-alt-fill",color:"#0ea5e9",bg:"#f0f9ff",label:"GPS Tracking",sub:"Real-time location updates"},
                  {icon:"bi-clipboard-check-fill",color:"#22c55e",bg:"#f0fdf4",label:"Task Management",sub:"128 Tasks — On Schedule"},
                  {icon:"bi-bar-chart-line-fill",color:"#f59e0b",bg:"#fffbeb",label:"Performance KPIs",sub:"Dashboards & reports"},
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
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>All field agents tracked live</span>
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
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>Field Force Features We <GradText c="Build" /></h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>Complete field management solutions engineered for visibility, efficiency, and accountability.</p>
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
                    <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, margin:0 }}>{card.desc2}</p>
                  </div>
                  <div style={{ padding:"2rem", background:card.fbg }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                </>
              ):(
                <>
                  <div style={{ padding:"2rem", background:card.fbg, borderRight:"1.5px solid #f1f5f9" }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>Key Capabilities</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem 1rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                  <div style={{ padding:"2rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:card.abg, border:`1.5px solid ${card.abdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className={`bi ${card.ic}`} style={{ fontSize:"1.2rem", color:card.ac }} /></div>
                      <div><div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:card.ac, marginBottom:"0.15rem" }}>{card.cat}</div><h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{card.title}</h3></div>
                      <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:card.abg, color:card.ac, border:`1px solid ${card.abdr}`, whiteSpace:"nowrap" }}>{card.badge}</span>
                    </div>
                    <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.86rem", color:"#4a5568", lineHeight:1.75, margin:0 }}>{card.desc2}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="grid-bg" style={{ padding:"3.5rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-arrow-right-circle-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our Development <GradText c="Process" /></h2>
          </motion.div>
          <div className="svc-3c" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            <ProcCard n="01" icon="bi-search" title="Discovery & Mapping" desc="We map your field operations, team structure, and workflows to design the right system." delay={0} />
            <ProcCard n="02" icon="bi-diagram-3" title="System Architecture" desc="GPS infrastructure, mobile app design, backend APIs, and analytics dashboard planning." delay={0.07} />
            <ProcCard n="03" icon="bi-code-slash" title="Development" desc="Mobile-first field app + backend platform built with real-time sync and offline capability." delay={0.14} />
            <ProcCard n="04" icon="bi-shield-check" title="Testing & QA" desc="Field simulation testing, GPS accuracy validation, and load performance benchmarks." delay={0.21} />
            <ProcCard n="05" icon="bi-cloud-upload" title="Deployment & Training" desc="Live rollout with team onboarding, device setup, and real-time monitoring." delay={0.28} />
            <ProcCard n="06" icon="bi-graph-up-arrow" title="Support & Optimization" desc="Ongoing performance tuning, feature additions, and dedicated field ops support." delay={0.35} />
          </div>
        </div>
      </section>

      {/* SERVICES + TECH */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our FFM <GradText c="Services" /></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Complete field force management solutions from real-time tracking to analytics and mobile app development.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <OfferRow icon="bi-geo-alt-fill" title="GPS Tracking System" desc="Real-time location tracking with geofencing, movement history, and live map view." delay={0} />
                <OfferRow icon="bi-map-fill" title="Route Optimization" desc="Multi-stop route planning with traffic intelligence and deviation monitoring." delay={0.06} />
                <OfferRow icon="bi-clipboard-check-fill" title="Task Assignment & Management" desc="Assign, track, and verify field tasks with timestamped completion and photo proof." delay={0.12} />
                <OfferRow icon="bi-phone-fill" title="Mobile Field App" desc="Offline-first iOS and Android apps for field agents with auto data sync." delay={0.18} />
                <OfferRow icon="bi-bar-chart-line" title="Performance Analytics & Reporting" desc="KPI dashboards, attendance reports, and productivity trend analysis." delay={0.24} />
                <OfferRow icon="bi-shield-lock-fill" title="Security & Compliance" desc="GDPR compliance, data encryption, role-based access, and secure cloud storage." delay={0.30} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Tech Stack" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Technologies We <GradText c="Leverage" /></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Industry-standard tools chosen for real-time performance and mobile reliability.</p>
              <div className="svc-tg" style={{ display:"grid", gap:"0.6rem" }}>
                <TechPill color="#22c55e" bg="#f0fdf4" border="#22c55e28" icon="bi-code-slash" label="React / React Native" delay={0} />
                <TechPill color="#3c873a" bg="#f0fdf4" border="#3c873a28" icon="bi-node-plus" label="Node.js" delay={0.055} />
                <TechPill color="#ef4444" bg="#fef2f2" border="#ef444428" icon="bi-lightning" label="Redis" delay={0.11} />
                <TechPill color="#336791" bg="#eff6ff" border="#33679128" icon="bi-database" label="PostgreSQL" delay={0.165} />
                <TechPill color="#4285f4" bg="#f0f4ff" border="#4285f428" icon="bi-map-fill" label="Google Maps API" delay={0.22} />
                <TechPill color="#6cac48" bg="#f0fdf4" border="#6cac4828" icon="bi-database-fill" label="MongoDB" delay={0.275} />
                <TechPill color="#0ea5e9" bg="#f0f9ff" border="#0ea5e928" icon="bi-box-seam" label="Docker" delay={0.33} />
                <TechPill color="#ff9900" bg="#fffbeb" border="#ff990028" icon="bi-cloud-fill" label="AWS" delay={0.385} />
              </div>
              <div style={{ marginTop:"1.2rem", padding:"1rem 1.2rem", borderRadius:15, background:"#ffffff", border:"1.5px solid #bae6fd" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.55rem", marginBottom:"0.4rem" }}><i className="bi bi-lightning-charge-fill" style={{ color:"#0ea5e9", fontSize:"0.88rem" }} /><span style={{ fontSize:"0.8rem", fontWeight:700, color:"#0c4a6e" }}>Fast FFM Delivery</span></div>
                <p style={{ fontSize:"0.76rem", color:"#0369a1", lineHeight:1.6, margin:0 }}>From discovery to live deployment — complete field force platforms that transform field operations into intelligent, connected, performance-driven ecosystems.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
