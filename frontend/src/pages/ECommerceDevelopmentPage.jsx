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
  {ac:"#034665",abg:"rgba(97,187,197,0.12)",abdr:"rgba(97,187,197,0.35)",ic:"bi-box-seam",cat:"Product & Catalog",title:"Product Management",badge:"Catalog & Inventory",
    desc:"Comprehensive product management system to organize and showcase your inventory. Manage products, categories, variants, and inventory with ease.",
    desc2:"Designed for growing catalogs with SEO-optimized product pages and smart search capabilities.",
    feats:["Product catalog management","Category and subcategory organization","Product variants and attributes","Inventory tracking and stock management","Bulk product import/export","Product search and filtering"],fbg:"#f0fbfc",flip:false},
  {ac:"#16a34a",abg:"#f0fdf4",abdr:"#bbf7d0",ic:"bi-credit-card-fill",cat:"Payments & Security",title:"Payment Integration",badge:"PCI Compliant",
    desc:"Secure payment processing with support for multiple payment gateways. Accept payments from customers worldwide with confidence.",
    desc2:"Supports digital wallets, UPI, bank transfers, and COD with seamless one-click checkout experiences.",
    feats:["Credit/debit card processing","Payment gateway integration (Stripe, PayPal, Razorpay)","Digital wallet support","Bank transfer and COD options","Secure payment processing (PCI compliance)","Multi-currency support"],fbg:"#f0fdf4",flip:true},
  {ac:"#f59e0b",abg:"#fffbeb",abdr:"#fed7aa",ic:"bi-bag-check-fill",cat:"Shopping Experience",title:"Shopping Cart & Checkout",badge:"Conversion Optimized",
    desc:"Streamlined shopping cart and checkout process to maximize conversions. Provide a smooth and secure checkout experience for your customers.",
    desc2:"Built to delight customers with transparent order visibility and efficient fulfilment workflows.",
    feats:["Add to cart functionality","Cart persistence and recovery","Guest checkout option","Multi-step checkout process","Order summary and review","Shipping and tax calculation"],fbg:"#fffbf0",flip:false},
  {ac:"#0ea5e9",abg:"#f0f9ff",abdr:"#bae6fd",ic:"bi-truck",cat:"Orders & Logistics",title:"Order Management",badge:"Real-time Tracking",
    desc:"Efficient order management system to track, process, and fulfill orders. Manage your entire order lifecycle from placement to delivery.",
    desc2:"Full order lifecycle management from placement to delivery with real-time tracking and automated status updates.",
    feats:["Order tracking and status updates","Order history and details","Order status management","Invoice generation","Shipping label printing","Order cancellation and refunds"],fbg:"#f0f9ff",flip:true},
  {ac:"#8b5cf6",abg:"#f5f3ff",abdr:"#ddd6fe",ic:"bi-shield-lock-fill",cat:"Security & Compliance",title:"Security & Compliance",badge:"Enterprise Grade",
    desc:"Enterprise-grade security to protect your business and customer data. Ensure compliance with industry standards and regulations.",
    desc2:"Our platforms are optimized for speed, SEO, mobile responsiveness, and high conversion rates.",
    feats:["SSL/HTTPS encryption","PCI DSS compliance","Secure customer data storage","Fraud detection and prevention","Regular security audits","GDPR compliance"],fbg:"#fdf8ff",flip:false},
];

