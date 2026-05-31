import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProjectModal({ item, onClose }) {
  if (!item) return null;

  const slides = item.images && item.images.length ? item.images : [item.image];

  return (
    <div className="project-modal__backdrop" onClick={onClose}>
      <div className="project-modal__card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="project-modal__back" onClick={onClose} aria-label="Back to portfolio">
          <i className="bi bi-arrow-left" /> Back
        </button>
        <button className="project-modal__close" onClick={onClose} aria-label="Close">×</button>

        <div className="project-modal__media">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            loop={slides.length > 1}
            spaceBetween={10}
            slidesPerView={1}
          >
            {slides.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`${item.title} ${i + 1}`} className="project-modal__img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="project-modal__body">
          <h3 className="project-modal__title">{item.title}</h3>
          <p className="project-modal__category">{item.category}</p>
          <p className="project-modal__desc">{item.desc}</p>

          <div className="project-modal__meta">
            <div>
              <h4>Key Features</h4>
              <ul>
                {item.features && item.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            </div>

            <div>
              <h4>Tech Stack</h4>
              <div className="project-modal__tech">
                {item.tech && item.tech.map((t, idx) => (
                  <span key={idx} className="project-modal__tech-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-modal__actions">
            <Link to={`/project-preview/${item.slug}`} onClick={onClose} className="btn btn-primary">Live Preview</Link>
            <Link to={`/case-study/${item.slug}`} onClick={onClose} className="btn btn-outline">View Case Study</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
