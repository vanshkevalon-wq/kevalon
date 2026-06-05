import { useParams, Link } from 'react-router-dom';
import portfolioItems from '../data/portfolioData';
import './CaseStudyPage.css';

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
    <div className="cs-404">
      <i className="bi bi-folder2-open" />
      <h2>Case study not found</h2>
      <Link to="/portfolio" className="cs-pill-btn">← Back to Portfolio</Link>
    </div>
  );

  const cat = CAT_STYLE[item.category] || CAT_STYLE.Web;

  return (
    <>
      <div className="cs">

      {/* ══ HERO ══ */}
      <header className="cs-hero">
        <div className="cs-hero__img" style={{ backgroundImage:`url(${item.image})` }} />
        <div className="cs-hero__veil" />

        {/* floating particles */}
        <div className="cs-hero__particles" aria-hidden="true">
          {[...Array(12)].map((_,i)=><span key={i} className="cs-particle" style={{'--i':i}}/>)}
        </div>

        <div className="cs-hero__body">
          {/* category badge */}
          <span className="cs-cat-badge" style={{color:cat.color,background:cat.bg}}>
            <i className={`bi ${cat.icon}`}/> {item.category}
          </span>

          <h1 className="cs-hero__title">{item.title}</h1>
          <p className="cs-hero__lead">{item.overview}</p>

          {/* meta strip */}
          <div className="cs-hero__strip">
            {[
              {k:'Client',   v:item.client},
              {k:'Duration', v:item.duration},
              {k:'Year',     v:item.year},
              {k:'Category', v:item.category},
            ].filter(m=>m.v).map(m=>(
              <div key={m.k} className="cs-strip-item">
                <span>{m.k}</span>
                <strong>{m.v}</strong>
              </div>
            ))}
          </div>

          {/* scroll cue */}
          <div className="cs-scroll-cue" aria-hidden="true">
            <span/><span/><span/>
          </div>
        </div>
      </header>

      {/* ══ RESULTS ══ */}
      {item.results && (
        <section className="cs-results">
          <div className="cs-wrap">
            <p className="cs-eyebrow">Impact</p>
            <h2 className="cs-h2">Numbers that matter</h2>
            <div className="cs-results__grid">
              {item.results.map((r,i)=>(
                <div key={i} className="cs-stat">
                  <span className="cs-stat__num">{r.metric}</span>
                  <span className="cs-stat__lbl">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ PROBLEM / SOLUTION ══ */}
      <section className="cs-ps">
        <div className="cs-wrap cs-ps__grid">
          <div className="cs-ps__card cs-ps__card--p">
            <div className="cs-ps__badge cs-ps__badge--p">
              <i className="bi bi-exclamation-triangle-fill"/>
            </div>
            <h3>The Challenge</h3>
            <p>{item.problem}</p>
          </div>
          <div className="cs-ps__card cs-ps__card--s">
            <div className="cs-ps__badge cs-ps__badge--s">
              <i className="bi bi-lightbulb-fill"/>
            </div>
            <h3>Our Approach</h3>
            <p>{item.solution}</p>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      {item.process && (
        <section className="cs-process">
          <div className="cs-wrap">
            <p className="cs-eyebrow">How We Did It</p>
            <h2 className="cs-h2">Our Process</h2>
            <div className="cs-process__track">
              {item.process.map((p,i)=>(
                <div key={i} className="cs-step">
                  <div className="cs-step__num">{p.step}</div>
                  <div className="cs-step__line" aria-hidden="true"/>
                  <div className="cs-step__card">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ TECH + FEATURES ══ */}
      <section className="cs-tf">
        <div className="cs-wrap cs-tf__grid">
          <div className="cs-tf__block">
            <p className="cs-eyebrow">Stack</p>
            <h3 className="cs-h3">Tech Used</h3>
            <div className="cs-chips">
              {item.tech.map(t=>(
                <span key={t} className="cs-chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="cs-tf__block">
            <p className="cs-eyebrow">Delivered</p>
            <h3 className="cs-h3">Key Features</h3>
            <ul className="cs-feat">
              {item.features.map(f=>(
                <li key={f}><i className="bi bi-check2-circle"/>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      {item.images?.length > 1 && (
        <section className="cs-gallery">
          <div className="cs-wrap">
            <p className="cs-eyebrow">Visuals</p>
            <h2 className="cs-h2">Project Gallery</h2>
            <div className="cs-gallery__grid">
              {item.images.map((src,i)=>(
                <div key={i} className="cs-gallery__item">
                  <img src={src} alt={`${item.title} ${i+1}`}/>
                  <div className="cs-gallery__shine"/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CTA ══ */}
      <section className="cs-cta">
        <div className="cs-cta__glow" aria-hidden="true"/>
        <div className="cs-wrap cs-cta__inner">
          <div className="cs-cta__text">
            <h2>Ready to build something like this?</h2>
            <p>Let's turn your idea into a product that scales globally.</p>
          </div>
          <div className="cs-cta__btns">
            <Link to="/contact" className="cs-pill-btn cs-pill-btn--solid">
              Start Your Project <i className="bi bi-arrow-right"/>
            </Link>
            <Link to="/portfolio" className="cs-pill-btn cs-pill-btn--outline">
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MORE PROJECTS ══ */}
      {others.length > 0 && (
        <section className="cs-more">
          <div className="cs-wrap">
            <p className="cs-eyebrow">Explore</p>
            <h2 className="cs-h2">More Projects</h2>
            <div className="cs-more__grid">
              {others.map(o=>{
                const oc = CAT_STYLE[o.category] || CAT_STYLE.Web;
                return (
                  <Link key={o.slug} to={`/case-study/${o.slug}`} className="cs-card">
                    <div className="cs-card__img">
                      <img src={o.image} alt={o.title}/>
                      <div className="cs-card__overlay">
                        <span className="cs-card__cta">View Case Study <i className="bi bi-arrow-right"/></span>
                      </div>
                    </div>
                    <div className="cs-card__body">
                      <span className="cs-card__cat" style={{color:oc.color}}>
                        <i className={`bi ${oc.icon}`}/> {o.category}
                      </span>
                      <h4>{o.title}</h4>
                      <p>{o.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
    </>
  );
}