export default function ECommerceDevelopmentPage() {
  useEffect(()=>{ window.scrollTo(0,0); document.title="E-Commerce Development | Kevalon Technology"; return ()=>{ document.title="Kevalon Technology"; }; },[]);
  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#ffffff", overflow:"hidden", paddingTop:"2rem" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-cart3" label="Know More About" />
          <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            E-Commerce<br /><GradText c="Development" />
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
            Build powerful online stores that drive sales and grow your business.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Get in Touch
            </Link>
            <Link to="/portfolio" style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:12, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#61BBC5";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="";}}>
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
            {[{icon:"bi-cart-check-fill",color:"#034665",val:"350+",label:"Stores Built"},{icon:"bi-shield-lock-fill",color:"#22c55e",val:"99.9%",label:"Secure Checkout"},{icon:"bi-graph-up-arrow",color:"#f59e0b",val:"3+",label:"Years Experience"},{icon:"bi-star-fill",color:"#4f46e5",val:"100%",label:"Client Satisfaction"}].map((s,i)=>(
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
                E-Commerce Development<br /><GradText c="With Kevalon Technology" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                E-commerce development involves creating online stores and digital marketplaces that enable businesses to sell products and services over the internet. A well-designed e-commerce platform provides a seamless shopping experience, secure payment processing, and efficient order management.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem", fontSize:"0.94rem" }}>
                At <strong style={{ color:"#034665" }}>Kevalon Technology</strong>, we develop custom e-commerce solutions that help businesses establish a strong online presence and maximize their sales potential. Our e-commerce platforms are designed to be user-friendly, secure, and scalable.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                {["Product Catalog & Search","Secure Payment Gateway","Order Management","Inventory Tracking","Mobile Commerce","SEO & Performance"].map(f=>(
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
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}><span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>store.kevalontechnology.in</span></div>
                </div>
                {[
                  {icon:"bi-bar-chart-line-fill",color:"#034665",dark:true,label:"Sales Overview",sub:"High Performance - Fast & Optimized"},
                  {icon:"bi-credit-card-fill",color:"#22c55e",bg:"#f0fdf4",label:"Secure Payments",sub:"Safe Transactions - PCI Compliant"},
                  {icon:"bi-boxes",color:"#f59e0b",bg:"#fffbeb",label:"Scalable Systems",sub:"Business Growth Ready"},
                  {icon:"bi-graph-up-arrow",color:"#4f46e5",bg:"#eff6ff",label:"Smart Analytics",sub:"Data-Driven Decisions"},
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
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Store live and processing orders</span>
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
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>E-Commerce Features We <GradText c="Build" /></h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>End-to-end e-commerce solutions engineered for performance, security, and growth.</p>
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
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>{card.desc2}</p>
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
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, marginBottom:"0.75rem" }}>{card.desc}</p>
                    <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.8, margin:0 }}>{card.desc2}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-building" label="About E-Commerce Development" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Online Shopping - Digital Commerce - <GradText c="Global Sales" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we design and develop powerful, secure, and scalable e-commerce platforms that empower businesses to sell products and services globally. Our solutions combine modern UI/UX, seamless navigation, and high-performance architecture to deliver smooth and engaging shopping experiences.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                From product management, inventory automation, and secure payment gateways to order processing, analytics, and marketing integrations — we deliver complete end-to-end e-commerce ecosystems. Our platforms are optimized for speed, SEO, mobile responsiveness, and high conversion rates, helping businesses grow revenue, retain customers, and scale operations confidently in the digital marketplace.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {[
                  "Advanced Product Catalog (Categories, filters, search)",
                  "Smart Shopping Cart (Wishlist, save for later)",
                  "Secure Payment Gateway Integration",
                  "Order & Delivery Management System",
                  "Real-Time Inventory Tracking",
                  "Mobile-First Responsive Design",
                  "Multi-Vendor Marketplace Support",
                  "SEO & Conversion Optimization",
                ].map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ color:"#61BBC5", fontSize:"0.85rem", flexShrink:0 }} />
                    <span style={{ fontSize:"0.85rem", color:"#334155", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Technologies We Use" />
              <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.5rem" }}>Technologies <GradText c="We Use" /></h3>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>At Kevalon Technology, we use modern, scalable, and enterprise-grade technologies to build secure, high-performance, and future-ready e-commerce platforms.</p>
              <div className="svc-tg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                <TechPill color="#61dafb" bg="#f0fcff" border="#61dafb28" icon="bi-code-slash"  label="React"          delay={0}     />
                <TechPill color="#3c873a" bg="#f0fdf4" border="#3c873a28" icon="bi-node-plus"   label="Node.js"        delay={0.055} />
                <TechPill color="#336791" bg="#eff6ff" border="#33679128" icon="bi-database"    label="PostgreSQL"     delay={0.11}  />
                <TechPill color="#6cac48" bg="#f0fdf4" border="#6cac4828" icon="bi-hdd-fill"    label="MongoDB"        delay={0.165} />
                <TechPill color="#008cdd" bg="#f0f9ff" border="#008cdd28" icon="bi-stripe"      label="Stripe"         delay={0.22}  />
                <TechPill color="#003087" bg="#eff6ff" border="#00308728" icon="bi-paypal"      label="PayPal"         delay={0.275} />
                <TechPill color="#96bf48" bg="#f0fdf4" border="#96bf4828" icon="bi-bag-fill"    label="Shopify"        delay={0.33}  />
                <TechPill color="#21759b" bg="#f0f9ff" border="#21759b28" icon="bi-wordpress"   label="WooCommerce"    delay={0.385} />
                <TechPill color="#ff9900" bg="#fffbeb" border="#ff990028" icon="bi-cloud-fill"  label="AWS Cloud"      delay={0.44}  />
                <TechPill color="#2496ed" bg="#f0f9ff" border="#2496ed28" icon="bi-box-seam"    label="Docker"         delay={0.495} />
                <TechPill color="#61BBC5" bg="rgba(97,187,197,0.1)" border="rgba(97,187,197,0.3)" icon="bi-phone-fill" label="Mobile Commerce" delay={0.55} />
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
            <ProcCard n="01" icon="bi-search"       title="Discovery & Strategy"  desc="We analyze your products, audience, and business model to define the ideal store architecture." delay={0} />
            <ProcCard n="02" icon="bi-palette2"     title="UI/UX Design"           desc="Conversion-focused design with intuitive navigation, product pages, and checkout flows." delay={0.07} />
            <ProcCard n="03" icon="bi-code-slash"   title="Development"            desc="Clean, secure store built with modern stack — fast, scalable, and SEO-optimized." delay={0.14} />
            <ProcCard n="04" icon="bi-shield-check" title="Testing & QA"           desc="Cross-device testing, payment gateway validation, and performance audits." delay={0.21} />
            <ProcCard n="05" icon="bi-cloud-upload" title="Launch"                 desc="Smooth go-live with product data migration, SSL setup, and monitoring." delay={0.28} />
            <ProcCard n="06" icon="bi-graph-up-arrow" title="Growth & Support"     desc="Ongoing SEO, feature additions, performance monitoring, and dedicated support." delay={0.35} />
          </div>
        </div>
      </section>

      {/* SERVICES + TECH */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-check2-all" label="What We Offer" />
              <h2 style={{ fontSize:"clamp(1.6rem,2.8vw,2.1rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>Our E-Commerce <GradText c="Services" /></h2>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>Complete e-commerce services from store design to post-launch growth.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <OfferRow icon="bi-shop"          title="Custom Store Development"   desc="Bespoke e-commerce platforms built around your brand and business requirements." delay={0} />
                <OfferRow icon="bi-bag-fill"      title="Shopify & WooCommerce"       desc="Expert setup, customisation, and integration for leading e-commerce platforms." delay={0.06} />
                <OfferRow icon="bi-credit-card"   title="Payment Gateway Integration" desc="Stripe, Razorpay, PayPal — secure, multi-currency, subscription-ready." delay={0.12} />
                <OfferRow icon="bi-phone-fill"    title="Mobile Commerce App"         desc="Native iOS and Android shopping apps with push notifications and loyalty features." delay={0.18} />
                <OfferRow icon="bi-search"        title="SEO & Performance"           desc="Technical SEO, Core Web Vitals, and speed optimisation for higher rankings." delay={0.24} />
                <OfferRow icon="bi-arrow-repeat"  title="Maintenance & Support"       desc="Ongoing updates, security patches, and dedicated e-commerce support." delay={0.30} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.2rem" }}>E-Commerce Features</p>
                <p style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.85, marginBottom:"1.2rem" }}>Our e-commerce platforms are designed to deliver seamless shopping experiences, secure transactions, and scalable business growth.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                  {[
                    { icon:"bi-box-seam",         text:"Advanced Product Catalog (Categories, filters, search)"  },
                    { icon:"bi-cart-check-fill",  text:"Smart Shopping Cart (Wishlist, save for later)"          },
                    { icon:"bi-credit-card-fill", text:"Secure Payment Gateway Integration"                      },
                    { icon:"bi-truck",            text:"Order & Delivery Management System"                      },
                    { icon:"bi-boxes",            text:"Real-Time Inventory Tracking"                            },
                    { icon:"bi-phone-fill",       text:"Mobile-First Responsive Design"                         },
                    { icon:"bi-people-fill",      text:"Multi-Vendor Marketplace Support"                        },
                    { icon:"bi-graph-up-arrow",   text:"SEO & Conversion Optimization"                          },
                  ].map(item=>(
                    <div key={item.text} style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.85rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.85rem", color:"#334155", fontWeight:500 }}>{item.text}</span>
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
