import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from './blogData';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const post     = articles.find((a) => a.id === Number(id));

  /* related = same category, excluding current */
  const related = articles
    .filter((a) => a.id !== Number(id) && a.category === post?.category)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="bdet-notfound">
        <i className="bi bi-file-earmark-x" />
        <h2>Article not found</h2>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bdet-page">

      {/* ── HERO ── */}
      <section className="bdet-hero" style={{ '--hero-color': post.color }}>
        <div className="bdet-hero__orb bdet-hero__orb--1" aria-hidden="true" />
        <div className="bdet-hero__orb bdet-hero__orb--2" aria-hidden="true" />
        <div className="bdet-hero__dots"                  aria-hidden="true" />

        <div className="bdet-hero__inner">
          {/* back + breadcrumb */}
          <div className="bdet-hero__nav">
            <button className="bdet-back" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left" /> Back
            </button>
            <div className="bdet-breadcrumb">
              <Link to="/">Home</Link>
              <i className="bi bi-chevron-right" />
              <Link to="/blog">Blog</Link>
              <i className="bi bi-chevron-right" />
              <span>{post.category}</span>
            </div>
          </div>

          <div className="bdet-hero__cat">
            <i className={`bi ${post.icon}`} />
            {post.category}
          </div>

          <h1 className="bdet-hero__title">{post.title}</h1>

          <div className="bdet-hero__meta">
            <span><i className="bi bi-calendar3" /> {post.date}</span>
            <span><i className="bi bi-clock" /> {post.readTime}</span>
            <span><i className="bi bi-building" /> Kevalon Technology</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ── */}
      <div className="bdet-layout">
        <div className="bdet-container">
          <div className="bdet-grid">

            {/* ── MAIN CONTENT ── */}
            <article className="bdet-article">
              {post.content.map((block, i) => {
                if (block.type === 'intro') {
                  return (
                    <p key={i} className="bdet-intro">{block.text}</p>
                  );
                }
                if (block.type === 'subheading') {
                  return (
                    <p key={i} className="bdet-subheading">{block.text}</p>
                  );
                }
                if (block.type === 'section') {
                  return (
                    <div key={i} className="bdet-section">
                      <h2 className="bdet-section__heading">{block.heading}</h2>
                      {block.body && <p className="bdet-section__body">{block.body}</p>}
                      {block.bullets && (
                        <ul className="bdet-bullets">
                          {block.bullets.map((b) => (
                            <li key={b}>
                              <span className="bdet-bullet-dot" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                      {block.note && (
                        <p className="bdet-note">{block.note}</p>
                      )}
                    </div>
                  );
                }
                if (block.type === 'cta') {
                  return (
                    <div key={i} className="bdet-cta-block">
                      <h3 className="bdet-cta-block__heading">{block.heading}</h3>
                      <p className="bdet-cta-block__body">{block.body}</p>
                      <a
                        href={block.link}
                        target="_blank"
                        rel="noreferrer"
                        className="bdet-cta-block__btn"
                      >
                        Visit Kevalon Technology <i className="bi bi-arrow-up-right" />
                      </a>
                    </div>
                  );
                }
                return null;
              })}

              {/* share row */}
              <div className="bdet-share">
                <span>Share this article:</span>
                <div className="bdet-share__btns">
                  {[
                    { icon: 'bi-linkedin',   label: 'LinkedIn'  },
                    { icon: 'bi-twitter-x',  label: 'Twitter'   },
                    { icon: 'bi-whatsapp',   label: 'WhatsApp'  },
                    { icon: 'bi-link-45deg', label: 'Copy link' },
                  ].map((s) => (
                    <button key={s.label} className="bdet-share__btn" aria-label={s.label}>
                      <i className={`bi ${s.icon}`} />
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="bdet-sidebar">

              {/* author card */}
              <div className="bdet-sidebar-card">
                <div className="bdet-author">
                  <div className="bdet-author__avatar">
                    <i className="bi bi-building" />
                  </div>
                  <div>
                    <p className="bdet-author__name">Kevalon Technology</p>
                    <p className="bdet-author__role">IT Company · India</p>
                  </div>
                </div>
                <p className="bdet-author__bio">
                  Leading IT company delivering web, mobile, SEO, and digital growth solutions
                  for startups and enterprises across India.
                </p>
                <Link to="/contact" className="bdet-sidebar-card__cta">
                  Get In Touch <i className="bi bi-arrow-right" />
                </Link>
              </div>

              {/* article info */}
              <div className="bdet-sidebar-card">
                <p className="bdet-sidebar-card__label">Article Info</p>
                <div className="bdet-info-list">
                  <div className="bdet-info-item">
                    <i className="bi bi-tag" />
                    <span>{post.category}</span>
                  </div>
                  <div className="bdet-info-item">
                    <i className="bi bi-calendar3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="bdet-info-item">
                    <i className="bi bi-clock" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* related articles */}
              {related.length > 0 && (
                <div className="bdet-sidebar-card">
                  <p className="bdet-sidebar-card__label">Related Articles</p>
                  <div className="bdet-related">
                    {related.map((r) => (
                      <Link key={r.id} to={`/blog/${r.id}`} className="bdet-related-item">
                        <div className="bdet-related-item__icon" style={{ '--rc': r.color }}>
                          <i className={`bi ${r.icon}`} />
                        </div>
                        <div>
                          <p className="bdet-related-item__title">{r.title}</p>
                          <p className="bdet-related-item__meta">{r.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </div>

    </div>
  );
}
