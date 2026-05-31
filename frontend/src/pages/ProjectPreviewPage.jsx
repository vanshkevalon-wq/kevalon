import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import portfolioItems from '../data/portfolioData';
import './ProjectPreviewPage.css';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProjectPreviewPage() {
  const { slug } = useParams();
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    return (
      <div className="container py-6">
        <h2>Preview not found</h2>
        <Link to="/portfolio" className="btn btn-outline">Back to portfolio</Link>
      </div>
    );
  }

  const slides = item.images && item.images.length ? item.images : [item.image];

  return (
    <div className="project-preview">
      <div className="project-preview__topbar">
        <div>
          <p className="project-preview__eyebrow">Live Preview</p>
          <h1>{item.title}</h1>
        </div>
        <Link to="/portfolio" className="project-preview__back">Back to portfolio</Link>
      </div>

      <div className="project-preview__hero">
        <div className="project-preview__hero-copy">
          <span className="project-preview__tag">{item.category}</span>
          <h2>Interactive website preview for {item.title}</h2>
          <p>{item.desc}</p>
          <div className="project-preview__chips">
            {item.tech.map((tech) => (
              <span key={tech} className="project-preview__chip">{tech}</span>
            ))}
          </div>
        </div>

        <div className="project-preview__slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 2400, disableOnInteraction: false }}
            loop={slides.length > 1}
            spaceBetween={12}
            slidesPerView={1}
          >
            {slides.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`${item.title} preview ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="project-preview__grid">
        <section className="project-preview__panel">
          <h3>What the live site shows</h3>
          <ul>
            {item.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="project-preview__panel project-preview__panel--accent">
          <h3>Quick overview</h3>
          <p>
            A polished, production-style preview separate from the case study, so you can view the project like a real website.
          </p>
          <Link to={`/case-study/${item.slug}`} className="project-preview__case-link">Open case study</Link>
        </section>
      </div>
    </div>
  );
}
