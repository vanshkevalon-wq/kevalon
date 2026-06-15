import { useParams, Link } from 'react-router-dom';
import portfolioItems from '../data/portfolioData';

const CAT_STYLE = {
  Web:    { icon: 'bi-code-slash',  color: '#818cf8', bg: 'rgba(129,140,248,0.12)' },
  Mobile: { icon: 'bi-phone',       color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  Game:   { icon: 'bi-controller',  color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const item   = portfolioItems.find((p) => p.slug === slug);
  const others = portfolioItems.filter((p) => p.slug !== slug).slice(0, 3);

  if (!item) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-[18px] text-center py-10 px-5">
      <i className="bi bi-folder2-open text-[3.5rem] text-[#cbd5e1]" />
      <h2 className="text-[#0f172a] m-0 text-[1.6rem]">Case study not found</h2>
      <Link to="/portfolio"
        className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-3.5 text-[0.92rem] font-bold no-underline bg-gradient-to-br from-teal to-navy text-white shadow-[0_6px_20px_rgba(97,187,197,0.35)] transition-all duration-200 hover:-translate-y-[3px] hover:text-white">
        ← Back to Portfolio
      </Link>
    </div>
  );

  const cat = CAT_STYLE[item.category] || CAT_STYLE.Web;

  return (
    <div className="bg-white font-[Inter,'Nunito_Sans',sans-serif] text-[#0f172a]">

      {/* ══ HERO ══ */}
      <header className="relative min-h-screen flex items-end overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0 bg-cover bg-center scale-[1.08] transition-transform duration-[12s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-100"
          style={{ backgroundImage:`url(${item.image})` }} />
        {/* veil */}
        <div className="absolute inset-0"
          style={{ background:'linear-gradient(to top, rgba(2,6,18,1) 0%, rgba(2,6,18,0.88) 30%, rgba(2,6,18,0.5) 60%, rgba(2,6,18,0.15) 100%), linear-gradient(135deg, rgba(3,70,101,0.5) 0%, transparent 55%)' }} />

        {/* particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="absolute rounded-full bg-[rgba(97,187,197,0.6)] bottom-[-8px] animate-[csParticle_linear_infinite]"
              style={{
                left:`${i * 8.5}%`,
                width: `${2 + (i % 3) * 1.5}px`,
                height: `${2 + (i % 3) * 1.5}px`,
                animationDuration:`${8 + (i % 6) * 2}s`,
                animationDelay:`${(i % 8) * 0.8}s`,
              }} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1180px] mx-auto px-8 pt-12 pb-20 flex flex-col gap-[22px] max-md:px-5 max-md:pb-16">
          {/* category badge */}
          <span className="inline-flex items-center gap-[7px] px-4 py-[7px] rounded-full text-[0.72rem] font-extrabold tracking-[0.08em] uppercase w-fit border border-[rgba(255,255,255,0.12)] backdrop-blur-[10px]"
            style={{ color: cat.color, background: cat.bg }}>
            <i className={`bi ${cat.icon}`} /> {item.category}
          </span>

          <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-black text-white leading-[1.02] tracking-[-0.05em] m-0 max-w-[900px] max-md:text-[2.6rem]">
            {item.title}
          </h1>
          <p className="text-[1.1rem] text-[rgba(255,255,255,0.65)] leading-[1.82] max-w-[620px] m-0">{item.overview}</p>

          {/* meta strip */}
          <div className="flex flex-wrap gap-0 w-fit bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden backdrop-blur-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] max-md:flex-col max-md:w-full max-md:rounded-[14px]">
            {[
              { k: 'Client',   v: item.client   },
              { k: 'Duration', v: item.duration  },
              { k: 'Year',     v: item.year      },
              { k: 'Category', v: item.category  },
            ].filter(m => m.v).map((m, idx, arr) => (
              <div key={m.k}
                className={`px-[26px] py-3.5 border-r border-[rgba(255,255,255,0.08)] last:border-r-0 max-md:border-r-0 max-md:border-b max-md:last:border-b-0`}>
                <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.38)] mb-[5px]">{m.k}</span>
                <strong className="block text-[0.92rem] font-bold text-white">{m.v}</strong>
              </div>
            ))}
          </div>

          {/* scroll cue */}
          <div className="flex flex-col items-center gap-1 mt-2 w-fit" aria-hidden="true">
            <span className="block w-[2px] h-2 rounded-sm bg-[rgba(255,255,255,0.4)] animate-[scrollCue_1.4s_ease-in-out_infinite]" style={{ animationDelay:'0s' }} />
            <span className="block w-[2px] h-3 rounded-sm bg-[rgba(255,255,255,0.4)] animate-[scrollCue_1.4s_ease-in-out_infinite]" style={{ animationDelay:'0.15s' }} />
            <span className="block w-[2px] h-2 rounded-sm bg-[rgba(255,255,255,0.4)] animate-[scrollCue_1.4s_ease-in-out_infinite]" style={{ animationDelay:'0.3s' }} />
          </div>
        </div>
      </header>

      {/* ══ RESULTS ══ */}
      {item.results && (
        <section className="py-24 relative overflow-hidden" style={{ background:'radial-gradient(ellipse 80% 60% at 5% 50%, rgba(97,187,197,0.1) 0%, transparent 55%), linear-gradient(135deg, #020b16 0%, #031828 50%, #041f35 100%)' }}>
          <div className="max-w-[1180px] mx-auto px-8 max-md:px-5">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">Impact</p>
            <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-black text-white leading-[1.08] tracking-[-0.04em] m-0 mb-12">Numbers that matter</h2>
            <div className="grid grid-cols-4 gap-5 relative z-10 max-[1024px]:grid-cols-2 max-[480px]:grid-cols-2">
              {item.results.map((r, i) => (
                <div key={i}
                  className="bg-[rgba(255,255,255,0.04)] border border-[rgba(97,187,197,0.16)] rounded-[22px] px-6 py-9 text-center relative overflow-hidden transition-all duration-300 cursor-default hover:bg-[rgba(97,187,197,0.09)] hover:border-[rgba(97,187,197,0.38)] hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.35),0_0_0_1px_rgba(97,187,197,0.18)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(97,187,197,0.6)] before:to-transparent">
                  <span className="block text-[clamp(2.4rem,4.5vw,3.6rem)] font-black text-teal leading-none tracking-[-0.06em] mb-2.5 drop-shadow-[0_0_48px_rgba(97,187,197,0.4)]">{r.metric}</span>
                  <span className="block text-[0.82rem] font-semibold text-[rgba(255,255,255,0.55)] tracking-[0.03em]">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ PROBLEM / SOLUTION ══ */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-2 gap-7 max-md:grid-cols-1 max-md:px-5">
          {/* Problem */}
          <div className="rounded-[28px] px-10 py-11 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br from-[#fff5f5] to-white border border-[rgba(239,68,68,0.14)] shadow-[0_4px_28px_rgba(239,68,68,0.06)] hover:shadow-[0_20px_56px_rgba(239,68,68,0.12)] after:content-[''] after:absolute after:bottom-[-50px] after:right-[-50px] after:w-40 after:h-40 after:rounded-full after:pointer-events-none after:bg-[radial-gradient(circle,rgba(239,68,68,0.07),transparent_70%)]">
            <div className="w-14 h-14 rounded-[18px] bg-[rgba(239,68,68,0.1)] text-[#ef4444] flex items-center justify-center text-[1.5rem] mb-6">
              <i className="bi bi-exclamation-triangle-fill" />
            </div>
            <h3 className="text-[1.5rem] font-black text-[#0f172a] m-0 mb-4 tracking-[-0.03em]">The Challenge</h3>
            <p className="text-base text-[#475569] leading-[1.85] m-0">{item.problem}</p>
          </div>

          {/* Solution */}
          <div className="rounded-[28px] px-10 py-11 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br from-[#f0fdf9] to-white border border-[rgba(97,187,197,0.18)] shadow-[0_4px_28px_rgba(97,187,197,0.07)] hover:shadow-[0_20px_56px_rgba(97,187,197,0.14)] after:content-[''] after:absolute after:bottom-[-50px] after:right-[-50px] after:w-40 after:h-40 after:rounded-full after:pointer-events-none after:bg-[radial-gradient(circle,rgba(97,187,197,0.1),transparent_70%)]">
            <div className="w-14 h-14 rounded-[18px] bg-[rgba(97,187,197,0.14)] text-navy flex items-center justify-center text-[1.5rem] mb-6">
              <i className="bi bi-lightbulb-fill" />
            </div>
            <h3 className="text-[1.5rem] font-black text-[#0f172a] m-0 mb-4 tracking-[-0.03em]">Our Approach</h3>
            <p className="text-base text-[#475569] leading-[1.85] m-0">{item.solution}</p>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      {item.process && (
        <section className="bg-white py-24">
          <div className="max-w-[1180px] mx-auto px-8 max-md:px-5">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">How We Did It</p>
            <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-black text-[#0f172a] leading-[1.08] tracking-[-0.04em] m-0 mb-12">Our Process</h2>
            <div className="grid grid-cols-4 gap-0 relative max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1 before:max-[1024px]:hidden before:content-[''] before:absolute before:top-[38px] before:left-[calc(12.5%+26px)] before:right-[calc(12.5%+26px)] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-[rgba(3,70,101,0.3)] before:z-0">
              {item.process.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 relative z-10">
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-teal to-navy text-white text-[0.8rem] font-black flex items-center justify-center mb-5 flex-shrink-0 shadow-[0_8px_24px_rgba(97,187,197,0.4)] relative z-10 transition-all duration-200 hover:scale-110 hover:shadow-[0_12px_32px_rgba(97,187,197,0.55)]">
                    {p.step}
                  </div>
                  <div className="bg-[#f8fafc] border border-[rgba(3,70,101,0.07)] rounded-[18px] px-[18px] py-[22px] transition-all duration-[280ms] hover:bg-white hover:shadow-[0_12px_36px_rgba(3,70,101,0.1)] hover:-translate-y-1 hover:border-[rgba(97,187,197,0.25)]">
                    <h4 className="text-[0.95rem] font-extrabold text-[#0f172a] m-0 mb-2">{p.title}</h4>
                    <p className="text-[0.83rem] text-[#64748b] leading-[1.7] m-0">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ TECH + FEATURES ══ */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:px-5">
          <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-3xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(3,70,101,0.08)]">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">Stack</p>
            <h3 className="text-[1.25rem] font-extrabold text-[#0f172a] tracking-[-0.02em] m-0 mb-5">Tech Used</h3>
            <div className="flex flex-wrap gap-2.5">
              {item.tech.map(t => (
                <span key={t}
                  className="px-5 py-[9px] rounded-full bg-[rgba(97,187,197,0.07)] border border-[rgba(97,187,197,0.22)] text-navy text-[0.84rem] font-bold transition-all duration-200 cursor-default hover:bg-gradient-to-br hover:from-teal hover:to-navy hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(97,187,197,0.32)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-3xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(3,70,101,0.08)]">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">Delivered</p>
            <h3 className="text-[1.25rem] font-extrabold text-[#0f172a] tracking-[-0.02em] m-0 mb-5">Key Features</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {item.features.map(f => (
                <li key={f}
                  className="flex items-center gap-3 text-[0.93rem] text-[#1e293b] font-medium px-4 py-[13px] bg-[rgba(97,187,197,0.04)] border border-[rgba(97,187,197,0.1)] rounded-xl transition-all duration-200 hover:bg-[rgba(97,187,197,0.09)] hover:border-[rgba(97,187,197,0.22)] hover:translate-x-1">
                  <i className="bi bi-check2-circle text-teal text-[1.05rem] flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      {item.images?.length > 1 && (
        <section className="bg-white py-24">
          <div className="max-w-[1180px] mx-auto px-8 max-md:px-5">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">Visuals</p>
            <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-black text-[#0f172a] leading-[1.08] tracking-[-0.04em] m-0 mb-12">Project Gallery</h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {item.images.map((src, i) => (
                <div key={i} className="rounded-[22px] overflow-hidden relative shadow-[0_8px_32px_rgba(3,70,101,0.1)] transition-all duration-[400ms] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(3,70,101,0.18)]">
                  <img src={src} alt={`${item.title} ${i + 1}`} className="w-full h-[300px] object-cover block transition-transform duration-[600ms] hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CTA ══ */}
      <section className="py-24 relative overflow-hidden" style={{ background:'radial-gradient(ellipse 70% 80% at 0% 50%,rgba(97,187,197,0.2) 0%,transparent 55%), radial-gradient(ellipse 50% 60% at 100% 50%,rgba(3,70,101,0.4) 0%,transparent 55%), linear-gradient(135deg,#020c18 0%,#031a2e 50%,#041f38 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(97,187,197,0.12),transparent_70%)] pointer-events-none" aria-hidden="true" />
        <div className="max-w-[1180px] mx-auto px-8 relative z-10 flex items-center justify-between gap-10 flex-wrap max-md:px-5 max-md:flex-col max-md:text-center">
          <div>
            <h2 className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-black text-white m-0 mb-2.5 tracking-[-0.04em] leading-[1.1]">Ready to build something like this?</h2>
            <p className="text-[rgba(255,255,255,0.6)] m-0 text-[1.05rem]">Let's turn your idea into a product that scales globally.</p>
          </div>
          <div className="flex gap-3.5 flex-wrap flex-shrink-0 max-md:justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-3.5 text-[0.92rem] font-bold no-underline bg-white text-navy shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:text-navy">
              Start Your Project <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/portfolio"
              className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-3.5 text-[0.92rem] font-bold no-underline bg-[rgba(255,255,255,0.08)] border-[1.5px] border-[rgba(255,255,255,0.28)] text-white backdrop-blur-[8px] transition-all duration-200 hover:bg-[rgba(255,255,255,0.16)] hover:border-[rgba(255,255,255,0.5)] hover:-translate-y-[3px] hover:text-white">
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MORE PROJECTS ══ */}
      {others.length > 0 && (
        <section className="bg-[#f8fafc] py-24">
          <div className="max-w-[1180px] mx-auto px-8 max-md:px-5">
            <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-teal m-0 mb-3 before:content-[''] before:w-[22px] before:h-[2px] before:bg-gradient-to-r before:from-teal before:to-navy before:rounded-sm before:block">Explore</p>
            <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-black text-[#0f172a] leading-[1.08] tracking-[-0.04em] m-0 mb-12">More Projects</h2>
            <div className="grid grid-cols-3 gap-7 max-[1024px]:grid-cols-2 max-md:grid-cols-1">
              {others.map(o => {
                const oc = CAT_STYLE[o.category] || CAT_STYLE.Web;
                return (
                  <Link key={o.slug} to={`/case-study/${o.slug}`}
                    className="bg-white border border-[rgba(0,0,0,0.06)] rounded-3xl overflow-hidden no-underline text-inherit flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-[320ms] hover:-translate-y-2.5 hover:shadow-[0_28px_64px_rgba(3,70,101,0.14)] hover:border-[rgba(97,187,197,0.28)] hover:text-inherit group">
                    <div className="h-[220px] overflow-hidden relative">
                      <img src={o.image} alt={o.title} className="w-full h-full object-cover block transition-transform duration-[550ms] group-hover:scale-[1.08]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,20,35,0.75)] to-transparent flex items-end p-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-[7px] bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.3)] rounded-full px-4 py-2 text-[0.78rem] font-bold text-white backdrop-blur-[8px]">
                          View Case Study <i className="bi bi-arrow-right" />
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-[22px] flex-1 flex flex-col gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.12em]" style={{ color: oc.color }}>
                        <i className={`bi ${oc.icon}`} /> {o.category}
                      </span>
                      <h4 className="text-[1.05rem] font-extrabold text-[#0f172a] m-0 tracking-[-0.02em]">{o.title}</h4>
                      <p className="text-[0.84rem] text-[#64748b] leading-[1.65] m-0 flex-1">{o.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes csParticle {
          0%   { transform:translateY(0); opacity:0; }
          10%  { opacity:0.8; }
          90%  { opacity:0.2; }
          100% { transform:translateY(-100vh); opacity:0; }
        }
        @keyframes scrollCue { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}
