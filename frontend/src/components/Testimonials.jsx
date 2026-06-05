import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Testimonials.css';
import TestimonialImg1 from '../Images/bc05e3d81d431660394a35aab11c47fe399ea367.jpg';
import TestimonialImg2 from '../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg';

const REVIEWS = [
  {
    id: 1,
    name: 'Sara Williams',
    role: 'CEO, TechVentures',
    tag: 'Web Development',
    tagIcon: 'bi-code-slash',
    rating: 5,
    text: 'Kevalon transformed our entire digital presence. They delivered a world-class web application on time and exceeded every single expectation we set. Truly a partner, not just a vendor.',
    image: TestimonialImg1,
    metric: { value: '3×', label: 'Faster Load Time' },
    color: '#61BBC5',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, RetailPro',
    tag: 'E-Commerce',
    tagIcon: 'bi-cart3',
    rating: 5,
    text: 'The e-commerce platform they built cut our transaction costs by 30% and tripled our conversion rate. The attention to detail in both design and performance is simply unmatched.',
    image: TestimonialImg2,
    metric: { value: '30%', label: 'Cost Reduction' },
    color: '#0a8fb6',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'CTO, FinEdge',
    tag: 'Mobile App',
    tagIcon: 'bi-phone',
    rating: 5,
    text: 'Our mobile banking app hit a 4.8-star rating thanks to the exceptional work Kevalon delivered. Security, speed, and UX — they nailed all three without compromise.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    metric: { value: '4.8★', label: 'App Store Rating' },
    color: '#034665',
  },
  {
    id: 4,
    name: 'Arjun Mehta',
    role: 'Director, SkyERP',
    tag: 'ERP System',
    tagIcon: 'bi-kanban',
    rating: 5,
    text: 'Our ERP rollout was seamless. Kevalon mapped our workflows precisely, delivered on every milestone, and trained our team thoroughly. The system runs like clockwork.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    metric: { value: '60%', label: 'Ops Efficiency' },
    color: '#61BBC5',
  },
];

function Stars({ count }) {
  return (
    <div className="tmr-stars">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`bi bi-star${i <= count ? '-fill' : ''}`} />
      ))}
    </div>
  );
}

function TestimonialCard({ r }) {
  return (
    <div className="tmr-card" style={{ '--accent': r.color }}>
      {/* top bar on hover */}
      <div className="tmr-card__topbar" />

      {/* quote icon */}
      <div className="tmr-card__quote-icon" aria-hidden="true">
        <i className="bi bi-quote" />
      </div>

      {/* review text */}
      <p className="tmr-card__text">"{r.text}"</p>

      {/* metric chip */}
      <div className="tmr-card__metric" style={{ '--accent': r.color }}>
        <span className="tmr-card__metric-val">{r.metric.value}</span>
        <span className="tmr-card__metric-lbl">{r.metric.label}</span>
      </div>

      {/* divider */}
      <div className="tmr-card__divider" />

      {/* author row */}
      <div className="tmr-card__foot">
        <div className="tmr-card__avatar-wrap">
          <img src={r.image} alt={r.name} className="tmr-card__avatar" />
          <span className="tmr-card__avatar-ring" style={{ '--accent': r.color }} />
        </div>
        <div className="tmr-card__author">
          <span className="tmr-card__name">{r.name}</span>
          <span className="tmr-card__role">{r.role}</span>
          <Stars count={r.rating} />
        </div>
        <span className="tmr-card__tag" style={{ '--accent': r.color }}>
          <i className={`bi ${r.tagIcon}`} />
          {r.tag}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [visible,  setVisible]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [animDir,  setAnimDir]  = useState('next');
  const [animKey,  setAnimKey]  = useState(0);
  const ref      = useRef(null);
  const timerRef = useRef(null);

  /* 2 cards per slide */
  const perSlide = 2;
  const total    = Math.ceil(REVIEWS.length / perSlide);

  const goTo = useCallback((idx, dir = 'next') => {
    setAnimDir(dir);
    setAnimKey(k => k + 1);
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, 'prev'), [current, goTo]);

  /* stable ref so the interval always calls the latest next */
  const nextRef = useRef(next);
  useEffect(() => { nextRef.current = next; }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(() => nextRef.current(), 8000);
    return () => clearInterval(timerRef.current);
  }, []); // ← runs once only, never resets

  const pause  = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(() => nextRef.current(), 8000); };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* current pair */
  const startIdx = current * perSlide;
  const pair = [
    REVIEWS[startIdx % REVIEWS.length],
    REVIEWS[(startIdx + 1) % REVIEWS.length],
  ];

  return (
    <section className="tmr-section" ref={ref}>

      {/* bg decoration */}
      <div className="tmr-bg" aria-hidden="true">
        <div className="tmr-bg__glow tmr-bg__glow--tl" />
        <div className="tmr-bg__glow tmr-bg__glow--br" />
      </div>

      <div className={`tmr-wrap ${visible ? 'tmr-wrap--in' : ''}`}>

        {/* header */}
        <div className="tmr-head">
          <span className="tmr-eyebrow">
            <span className="tmr-eyebrow__dot" />
            Client Testimonials
          </span>
          <h2 className="tmr-title">
            What our clients{' '}
            <span className="tmr-title__grad">say about us</span>
          </h2>
          <p className="tmr-subtitle">
            Real results, real feedback — from teams who built with Kevalon.
          </p>
        </div>

        {/* slider */}
        <div
          className="tmr-slider"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* prev */}
          <button className="tmr-nav-btn" onClick={prev} aria-label="Previous">
            <i className="bi bi-arrow-left" />
          </button>

          {/* 2-card slide */}
          <div
            className={`tmr-slide tmr-slide--${animDir}`}
            key={animKey}
          >
            {pair.map(r => <TestimonialCard key={r.id} r={r} />)}
          </div>

          {/* next */}
          <button className="tmr-nav-btn" onClick={next} aria-label="Next">
            <i className="bi bi-arrow-right" />
          </button>
        </div>

        {/* dots */}
        <div className="tmr-dots">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`tmr-dot${i === current ? ' tmr-dot--active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
