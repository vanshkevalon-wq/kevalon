import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import portfolioItems from '../data/portfolioData';
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
    <div className="pt-10 pb-14 px-5 max-w-[1280px] mx-auto font-[Inter,system-ui,-apple-system,'Segoe_UI',Roboto,Arial,sans-serif]">

      {/* topbar */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="m-0 mb-1.5 text-navy-mid font-bold uppercase tracking-[0.12em] text-[0.75rem]">Live Preview</p>
          <h1 className="m-0 text-[clamp(1.8rem,3vw,3rem)] text-navy-dark">{item.title}</h1>
        </div>
        <Link
          to="/portfolio"
          className="self-center px-4 py-2.5 rounded-full no-underline bg-[rgba(97,187,197,0.12)] text-navy font-bold"
        >
          Back to portfolio
        </Link>
      </div>

      {/* hero grid */}
      <div className="grid grid-cols-[1fr_1.2fr] gap-[22px] bg-white border border-[rgba(3,70,101,0.08)] rounded-3xl p-6 shadow-[0_24px_60px_rgba(3,70,101,0.08)] max-[992px]:grid-cols-1">

        {/* copy */}
        <div>
          <span className="inline-flex items-center rounded-full py-[7px] px-3 font-bold bg-[rgba(97,187,197,0.15)] text-navy">
            {item.category}
          </span>
          <h2 className="mt-2.5 mb-3 text-navy-dark text-[clamp(1.4rem,2vw,2.2rem)]">
            Interactive website preview for {item.title}
          </h2>
          <p className="text-[#374151] leading-[1.75]">{item.desc}</p>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {item.tech.map((tech) => (
              <span key={tech}
                className="inline-flex items-center rounded-full py-[7px] px-3 font-bold bg-white text-navy border border-[rgba(3,70,101,0.08)]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* slider */}
        <div className="rounded-[20px] overflow-hidden bg-white min-h-[360px] shadow-[0_16px_40px_rgba(3,70,101,0.08)]">
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
                <img
                  src={src}
                  alt={`${item.title} preview ${index + 1}`}
                  className="w-full h-full min-h-[360px] object-cover block"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* info panels */}
      <div className="grid grid-cols-2 gap-5 mt-5 max-[992px]:grid-cols-1">
        <section className="bg-white border border-[rgba(3,70,101,0.08)] rounded-[20px] p-[22px] shadow-[0_14px_34px_rgba(3,70,101,0.06)]">
          <h3 className="mt-0 text-navy-dark">What the live site shows</h3>
          <ul className="m-0 pl-5 text-[#374151]">
            {item.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gradient-to-br from-[rgba(97,187,197,0.08)] to-[rgba(255,255,255,0.95)] border border-[rgba(3,70,101,0.08)] rounded-[20px] p-[22px] shadow-[0_14px_34px_rgba(3,70,101,0.06)]">
          <h3 className="mt-0 text-navy-dark">Quick overview</h3>
          <p className="text-[#374151] leading-[1.75]">
            A polished, production-style preview separate from the case study, so you can view the project like a real website.
          </p>
          <Link to={`/case-study/${item.slug}`} className="inline-flex mt-3.5 text-navy font-bold no-underline">
            Open case study
          </Link>
        </section>
      </div>
    </div>
  );
}
