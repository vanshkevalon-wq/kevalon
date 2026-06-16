import { useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from './blogData';

function useReveal(threshold = 0.1) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

const CAT_COLORS = {
  'Web Development': { bg: 'rgba(97,187,197,0.12)', text: '#034665',  border: 'rgba(97,187,197,0.35)' },
  'Mobile Apps':     { bg: 'rgba(3,70,101,0.10)',   text: '#034665',  border: 'rgba(3,70,101,0.28)'   },
  'SEO':             { bg: 'rgba(10,143,182,0.10)',  text: '#0a6e8a',  border: 'rgba(10,143,182,0.30)' },
  'Digital Growth':  { bg: 'rgba(249,115,22,0.10)',  text: '#c2410c',  border: 'rgba(249,115,22,0.30)' },
  'UI/UX':           { bg: 'rgba(139,92,246,0.10)',  text: '#6d28d9',  border: 'rgba(139,92,246,0.28)' },
};

export default function BlogDetailPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const hero     = useReveal(0.05);
  const body     = useReveal(0.06);
  const [copied, setCopied] = useState(false);

  const post    = articles.find(a => a.id === Number(id));
  const related = post ? articles.filter(a => a.id !== post.id && a.category === post.category).slice(0, 3) : [];
  const others  = post ? articles.filter(a => a.id !== post.id).slice(0, 4) : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 text-center bg-[#f8fafc]">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-[2.2rem] text-[#61BBC5]"
          style={{ background: 'rgba(97,187,197,0.08)', border: '1.5px solid rgba(97,187,197,0.20)' }}>
          <i className="bi bi-file-earmark-x" />
        </div>
        <h2 className="text-[#334155] m-0 text-[1.3rem] font-bold">Article not found</h2>
        <Link to="/blog"
          className="inline-flex items-center gap-1.5 font-semibold no-underline transition-all duration-200 hover:-translate-x-0.5"
          style={{ color: '#034665', background: 'rgba(97,187,197,0.09)', border: '1px solid rgba(97,187,197,0.28)', padding: '8px 20px', borderRadius: 999, fontSize: '0.9rem' }}>
          <i className="bi bi-arrow-left" /> Back to Blog
        </Link>
      </div>
    );
  }

  const catStyle = CAT_COLORS[post.category] || CAT_COLORS['Web Development'];

  return (
    <div className="bg-[#f8fafc] overflow-x-hidden min-h-screen" style={{ fontFamily: "Inter,'Nunito Sans',sans-serif", color: '#0f172a' }}>

      {/* ══ HERO ══ */}
      <section className="relative bg-white overflow-hidden pt-[100px] sm:pt-[120px] pb-12 sm:pb-16 px-4 sm:px-8 md:px-12">
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ top: -100, left: -140, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(97,187,197,0.11) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ bottom: -60, right: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(3,70,101,0.08) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.09]" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle,#61BBC5 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        <div ref={hero.ref}
          className={`relative z-10 max-w-[820px] mx-auto transition-opacity duration-300 ${hero.on ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: hero.on ? 'bld-up 0.8s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>

          {/* breadcrumb */}
          <div className="flex items-center gap-2 mb-6 flex-wrap text-[0.78rem] text-[#94a3b8]">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 font-semibold cursor-pointer transition-all duration-200 hover:-translate-x-0.5"
              style={{ background: 'rgba(97,187,197,0.09)', border: '1px solid rgba(97,187,197,0.28)', color: '#034665', fontSize: '0.8rem', padding: '5px 14px', borderRadius: 999 }}>
              <i className="bi bi-arrow-left" /> Back
            </button>
            <i className="bi bi-chevron-right text-[0.6rem]" />
            <Link to="/" className="no-underline text-[#94a3b8] hover:text-[#61BBC5] transition-colors">Home</Link>
            <i className="bi bi-chevron-right text-[0.6rem]" />
            <Link to="/blog" className="no-underline text-[#94a3b8] hover:text-[#61BBC5] transition-colors">Blog</Link>
            <i className="bi bi-chevron-right text-[0.6rem]" />
            <span className="text-[#034665] font-semibold">{post.category}</span>
          </div>

          {/* category + featured badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: catStyle.bg, color: catStyle.text, border: `1px solid ${catStyle.border}` }}>
              <i className={`bi ${post.icon}`} /> {post.category}
            </span>
            {post.featured && (
              <span className="inline-flex items-center gap-1 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(234,179,8,0.12)', color: '#92400e', border: '1px solid rgba(234,179,8,0.3)' }}>
                <i className="bi bi-bookmark-star-fill" /> Featured
              </span>
            )}
          </div>

          <h1 className="m-0 mb-5 font-extrabold text-[#0d3d5a] tracking-[-0.025em] leading-[1.18]"
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(1.6rem,3.2vw,2.6rem)' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-5 flex-wrap text-[0.8rem] text-[#94a3b8] font-medium">
            <span className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[0.7rem]"
                style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                <i className="bi bi-building" />
              </div>
              <span>Kevalon Technology</span>
            </span>
            <span><i className="bi bi-calendar3 mr-1" style={{ color: '#61BBC5' }} />{post.date}</span>
            <span><i className="bi bi-clock mr-1" style={{ color: '#61BBC5' }} />{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ══ CONTENT + SIDEBAR ══ */}
      <div ref={body.ref}
        className={`max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-14 transition-opacity duration-300 ${body.on ? 'opacity-100' : 'opacity-0'}`}>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start"
          style={{ animation: body.on ? 'bld-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>

          {/* ── ARTICLE ── */}
          <article className="bg-white rounded-[24px] overflow-hidden"
            style={{ border: '1.5px solid rgba(97,187,197,0.15)', boxShadow: '0 8px 32px rgba(1,72,103,0.07)' }}>

            {/* article header band */}
            <div className="px-6 sm:px-10 pt-8 pb-7" style={{ borderBottom: '1px solid rgba(97,187,197,0.10)' }}>
              <p className="m-0 text-[1rem] sm:text-[1.05rem] leading-[1.9] text-[#334155] font-[450]">
                {post.content.find(b => b.type === 'intro')?.text}
              </p>
            </div>

            {/* article body */}
            <div className="px-6 sm:px-10 py-8 flex flex-col gap-0">
              {post.content
                .filter(b => b.type !== 'intro' && b.type !== 'cta')
                .map((block, i) => {
                  if (block.type === 'subheading') return (
                    <p key={i} className="m-0 mb-5 text-[0.95rem] font-extrabold text-[#034665] tracking-[0.01em]">
                      {block.text}
                    </p>
                  );

                  if (block.type === 'section') return (
                    <div key={i} className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(97,187,197,0.09)' }}>
                      <h2 className="flex items-center gap-3 m-0 mb-3"
                        style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 800, fontSize: '1.12rem', color: '#0d3d5a' }}>
                        <span className="w-[3px] flex-shrink-0 rounded-sm"
                          style={{ height: '1.2rem', background: `linear-gradient(180deg,${post.color},#034665)` }} />
                        {block.heading}
                      </h2>
                      {block.body && (
                        <p className="m-0 mb-4 text-[0.93rem] text-[#475569] leading-[1.85]">{block.body}</p>
                      )}
                      {block.bullets && (
                        <ul className="list-none p-0 m-0 mb-4 flex flex-col gap-2.5">
                          {block.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-[0.9rem] text-[#334155] leading-[1.65]">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.55rem] mt-[2px]"
                                style={{ background: `linear-gradient(135deg,${post.color},#034665)` }}>
                                <i className="bi bi-check" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                      {block.note && (
                        <div className="flex gap-3 items-start px-4 py-3.5 rounded-[10px]"
                          style={{ background: 'rgba(97,187,197,0.07)', borderLeft: `3px solid ${post.color}` }}>
                          <i className="bi bi-lightbulb-fill text-[#61BBC5] flex-shrink-0 mt-0.5 text-[0.9rem]" />
                          <p className="m-0 text-[0.88rem] text-[#034665] font-[600] italic leading-[1.7]">{block.note}</p>
                        </div>
                      )}
                    </div>
                  );
                  return null;
                })}

              {/* CTA block */}
              {post.content.find(b => b.type === 'cta') && (() => {
                const cta = post.content.find(b => b.type === 'cta');
                return (
                  <div className="rounded-[20px] p-7 sm:p-9 mt-2 relative overflow-hidden"
                    style={{ background: `linear-gradient(140deg,${post.color}dd,#013852)` }}>
                    <div className="absolute pointer-events-none" aria-hidden="true"
                      style={{ top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)' }} />
                    <h3 className="m-0 mb-2.5 text-white font-extrabold"
                      style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '1.1rem' }}>
                      {cta.heading}
                    </h3>
                    <p className="m-0 mb-5 text-[0.9rem] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.82)' }}>{cta.body}</p>
                    <a href={cta.link} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
                      style={{ color: '#034665', fontSize: '0.86rem', padding: '10px 22px', borderRadius: 999, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>
                      Visit Kevalon Technology <i className="bi bi-arrow-up-right" />
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* share bar */}
            <div className="px-6 sm:px-10 py-6 flex items-center gap-4 flex-wrap" style={{ borderTop: '1px solid rgba(97,187,197,0.12)' }}>
              <span className="text-[0.8rem] font-semibold text-[#64748b]">Share this article:</span>
              <div className="flex gap-2">
                {[
                  { icon: 'bi-linkedin',   label: 'LinkedIn',  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                  { icon: 'bi-twitter-x',  label: 'Twitter',   href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}` },
                  { icon: 'bi-whatsapp',   label: 'WhatsApp',  href: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}` },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:bg-[rgba(97,187,197,0.12)] hover:text-[#034665] hover:-translate-y-0.5"
                    style={{ border: '1.5px solid rgba(97,187,197,0.25)', background: '#fff', color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
                <button onClick={handleCopy} aria-label="Copy link"
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:bg-[rgba(97,187,197,0.12)] hover:-translate-y-0.5 cursor-pointer"
                  style={{ border: `1.5px solid ${copied ? 'rgba(16,185,129,0.4)' : 'rgba(97,187,197,0.25)'}`, background: copied ? 'rgba(16,185,129,0.08)' : '#fff', color: copied ? '#065f46' : '#64748b', fontSize: '0.9rem' }}>
                  <i className={`bi ${copied ? 'bi-check2' : 'bi-link-45deg'}`} />
                </button>
              </div>
              {copied && <span className="text-[0.76rem] text-[#065f46] font-semibold">Link copied!</span>}
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-[90px]"
            style={{ animation: body.on ? 'bld-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none' }}>

            {/* Author card */}
            <div className="bg-white rounded-[20px] p-5 overflow-hidden relative"
              style={{ border: '1.5px solid rgba(97,187,197,0.16)', boxShadow: '0 4px 20px rgba(3,70,101,0.06)' }}>
              <div className="absolute pointer-events-none" aria-hidden="true"
                style={{ top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(97,187,197,0.15) 0%,transparent 70%)' }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[1.2rem] text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                  <i className="bi bi-building" />
                </div>
                <div>
                  <p className="m-0 font-extrabold text-[0.9rem] text-[#0d3d5a]">Kevalon Technology</p>
                  <p className="m-0 text-[0.72rem] text-[#94a3b8]">IT Company · Gujarat, India</p>
                </div>
              </div>
              <p className="m-0 mb-4 text-[0.82rem] text-[#64748b] leading-[1.7]">
                Web, mobile, SEO &amp; digital growth solutions for startups and enterprises.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-1.5 text-white font-bold no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px text-[0.8rem]"
                style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)', padding: '8px 18px', borderRadius: 999 }}>
                Get In Touch <i className="bi bi-arrow-right" />
              </Link>
            </div>

            {/* Article info */}
            <div className="bg-white rounded-[20px] p-5"
              style={{ border: '1.5px solid rgba(97,187,197,0.16)', boxShadow: '0 4px 20px rgba(3,70,101,0.06)' }}>
              <p className="m-0 mb-3 text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-[#94a3b8]">Article Info</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: 'bi-tag-fill',    text: post.category  },
                  { icon: 'bi-calendar3',   text: post.date      },
                  { icon: 'bi-clock-fill',  text: post.readTime  },
                  { icon: 'bi-building',    text: 'Kevalon Technology' },
                ].map(({ icon, text }) => (
                  <div key={icon} className="flex items-center gap-2.5 text-[0.83rem] text-[#334155] font-[500]">
                    <i className={`bi ${icon} w-4 text-[#61BBC5] text-[0.85rem]`} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white rounded-[20px] p-5"
                style={{ border: '1.5px solid rgba(97,187,197,0.16)', boxShadow: '0 4px 20px rgba(3,70,101,0.06)' }}>
                <p className="m-0 mb-3 text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-[#94a3b8]">Related Articles</p>
                <div className="flex flex-col gap-1">
                  {related.map(r => (
                    <Link key={r.id} to={`/blog/${r.id}`}
                      className="group flex items-start gap-3 no-underline p-2.5 rounded-[12px] transition-all duration-200 hover:bg-[rgba(97,187,197,0.06)]"
                      style={{ border: '1px solid transparent' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(97,187,197,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[0.9rem] flex-shrink-0"
                        style={{ background: `${r.color}18`, color: r.color, border: `1.5px solid ${r.color}28` }}>
                        <i className={`bi ${r.icon}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="m-0 text-[0.8rem] font-semibold text-[#0d3d5a] leading-[1.4] line-clamp-2 transition-colors duration-200 group-hover:text-[#034665]"
                          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                          {r.title}
                        </p>
                        <p className="m-0 text-[0.7rem] text-[#94a3b8] mt-0.5">{r.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* ── More articles ── */}
        {others.length > 0 && (
          <div className="mt-14 sm:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white text-[0.8rem]"
                style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                <i className="bi bi-arrow-right-circle-fill" />
              </div>
              <h2 className="m-0 font-extrabold text-[#0d3d5a] text-[1.15rem] sm:text-[1.3rem]"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                More Articles
              </h2>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,rgba(97,187,197,0.3),transparent)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map(p => (
                <Link key={p.id} to={`/blog/${p.id}`}
                  className="group flex flex-col rounded-[18px] overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(3,70,101,0.12)]"
                  style={{ background: '#fff', border: '1.5px solid rgba(97,187,197,0.14)', boxShadow: '0 4px 16px rgba(3,70,101,0.05)' }}>
                  <div className="h-[100px] flex items-center justify-center relative overflow-hidden flex-shrink-0"
                    style={{ background: `linear-gradient(140deg,${p.color}90,#013852cc)` }}>
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '16px 16px' }} />
                    <div className="relative w-10 h-10 rounded-[12px] flex items-center justify-center text-white text-[1.1rem] transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                      <i className={`bi ${p.icon}`} />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <p className="m-0 text-[0.72rem] text-[#94a3b8]">{p.readTime}</p>
                    <p className="m-0 text-[0.85rem] font-extrabold text-[#0d3d5a] leading-[1.35] line-clamp-2 transition-colors duration-200 group-hover:text-[#034665]"
                      style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                      {p.title}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[0.76rem] font-bold text-[#034665] mt-1 transition-all duration-200 group-hover:gap-2">
                      Read <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bld-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
