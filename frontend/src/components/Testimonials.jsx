import React from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import './Testimonials.css';

// Using local images from the Images folder
import TestimonialImg1 from '../Images/bc05e3d81d431660394a35aab11c47fe399ea367.jpg';
import TestimonialImg2 from '../Images/c0ff1c6069579eccf787d1ce2948712b02b542ea.jpg';
import TestimonialImg3 from '../Images/9821f6c9c1254c0ebc4202176504533254e64ac9.jpg';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'SARA WILLIAMS',
      role: 'CEO, Company',
      text: 'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit',
      image: TestimonialImg1,
      rating: 5,
    },
    {
      name: 'SARA WILLIAMS',
      role: 'CEO, Company',
      text: 'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit',
      image: TestimonialImg2,
      rating: 5,
    },
    {
      name: 'SARA WILLIAMS',
      role: 'CEO, Company',
      text: 'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit',
      image: TestimonialImg3,
      rating: 5,
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i 
        key={index} 
        className={index < rating ? "bi bi-star-fill text-warning mx-1" : "bi bi-star text-warning mx-1"}
        style={{ fontSize: '0.85rem' }}
      ></i>
    ));
  };

  return (
    <section className="testimonials-section text-center">
      <Container fluid className="px-4 px-md-5">
        <h2 className="testimonials-title">Client Testimonials</h2>
        <p className="testimonials-subtitle">What our clients say about our services</p>

        <Row className="g-4 justify-content-center mt-4">
          {testimonialsData.map((testimonial, idx) => (
            <Col lg={4} md={6} sm={12} key={idx}>
              <div className="testimonial-card">
                <div className="testimonial-bubble">
                  
                  <div className="testimonial-avatar-container">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="testimonial-avatar" 
                    />
                  </div>

                  <h5 className="testimonial-name">{testimonial.name}</h5>
                  <p className="testimonial-role">{testimonial.role}</p>
                  
                  <div className="testimonial-stars mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="testimonial-text">
                    {testimonial.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
