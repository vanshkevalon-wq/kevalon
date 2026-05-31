import React from 'react';
import { useParams, Link } from 'react-router-dom';
import portfolioItems from '../data/portfolioData';
import './CaseStudyPage.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    return (
      <div className="container py-6">
        <h2>Case study not found</h2>
        <Link to="/portfolio">Back to portfolio</Link>
      </div>
    );
  }

  return (
    <div className="case-study container py-6">
      <div className="case-study__topbar mb-4">
        <Link to="/portfolio" className="case-study__back">
          <i className="bi bi-arrow-left" /> Back to portfolio
        </Link>
      </div>

      <div className="case-hero mb-4">
        <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: 12 }} />
      </div>

      <div className="case-body">
        <h1 className="mb-2">{item.title}</h1>
        <p className="text-muted">{item.category}</p>
        <p className="lead">{item.desc}</p>

        <h4>Problem</h4>
        <p>Client needed a scalable solution to handle traffic and conversions.</p>

        <h4>Solution</h4>
        <p>We built a modular architecture powered by modern frontend frameworks and a Node.js backend.</p>

        <h4>Tech Stack</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {item.tech.map((t) => (
            <span key={t} style={{ padding: '6px 10px', background: '#f1f8fa', borderRadius: 8 }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/portfolio" className="btn btn-outline">Back to portfolio</Link>
        </div>
      </div>
    </div>
  );
}
