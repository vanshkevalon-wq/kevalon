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

const CSS=`.svc-sc{text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s;}.svc-sc:hover{border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14);}.svc-pc{background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s;}.svc-pc:hover{border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16);}.svc-or{display:flex;align-items:flex-start;gap:1rem;padding:0.85rem 1rem;border-radius:14px;border:1.5px solid #f1f5f9;background:#fafbfc;transition:all 0.25s;cursor:default;}.svc-or:hover{border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px);}.svc-tp{display:flex;align-items:center;gap:0.5rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;transition:all 0.25s;cursor:default;}.svc-tp:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08);}.svc-mc{background:#fff;border-radius:20px;border:1.5px solid #e2e8f0;overflow:hidden;margin-bottom:0.7rem;box-shadow:0 4px 20px rgba(0,0,0,0.04);display:grid;grid-template-columns:1fr 1fr;}@media(max-width:960px){.svc-2c,.svc-bc,.svc-mc{grid-template-columns:1fr !important;}.svc-3c{grid-template-columns:1fr 1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}}@media(max-width:560px){.svc-3c{grid-template-columns:1fr !important;}.svc-tg{grid-template-columns:1fr !important;}.svc-4c{grid-template-columns:1fr 1fr !important;}.svc-2c{grid-template-columns:1fr !important;}}`;

const CARDS=[
  {
    ac:"#2563eb", abg:"#eff6ff", abdr:"#bfdbfe", ic:"bi-code-slash",
    cat:"Web Development Training", title:"Web Development Training", badge:"Industry Oriented",
    desc:"Learn to build powerful, scalable, and modern web applications with a complete hands-on learning approach. From UI design to backend logic and deployment, this training prepares you for real-world development environments.",
    quote:"Build real applications, not just projects — become industry ready.",
    feats:[
      "HTML5, CSS3, and JavaScript fundamentals",
      "React.js and modern frontend frameworks",
      "Node.js and Express.js for backend development",
      "Database design (PostgreSQL, MongoDB)",
      "RESTful API development",
      "Deployment, hosting & DevOps basics",
      "Git, GitHub & version control",
      "Real-world project architecture",
    ], fbg:"#fafbff", flip:false,
  },
  {
    ac:"#16a34a", abg:"#f0fdf4", abdr:"#bbf7d0", ic:"bi-phone-fill",
    cat:"Mobile Development Training", title:"Mobile Development Training", badge:"App Industry Ready",
    desc:"Learn to design, develop, and deploy high-performance mobile applications for Android and iOS. This program focuses on real-world app development, scalable architecture, and industry-level practices to make you job-ready in the mobile app ecosystem.",
    quote:"From idea to App Store — build real mobile products.",
    feats:[
      "React Native for cross-platform development",
      "Flutter for native mobile applications",
      "Modern mobile UI/UX design principles",
      "API integration and secure data management",
      "App deployment (Play Store & App Store)",
      "Mobile app testing and debugging",
      "Performance optimization & memory handling",
      "Real-world mobile projects",
    ], fbg:"#f0fdf4", flip:true,
  },
  {
    ac:"#7c3aed", abg:"#f5f3ff", abdr:"#ddd6fe", ic:"bi-filetype-py",
    cat:"Python Training", title:"Python Training", badge:"Industry Focused",
    desc:"Master Python from fundamentals to advanced development. This training program prepares you for real-world applications in web development, data science, automation, and backend systems using industry-standard tools and best practices.",
    quote:"From coding basics to real-world Python systems.",
    feats:[
      "Python fundamentals and advanced syntax",
      "Django and Flask web frameworks",
      "Data analysis with Pandas & NumPy",
      "REST API development & integration",
      "Database connectivity and ORM",
      "Automation, scripting & task scheduling",
      "Backend architecture design",
      "Real-world Python projects",
    ], fbg:"#fdf8ff", flip:false,
  },
  {
    ac:"#f59e0b", abg:"#fffbeb", abdr:"#fed7aa", ic:"bi-layers-fill",
    cat:"Full-Stack Projects", title:"Full-Stack Projects", badge:"Real-World Experience",
    desc:"Build real-world, production-level applications that strengthen your portfolio and industry readiness. Work on complete systems from UI design to backend logic, database management, API integration, and deployment using professional development workflows.",
    quote:"Learn by building real products, not just demos.",
    feats:[
      "End-to-end application development",
      "Team collaboration using Git & GitHub",
      "Code reviews & clean coding practices",
      "Backend API integration",
      "Cloud deployment & hosting",
      "CI/CD workflow basics",
      "Scalable architecture design",
      "Professional portfolio projects",
    ], fbg:"#fffbf0", flip:true,
  },
];

