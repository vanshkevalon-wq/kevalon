import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Services.css';

const Services = () => {
  const services = [
    {
      slug: 'web-application-development',
      title: 'Web Application Development',
      desc: 'Custom, scalable web applications built with modern frameworks.',
      icon: 'bi-code-slash',
      tags: ['React', 'Next.js', 'Node.js', 'Mongo DB'],
      link: '/services/web-application-development',
    },
    {
      slug: 'mobile-application-development',
      title: 'Mobile Application Development',
      desc: 'High-performance native and cross-platform apps for every device.',
      icon: 'bi-phone',
      tags: ['iOS & Android', 'React Native', 'Mobile UI/UX', 'Flutter'],
      link: '/services/mobile-application-development',
    },
    {
      slug: 'game-development',
      title: 'Game Development',
      desc: 'Engaging and interactive games for mobile and web platforms.',
      icon: 'bi-controller',
      tags: ['Unity', 'Multiplayer Support', '2D & 3D', 'Cross-Platform'],
      link: '/services/game-development',
    },
    {
      slug: 'e-commerce-development',
      title: 'E-Commerce Development',
      desc: 'Secure and scalable e-commerce solutions to grow your online business.',
      icon: 'bi-cart3',
      tags: ['Shopify', 'Custom Dashboards', 'Checkout', 'WooCommerce'],
      link: '/services/e-commerce-development',
    },
    {
      slug: 'web-erp-development',
      title: 'Web ERP Development',
      desc: 'ERP systems that connect finance, HR, inventory, and operations.',
      icon: 'bi-kanban',
      tags: ['ERP Modules', 'Automation', 'Analytics', 'Integrations'],
      link: '/services/web-erp-development',
    },
    {
      slug: 'api-development',
      title: 'API Development',
      desc: 'Secure RESTful and GraphQL APIs for modern web, mobile, and cloud systems.',
      icon: 'bi-plug',
      tags: ['REST APIs', 'GraphQL', 'Microservices', 'Swagger'],
      link: '/services/api-development',
    },
    {
      slug: 'crm-development',
      title: 'CRM Development',
      desc: 'Custom CRM, automation, and integration systems for business growth.',
      icon: 'bi-people-fill',
      tags: ['Lead Management', 'Sales Pipeline', 'Automation', 'Analytics'],
      link: '/services/crm-development',
    },
    {
      slug: 'seo-digital-marketing',
      title: 'SEO & Digital Marketing',
      desc: 'Data-driven SEO and growth marketing services to boost rankings and leads.',
      icon: 'bi-graph-up-arrow',
      tags: ['SEO Audit', 'Keyword Strategy', 'Google Ads', 'Analytics'],
      link: '/services/seo-digital-marketing',
    },
    {
      slug: 'internship-training',
      title: 'Internship / Training',
      desc: 'Hands-on internships, workshops, and live projects.',
      icon: 'bi-mortarboard-fill',
      tags: ['Live Projects', 'Mentorship', 'Certification', 'Career Support'],
      link: '/services/internship-training',
    },
  ];

  return (
    <section className="services-section py-5">
      <div className="services-anchor-points" aria-hidden="true">
        <span id="expertise-web-application-development" className="services-anchor-point" />
        <span id="expertise-mobile-application-development" className="services-anchor-point" />
        <span id="expertise-game-development" className="services-anchor-point" />
        <span id="expertise-e-commerce-development" className="services-anchor-point" />
        <span id="expertise-web-erp-development" className="services-anchor-point" />
        <span id="expertise-api-development" className="services-anchor-point" />
        <span id="expertise-crm-development" className="services-anchor-point" />
        <span id="expertise-seo-digital-marketing" className="services-anchor-point" />
      </div>
      <Container fluid className="px-4 px-md-5">
        <div className="text-center mb-5">
          <h2 className="services-title fw-bold">Our Core IT Services in Ahmedabad</h2>
          <p className="services-subtitle mx-auto mt-3">
            We provide secure, scalable, and high-performance IT solutions customized<br />
            for your business needs.
          </p>
        </div>

        <div className="services-cards-wrapper">
          <div className="horizontal-line"></div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            className="services-swiper"
          >
            {services.map((service, idx) => (
              <SwiperSlide key={idx} style={{ height: 'auto' }}>
                {service.link ? (
                  <Link to={service.link} className="service-card-link" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="service-card text-center p-4">
                      <div className="service-icon-wrap mx-auto mb-4">
                        <i className={`bi ${service.icon} service-icon`} aria-hidden="true"></i>
                      </div>
                      <h5 className="service-card-title text-white fw-semibold mb-3">{service.title}</h5>
                      <p className="service-card-desc mb-4">{service.desc}</p>
                      <hr className="service-divider mx-auto mb-4" />
                      <div className="service-tags d-flex flex-wrap gap-2">
                        {service.tags.map((tag, i) => (
                          <button key={i} className="service-tag">{tag}</button>
                        ))}
                      </div>
                      <div className="service-card-cta mt-3">
                        Learn More <span>→</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="service-card text-center p-4">
                    <div className="service-icon-wrap mx-auto mb-4">
                      <i className={`bi ${service.icon} service-icon`} aria-hidden="true"></i>
                    </div>
                    <h5 className="service-card-title text-white fw-semibold mb-3">{service.title}</h5>
                    <p className="service-card-desc mb-4">{service.desc}</p>
                    <hr className="service-divider mx-auto mb-4" />
                    <div className="service-tags d-flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <button key={i} className="service-tag">{tag}</button>
                      ))}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="custom-pagination d-flex justify-content-center mt-5 gap-2"></div>
        </div>
      </Container>
    </section>
  );
};

export default Services;  