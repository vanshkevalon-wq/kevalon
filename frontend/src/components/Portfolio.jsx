import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Portfolio.css';
import ProjectModal from './ProjectModal';
import portfolioItems from '../data/portfolioData';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All Projects');
  const tabs = ['All Projects', 'Web', 'Mobile', 'Game'];

  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeTab === 'All Projects'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  const categoryIcon = {
    Web: 'bi-code-slash',
    Mobile: 'bi-phone',
    Game: 'bi-controller',
  };

  return (
    <section className="portfolio-section py-5">
      <Container fluid className="px-4 px-md-5">
        <div className="text-center">
          <h2 className="portfolio-title fw-bolder">Our Portfolio - Web &amp; Mobile Projects</h2>
          <p className="portfolio-subtitle text-dark mt-3 mb-3">
            Transforming ideas into digital products | Kevalon Technology
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
          {tabs.map((tab, idx) => (
            <Button
              key={idx}
              variant="custom"
              className={`portfolio-tab-btn rounded-pill px-4 py-2 fw-semibold ${activeTab === tab ? 'active-tab' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <Row className="g-4">
          {filteredItems.map((item) => (
            <Col lg={4} md={6} sm={12} key={item.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                className="portfolio-card rounded-4 overflow-hidden"
              >
                {/* Image */}
                <div className="portfolio-card__img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="portfolio-card__img"
                  />
                  {/* Gradient overlay */}
                  <div className="portfolio-card__overlay" />
                  {/* Category badge on image */}
                  <span className="portfolio-card__badge">
                    <i className={`bi ${categoryIcon[item.category]} me-1`} />
                    {item.category}
                  </span>
                </div>

                {/* Info bar */}
                <div className="portfolio-card__info">
                  <h5 className="portfolio-card__title mb-0">{item.title}</h5>
                  <span className="portfolio-card__arrow">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* portfolioItems imported from data/portfolioData */}
        {selectedItem && (
          <ProjectModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </Container>
    </section>
  );
};

export default Portfolio;