export default function InternshipTrainingPage() {
  useEffect(()=>{ window.scrollTo(0,0); document.title="Internship & Training | Kevalon Technology"; return ()=>{ document.title="Kevalon Technology"; }; },[]);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-mortarboard-fill" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            Internship /<br /><GradText c="Training" />
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
            Hands-on IT training and internships to kickstart your career in technology.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/apply-now" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
              <i className="bi bi-person-check-fill" style={{ fontSize:"0.82rem" }} /> Start Your Journey
            </Link>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
              Learn More <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}><svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:"100%", height:40, display:"block" }}><path d="M0,20 Q360,40 720,20 Q1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" /></svg></div>
      </section>

      {/* STATS */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-4c" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[{icon:"bi-clock-fill",color:"#034665",val:"3-6 Mo",label:"Program Duration"},{icon:"bi-briefcase-fill",color:"#22c55e",val:"100%",label:"Live Project Exposure"},{icon:"bi-award-fill",color:"#f59e0b",val:"Certified",label:"Industry Recognition"},{icon:"bi-people-fill",color:"#4f46e5",val:"Expert",label:"Mentor Guidance"}].map((s,i)=>(
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
                Internship / Training<br /><GradText c="With Kevalon Technology" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Our Internship and Training programs are designed to provide students and professionals with hands-on experience in modern technologies and real-world projects. Whether you're a beginner looking to start your career in IT or an experienced professional seeking to upgrade your skills, our programs offer comprehensive training and practical experience.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we offer structured internship and training programs that combine theoretical knowledge with practical application. Our programs are designed to help you build a strong foundation in software development and gain industry-relevant experience.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                {["Live Project Work","Expert Mentors","Certification","Career Support","Interview Prep","Portfolio Building"].map(f=>(
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
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}><span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>training.kevalontechnology.in</span></div>
                </div>
                {[
                  {icon:"bi-code-slash",    color:"#034665", dark:true,     label:"Live Projects",    sub:"Real apps, not just exercises"      },
                  {icon:"bi-people-fill",   color:"#22c55e", bg:"#f0fdf4",  label:"Expert Mentors",   sub:"Industry professionals guide you"   },
                  {icon:"bi-award-fill",    color:"#f59e0b", bg:"#fffbeb",  label:"Certification",    sub:"Verified industry credentials"      },
                  {icon:"bi-briefcase-fill",color:"#4f46e5", bg:"#eff6ff",  label:"Career Support",   sub:"Placement & referrals"              },
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
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Batch enrolling now</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRAINING TRACKS — magazine cards */}
      <section style={{ padding:"2rem 0", background:"#ffffff" }}>
        <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"1.6rem" }}>
            <Pill icon="bi-layers-fill" label="Our Programs" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>Training Tracks We <GradText c="Offer" /></h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>Structured programs built for career-readiness — from first code to job placement.</p>
          </motion.div>
          {CARDS.map((card,idx)=>(
            <motion.div key={card.title} className="svc-mc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:idx*0.08 }} viewport={{ once:true, margin:"-40px" }}>
              {!card.flip?(
                <>
                  <div style={{ padding:"2rem", borderRight:"1.5px solid #f1f5f9" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:card.abg, border:`1.5px solid ${card.abdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className={`bi ${card.ic}`} style={{ fontSize:"1.2rem", color:card.ac }} /></div>
                      <div>
                        <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:card.ac, marginBottom:"0.15rem" }}>{card.cat}</div>
                        <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{card.title}</h3>
                      </div>
                      <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:card.abg, color:card.ac, border:`1px solid ${card.abdr}`, whiteSpace:"nowrap" }}>{card.badge}</span>
                    </div>
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.82rem", color:card.ac, fontWeight:600, fontStyle:"italic", background:card.abg, borderLeft:`3px solid ${card.ac}`, padding:"10px 16px", borderRadius:"0 8px 8px 0", margin:0 }}>"{card.quote}"</p>
                  </div>
                  <div style={{ padding:"2rem", background:card.fbg }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>What You Learn</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                </>
              ):(
                <>
                  <div style={{ padding:"2rem", background:card.fbg, borderRight:"1.5px solid #f1f5f9" }}>
                    <div style={{ fontSize:"0.72rem", fontWeight:700, color:card.ac, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.85rem" }}>What You Learn</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>{card.feats.map(f=><CheckItem key={f} text={f} bg={card.abg} color={card.ac} />)}</div>
                  </div>
                  <div style={{ padding:"2rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
                      <div style={{ width:46, height:46, borderRadius:14, background:card.abg, border:`1.5px solid ${card.abdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><i className={`bi ${card.ic}`} style={{ fontSize:"1.2rem", color:card.ac }} /></div>
                      <div>
                        <div style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:card.ac, marginBottom:"0.15rem" }}>{card.cat}</div>
                        <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#0d1f35", margin:0 }}>{card.title}</h3>
                      </div>
                      <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20, background:card.abg, color:card.ac, border:`1px solid ${card.abdr}`, whiteSpace:"nowrap" }}>{card.badge}</span>
                    </div>
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.82rem", color:card.ac, fontWeight:600, fontStyle:"italic", background:card.abg, borderLeft:`3px solid ${card.ac}`, padding:"10px 16px", borderRadius:"0 8px 8px 0", margin:0 }}>"{card.quote}"</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT — Program section */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="Internship & Training Program" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Learn - Practice - <GradText c="Build Career" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, our internship and training programs are designed to bridge the gap between academic learning and real-world industry requirements. We provide hands-on practical training with modern technologies, live projects, and professional mentorship to help students and freshers build strong technical foundations.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                Our programs focus on skill development, real project exposure, teamwork, and problem-solving abilities. From software development and UI/UX design to mobile apps, web technologies, and emerging IT domains — we prepare learners for real IT careers, not just certificates.
              </p>

              {/* Training Features */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                {[
                  { icon:"bi-code-slash",    title:"Hands-on Training",    desc:"Practical learning approach"        },
                  { icon:"bi-briefcase-fill",title:"Real Projects",         desc:"Live industry use-cases"            },
                  { icon:"bi-people-fill",   title:"Industry Mentors",      desc:"Expert professional guidance"       },
                  { icon:"bi-award-fill",    title:"Certification",          desc:"Verified training credentials"      },
                  { icon:"bi-briefcase-fill",title:"Job Placement Support", desc:"Career guidance & referrals"        },
                  { icon:"bi-infinity",      title:"Lifetime Support",       desc:"Continuous learning access"         },
                ].map(item=>(
                  <div key={item.title} style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem", background:"#fff", borderRadius:14, border:"1.5px solid rgba(97,187,197,0.14)", padding:"0.85rem 1rem", boxShadow:"0 2px 8px rgba(3,70,101,0.05)" }}>
                    <div style={{ width:34, height:34, borderRadius:9, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <i className={`bi ${item.icon}`} style={{ fontSize:"0.85rem", color:"#034665" }} />
                    </div>
                    <div>
                      <p style={{ fontSize:"0.83rem", fontWeight:700, color:"#0d1f35", margin:"0 0 0.15rem" }}>{item.title}</p>
                      <p style={{ fontSize:"0.72rem", color:"#94a3b8", margin:0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Technologies We Teach" />
              <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.5rem" }}>
                Technologies <GradText c="We Teach" />
              </h3>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Industry-relevant technologies for real-world careers.</p>
              <div className="svc-tg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                <TechPill color="#e34f26" bg="#fff7f0" border="#e34f2628" icon="bi-filetype-html" label="HTML5"       delay={0}     />
                <TechPill color="#264de4" bg="#eff6ff" border="#264de428" icon="bi-filetype-css"  label="CSS3"        delay={0.055} />
                <TechPill color="#f7df1e" bg="#fffde7" border="#f7df1e28" icon="bi-braces"        label="JavaScript"  delay={0.11}  />
                <TechPill color="#61dafb" bg="#f0fcff" border="#61dafb28" icon="bi-code-slash"    label="React"       delay={0.165} />
                <TechPill color="#3c873a" bg="#f0fdf4" border="#3c873a28" icon="bi-node-plus"     label="Node.js"     delay={0.22}  />
                <TechPill color="#3776ab" bg="#eff6ff" border="#3776ab28" icon="bi-filetype-py"   label="Python"      delay={0.275} />
                <TechPill color="#336791" bg="#eff6ff" border="#33679128" icon="bi-database"      label="PostgreSQL"  delay={0.33}  />
                <TechPill color="#6cac48" bg="#f0fdf4" border="#6cac4828" icon="bi-hdd-fill"      label="MongoDB"     delay={0.385} />
                <TechPill color="#ff9900" bg="#fffbeb" border="#ff990028" icon="bi-cloud-fill"    label="AWS"         delay={0.44}  />
                <TechPill color="#2496ed" bg="#f0f9ff" border="#2496ed28" icon="bi-box-seam"      label="Docker"      delay={0.495} />
              </div>
              <div style={{ marginTop:"1rem", padding:"0.85rem 1rem", borderRadius:12, background:"rgba(97,187,197,0.08)", border:"1.5px solid rgba(97,187,197,0.25)", textAlign:"center" }}>
                <span style={{ fontSize:"0.8rem", fontWeight:700, color:"#034665" }}>Job-oriented syllabus • Industry standards • Project-based learning</span>
              </div>

              {/* Certification */}
              <div style={{ marginTop:"1.2rem", background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"1.5rem", boxShadow:"0 4px 16px rgba(3,70,101,0.06)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 0.5rem" }}>Certification & Support</p>
                <p style={{ fontSize:"0.78rem", color:"#034665", fontWeight:700, margin:"0 0 0.85rem" }}>Recognition - Career Growth - Lifetime Guidance</p>
                <p style={{ fontSize:"0.83rem", color:"#4a5568", lineHeight:1.75, margin:"0 0 1rem" }}>Earn industry-recognized certifications and receive continuous career support designed to guide you from learning to employment.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  {[
                    "Industry-recognized completion certificates",
                    "Personal career guidance & mentorship",
                    "Resume building & professional profiling",
                    "Interview preparation sessions",
                    "Job placement assistance",
                    "Community & alumni network access",
                    "Continuous learning support",
                    "Lifetime access to resources",
                  ].map(f=>(
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.8rem", flexShrink:0 }} />
                      <span style={{ fontSize:"0.8rem", color:"#334155" }}>{f}</span>
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
            <Pill icon="bi-arrow-right-circle-fill" label="Your Journey" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>From Enrollment to <GradText c="Employment" /></h2>
          </motion.div>
          <div className="svc-3c" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            <ProcCard n="01" icon="bi-person-check-fill" title="Apply & Enroll"       desc="Submit your application, get assessed, and join the next batch — no prior experience required." delay={0} />
            <ProcCard n="02" icon="bi-book-fill"         title="Structured Learning"   desc="Guided modules covering fundamentals to advanced topics with hands-on exercises." delay={0.07} />
            <ProcCard n="03" icon="bi-code-slash"        title="Live Project Work"     desc="Work on real production applications with your team under mentor supervision." delay={0.14} />
            <ProcCard n="04" icon="bi-people-fill"       title="Code Reviews"          desc="Weekly 1-on-1 code reviews and feedback sessions to improve your technical skills." delay={0.21} />
            <ProcCard n="05" icon="bi-award-fill"        title="Certification"          desc="Complete your final project and receive your verified certification." delay={0.28} />
            <ProcCard n="06" icon="bi-briefcase-fill"    title="Career Placement"      desc="Interview prep, resume building, and placement support to land your first tech role." delay={0.35} />
          </div>
        </div>
      </section>

      {/* SERVICES + TECH */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Program <GradText c="Highlights" /></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Everything you need to go from learner to job-ready engineer.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <OfferRow icon="bi-code-slash"        title="Full-Stack Development"   desc="React, Node.js, Flutter, and databases — complete web and mobile development skills." delay={0} />
                <OfferRow icon="bi-diagram-3"         title="System Design"            desc="Learn to design scalable systems, APIs, and database schemas for production apps." delay={0.06} />
                <OfferRow icon="bi-git"               title="Git & DevOps Basics"      desc="Version control, CI/CD, deployment, and cloud hosting fundamentals." delay={0.12} />
                <OfferRow icon="bi-people-fill"       title="Team Collaboration"       desc="Work in agile teams, sprint planning, code reviews, and standups." delay={0.18} />
                <OfferRow icon="bi-person-lines-fill" title="Interview Preparation"    desc="Mock technical interviews, DSA practice, and system design sessions." delay={0.24} />
                <OfferRow icon="bi-award-fill"        title="Certification & Placement" desc="Industry-recognized certificate and dedicated job placement assistance." delay={0.30} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>Trusted by students - Career-focused training - Industry aligned</p>
                <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem" }}>Not just certification, but a complete career journey. Our structured certification and mentorship model ensures long-term professional growth, confidence, and career stability.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  {[
                    { icon:"bi-book-fill",         text:"Job-oriented syllabus & industry standards"         },
                    { icon:"bi-code-slash",         text:"Project-based practical learning"                  },
                    { icon:"bi-people-fill",        text:"Expert mentors from the industry"                  },
                    { icon:"bi-award-fill",         text:"Verified certification on completion"              },
                    { icon:"bi-briefcase-fill",     text:"Job placement support & referrals"                 },
                    { icon:"bi-infinity",           text:"Lifetime access to resources and community"        },
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
