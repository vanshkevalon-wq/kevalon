import React from 'react';
import { Container, Button } from 'react-bootstrap';
import internshipTeamImage from '../Images/game-dev-user.jpg.jpg';
import './InternshipTrainingPage.css';

function FeatureItem({ children }) {
  return (
    <div className="it-feature-item">
      <i className="bi bi-check-circle-fill" />
      <span>{children}</span>
    </div>
  );
}

export default function InternshipTrainingPage() {
  return (
    <div className="it-page">
      <section className="it-hero">
        <Container>
          <div className="it-hero__panel">
            <div className="it-hero__copy">
              <p className="it-hero__eyebrow">Internship / Training Program</p>
              <h1 className="it-hero__title">Know More About Internship / Training</h1>
              <p className="it-hero__sub">
                Hands-on IT training and internships to kickstart your career in technology. Learn through live projects,
                guided mentorship, and industry-ready implementation.
              </p>

              <div className="it-hero__chips" aria-label="Program highlights">
                <span>Live Projects</span>
                <span>Expert Mentors</span>
                <span>Certification</span>
                <span>Career Support</span>
              </div>

              <div className="it-hero__stats-row">
                <div className="it-hero__stat-card">
                  <strong>3-6 Months</strong>
                  <span>Practical training duration</span>
                </div>
                <div className="it-hero__stat-card">
                  <strong>100%</strong>
                  <span>Real project exposure</span>
                </div>
                <div className="it-hero__stat-card it-hero__stat-card--accent">
                  <strong>Career Focused</strong>
                  <span>Built for industry readiness</span>
                </div>
              </div>

              <div className="it-hero__actions">
                <Button className="it-hero__primary-btn" href="/apply-now">
                  Apply Now
                </Button>
                <Button variant="outline-light" className="it-hero__secondary-btn" href="#positions">
                  View Programs
                </Button>
              </div>
            </div>

            <div className="it-hero__visual" aria-hidden="true">
              <div className="it-hero__image-card">
                <img src={internshipTeamImage} alt="Internship and training team" />
              </div>
              <div className="it-hero__floating it-hero__floating--top">
                <span className="it-hero__floating-label">Hands-on Learning</span>
                <strong>Real projects, not just theory</strong>
              </div>
              <div className="it-hero__floating it-hero__floating--bottom">
                <span className="it-hero__floating-label">Career Outcome</span>
                <strong>Certification + support + portfolio</strong>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="it-content py-5">
        <Container>
          <div className="it-grid">
            <main className="it-main">
              <div className="it-intro">
                <p className="it-intro__text">
                  Explore our internship and training tracks below. The section above is the main introduction, and this
                  area focuses on the specific programs, side benefits, and certification support.
                </p>

                <article className="it-card-large it-training-card" id="positions">
                  <div className="it-card-head">
                    <h3>Mobile Application Development</h3>
                    <p className="muted">Android • iOS • Cross-platform</p>
                  </div>
                  <div className="it-card-body two-col">
                    <ul>
                      <li>Learn to design, develop, and deploy high-performance mobile apps.</li>
                      <li>Focus on real-world app development and scalable architecture.</li>
                      <li>React Native and Flutter for mobile app creation.</li>
                    </ul>
                    <ul>
                      <li>App integration, secure data handling, and testing.</li>
                      <li>Mobile performance tuning and debugging.</li>
                      <li>Play Store and App Store release preparation.</li>
                    </ul>
                  </div>
                </article>

                <article className="it-card-large it-training-card">
                  <div className="it-card-head">
                    <h3>Python Training</h3>
                    <p className="muted">Python • Data • Automation</p>
                  </div>
                  <div className="it-card-body two-col">
                    <ul>
                      <li>Master Python from fundamentals to advanced development.</li>
                      <li>Data science, automation, and backend systems.</li>
                      <li>Industry-standard tooling and scripting workflows.</li>
                    </ul>
                    <ul>
                      <li>Database connectivity and ORM concepts.</li>
                      <li>Backend architecture design and real-world Python projects.</li>
                      <li>Data analysis with pandas and NumPy.</li>
                    </ul>
                  </div>
                </article>

                <article className="it-card-wide">
                  <div className="it-card-head">
                    <h3>Full-Stack Projects</h3>
                  </div>
                  <div className="it-card-body">
                    <p>
                      Work on real-world, production-level applications that strengthen your portfolio and industry
                      readiness. Build complete systems from UI design to backend logic, database management, API
                      integration, and deployment.
                    </p>
                    <div className="it-projects-grid">
                      <div>End-to-end application development</div>
                      <div>Team collaboration using Git &amp; GitHub</div>
                      <div>Cloud deployment and hosting</div>
                      <div>Professional portfolio projects</div>
                    </div>
                  </div>
                </article>
              </div>
            </main>

            <aside className="it-side">
              <div className="it-side-card">
                <div className="it-side-body">
                  <h4>Internship & Training Program</h4>
                  <p>
                    At Kevalon Technology, we offer structured internship and training programs that combine theoretical
                    knowledge with practical application. Our programs are designed to help you build confidence,
                    skills, and industry-ready experience.
                  </p>

                  <p>
                    We focus on skill development, real project exposure, teamwork, and problem-solving abilities so
                    learners are ready for real IT careers, not just certificates.
                  </p>

                  <div className="it-features-grid">
                    <div className="it-feature">
                      <div className="it-feature-icon">✓</div>
                      <div>
                        <strong>Live Projects</strong>
                        <p className="small">Practical learning approach</p>
                      </div>
                    </div>
                    <div className="it-feature">
                      <div className="it-feature-icon">✓</div>
                      <div>
                        <strong>Expert Mentors</strong>
                        <p className="small">Industry professionals</p>
                      </div>
                    </div>
                    <div className="it-feature">
                      <div className="it-feature-icon">✓</div>
                      <div>
                        <strong>Career Support</strong>
                        <p className="small">Career guidance & referrals</p>
                      </div>
                    </div>
                    <div className="it-feature">
                      <div className="it-feature-icon">✓</div>
                      <div>
                        <strong>Certification</strong>
                        <p className="small">Verified training credentials</p>
                      </div>
                    </div>
                  </div>

                  <div className="it-side-note">
                    Trusted by students • Career-focused training • Industry aligned program
                  </div>

                  <div className="it-side-cta">
                    <Button className="it-apply-btn" href="/apply-now">
                      Start Your Journey
                    </Button>
                    <Button variant="outline-primary" className="it-contact-btn" href="/contact">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="it-bottom-banner">
            <div className="it-bottom-banner__content">
              <div className="it-bottom-banner__copy">
                <h3>Certification & Support</h3>
                <p>
                  Earn industry-recognized certifications and receive continuous career support designed to guide you
                  from learning to employment. Our structured certification and mentorship model ensures long-term
                  professional growth, confidence, and career stability.
                </p>
              </div>

              <div className="it-bottom-banner__lists">
                <div className="it-bottom-banner__list">
                  <FeatureItem>Industry-recognized completion certificates</FeatureItem>
                  <FeatureItem>Resume building & professional profiling</FeatureItem>
                  <FeatureItem>Job placement assistance</FeatureItem>
                  <FeatureItem>Continuous learning support</FeatureItem>
                </div>
                <div className="it-bottom-banner__list">
                  <FeatureItem>Interview preparation sessions</FeatureItem>
                  <FeatureItem>Community & alumni network access</FeatureItem>
                  <FeatureItem>Lifetime access to resources</FeatureItem>
                  <FeatureItem>Hands-on project guidance</FeatureItem>
                </div>
              </div>

              <div className="it-bottom-banner__cta">
                <Button className="it-banner-btn" href="/apply-now">
                  Start Your Journey
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </div>
  );
}
