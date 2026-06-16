import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GradText({ c }) {
  return (
    <span style={{ background:"linear-gradient(135deg,#034665,#61BBC5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
      {c}
    </span>
  );
}

function Pill({ icon, label }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(97,187,197,0.1)", border:"1px solid rgba(97,187,197,0.28)", borderRadius:50, padding:"0.28rem 0.88rem" }}>
      <i className={`bi ${icon}`} style={{ fontSize:"0.68rem", color:"#61BBC5" }} />
      <span style={{ fontSize:"0.68rem", fontWeight:700, color:"#034665", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function CheckRow({ text, bg, color }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem" }}>
      <span style={{ width:20, height:20, borderRadius:6, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"0.1rem" }}>
        <i className="bi bi-check-lg" style={{ fontSize:"0.6rem", color }} />
      </span>
      <span style={{ fontSize:"0.87rem", color:"#374151", lineHeight:1.6 }}>{text}</span>
    </div>
  );
}

function OfferRow({ icon, title, desc, delay }) {
  return (
    <motion.div
      className="svc-or"
      initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }}
      transition={{ duration:0.32, delay }} viewport={{ once:true }}>
      <div style={{ flexShrink:0, width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,rgba(97,187,197,0.12),rgba(3,70,101,0.06))", border:"1.5px solid rgba(97,187,197,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <i className={`bi ${icon}`} style={{ fontSize:"0.98rem", color:"#034665" }} />
      </div>
      <div>
        <strong style={{ display:"block", fontSize:"0.87rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.12rem" }}>{title}</strong>
        <p style={{ fontSize:"0.77rem", color:"#64748b", lineHeight:1.55, margin:0 }}>{desc}</p>
      </div>
      <i className="bi bi-arrow-right" style={{ marginLeft:"auto", fontSize:"0.78rem", color:"#cbd5e1", flexShrink:0 }} />
    </motion.div>
  );
}

function ProcCard({ n, icon, title, desc, delay }) {
  return (
    <motion.div
      className="svc-pc"
      initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
      transition={{ duration:0.38, delay }} viewport={{ once:true }}>
      <span style={{ position:"absolute", top:12, right:16, fontSize:"3rem", fontWeight:900, color:"#f1f5f9", lineHeight:1, userSelect:"none" }}>{n}</span>
      <div style={{ width:48, height:48, borderRadius:13, marginBottom:"0.9rem", background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.07))", border:"1.5px solid rgba(97,187,197,0.24)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <i className={`bi ${icon}`} style={{ fontSize:"1.25rem", color:"#034665" }} />
      </div>
      <h4 style={{ fontSize:"0.97rem", fontWeight:800, color:"#0d1f35", marginBottom:"0.35rem" }}>{title}</h4>
      <p style={{ fontSize:"0.82rem", color:"#64748b", lineHeight:1.65, margin:0 }}>{desc}</p>
    </motion.div>
  );
}

function TechPill({ color, bg, border, icon, label, delay }) {
  return (
    <motion.div
      className="svc-tp"
      initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }}
      transition={{ duration:0.28, delay }} viewport={{ once:true }}>
      <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:bg, border:`1.5px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <i className={`bi ${icon}`} style={{ fontSize:"0.95rem", color }} />
      </div>
      <span style={{ fontSize:"0.81rem", fontWeight:600, color:"#374151" }}>{label}</span>
    </motion.div>
  );
}

const CSS = `
  .svc-sc { text-align:center;padding:1.2rem 0.9rem;border-radius:18px;background:#fff;border:1.5px solid #e2e8f0;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.25s; }
  .svc-sc:hover { border-color:#61BBC5;transform:translateY(-4px);box-shadow:0 12px 28px rgba(97,187,197,0.14); }
  .svc-pc { background:#fff;border-radius:18px;padding:1.4rem 1.2rem;border:1.5px solid #e2e8f0;position:relative;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);transition:all 0.28s; }
  .svc-pc:hover { border-color:#61BBC5;transform:translateY(-5px);box-shadow:0 12px 30px rgba(97,187,197,0.16); }
  .svc-or { display:flex;align-items:flex-start;gap:1rem;padding:0.85rem 1rem;border-radius:14px;border:1.5px solid #f1f5f9;background:#fafbfc;transition:all 0.25s;cursor:default; }
  .svc-or:hover { border-color:#61BBC5;background:#f0fbfc;transform:translateX(4px); }
  .svc-tp { display:flex;align-items:center;gap:0.5rem;padding:0.55rem 0.85rem;border-radius:50px;border:1.5px solid #e2e8f0;background:#fff;transition:all 0.25s;cursor:default; }
  .svc-tp:hover { transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.08); }
  @media(max-width:960px){
    .svc-2c,.svc-bc { grid-template-columns:1fr !important; }
    .svc-3c { grid-template-columns:1fr 1fr !important; }
    .svc-4c { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:560px){
    .svc-3c { grid-template-columns:1fr !important; }
    .svc-4c { grid-template-columns:1fr 1fr !important; }
    .svc-tg { grid-template-columns:1fr !important; }
  }
`;

export default function SeoDigitalMarketingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SEO & Digital Marketing | Kevalon Technology";
    return () => { document.title = "Kevalon Technology"; };
  }, []);

  return (
    <div style={{ fontFamily:"'Inter','Segoe UI',sans-serif", color:"#1e293b", background:"#fff", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ══ HERO ══ */}
      <section style={{ position:"relative", minHeight:520, display:"flex", alignItems:"center", background:"#fff", overflow:"hidden", paddingTop:"2rem" }}>
        {/* bg blobs */}
        <div style={{ position:"absolute", top:-100, left:-120, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(97,187,197,0.12) 0%,transparent 65%)", filter:"blur(70px)", pointerEvents:"none" }} aria-hidden="true" />
        <div style={{ position:"absolute", bottom:-80, right:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(3,70,101,0.09) 0%,transparent 65%)", filter:"blur(70px)", pointerEvents:"none" }} aria-hidden="true" />

        <div style={{ maxWidth:720, margin:"0 auto", padding:"3.5rem 1.5rem", width:"100%", textAlign:"center", position:"relative", zIndex:1 }}>
          <Pill icon="bi-graph-up-arrow" label="SEO & Digital Marketing" />
          <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.1, letterSpacing:"-0.03em", margin:"1rem 0 0.75rem" }}>
            SEO &amp; Digital<br /><GradText c="Marketing Services" />
          </h1>
          <p style={{ color:"#475569", fontSize:"0.97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 1.8rem" }}>
            Grow your visibility, traffic, and revenue with data-driven SEO and marketing strategies.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center" }}>
            <Link to="/contact"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"linear-gradient(135deg,#034665,#0a6e90)", color:"#fff", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", boxShadow:"0 6px 20px rgba(3,70,101,0.28)", transition:"all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform=""}>
              <i className="bi bi-rocket-takeoff-fill" style={{ fontSize:"0.82rem" }} /> Request a Free Strategy Consultation
            </Link>
            <Link to="/portfolio"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"#fff", color:"#034665", padding:"0.82rem 1.8rem", borderRadius:50, fontWeight:700, fontSize:"0.87rem", textDecoration:"none", border:"2px solid #e2e8f0", transition:"all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#61BBC5"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.transform=""; }}>
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

      {/* ══ STATS ══ */}
      <section style={{ padding:"2rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-4c" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              { icon:"bi-graph-up-arrow",  color:"#034665", val:"+240%", label:"Avg Traffic Growth"  },
              { icon:"bi-search",          color:"#2563eb", val:"#1",    label:"Google Rankings"      },
              { icon:"bi-currency-dollar", color:"#22c55e", val:"3x",    label:"Avg ROI on Ads"       },
              { icon:"bi-star-fill",       color:"#f59e0b", val:"100%",  label:"Client Satisfaction"  },
            ].map((s, i) => (
              <motion.div key={s.label} className="svc-sc"
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.4, delay:i*0.08 }} viewport={{ once:true }}>
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

      {/* ══ GROW YOUR BUSINESS ONLINE ══ */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}>

            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-info-circle-fill" label="What We Do" />
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.3rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 1rem" }}>
                Grow Your Business Online with <GradText c="Kevalon Technology" />
              </h2>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                In today's competitive digital world, building a strong online presence is essential for business growth and success. Kevalon Technology provides professional SEO and digital marketing services designed to increase your website visibility, attract targeted visitors, and convert them into loyal customers.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Our team focuses on strategic search engine optimization, performance marketing, and data-driven digital campaigns that help businesses rank higher on search engines like Google. By combining technical SEO, keyword optimization, and content marketing, we ensure your brand reaches the right audience at the right time.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Whether you are a startup, small business, or growing enterprise, our customized digital marketing strategies help you improve search engine rankings, build brand authority, and generate consistent online leads that grow your business.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.4rem", fontSize:"0.94rem" }}>
                From website SEO audits and keyword research to paid advertising and social media marketing, <strong style={{ color:"#034665" }}>Kevalon Technology</strong> delivers end-to-end digital marketing solutions that drive measurable results and long-term online success.
              </p>
            </motion.div>

            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }} style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"100%", maxWidth:390, background:"#fff", borderRadius:22, border:"1.5px solid #e2e8f0", padding:"1.5rem", boxShadow:"0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"1rem" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
                  <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                  <div style={{ flex:1, height:22, background:"#f1f5f9", borderRadius:6, marginLeft:"0.5rem", display:"flex", alignItems:"center", paddingLeft:"0.6rem" }}>
                    <span style={{ fontSize:"0.63rem", color:"#94a3b8" }}>analytics.kevalontechnology.in</span>
                  </div>
                </div>
                {[
                  { icon:"bi-graph-up-arrow",     color:"#034665", dark:true,  label:"Organic Traffic",  sub:"+240% in 6 months"         },
                  { icon:"bi-search",             color:"#2563eb", bg:"#eff6ff",label:"SEO Rankings",     sub:"32 keywords on Page 1"     },
                  { icon:"bi-megaphone-fill",      color:"#f97316", bg:"#fff7ed",label:"Google Ads ROI",   sub:"3x return on ad spend"     },
                  { icon:"bi-bar-chart-line-fill", color:"#22c55e", bg:"#f0fdf4",label:"Conversions",      sub:"+85% conversion rate"      },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0.85rem", borderRadius:11, background:item.dark ? "linear-gradient(135deg,#034665,#0a6e90)" : (item.bg || "#fff"), border:`1.5px solid ${item.dark ? "transparent" : "#f1f5f9"}` }}>
                      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:item.dark ? "rgba(255,255,255,0.15)" : item.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.9rem", color:item.dark ? "#fff" : item.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize:"0.77rem", fontWeight:700, color:item.dark ? "#fff" : "#0d1f35" }}>{item.label}</div>
                        <div style={{ fontSize:"0.64rem", color:item.dark ? "rgba(255,255,255,0.55)" : "#94a3b8" }}>{item.sub}</div>
                      </div>
                      <i className="bi bi-check-circle-fill" style={{ marginLeft:"auto", color:item.dark ? "rgba(255,255,255,0.65)" : "#22c55e", fontSize:"0.78rem" }} />
                    </div>
                    {i < 3 && (
                      <div style={{ display:"flex", justifyContent:"center", padding:"0.15rem 0" }}>
                        <div style={{ width:2, height:12, background:"linear-gradient(to bottom,#61BBC5,#034665)", borderRadius:2, opacity:0.38 }} />
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ marginTop:"0.85rem", padding:"0.6rem 0.85rem", borderRadius:10, background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", border:"1.5px solid #bbf7d0", display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:800, color:"#22c55e", background:"#dcfce7", padding:"0.14rem 0.48rem", borderRadius:4 }}>LIVE</span>
                  <span style={{ fontSize:"0.68rem", color:"#16a34a", fontWeight:500 }}>Campaigns running and growing</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ OUR DIGITAL MARKETING SERVICES ══ */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-layers-fill" label="Our Capabilities" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Our Digital Marketing <GradText c="Services" />
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              Data-driven strategies that grow your online presence and drive measurable results.
            </p>
          </motion.div>

          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            {[
              { icon:"bi-search",            title:"Search Engine Optimization (SEO)",             desc:"For higher Google rankings — technical SEO, keyword strategy, and on-page improvements that get you to page one." },
              { icon:"bi-key-fill",          title:"Keyword Research & SEO Content Strategy",       desc:"We identify high-value keywords your target customers are searching for and map them to your pages for maximum traffic." },
              { icon:"bi-file-text-fill",    title:"On-Page SEO Optimization & Technical Improvements", desc:"Meta tags, headings, content, internal links, schema markup, and site structure — all optimized to rank and convert." },
              { icon:"bi-megaphone-fill",    title:"Google Ads & Pay-Per-Click (PPC) Campaign Management", desc:"Precision-targeted search, display, and shopping campaigns with full conversion tracking and ROI reporting." },
              { icon:"bi-share-fill",        title:"Social Media Marketing & Brand Awareness",      desc:"Facebook, Instagram, LinkedIn campaigns with creative content, community management, and performance analytics." },
              { icon:"bi-bar-chart-line",    title:"Website Analytics Tracking & Performance Reporting", desc:"Monthly transparent reports on rankings, traffic, conversions, and campaign performance — no vanity metrics." },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.4, delay:i*0.07 }} viewport={{ once:true }}
                style={{ display:"flex", alignItems:"flex-start", gap:"1rem", background:"#fff", borderRadius:16, padding:"1.2rem 1.3rem", border:"1.5px solid rgba(97,187,197,0.15)", boxShadow:"0 4px 16px rgba(3,70,101,0.05)", transition:"all 0.25s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#61BBC5"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(97,187,197,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(97,187,197,0.15)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 16px rgba(3,70,101,0.05)"; }}>
                <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize:"1.1rem", color:"#034665" }} />
                </div>
                <div>
                  <strong style={{ display:"block", fontSize:"0.88rem", fontWeight:700, color:"#0d1f35", marginBottom:"0.3rem", lineHeight:1.4 }}>{item.title}</strong>
                  <p style={{ fontSize:"0.78rem", color:"#64748b", lineHeight:1.6, margin:0 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR SEO STRATEGY ══ */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-arrow-right-circle-fill" label="How We Work" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>
              Our SEO <GradText c="Strategy Process" />
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
              A proven 5-step framework to grow your rankings, traffic, and leads.
            </p>
          </motion.div>
          <div className="svc-3c" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            <ProcCard n="01" icon="bi-search"        title="Website Audit"           desc="We analyze your website performance, technical structure, and SEO opportunities to identify every issue affecting your rankings." delay={0} />
            <ProcCard n="02" icon="bi-key-fill"      title="Keyword Research"         desc="We identify high-value keywords your target customers are searching for and map them to the right pages for maximum organic traffic." delay={0.07} />
            <ProcCard n="03" icon="bi-pencil-square" title="On-Page Optimization"     desc="We improve website content, meta tags, headings, and site structure — all optimized to rank higher and convert better." delay={0.14} />
            <ProcCard n="04" icon="bi-link-45deg"    title="Link Building & Promotion" desc="We increase domain authority with quality backlinks from relevant domains and targeted content promotion." delay={0.21} />
            <ProcCard n="05" icon="bi-bar-chart-line" title="Monitoring & Reporting"  desc="Monthly SEO reports with traffic growth, keyword ranking improvements, and strategy adjustments for continuous growth." delay={0.28} />
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE + WHAT YOU GET ══ */}
      <section style={{ padding:"3.5rem 0", background:"#f8fafc", borderTop:"1.5px solid rgba(97,187,197,0.12)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-patch-check-fill" label="Why Kevalon" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Why Choose <GradText c="Kevalon Technology" />
            </h2>
          </motion.div>

          <div className="svc-2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>

            {/* Why Choose */}
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)", height:"100%", boxSizing:"border-box" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.4rem" }}>Why Choose Kevalon Technology</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                  {[
                    { icon:"bi-people-fill",        text:"Experienced digital marketing professionals"     },
                    { icon:"bi-sliders",             text:"Customized SEO strategies for every business"   },
                    { icon:"bi-bar-chart-line-fill", text:"Transparent monthly reporting and analytics"    },
                    { icon:"bi-currency-rupee",      text:"Affordable digital marketing solutions"         },
                    { icon:"bi-graph-up-arrow",      text:"Focus on long-term growth and lead generation"  },
                  ].map(item => (
                    <div key={item.text} style={{ display:"flex", alignItems:"flex-start", gap:"0.85rem" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:"rgba(97,187,197,0.12)", border:"1.5px solid rgba(97,187,197,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.95rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.9rem", color:"#334155", lineHeight:1.65, paddingTop:"0.4rem", fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What You Get */}
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid rgba(97,187,197,0.16)", padding:"2rem", boxShadow:"0 4px 20px rgba(3,70,101,0.06)", height:"100%", boxSizing:"border-box" }}>
                <p style={{ fontSize:"0.68rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", margin:"0 0 1.4rem" }}>What You Get</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                  {[
                    { icon:"bi-file-earmark-bar-graph-fill", text:"Complete SEO audit report"           },
                    { icon:"bi-key-fill",                    text:"Keyword targeting strategy"          },
                    { icon:"bi-bar-chart-fill",              text:"Monthly traffic and ranking report"  },
                    { icon:"bi-arrow-repeat",                text:"Continuous website optimization"     },
                    { icon:"bi-headset",                     text:"Dedicated digital marketing support" },
                  ].map(item => (
                    <div key={item.text} style={{ display:"flex", alignItems:"flex-start", gap:"0.85rem" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,rgba(97,187,197,0.15),rgba(3,70,101,0.08))", border:"1.5px solid rgba(97,187,197,0.28)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize:"0.95rem", color:"#034665" }} />
                      </div>
                      <span style={{ fontSize:"0.9rem", color:"#334155", lineHeight:1.65, paddingTop:"0.4rem", fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ SEO SERVICES DETAIL + TOOLS ══ */}
      <section style={{ padding:"3.5rem 0", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5 }} viewport={{ once:true }} style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Pill icon="bi-graph-up" label="SEO & Digital Marketing Services" />
            <h2 style={{ fontSize:"clamp(1.8rem,3.2vw,2.5rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.55rem" }}>
              Increase Your Online <GradText c="Visibility & Leads" />
            </h2>
            <p style={{ color:"#64748b", fontSize:"0.94rem", lineHeight:1.7, maxWidth:600, margin:"0 auto" }}>
              Increase your online visibility, website traffic, and customer leads with professional digital marketing strategies.
            </p>
          </motion.div>

          <div className="svc-bc" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>

            {/* Left — description + services */}
            <motion.div initial={{ opacity:0, x:-22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                Data-driven SEO strategies to grow your digital presence.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"0.85rem", fontSize:"0.94rem" }}>
                At Kevalon Technology, we provide result-oriented SEO and digital marketing services that help businesses improve search rankings, attract targeted visitors, and generate high-quality leads.
              </p>
              <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:"1.5rem", fontSize:"0.94rem" }}>
                Our digital marketing experts combine technical SEO, content marketing, and paid advertising to deliver measurable business growth and long-term online success.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <OfferRow icon="bi-search"         title="Technical SEO Audits"    desc="Full SEO audit, site speed, Core Web Vitals, crawlability, and structural improvements." delay={0} />
                <OfferRow icon="bi-key-fill"       title="Keyword Research"         desc="High-value keywords your customers search — mapped to your pages for maximum organic traffic." delay={0.06} />
                <OfferRow icon="bi-megaphone-fill" title="Google Ads & PPC"         desc="Precision-targeted search, display, and shopping campaigns with full ROI tracking." delay={0.12} />
                <OfferRow icon="bi-bar-chart-line" title="Analytics & Reporting"    desc="Monthly transparent reports on rankings, traffic, conversions, and campaign performance." delay={0.18} />
              </div>
            </motion.div>

            {/* Right — Tools & Platforms */}
            <motion.div initial={{ opacity:0, x:22 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.6 }} viewport={{ once:true }}>
              <Pill icon="bi-cpu-fill" label="Tools & Platforms" />
              <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#0d1f35", lineHeight:1.2, margin:"0.8rem 0 0.6rem" }}>
                Tools We <GradText c="Use" />
              </h3>
              <p style={{ color:"#4a5568", marginBottom:"1.2rem", lineHeight:1.7, fontSize:"0.92rem" }}>
                Industry-leading SEO and marketing platforms for maximum performance and transparency.
              </p>
              <div className="svc-tg" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                <TechPill color="#4285f4" bg="#f0f4ff" border="#4285f428" icon="bi-graph-up-arrow" label="Google Analytics"       delay={0}     />
                <TechPill color="#ea4335" bg="#fef2f2" border="#ea433528" icon="bi-badge-ad"        label="Google Ads"             delay={0.055} />
                <TechPill color="#1a73e8" bg="#eff6ff" border="#1a73e828" icon="bi-search"          label="Google Search Console"  delay={0.11}  />
                <TechPill color="#f97316" bg="#fff7ed" border="#f9731628" icon="bi-link-45deg"      label="Ahrefs"                 delay={0.165} />
                <TechPill color="#16a34a" bg="#f0fdf4" border="#16a34a28" icon="bi-bar-chart-line"  label="SEMrush"                delay={0.22}  />
                <TechPill color="#1877f2" bg="#eff6ff" border="#1877f228" icon="bi-share-fill"      label="Social Media Marketing" delay={0.275} />
                <TechPill color="#0ea5e9" bg="#f0f9ff" border="#0ea5e928" icon="bi-key"             label="Keyword Planner"        delay={0.33}  />
                <TechPill color="#e83e2c" bg="#fef2f2" border="#e83e2c28" icon="bi-bug"             label="Screaming Frog SEO"     delay={0.385} />
                <TechPill color="#6366f1" bg="#f5f3ff" border="#6366f128" icon="bi-graph-up"        label="Moz SEO Tools"          delay={0.44}  />
                <TechPill color="#e4405f" bg="#fef0f4" border="#e4405f28" icon="bi-instagram"       label="Facebook & Instagram Ads" delay={0.495} />
              </div>
              <div style={{ marginTop:"1.2rem", padding:"1rem 1.2rem", borderRadius:15, background:"#fff", border:"1.5px solid #bae6fd" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.55rem", marginBottom:"0.4rem" }}>
                  <i className="bi bi-lightning-charge-fill" style={{ color:"#0ea5e9", fontSize:"0.88rem" }} />
                  <span style={{ fontSize:"0.8rem", fontWeight:700, color:"#0c4a6e" }}>Transparent Reporting</span>
                </div>
                <p style={{ fontSize:"0.76rem", color:"#0369a1", lineHeight:1.6, margin:0 }}>
                  Monthly reports with real rankings, traffic data, and ROI metrics — no vanity metrics.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
