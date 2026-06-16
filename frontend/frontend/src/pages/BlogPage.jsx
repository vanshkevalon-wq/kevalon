import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articles } from './blogData';

const CATS = ['All', 'Web Development', 'Mobile Apps', 'SEO', 'Digital Growth', 'UI/UX'];

const CAT_COLORS = {
  'Web Development': { bg: 'rgba(97,187,197,0.12)', text: '#034665',  border: 'rgba(97,187,197,0.35)' },
  'Mobile Apps':     { bg: 'rgba(3,70,101,0.10)',   text: '#034665',  border: 'rgba(3,70,101,0.28)'   },
  'SEO':             { bg: 'rgba(10,143,182,0.10)',  text: '#0a6e8a',  border: 'rgba(10,143,182,0.30)' },
  'Digital Growth':  { bg: 'rgba(249,115,22,0.10)',  text: '#c2410c',  border: 'rgba(249,115,22,0.30)' },
  'UI/UX':           { bg: 'rgba(139,92,246,0.10)',  text: '#6d28d9',  border: 'rgba(139,92,246,0.28)' },
};

/* ── Scroll-reveal ── */
function useReveal(threshold = 0.08) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── Category badge ── */
function CatBadge({ category }) {
  const c = CAT_COLORS[category] || CAT_COLORS['Web Development'];
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold tracking-[0.08em] uppercase px-2.5 py-[3px] rounded-full"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {category}
    </span>
  );
}

