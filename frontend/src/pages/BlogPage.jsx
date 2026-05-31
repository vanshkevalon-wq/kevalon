import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { articles } from './blogData';
import './BlogPage.css';

const categories = ['All', 'Web Development', 'Mobile Apps', 'SEO', 'Digital Growth', 'UI/UX'];

export default function BlogPage() {
  const [search,      setSearch]   = useState('');
  const [activeCategory, setCategory] = useState('All');

  const featured = articles.filter((a) => a.featured);
  const all      = articles.filter((a) => !a.featured);

  const filtered = useMemo(() => {
    return all.filter((a) => {
      const matchCat    = activeCategory === 'All' || a.category === activeCategory;
      const q           = search.trim().toLowerCase();
      const matchSearch = !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory, all]);

  return (
    <div className="blog-page">

      {/* ── HERO ── */}
      <section className="blog-hero">
        <div className="blog-hero__orb blog-hero__orb--1" aria-hidden="true" />
        <div className="blog-hero__orb blog-hero__orb--2" aria-hidden="true" />
        <div className="blog-hero__dots"                  aria-hidden="true" />
        <div className="blog-hero__inner">
          <div className="blog-hero__badge">
            <span className="blog-hero__badge-dot" />
            Insights &amp; Ideas
          </div>
          <h1 className="blog-hero__title">
            Tech Insights &amp;<br />
            <span>Industry Trends</span>
          </h1>
          <p className="blog-hero__sub">
            Web Development · Mobile Apps · SEO · Digital Growth
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="blog-featured">
        <div className="blog-container">
          <div className="blog-section-head">
            <h2 className="blog-h2">Featured Articles</h2>
            <div className="blog-toolbar">
              <div className="blog-search">
                <i className="bi bi-search" />
                <input
                  type="search"
                  placeholder="Search articles…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="blog-cat-select"
                value={activeCategory}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="blog-featured__grid">
            {featured.map((post) => (
              <ArticleCard key={post.id} post={post} large />
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL ARTICLES ── */}
      <section className="blog-all">
        <div className="blog-container">
          <div className="blog-all__head">
            <h2 className="blog-h2">All Articles</h2>
            <div className="blog-cats">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`blog-cat-pill ${activeCategory === c ? 'blog-cat-pill--active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="blog-all__grid">
              {filtered.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <i className="bi bi-search" />
              <p>No articles found for &ldquo;<strong>{search}</strong>&rdquo;</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

function ArticleCard({ post, large = false }) {
  return (
    <div className={`blog-card ${large ? 'blog-card--large' : ''}`}>
      <div className="blog-card__img" style={{ '--card-color': post.color }}>
        <div className="blog-card__img-inner">
          <i className={`bi ${post.icon}`} />
        </div>
        <span className="blog-card__cat">{post.category}</span>
      </div>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span><i className="bi bi-calendar3" /> {post.date}</span>
          <span><i className="bi bi-clock" /> {post.readTime}</span>
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__footer">
          <Link to={`/blog/${post.id}`} className="blog-card__read">
            Read More <i className="bi bi-arrow-right" />
          </Link>
          <div className="blog-card__actions">
            <button aria-label="Like"  className="blog-card__action"><i className="bi bi-heart" /></button>
            <button aria-label="Share" className="blog-card__action"><i className="bi bi-share" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