/* ── FEATURED (hero) card — large horizontal layout ── */
function FeaturedCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="group relative flex flex-col sm:flex-row rounded-[24px] overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_rgba(3,70,101,0.14)]"
      style={{ background: '#fff', border: '1.5px solid rgba(97,187,197,0.18)', boxShadow: '0 8px 32px rgba(3,70,101,0.07)' }}>

      {/* image panel */}
      <div className="relative sm:w-[46%] flex-shrink-0 min-h-[200px] sm:min-h-[280px] overflow-hidden"
        style={{ background: `linear-gradient(140deg, ${post.color}cc 0%, #013852 100%)` }}>
        {/* dot grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        {/* icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-[20px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <i className={`bi ${post.icon} text-[2.4rem] text-white`} />
          </div>
        </div>
        {/* featured label */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 text-white text-[0.65rem] font-extrabold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <i className="bi bi-bookmark-star-fill text-yellow-300" /> Featured
          </span>
        </div>
        {/* gradient fade to body on desktop */}
        <div className="absolute inset-y-0 right-0 w-12 hidden sm:block" style={{ background: 'linear-gradient(to right, transparent, #fff)' }} />
      </div>

      {/* body */}
      <div className="flex flex-col gap-3 p-6 sm:p-8 flex-1 justify-center">
        <CatBadge category={post.category} />
        <h2 className="m-0 leading-[1.3] font-extrabold text-[#0d3d5a] transition-colors duration-200 group-hover:text-[#034665]"
          style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(1.1rem,2vw,1.45rem)' }}>
          {post.title}
        </h2>
        <p className="text-[0.88rem] text-[#5a7a8a] leading-[1.8] m-0 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-2 pt-4" style={{ borderTop: '1px solid rgba(97,187,197,0.12)' }}>
          <div className="flex gap-4 text-[0.75rem] text-[#94a3b8] font-medium">
            <span><i className="bi bi-calendar3 mr-1" style={{ color: '#61BBC5' }} />{post.date}</span>
            <span><i className="bi bi-clock mr-1" style={{ color: '#61BBC5' }} />{post.readTime}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[0.8rem] font-bold text-[#034665] transition-all duration-200 group-hover:gap-2">
            Read <i className="bi bi-arrow-right" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── STANDARD card ── */
function ArticleCard({ post, delay = 0 }) {
  return (
    <Link to={`/blog/${post.id}`}
      className="group relative flex flex-col rounded-[20px] overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(3,70,101,0.13)]"
      style={{ background: '#fff', border: '1.5px solid rgba(97,187,197,0.15)', boxShadow: '0 4px 18px rgba(3,70,101,0.06)', animationDelay: `${delay}s` }}>

      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${post.color}, #034665)` }} />

      {/* thumb */}
      <div className="relative h-[150px] flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: `linear-gradient(140deg, ${post.color}90 0%, #013852cc 100%)` }}>
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="relative z-10 w-14 h-14 rounded-[14px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)' }}>
          <i className={`bi ${post.icon} text-[1.6rem] text-white`} />
        </div>
        <div className="absolute top-3 left-3 z-10">
          <CatBadge category={post.category} />
        </div>
      </div>

      {/* body */}
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <div className="flex gap-3 text-[0.72rem] text-[#94a3b8] font-medium">
          <span><i className="bi bi-calendar3 mr-1" />{post.date}</span>
          <span><i className="bi bi-clock mr-1" />{post.readTime}</span>
        </div>
        <h3 className="m-0 text-[0.98rem] font-extrabold text-[#0d3d5a] leading-[1.4] transition-colors duration-200 group-hover:text-[#034665]"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          {post.title}
        </h3>
        <p className="text-[0.82rem] text-[#64748b] leading-[1.75] m-0 line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid rgba(97,187,197,0.10)' }}>
          <span className="inline-flex items-center gap-1 text-[0.78rem] font-bold text-[#034665] transition-all duration-200 group-hover:gap-2">
            Read More <i className="bi bi-arrow-right" />
          </span>
          <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[#61BBC5] transition-all duration-200 group-hover:bg-[rgba(97,187,197,0.12)]"
            style={{ border: '1px solid rgba(97,187,197,0.2)' }}>
            <i className="bi bi-bookmark text-[0.75rem]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── MINI card for sidebar / list ── */
function MiniCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`}
      className="group flex items-start gap-3.5 no-underline p-3 rounded-[14px] transition-all duration-200 hover:bg-[rgba(97,187,197,0.06)]"
      style={{ border: '1px solid transparent' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(97,187,197,0.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
      <div className="w-11 h-11 rounded-[12px] flex-shrink-0 flex items-center justify-center text-[1.1rem]"
        style={{ background: `${post.color}18`, color: post.color, border: `1.5px solid ${post.color}30` }}>
        <i className={`bi ${post.icon}`} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-[0.82rem] font-semibold text-[#0d3d5a] m-0 leading-[1.35] line-clamp-2 transition-colors duration-200 group-hover:text-[#034665]"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          {post.title}
        </p>
        <span className="text-[0.7rem] text-[#94a3b8]">{post.readTime}</span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────── */
export default function BlogPage() {
  const [search,   setSearch]   = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const hero  = useReveal(0.05);
  const main  = useReveal(0.06);

  const featuredPosts = articles.filter(a => a.featured);
  const latestPosts   = articles.filter(a => !a.featured).slice(0, 6);
  const popularPosts  = [...articles].sort((a, b) => b.id - a.id).slice(0, 4);

  const isFiltering = search.trim() !== '' || activeCat !== 'All';

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchCat    = activeCat === 'All' || a.category === activeCat;
      const q           = search.trim().toLowerCase();
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  return (
    <div className="bg-[#f8fafc] overflow-x-hidden" style={{ fontFamily: "Inter,'Nunito Sans',sans-serif", color: '#0f172a' }}>

      {/* ══ HERO ══ */}
      <section className="relative bg-white overflow-hidden pt-[100px] sm:pt-[120px] pb-14 sm:pb-16 px-4 sm:px-8 md:px-12">
        {/* bg blobs */}
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ top: -100, left: -140, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(97,187,197,0.12) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ bottom: -80, right: -120, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle,rgba(3,70,101,0.09) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle,#61BBC5 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

        <div ref={hero.ref}
          className={`relative z-10 max-w-[900px] mx-auto text-center transition-opacity duration-300 ${hero.on ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: hero.on ? 'bl-up 0.8s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>

          {/* eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full mb-5 text-[0.72rem] font-extrabold tracking-[0.14em] uppercase text-[#034665]"
            style={{ background: 'rgba(97,187,197,0.09)', border: '1.5px solid rgba(97,187,197,0.28)', padding: '6px 18px' }}>
            <span className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0" style={{ animation: 'bl-dot 2.2s ease-in-out infinite' }} />
            Tech Blog &amp; Insights
          </span>

          <h1 className="m-0 mb-4 font-extrabold text-[#0d3d5a] tracking-[-0.03em] leading-[1.12]"
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(2rem,4.5vw,3.4rem)' }}>
            Ideas, Guides &amp;{' '}
            <span style={{ background: 'linear-gradient(130deg,#61BBC5 0%,#0a8fb6 40%,#034665 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Industry Trends
            </span>
          </h1>
          <p className="text-[#5a7a8a] leading-[1.8] m-0 mb-8 max-w-[520px] mx-auto text-[0.97rem] sm:text-[1.05rem]">
            Deep dives on web development, mobile apps, SEO, and digital growth from the Kevalon team.
          </p>

          {/* search + filter row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            <div className="relative w-full sm:w-auto">
              <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[0.85rem] pointer-events-none" />
              <input
                type="search"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="outline-none transition-all duration-200 w-full sm:w-[260px]"
                style={{ paddingLeft: 38, paddingRight: 16, paddingTop: 11, paddingBottom: 11, border: '1.5px solid rgba(97,187,197,0.28)', borderRadius: 999, background: '#f8fafc', fontSize: '0.88rem', color: '#0f172a', fontFamily: 'inherit' }}
                onFocus={e => { e.target.style.borderColor = '#61BBC5'; e.target.style.boxShadow = '0 0 0 3px rgba(97,187,197,0.12)'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(97,187,197,0.28)'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {CATS.map(c => (
                <button key={c} onClick={() => setActiveCat(c)}
                  className="rounded-full text-[0.78rem] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap"
                  style={{
                    padding: '8px 16px',
                    background: activeCat === c ? 'linear-gradient(138deg,#61BBC5,#034665)' : '#fff',
                    border: `1.5px solid ${activeCat === c ? 'transparent' : 'rgba(97,187,197,0.25)'}`,
                    color: activeCat === c ? '#fff' : '#475569',
                    boxShadow: activeCat === c ? '0 4px 14px rgba(1,72,103,0.22)' : 'none',
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══ */}
      <div ref={main.ref}
        className={`max-w-[1260px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 transition-opacity duration-300 ${main.on ? 'opacity-100' : 'opacity-0'}`}>

        {/* ── FILTER MODE — show flat grid ── */}
        {isFiltering ? (
          <div style={{ animation: main.on ? 'bl-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="m-0 font-extrabold text-[#0d3d5a]"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>
                  <span style={{ background: 'linear-gradient(135deg,#61BBC5,#034665)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{filtered.length}</span>
                  {' '}Article{filtered.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="m-0 text-[0.85rem] text-[#94a3b8] mt-1">
                  {activeCat !== 'All' && `in "${activeCat}"`} {search && `matching "${search}"`}
                </p>
              </div>
              <button onClick={() => { setSearch(''); setActiveCat('All'); }}
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[rgba(97,187,197,0.10)]"
                style={{ padding: '8px 18px', border: '1.5px solid rgba(97,187,197,0.30)', borderRadius: 999, background: '#fff', color: '#034665' }}>
                <i className="bi bi-x-circle" /> Clear filters
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((post, i) => <ArticleCard key={post.id} post={post} delay={i * 0.06} />)}
              </div>
            ) : (
              <div className="text-center py-20 px-4 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-[2rem] text-[#61BBC5]"
                  style={{ background: 'rgba(97,187,197,0.08)', border: '1.5px solid rgba(97,187,197,0.20)' }}>
                  <i className="bi bi-search" />
                </div>
                <p className="text-[1rem] text-[#64748b] m-0">No articles found. Try a different keyword.</p>
                <button onClick={() => { setSearch(''); setActiveCat('All'); }}
                  className="rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[rgba(97,187,197,0.08)]"
                  style={{ padding: '9px 24px', border: '1.5px solid rgba(97,187,197,0.35)', background: '#fff', color: '#034665' }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

        ) : (
          /* ── DEFAULT MODE — editorial layout ── */
          <div className="flex flex-col gap-14 sm:gap-16" style={{ animation: main.on ? 'bl-up 0.7s cubic-bezier(0.22,1,0.36,1) both' : 'none' }}>

            {/* ── Featured section ── */}
            {featuredPosts.length > 0 && (
              <div>
                <SectionLabel icon="bi-bookmark-star-fill" text="Featured" />
                <div className="flex flex-col gap-5 mt-5">
                  {featuredPosts.map(p => <FeaturedCard key={p.id} post={p} />)}
                </div>
              </div>
            )}

            {/* ── Main 2-col layout: Latest + Sidebar ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

              {/* Latest articles */}
              <div>
                <SectionLabel icon="bi-clock-history" text="Latest Articles" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                  {latestPosts.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.06} />)}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6 lg:sticky lg:top-[90px]">

                {/* Popular */}
                <div className="bg-white rounded-[20px] p-5 sm:p-6"
                  style={{ border: '1.5px solid rgba(97,187,197,0.16)', boxShadow: '0 4px 20px rgba(3,70,101,0.06)' }}>
                  <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(97,187,197,0.12)' }}>
                    <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[0.75rem]"
                      style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                      <i className="bi bi-fire" />
                    </div>
                    <span className="text-[0.72rem] font-extrabold tracking-[0.1em] uppercase text-[#034665]">Popular Posts</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {popularPosts.map(p => <MiniCard key={p.id} post={p} />)}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-[20px] p-5 sm:p-6"
                  style={{ border: '1.5px solid rgba(97,187,197,0.16)', boxShadow: '0 4px 20px rgba(3,70,101,0.06)' }}>
                  <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(97,187,197,0.12)' }}>
                    <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[0.75rem]"
                      style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
                      <i className="bi bi-grid-1x2-fill" />
                    </div>
                    <span className="text-[0.72rem] font-extrabold tracking-[0.1em] uppercase text-[#034665]">Categories</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {CATS.filter(c => c !== 'All').map(c => {
                      const count = articles.filter(a => a.category === c).length;
                      return (
                        <button key={c} onClick={() => setActiveCat(c)}
                          className="flex items-center justify-between px-3 py-2 rounded-[10px] cursor-pointer transition-all duration-150 text-left"
                          style={{ background: activeCat === c ? 'rgba(97,187,197,0.10)' : 'transparent', border: `1px solid ${activeCat === c ? 'rgba(97,187,197,0.30)' : 'transparent'}` }}>
                          <span className="text-[0.83rem] font-medium text-[#334155]">{c}</span>
                          <span className="text-[0.72rem] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(97,187,197,0.10)', color: '#034665' }}>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-[20px] p-5 sm:p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(140deg,#011e2e,#014867)', border: '1px solid rgba(97,187,197,0.2)' }}>
                  <div className="absolute pointer-events-none" aria-hidden="true"
                    style={{ top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(97,187,197,0.3) 0%,transparent 70%)' }} />
                  <p className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase text-[rgba(200,232,240,0.6)] m-0 mb-2">Start a Project</p>
                  <h3 className="text-white font-extrabold leading-[1.3] m-0 mb-2.5 text-[1rem]"
                    style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                    Have a digital project in mind?
                  </h3>
                  <p className="text-[rgba(200,232,240,0.75)] text-[0.8rem] leading-[1.7] m-0 mb-4">
                    From web apps to SEO — Kevalon Technology delivers results.
                  </p>
                  <Link to="/contact"
                    className="inline-flex items-center gap-1.5 bg-white font-bold no-underline text-[0.8rem] transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                    style={{ color: '#034665', padding: '9px 20px', borderRadius: 999, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                    Get In Touch <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </aside>
            </div>

            {/* ── All articles (full-width grid) ── */}
            <div>
              <SectionLabel icon="bi-journals" text="All Articles" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {articles.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.05} />)}
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes bl-up  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bl-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(1.8)} }
      `}</style>
    </div>
  );
}

/* ── shared section label ── */
function SectionLabel({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white text-[0.8rem]"
        style={{ background: 'linear-gradient(138deg,#61BBC5,#034665)' }}>
        <i className={`bi ${icon}`} />
      </div>
      <h2 className="m-0 font-extrabold text-[#0d3d5a] text-[1.15rem] sm:text-[1.3rem]"
        style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
        {text}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(97,187,197,0.3), transparent)' }} />
    </div>
  );
}
